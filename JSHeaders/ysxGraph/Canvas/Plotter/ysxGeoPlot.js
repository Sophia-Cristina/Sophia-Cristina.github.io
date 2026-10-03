import * as ysxDraw from "/JSHeaders/ysxGraph/Canvas/Plotter/ysxDraw.js";
import * as ysxPlotterUtils from "/JSHeaders/ysxGraph/Canvas/Plotter/ysxPlotterUtils.js";

export { ysxDraw, ysxPlotterUtils };

// ######################################################################

// ############## TRIGONOMETRIC:

// PLOT CIRCLE WITH ORIGIN AT X AND Y:
export function ysxDRAW_Circle(context, r, x, y, C = null)
{
	let yc, xc;
	let dt = 1.0 / r;
	let LC = false;
	let c = [0, 0, 0];

	for (let rad = 0; rad <= (Math.PI * 2); rad += dt) // MUDAR SE NESCESSARIO
	{
		let yc = y + Math.round(Math.sin(rad) * r);
		let xc = x + Math.round(Math.cos(rad) * r);
		if (!C)	{ ysxDraw.ysxColor.ysxCOLOR_LinearRGB(rad / (Math.PI * 2), 1, 1, c); ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, c);	}
		else { ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, C); }
	}
}
// PLOT CIRCLE THAT FITS AN IMAGE:
export function ysxDRAW_CircleEdge(context, C = null)
{
	let r; context.canvas.width < context.canvas.height ? r = context.canvas.width : r = context.canvas.height; r -= 1; r *= 0.5;
	let dt = 1.0 / r;
	let yc, xc, x = Math.floor(context.canvas.width * 0.5), y = Math.floor(context.canvas.height * 0.5);
	let c = [0, 0, 0];

	for (let rad = 0; rad <= (Math.PI * 2); rad = rad + dt)
	{
		let yc = y + Math.round(Math.sin(rad) * r); xc = x + Math.round(Math.cos(rad) * r);
		if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB(rad / (Math.PI * 2), 1, 1, c); ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, c); }
		else { ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, C); }
	}
}

// DRAWS A CIRCLE ARC BY TURNS:
export function ysxDRAW_Arc(context, r, x, y, Ini, Turn, C = null)
{
	let yc, xc;
	if (Ini > Turn) { let Tmp; Tmp = Ini; Ini = Turn; Turn = Tmp; }
	Turn *= Math.PI * 2; Ini *= Math.PI * 2;
	let dt = (Turn - Ini) / ((Math.PI * 2) * r);
	let c = [0, 0, 0];

	for (let rad = Ini; rad <= Turn; rad += dt)
	{
		let yc = y + Math.round(Math.sin((Math.PI * 2) - rad) * r); xc = x + Math.round(Math.cos(rad) * r);
		if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB((rad - Ini) / (Turn - Ini), 1, 1, c); ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, c); }
		else { ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, C); }
	}
}

// ######################################################################

// ############## RADIUS:

// PLOT RADIUS:
// 'ysxDRAW_LineRay' does the same job, you can just add the circle mannually!
/*export function ysxDRAW_Radius(context, r, x, int16_t y, rad, Triangle, Border, C = null)
{
  //xc, yc, rn;
	//Sin = Math.sin((Math.PI * 2) - rad), Cos = Math.cos(rad);
	//xend = Math.round(Cos * r);
	//uint8_t IC[3]; let c = [0, 0, 0];

	for (rn = 0; rn <= r; ++rn)
	{
		yc = y + Math.round(Sin * rn);
		xc = x + Math.round(Cos * rn);
		if (!C) 
		{
			ysxDraw.ysxColor.ysxCOLOR_LinearRGB(rn / r, 1, 1, c);
			ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, c);
		}
		else { ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, C); }
		if (Triangle)
		{
			if (!C) { IC[0] = 255 - c[0]; IC[1] = 255 - c[1]; IC[2] = 255 - c[2]; }
			else { IC[0] = 255 - C[0]; IC[1] = 255 - C[1]; IC[2] = 255 - C[2]; }
			ysxDraw.ysxDRAW_DrawPoint(context, xc, y, IC);
			ysxDraw.ysxDRAW_DrawPoint(context, x + xend, yc, IC);
		}
	}	
	if (Border) { if (!C) { ysxDRAW_Circle(Img, r, x, y, c); } else { ysxDRAW_Circle(Img, r, x, y, C); } }
}*/

