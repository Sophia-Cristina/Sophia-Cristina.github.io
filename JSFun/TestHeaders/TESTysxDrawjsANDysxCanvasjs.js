import * as GeoPlot from "/JSHeaders/ysxGraph/Canvas/Plotter/ysxGeoPlot.js";


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasXInput = document.getElementById("canvas_x");
const canvasYInput = document.getElementById("canvas_y");
const canvasH2 = document.getElementById("canvas_h2");
function updateCanvas()
{
  canvasH2.textContent = `The size of the canvas below is: ${canvasXInput.value}x${canvasYInput.value}.`;
  canvas.width = canvasXInput.value;
  canvas.height = canvasYInput.value;

}
canvasXInput.addEventListener("input", updateCanvas);
canvasYInput.addEventListener("input", updateCanvas);


document.getElementById("ray_draw").addEventListener
(
  "click",
  function()
  {
    const x = Number(document.getElementById("ray_x").value);
    const y = Number(document.getElementById("ray_y").value);
    const r = Number(document.getElementById("ray_r").value);
    const rad = Number(document.getElementById("ray_rad").value);
    const Triangle = document.getElementById("ray_triangle").checked;
    GeoPlot.ysxDraw.ysxDRAW_LineRay(context, r, rad, x, y, Triangle);
  }
);

document.getElementById("bres_draw").addEventListener
(
  "click",
  function()
  {
    const x0 = Number(document.getElementById("bres_x0").value);
    const y0 = Number(document.getElementById("bres_y0").value);
    const x1 = Number(document.getElementById("bres_x1").value);
    const y1 = Number(document.getElementById("bres_y1").value);
    GeoPlot.ysxDraw.ysxDRAW_Line(context, x0, y0, x1, y1);
  }
);

// ####### ysxGeoPlot.js #######

document.getElementById("circle_draw").addEventListener
(
  "click",
  function()
  {
    const x = Number(document.getElementById("circle_x").value);
    const y = Number(document.getElementById("circle_y").value);
    const r = Number(document.getElementById("circle_r").value);
    GeoPlot.ysxDRAW_Circle(context, r, x, y)
  }
);

document.getElementById("circledge_draw").addEventListener
(
  "click",
  function()
  {
    const hue = Number(document.getElementById("circledge_hue").value);
    const bright = Number(document.getElementById("circledge_bright").value);
    const cont = Number(document.getElementById("circledge_cont").value);
    let CircleEdgeColor = [0, 0, 0];
    GeoPlot.ysxDraw.ysxColor.ysxCOLOR_LinearRGB(hue, bright, cont, CircleEdgeColor);
    GeoPlot.ysxDRAW_CircleEdge(context, CircleEdgeColor);
  }
);

document.getElementById("arc_draw").addEventListener
(
  "click",
  function()
  {
    const r = Number(document.getElementById("arc_r").value);
    const x = Number(document.getElementById("arc_x").value);
    const y = Number(document.getElementById("arc_y").value);
    const Ini = Number(document.getElementById("arc_ini").value);
    const Turn = Number(document.getElementById("arc_turns").value);
    GeoPlot.ysxDRAW_Arc(context, r, x, y, Ini, Turn);
  }
);

document.getElementById("hypocy_draw").addEventListener
(
  "click",
  function()
  {
    const R = Number(document.getElementById("hypocy_R").value);
    const r = Number(document.getElementById("hypocy_r").value);
    const d = Number(document.getElementById("hypocy_d").value);
    const x = Number(document.getElementById("hypocy_x").value);
    const y = Number(document.getElementById("hypocy_y").value);
    const t0 = Number(document.getElementById("hypocy_t0").value);
    const t1 = Number(document.getElementById("hypocy_t1").value);

    GeoPlot.ysxDRAW_HypoCycl(context, R, r, x, y, t0, t1, d);
  }
);

document.getElementById("epicy_draw").addEventListener
(
  "click",
  function()
  {
    const R = Number(document.getElementById("epicy_R").value);
    const r = Number(document.getElementById("epicy_r").value);
    const d = Number(document.getElementById("epicy_d").value);
    const x = Number(document.getElementById("epicy_x").value);
    const y = Number(document.getElementById("epicy_y").value);
    const t0 = Number(document.getElementById("epicy_t0").value);
    const t1 = Number(document.getElementById("epicy_t1").value);

    GeoPlot.ysxDRAW_EpiCycl(context, R, r, x, y, t0, t1, d)
  }
);

//document.getElementById("epicy_draw").addEventListener
//(
//  "click",
//  function()
//  {
      //const R = Number(document.getElementById("epitro_R").value);
      //const r = Number(document.getElementById("epitro_r").value);
      //const x = Number(document.getElementById("epitro_x").value);
      //const y = Number(document.getElementById("epitro_y").value);
      //const t0 = Number(document.getElementById("epitro_t0").value);
      //const t1 = Number(document.getElementById("epitro_t1").value);//
//    GeoPlot.ysxDRAW_EpiCycl(context, R, r, x, y, t0, t1);
//  }
//);

document.getElementById("polyg_draw").addEventListener
(
  "click",
  function()
  {
    const Sides = Number(document.getElementById("polyg_sides").value);
    const r = Number(document.getElementById("polyg_r").value);
    const x = Number(document.getElementById("polyg_x").value);
    const y = Number(document.getElementById("polyg_y").value);
    const Vertex = Number(document.getElementById("polyg_vert").checked);
    GeoPlot.ysxDRAW_Polygon(context, Sides, r, x, y, Vertex)
  }
);


// #################################################


document.getElementById("clear").addEventListener("click", function() { context.clearRect(0, 0, canvas.width, canvas.height); });


// #################################################