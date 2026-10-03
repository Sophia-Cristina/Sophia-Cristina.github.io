import * as ysxMath from "/JSHeaders/ysxMath/ysxMath.js";
import * as ysxColor from "/JSHeaders/ysxGraph/ysxColor.js";
import * as ysxCanv from "/JSHeaders/ysxGraph/Canvas/ysxCanv.js";

export { ysxMath, ysxColor, ysxCanv };


// #################################################


// EAZY POINT PLOT:
export function ysxDRAW_DrawPoint(context, x, y, RGB)
{
    context.fillStyle = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
    context.fillRect(x, y, 1, 1);
}


// #################################################

// ####### FILLS:

// FLOOD FILL (THE 'PAINT BUCKET' TOOL) STARTING AT 'x' AND 'y':
export function ysxDRAW_FillFloodContext(ctx, x, y, color)
{
    x = Math.round(x);
    y = Math.round(y);

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    if (x < 0 || x >= width || y < 0 || y >= height) { return; }

    const image = ctx.getImageData(0, 0, width, height);
    const data = image.data;
    const startIndex = (y * width + x) * 4;

    const target = [data[startIndex], data[startIndex + 1], data[startIndex + 2]];

    // Don't flood if already the desired color.
    if (target[0] === color[0] && target[1] === color[1] && target[2] === color[2])
    { return; }

    const stack = [[x, y]];

    while (stack.length > 0)
    {
        const point = stack.pop();

        const px = point[0];
        const py = point[1];

        if (px < 0 || px >= width || py < 0 || py >= height) { continue; }

        const index = (py * width + px) * 4;

        if (data[index] !== target[0] || data[index + 1] !== target[1] || data[index + 2] !== target[2]) { continue; }

        data[index] = color[0]; data[index + 1] = color[1]; data[index + 2] = color[2];

        stack.push([px + 1, py]); stack.push([px - 1, py]);
        stack.push([px, py + 1]); stack.push([px, py - 1]);
    }

    ctx.putImageData(image, 0, 0);
}

// export function ysxDRAW_FillFloodImgData(idata, x, y, color) {}

// #################################################
// FLOOD FILL
// This is a special version of 'FillFlood' that works directly on ImageData to not copy a canvas.
// !!! It also have an IMPORTANT feature that is useful for very specific images:
// 'alpha > 0' is treated as a wall.
//
// Therefore:
//   transparent pixel = fillable
//   non-transparent pixel = boundary
//
// This means antialiased Canvas lines are also
// treated as boundaries.

export function ysxDRAW_FillFloodImgDataAlphaWall(imageData, width, height, startX, startY, color)
{
    let x = Math.floor(startX);
    let y = Math.floor(startY);

    if (x < 0 || x >= width || y < 0 || y >= height) { return; }
    const data = imageData.data;
    const startIndex = (y * width + x) * 4;

    // Already occupied.
    if (data[startIndex + 3] !== 0) { return; }

    const r = Math.max(0, Math.min(255, Math.round(color[0])));
    const g = Math.max(0, Math.min(255, Math.round(color[1])));
    const b = Math.max(0, Math.min(255, Math.round(color[2])));

    // Instead of storing [x,y] arrays, store a single integer representing the pixel position.
    // 'pixel = y * width + x'
    const stack = [y * width + x];

    while (stack.length > 0)
    {
        const pixel = stack.pop();

        const px = pixel % width;
        const py = Math.floor(pixel / width);

        const index = pixel * 4;

        // It may already have been filled.
        if (data[index + 3] !== 0) { continue; }

        // Fill pixel.
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;

        // LEFT:
        if (px > 0)
        {
            const neighbor = pixel - 1;
            const ni = neighbor * 4;
            if (data[ni + 3] === 0) { stack.push(neighbor); }
        }

        // RIGHT:
        if (px + 1 < width)
        {
            const neighbor = pixel + 1;
            const ni = neighbor * 4;
            if (data[ni + 3] === 0) { stack.push(neighbor); }
        }

        // UP:
        if (py > 0)
        {
            const neighbor = pixel - width;
            const ni = neighbor * 4;
            if (data[ni + 3] === 0) { stack.push(neighbor); }
        }

        // DOWN:
        if (py + 1 < height)
        {
            const neighbor = pixel + width;
            const ni = neighbor * 4;
            if (data[ni + 3] === 0) { stack.push(neighbor); }
        }
    }
}