export function ysxDRAW_RadiusPolygon(context, r, x, y, OffSet, Divisions, Triangle, Border, C = null)
{
	let Div = (Math.PI * 2) / Divisions;
	for (let rad = OffSet; rad < (Math.PI * 2) + OffSet; rad += Div)
	{
		if (!C)
		{
		  ysxDraw.ysxDRAW_LineRay(context, r, rad, x, y, Triangle);
		  if (Border)
		  {
		    context.beginPath();
		    context.arc(x, y, r, 0, 2 * Math.PI);
		    context.strokeStyle = `rgb(${255}, ${255}, ${255})`;
        context.stroke();
		  }
		}
		else
		{
		  ysxDraw.ysxDRAW_LineRay(context, r, rad, x, y, Triangle, C);
		  if (Border)
		  {
		    context.beginPath();
		    context.arc(x, y, r, 0, 2 * Math.PI);
		    context.strokeStyle = `rgb(${C[0]}, ${C[1]}, ${C[2]})`;
        context.stroke();
		  }
		}
	}
}


// ######################################################################


// ############## CYCLOIDS:

// HYPOCYCLOID / HYPOTROCHOID:
// Hypocycloid if 'd = r'.
export function ysxDRAW_HypoCycl(context, R, r, x, y, t0, t1, d, C = null)
{
	let Arc = (r * 8 * ((R / r) - 1)), dt = ((t1 - t0) / Arc) / (Math.PI * 4);
	if (t0 < 0) { t0 = (Math.PI * 2) + t0; } if (t1 < t0) { T = t0; t0 = t1; t1 = T; }
	let yc, xc;
	let c = [0, 0, 0];
	for (let t = t0; t <= t1; t += dt)
	{
		xc = x + ((R - r) * Math.cos(t) + d * Math.cos(t * (R - r) / r));
		yc = y + ((R - r) * Math.sin(t) - d * Math.sin(t * (R - r) / r));
		if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB((t - t0) / (t1 - t0), 1, 1, c); ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, c); }
		else { ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, C); }
	}
}

// EPICYCLOID / EPITROCHOID:
// Epicycloid if 'd = r'.
export function ysxDRAW_EpiCycl(context, R, r, x, y, t0, t1, d, C = null)
{
	if (t0 < 0) { t0 = (Math.PI * 2) + t0; } if (t1 < t0) { T = t0; t0 = t1; t1 = T; }
	let dt = ((t1 - t0) / ((Math.PI * 2) * (R + r))) / (Math.PI * 4);
	let yc, xc;
	let c = [0, 0, 0];
	for (let t = t0; t <= t1; t += dt)
	{
		yc = y + ((R + r) * Math.sin(t) - d * Math.sin(t * (R + r) / r));
		xc = x + ((R + r) * Math.cos(t) - d * Math.cos(t * (R + r) / r));
		if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB((t - t0) / (t1 - t0), 1, 1, c); ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, c); }
		else { ysxDraw.ysxDRAW_DrawPoint(context, xc, yc, C); }
	}
}

//export function ysx https://en.wikipedia.org/wiki/Epitrochoid()

// ############################################################################################################################################

// ############## POLYGONAL:

