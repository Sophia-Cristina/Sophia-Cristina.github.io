const rulerCanvas = document.getElementById("ruler_canvas");
const rulerContext = rulerCanvas.getContext("2d");

const graphCanvas = document.getElementById("graph_canvas");
const graphContext = graphCanvas.getContext("2d");

const circleCanvas = document.getElementById("circle_canvas");
const circleContext = circleCanvas.getContext("2d");


function getColor(prefix)
{
    const R = Number(document.getElementById(prefix + "_r").value);
    const G = Number(document.getElementById(prefix + "_g").value);
    const B = Number(document.getElementById(prefix + "_b").value);

    return `rgb(${R}, ${G}, ${B})`;
}


function drawLine(context, x1, y1, x2, y2, color)
{
    context.beginPath();
    context.moveTo(Math.round(x1), Math.round(y1));
    context.lineTo(Math.round(x2), Math.round(y2));
    context.strokeStyle = color;
    context.stroke();
}


function clearCanvas(context, canvas, color)
{
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}


/*
#################################################
LINEAR RULER
#################################################
*/

function drawRuler()
{
    const Scale = Number(document.getElementById("input_scale").value);
    const Size = Number(document.getElementById("input_size").value);
    const ThickUnit = Number(document.getElementById("input_thick").value);
    let SubDiv = Number(document.getElementById("input_subdiv").value);
    if (SubDiv < 1) { SubDiv = 1; }

    const Thick = ThickUnit * Scale;

    const Width = Math.ceil((Size + 0.33) * Scale);
    const Height = Math.max(1, Math.ceil(Thick));
    const m = 0.33 * 0.5 * Scale;
    const Divs = 1.0 / SubDiv;

    const Clr = getColor("color");
    const BGClr = getColor("bg");

    rulerCanvas.width = Width;
    rulerCanvas.height = Height;
    clearCanvas(rulerContext, rulerCanvas, BGClr);

    rulerContext.lineWidth = 1;

    for (let n = 0; n < Size * SubDiv + 1; ++n)
    {
        const Metric = Divs * n * Scale + m;
        let LineHeight;

        if (!(n % SubDiv)) { LineHeight = 0.425 * Thick; }
        else if ( !(n % Math.round(SubDiv * 0.5)) ) { LineHeight = 0.333 * Thick; }
        else { LineHeight = 0.2125 * Thick; }

        drawLine(rulerContext, Metric, 0, Metric, LineHeight, Clr);
    }
}


/*
#################################################
GRAPH PAPER
#################################################
*/

function drawGraphPaper()
{
    const Scale = Number(document.getElementById("input_scale").value);
    const cm = Number(document.getElementById("graph_cm").value);
    let SubDiv = Number(document.getElementById("input_subdiv").value);
    const WSquares = Number(document.getElementById("graph_width").value);
    const HSquares = Number(document.getElementById("graph_height").value);
    if (SubDiv < 1) { SubDiv = 1; }

    const W = Math.max(1, Math.floor(WSquares * cm * Scale));
    const H = Math.max(1, Math.floor(HSquares * cm * Scale));

    const Clr = getColor("color");
    const ClrSDiv = getColor("subcolor");
    const BGClr = getColor("bg");

    graphCanvas.width = W;
    graphCanvas.height = H;

    clearCanvas(graphContext, graphCanvas, BGClr);

    graphContext.lineWidth = 1;

    for (let y = 0; y < HSquares * SubDiv; ++y)
    {
        const my = y * cm * Scale / SubDiv;
        if (y % SubDiv) { drawLine(graphContext, 0, my, W, my, ClrSDiv); }
        else { drawLine(graphContext, 0, my, W, my, Clr); }
        
        for (let x = 0; x < WSquares * SubDiv; ++x)
        {
            const mx = x * cm * Scale / SubDiv;
            if (x % SubDiv) { drawLine(graphContext, mx, 0, mx, H, ClrSDiv); }
            else { drawLine(graphContext, mx, 0, mx, H, Clr); }
        }
    }
}


/*
#################################################
CIRCULAR RULER
#################################################
*/

function drawCircleRuler()
{
    const Scale = Number(document.getElementById("input_scale").value);
    const Size = Number(document.getElementById("input_size").value);
    const ThickUnit = Number(document.getElementById("input_thick").value);
    let SubDiv = Number(document.getElementById("input_subdiv").value);
    const Flags = Number(document.getElementById("circle_flag").value);
    if (SubDiv < 1) { SubDiv = 1; }

    const Thick = ThickUnit * Scale;

    let Radius;
    let Circ;
    let Area;

    if (Flags === 0)
    {
        Radius = Size;
        Circ = 2 * Math.PI * Size;
        Area = Math.PI * Size * Size;
    }
    else if (Flags === 1)
    {
        Circ = Size;
        Radius = Size / (2 * Math.PI);
        Area = Math.PI * Radius * Radius;
    }
    else
    {
        Area = Size;
        Radius = Math.sqrt(Size / Math.PI);
        Circ = 2 * Math.PI * Radius;
    }

    const OriginalRadius = Radius;

    Radius *= Scale;

    const ImgSize = Math.ceil(Radius * 2 + Thick * 2 + 2);
    circleCanvas.width = ImgSize;
    circleCanvas.height = ImgSize;

    const Clr = getColor("color");
    const BGClr = getColor("bg");
    clearCanvas(circleContext, circleCanvas, BGClr);

    const CenterX = ImgSize * 0.5;
    const CenterY = ImgSize * 0.5;

    /*
    ---------------------------------------------
    Draw the circumference
    ---------------------------------------------
    */

    circleContext.beginPath();

    circleContext.arc(CenterX, CenterY, Radius, 0, 2 * Math.PI);

    circleContext.strokeStyle = Clr;
    circleContext.stroke();

    /*
    ---------------------------------------------
    Metric marks
    ---------------------------------------------
    */

    const N = Math.floor(Circ * SubDiv);

    for (let n = 0; n < N; ++n)
    {
        const rad = n * 2 * Math.PI / N;

        const x = Math.round(CenterX + Math.cos(rad) * Radius);

        /*
        C++ uses -sin(rad) here because
        image coordinates have Y pointing downward.
        */

        const y = Math.round(CenterY - Math.sin(rad) * Radius);
        let R;

        if (!(n % SubDiv)) { R = Radius + Thick; }
        else if (!(n % Math.round(SubDiv * 0.5))) { R = Radius + Thick * 0.667; }
        else { R = Radius + Thick * 0.333; }

        const xm = Math.round(CenterX + Math.cos(rad) * R);
        const ym = Math.round(CenterY - Math.sin(rad) * R);

        drawLine(circleContext, x, y, xm, ym, Clr);
    }


    /*
    ---------------------------------------------
    Information
    ---------------------------------------------
    */

    const info = document.getElementById("circle_info");

    info.innerHTML = "Radius = " + OriginalRadius + " | Diameter = " + OriginalRadius * 2 + " | Circumference = " + Circ + " | Area = " + Area;
}


/*
#################################################
BUTTONS
#################################################
*/

document.getElementById("draw_ruler").addEventListener("click", drawRuler);
document.getElementById("draw_graph").addEventListener("click", drawGraphPaper);
document.getElementById("draw_circle").addEventListener("click", drawCircleRuler);

/*
#################################################
INITIAL DRAW
#################################################
*/

drawRuler();
drawGraphPaper();
drawCircleRuler();