// #################################################


// PLOT FROM TRIGONOMETRY:
export function ysxDRAW_LineRay(context, r, rad, x, y, Triangle, C = null)
{
    let yc;
    let xc;

    let xend = Math.round(Math.cos(rad) * r);
    let yend = Math.round(Math.sin(rad) * r);

    let c = [0, 0, 0];
    
    for (let rn = 0; rn <= r; rn++)
    {
        yc = y + Math.round(Math.sin(rad) * rn);
        xc = x + Math.round(Math.cos(rad) * rn);

        // Canvas itself does not need an explicit bounds check
        // unless we want to avoid drawing outside the canvas.
        if (xc >= 0 && xc < context.canvas.width && yc >= 0 && yc < context.canvas.height)
        {
            if (C === null) { ysxColor.ysxCOLOR_LinearRGB(rn / r, 1, 1, c); ysxDRAW_DrawPoint(context, xc, yc, c); }
            else { ysxDRAW_DrawPoint(context, xc, yc, C); }

            if (Triangle)
            {
                if (C === null) { ysxDRAW_DrawPoint(context, xc, y, c); ysxDRAW_DrawPoint(context, x + xend, yc, c); }
                else { ysxDRAW_DrawPoint(context, xc, y, C); ysxDRAW_DrawPoint(context, x + xend, yc, C); }
            }
        }
    }
}


// #################################################


// BRESENHAM LINE:
export function ysxDRAW_Line(context, x0, y0, x1, y1, C = null)
{
    let x, y, dx, dy, dx1, dy1;
    let px, py;
    let xe, ye;

    dx = x1 - x0; dy = y1 - y0;
    dx1 = Math.abs(dx); dy1 = Math.abs(dy);
    px = 2 * dy1 - dx1; py = 2 * dx1 - dy1;

    let c = [255, 0, 0];

    if (dy1 <= dx1)
    {
      if (dx >= 0) { x = x0; y = y0; xe = x1; }
      else { x = x1; y = y1; xe = x0; }

      if (C === null) { ysxDRAW_DrawPoint(context, x, y, c); }
      else { ysxDRAW_DrawPoint(context, x, y, C); }

      for (let i = 0; x < xe; i++)
      {
			  x += 1;	if (px < 0) { px = px + 2 * dy1; }
			  else { if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) { y = y + 1; } else { y = y - 1; } px = px + 2 * (dy1 - dx1); }
			  if (C === null) { ysxColor.ysxCOLOR_LinearRGB(x / (xe - 1.0), 1, 1, c); ysxDRAW_DrawPoint(context, x, y, c); }
        else { ysxDRAW_DrawPoint(context, x, y, C); }
		  }
    }
    else
    {
        if (dy >= 0) { x = x0; y = y0; ye = y1; }
        else { x = x1; y = y1; ye = y0; }

        if (C === null) { ysxDRAW_DrawPoint(context, x, y, c); }
        else { ysxDRAW_DrawPoint(context, x, y, C); }

        for (let i = 0; y < ye; i++)
        {
            y += 1;

            if (py <= 0) { py = py + 2 * dx1; }
            else
            {
              if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) { x = x + 1; } else { x = x - 1; }
              py = py + 2 * (dx1 - dy1);
            }

            if (C === null) { ysxColor.ysxCOLOR_LinearRGB(y / (ye - 1.0), 1, 1, c); ysxDRAW_DrawPoint(context, x, y, c); }
            else { ysxDRAW_DrawPoint(context, x, y, C); }
        }
    }
}


// #################################################