// PLOT POLYGON:
export function ysxDRAW_Polygon(context, Sides, r, x, y, Vertex, C = null)
{
	let xc, yc, Count = 0;
	if (Sides < 3) { Sides = 3; }
	let Coord = [];
	for (let AddCoord = 0; AddCoord < Sides; ++AddCoord)
	{
	  let p = { x: 0, y: 0 };
	  Coord.push(p);
	}
	let Div = (Math.PI * 2) / Sides;
	let c = [255, 0, 0];
	
	for (let rad = 0.0; rad <= (Math.PI * 2); rad = rad + Div)
	{
		let xc = x + Math.round(Math.cos(rad) * r);
		let yc = y + Math.round(Math.sin(rad) * r);
		if (Count < Sides) { Coord[Count].x = xc; Coord[Count].y = yc; }
		++Count;

		if (Vertex)
		{
			if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB(rad / (Math.PI * 2), 1, 1, c); ysxPlotterUtils.ysxDRAW_Vertex(context, xc, yc, 3, c); }
			else { ysxPlotterUtils.ysxDRAW_Vertex(context, xc, yc, 3, C); }
		}
	}
	for (let n = 1; n < Sides; ++n)
	{
		if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB((n - 1.0) / Sides, 1, 1, c); ysxDraw.ysxDRAW_Line(context, Coord[n - 1].x, Coord[n - 1].y, Coord[n].x, Coord[n].y, c); }
		else { ysxDraw.ysxDRAW_Line(context, Coord[n - 1].x, Coord[n - 1].y, Coord[n].x, Coord[n].y, C); }
		if (n == Sides - 1)
		{
		  if (!C) { ysxDraw.ysxColor.ysxCOLOR_LinearRGB(n / Sides, 1, 1, c); ysxDraw.ysxDRAW_Line(context, Coord[n].x, Coord[n].y, Coord[0].x, Coord[0].y, c); }
		  else { ysxDraw.ysxDRAW_Line(context, Coord[n].x, Coord[n].y, Coord[0].x, Coord[0].y, C); }
		}
	}
}

// ###################################
// ############## CLASSES ##############
// ###################################

// ############## PRINT TRIANGLE
// * NOTE: This code is old and badly made, so i'm going to optmize and reduce verbosity. This may change functions and other things and may lose compatibility.
export class ysxDRAW_Tri
{
    // CONFIG:
    Border = 25;
    CanvWidth = 0;
    CanvHeight = 0;
    Offy = 0;

    x = [0, 0, 0];
    y = [0, 0, 0];

    Coord = [ { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 } ];
    SclCrd = [ { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 } ];
    Midpoint = [ { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 } ];
    Circumcenter = { x: 0, y: 0 };

    ColorSides = [0, 0, 0];
    ColorBisectors = [0, 0, 0];
    ColorHeightLine = [127, 127, 127];
    ColorIncircle = [0, 0, 0];
    LRGB = false;
    
    Scale = 1.0;

    // Triangle information:
    a = 0; b = 0; c = 0;
    h = 0;
    gamma = 0; beta = 0; alpha = 0;
    area = 0; perimeter = 0;
    BisA = 0; BisB = 0; BisC = 0;
    inradius = 0;
    IA = 0; IB = 0; IC = 0;

    // OUTPUT:
    TriOut = null;


    // ####### INTERNAL #######


    GetHorizontalExtent()
    {
        const X0 = this.Coord[0].x;
        const X1 = this.Coord[1].x;
        const X2 = this.Coord[2].x;
        const MinX = Math.min(X0, X1, X2);
        const MaxX = Math.max(X0, X1, X2);
        return(MaxX - MinX);
    }

    EmptyImg() { this.TriOut = null; }

    PaintScreen(Color)
    {
        if (!this.TriOut) { return; }
        this.TriOut.fillStyle = `rgb(${Color[0]}, ${Color[1]}, ${Color[2]})`;
        this.TriOut.fillRect(0, 0, this.CanvWidth, this.CanvHeight);
    }


    ChangeBorder(BorderNewSize)
    {
        if (BorderNewSize < 0) { BorderNewSize = 0; }
        this.Border = BorderNewSize;
        const HorizontalExtent = this.GetHorizontalExtent();
        this.CanvWidth = Math.ceil(this.Scale * HorizontalExtent) + (this.Border * 2);
        this.CanvHeight = Math.ceil(this.h * this.Scale) + (this.Border * 2);
        this.Offy = this.CanvHeight - this.Border;


        for (let i = 0; i < 3; ++i)
        {
            this.x[i] = this.Border + (this.Scale * this.Coord[i].x);
            this.y[i] = this.Offy - (this.Scale * this.Coord[i].y);
        }
    }
    
    
    // ####### NEW TRIANGLE #######


    NewTri(TriInput)
    {
        this.a = TriInput.a;
        this.b = TriInput.b;
        this.c = TriInput.c;

        this.h = TriInput.Height;

        this.gamma = TriInput.Gamma;
        this.beta = TriInput.Beta;
        this.alpha = TriInput.Alpha;

        this.area = TriInput.Area;
        this.perimeter = TriInput.Perimeter;

        this.BisA = TriInput.BisA;
        this.BisB = TriInput.BisB;
        this.BisC = TriInput.BisC;

        this.inradius = TriInput.Inradius;

        this.IA = TriInput.IA;
        this.IB = TriInput.IB;
        this.IC = TriInput.IC;

        this.CanvHeight = Math.ceil(this.h * this.Scale) + (this.Border * 2);
        this.Offy = this.CanvHeight - this.Border;

        for (let i = 0; i < 3; ++i)
        {
          this.Coord[i].x = TriInput.Coord[i].x; this.Coord[i].y = TriInput.Coord[i].y;
          this.SclCrd[i].x = this.Scale * this.Coord[i].x; this.SclCrd[i].y = this.Scale * this.Coord[i].y;
          this.Midpoint[i].x = TriInput.Mid[i].x; this.Midpoint[i].y = TriInput.Mid[i].y;
          this.x[i] = this.Border + (this.Scale * this.Coord[i].x); this.y[i] = this.Offy - (this.Scale * this.Coord[i].y);
        }
        
        const HorizontalExtent = this.GetHorizontalExtent();
        this.CanvWidth = Math.ceil(this.Scale * HorizontalExtent) + (this.Border * 2);

        this.Circumcenter.x = TriInput.Circumcenter.x;
        this.Circumcenter.y = TriInput.Circumcenter.y;
    }


    // ####### CONSTRUCTOR #######


    constructor(TriInput, ScaleIn, BorderSize, ColorIn = null)
    {
      this.Scale = ScaleIn;
      
      this.NewTri(TriInput);

      this.TriOut = document.createElement("canvas");
      this.TriOut.width = this.CanvWidth;
      this.TriOut.height = this.CanvHeight;

      if (ColorIn)
      {
        this.ColorSides = [ColorSidesIn[0], ColorSidesIn[1], ColorSidesIn[2]];
        this.ColorIncircle = [Math.floor((255 - this.ColorSides[0]) / 2), Math.floor((255 - this.ColorSides[1]) / 2), Math.floor((255 - this.ColorSides[2]) / 2)];
        this.ColorHeightLine = [127, 127, 127];
        this.ColorBisectors = [Math.floor(this.ColorSides[0] / 2), Math.floor(this.ColorSides[1] / 2), this.ColorSides[2]];
      }
      else
      {
        this.ColorSides = null;
        this.ColorIncircle = [255, 255, 255];
        this.ColorHeightLine = [127, 127, 127];
        this.ColorBisectors = [191, 191, 255];
      }
      //else { this.ColorSides = [191, 127, 159]; }
    }


    // ####### TRIANGLE PERIMETER #######


    TriPeriPrint(DrawVertex, DrawText, DrawHeightLine, ChangeSidesColor)
    {
        const Context = this.TriOut.getContext("2d");

        // A -> B = side b
        ysxDraw.ysxDRAW_Line(Context, this.x[0], this.y[0], this.x[1], this.y[1], this.ColorSides);

        // B -> C = side c
        if (!ChangeSidesColor && this.ColorSides === null) { ysxDraw.ysxDRAW_Line(Context, this.x[1], this.y[1], this.x[2], this.y[2], this.ColorSides); }
        else
        {
          const nc = [(this.ColorSides[0] + 85) % 256, (this.ColorSides[1] + 85) % 256, (this.ColorSides[2] + 85) % 256];
          ysxDraw.ysxDRAW_Line(Context,this.x[1], this.y[1], this.x[2], this.y[2], nc);
        }
        
        // C -> A = side a
        if (!ChangeSidesColor && this.ColorSides === null) { ysxDraw.ysxDRAW_Line(Context, this.x[2], this.y[2], this.x[0], this.y[0], this.ColorSides); }
        else
        {
          const nc = [(this.ColorSides[0] + 170) % 256, (this.ColorSides[1] + 170) % 256, (this.ColorSides[2] + 170) % 256];
          ysxDraw.ysxDRAW_Line(Context, this.x[2], this.y[2], this.x[0], this.y[0], nc);
        }

        if (DrawText)
        {
          let nc, tc;
          if (this.ColorSides === null) { nc = [255, 255, 255]; tc = nc; }
          else { nc = [(255 - this.ColorSides[0]) * 0.75, (255 - this.ColorSides[1]) * 0.75, (255 - this.ColorSides[2]) * 0.75]; tc = this.ColorSides; }
          
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, 16, this.y[0] - 18, "a: " + this.a, tc);
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, 16, this.y[0] - 10, "Gamma: " + this.gamma, nc);
          
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.5), this.y[1] - 16, "b: " + this.b, tc);
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.5), this.y[1] - 8, "Alpha: " + this.alpha, nc);
          
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.75), this.y[2] - 18, "c: " + this.c, tc);
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.75), this.y[2] - 10,  "Beta: " + this.beta, nc);

          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.5), this.CanvHeight * 0.5, "Area: " + this.area, [255, 127, 127]);
          ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.5), (this.CanvHeight * 0.5) + 8, "Peri.: " + this.perimeter, [127, 255, 127]);
        }

        if (DrawVertex)
        {
          ysxPlotterUtils.ysxDRAW_Vertex(Context, this.x[0], this.y[0], 3, [255, 0, 0]);
          ysxPlotterUtils.ysxDRAW_Vertex(Context, this.x[1], this.y[1], 3, [0, 255, 0]);
          ysxPlotterUtils.ysxDRAW_Vertex(Context, this.x[2], this.y[2], 3, [0, 0, 255]);
        }

        if (DrawHeightLine)
        {
            const HeightX = this.SclCrd[1].x + this.Border;
            ysxDraw.ysxDRAW_Line(Context, HeightX, this.Offy, HeightX, this.Offy - Math.round(this.Scale * this.h), this.ColorHeightLine);
            ysxDraw.ysxDRAW_Line(Context, HeightX, this.Offy - 5, HeightX + 5, this.Offy - 5, this.ColorHeightLine); // Right angle square
            ysxDraw.ysxDRAW_Line(Context, HeightX + 5, this.Offy - 5, HeightX + 5, this.Offy, this.ColorHeightLine);
            if (DrawText) { ysxDraw.ysxCanv.ysxDRAW_AddText(Context, HeightX + 16, this.Offy - Math.round(this.Scale * this.h * 0.5) - 8, "Height: " + this.h, this.ColorHeightLine); }
            if (DrawVertex) { ysxPlotterUtils.ysxDRAW_Vertex(Context, HeightX, this.Offy, 3, [127, 127, 127]); }
        }
    }


    // ####### BISECTORS #######


    TriBisectorPrint(DrawText)
    {
      const Context = this.TriOut.getContext("2d");
      
      const AngleA = this.beta + this.alpha * 0.5;
      ysxDraw.ysxDRAW_LineRay(Context, this.BisA * this.Scale, AngleA,  this.x[1], this.y[1], false, this.ColorBisectors);

      const AngleB = Math.PI + this.beta * 0.5;
      ysxDraw.ysxDRAW_LineRay(Context, this.BisB * this.Scale, AngleB, this.x[2], this.y[2], false, this.ColorBisectors);

      const AngleC = (Math.PI * 2.0) - this.gamma * 0.5;
      ysxDraw.ysxDRAW_LineRay(Context, this.BisC * this.Scale, AngleC, this.x[0], this.y[0], false, this.ColorBisectors);

      if (DrawText)
      {
        ysxDraw.ysxCanv.ysxDRAW_AddText(Context, 16, this.y[0], "BisA: " + this.BisA, this.ColorBisectors);
        ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.5), this.y[1], "BisB: " + this.BisB, this.ColorBisectors);
        ysxDraw.ysxCanv.ysxDRAW_AddText(Context, Math.round(this.CanvWidth * 0.75), this.y[2], "BisC: " + this.BisC, this.ColorBisectors);
      }
    }


    // ####### INCIRCLE #######
    

    TriIncirclePrint(DrawVertex)
    {
      const Context = this.TriOut.getContext("2d");
      const Angle = this.gamma * 0.5;

      const xc = this.x[0] + this.Scale * this.IA * Math.cos(Angle);
      const yc = this.y[0] - this.Scale * this.IA * Math.sin(Angle);

      if (DrawVertex) { ysxPlotterUtils.ysxDRAW_Vertex(Context, xc, yc, 3, this.ColorIncircle); }
      if (this.LRGB) { ysxDRAW_Circle(Context, this.inradius * this.Scale, xc, yc); }
      else { ysxDRAW_Circle(Context, this.inradius * this.Scale, xc, yc, this.ColorIncircle); }
    }


    // ####### MIDPOINTS #######
  

    TriMidpointPrint()
    {
        const Context = this.TriOut.getContext("2d");
        for (let i = 0; i < 3; ++i)
        {
          if (this.ColorSides === null)
          {
            let vc = [0, 0, 0]; ysxDraw.ysxColor.ysxCOLOR_LinearRGB(i / 3, 1, 1, vc);
            ysxPlotterUtils.ysxDRAW_Vertex(Context, this.Border + (this.Scale * this.Midpoint[i].x), this.Offy - (this.Scale * this.Midpoint[i].y), 3, vc);
          }
          else { ysxPlotterUtils.ysxDRAW_Vertex(Context, this.Border + (this.Scale * this.Midpoint[i].x), this.Offy - (this.Scale * this.Midpoint[i].y), 3, this.ColorSides); }
        }
    }


    // ####### TRIGONOMETRY #######


    TriTrigPrint()
    {
        const S0 = "# sin abc: " + Math.sin(this.alpha) + " | " + Math.sin(this.beta) + " | " + Math.sin(this.gamma);
        const S1 = "# cos abc: " + Math.cos(this.alpha) + " | " + Math.cos(this.beta) + " | " + Math.cos(this.gamma);
        const S2 = "# tan abc: " + Math.tan(this.alpha) + " | " + Math.tan(this.beta) + " | " + Math.tan(this.gamma);

        /* The C++ version created another image and joined it vertically. In Canvas we can simply extend the canvas.
        This is the same visual operation.*/
        const OldCanvas = this.TriOut;
        const NewCanvas = document.createElement("canvas");
        NewCanvas.width = this.CanvWidth;
        NewCanvas.height = this.CanvHeight + 32;
        this.CanvHeight = NewCanvas.height;

        const NewContext = NewCanvas.getContext("2d");
        NewContext.fillStyle = "rgb(255, 255, 255)";
        NewContext.fillRect(0, NewCanvas.height - 32, NewCanvas.width, NewCanvas.height);
        NewContext.drawImage(OldCanvas, 0, 0);
        ysxDraw.ysxCanv.ysxDRAW_AddText(NewContext, 4, this.CanvHeight - 32, S0, [0, 0, 0]);
        ysxDraw.ysxCanv.ysxDRAW_AddText(NewContext, 4, this.CanvHeight - 22, S1, [0, 0, 0]);
        ysxDraw.ysxCanv.ysxDRAW_AddText(NewContext, 4, this.CanvHeight - 12, S2, [0, 0, 0]);

        this.TriOut = NewCanvas;
    }


    // ####### FLAGS #######
    /* Flags:
        128 = Add vertex to incircle
         64 = Add text to bisectors
         32 = Add vertex to perimeter
         16 = Trigonometric functions
          8 = Midpoints
          4 = Incircle
          2 = Bisectors
          1 = Perimeter*/
    TriPrintByFlags(DrawText, ChangeSidesColor, Flags = 255)
    {
        if (Flags & 1) { this.TriPeriPrint(Flags & 32, DrawText, true, ChangeSidesColor); }
        if (Flags & 2) { this.TriBisectorPrint(Flags & 64); }
        if (Flags & 4) { this.TriIncirclePrint(Flags & 128); }
        if (Flags & 8) { this.TriMidpointPrint(); }
        if (Flags & 16) { this.TriTrigPrint(); }
        /*const Context = this.TriOut.getContext("2d");
        if (this.ColorSides === null)
        {
          ysxPlotterUtils.ysxDRAW_Vertex(Context, (this.Scale * this.Circumcenter.x) + this.Border, this.Offy - (this.Scale * this.Circumcenter.y), 3, [255, 255, 255]);
        }
        else { ysxPlotterUtils.ysxDRAW_Vertex(Context, (this.Scale * this.Circumcenter.x) + this.Border, this.Offy - (this.Scale * this.Circumcenter.y), 3, this.ColorSides); }*/
    }

    GetCanvas() { return this.TriOut; }
}


// #################################################