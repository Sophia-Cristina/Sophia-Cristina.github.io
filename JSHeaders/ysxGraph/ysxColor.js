//#pragma once

//#ifndef YSXCOLOR_H
//#define YSXCOLOR_H

// #####################
// ####### By Sophia Cristina
// ####### Headers for things related to colors in general.
// #####################

//#include "../ysxMath/ysxMath.h"


// #################################################

// ###################################
// ############## TOOLS:
export class Pixel
{
    constructor(x, y, RGB)
    {
        this.x = x;
        this.y = y;
        this.RGB = new Uint8Array(RGB);
    }
}
// ###################################


// #################################################
// ############## TECHNICAL ##############

// MAX / MIN OF PIXEL X AND Y:
export function ysxCOLOR_MaxxMinxPixel(VP)
{
	MM;
	let Maxx = VP[0].x, Minx = VP[0].x;
	for (let n = 1; n < VP.length; ++n)
	{
		if (VP[n].x > Maxx) { Maxx = VP[n].x; }
		if (VP[n].x < Minx) { Minx = VP[n].x; }
	}
	let Absmx = 0, Absmn = 0;
	if (Maxx < 0) { Absmx = abs(Maxx); Maxx += Absmx; Minx += Absmx; }
	if (Minx < 0) { Absmn = abs(Minx); Maxx += Absmn; Minx += Absmn; }

	MM.x = Maxx; MM.y = Minx;
	return(MM);
}
export function ysxCOLOR_MaxyMinyPixel(VP)
{
	let MM;
	let Maxy = VP[0].x, Miny = VP[0].x;
	for (let n = 1; n < VP.length; ++n)
	{
		if (VP[n].y > Maxy) { Maxy = VP[n].y; }
		if (VP[n].y < Miny) { Miny = VP[n].y; }
	}
	let Absmx = 0, Absmn = 0;
	if (Maxy < 0) { Absmx = abs(Maxy); Maxy += Absmx; Miny += Absmx; }
	if (Miny < 0) { Absmn = abs(Miny); Maxy += Absmn; Miny += Absmn; }

	MM.x = Maxy; MM.y = Miny;
	return(MM);
}
export function ysxCOLOR_MaxMinPixel(VP, MaxxMinx, MaxyMiny)
{
	let Maxx = VP[0].x, Minx = VP[0].x;
	let Maxy = VP[0].y, Miny = VP[0].y;
	for (let n = 1; n < VP.length; ++n)
	{
		if (VP[n].x > Maxx) { Maxx = VP[n].x; }
		if (VP[n].x < Minx) { Minx = VP[n].x; }
		if (VP[n].y > Maxy) { Maxy = VP[n].y; }
		if (VP[n].y < Miny) { Miny = VP[n].y; }
	}
	let Absmx = 0, Absmn = 0;
	if (Maxx < 0) { Absmx = abs(Maxx); Maxx += Absmx; Minx += Absmx; }
	if (Minx < 0) { Absmn = abs(Minx); Maxx += Absmn; Minx += Absmn; }

	if (Maxy < 0) { Absmx = abs(Maxy); Maxy += Absmx; Miny += Absmx; }
	if (Miny < 0) { Absmn = abs(Miny); Maxy += Absmn; Miny += Absmn; }

	MaxxMinx.x = Maxx; MaxxMinx.y = Minx;
	MaxyMiny.x = Maxx; MaxyMiny.y = Miny;
}

// #################################################
// ############## COLOR / PALLETES ##############

// CHANGE CONSTRAST FROM COLOR INSIDE A RGB POINTER:
export function ysxCOLOR_ChangeContrast(Cont, Color)
{
	if (Cont > 1.0) { Cont -= Math.floor(Cont); } if (Cont < 0.0) { Cont *= -1; }
	if (Cont != 1)
	{
		if (Color[0] > 127) { Color[0] = Color[0] - ((Color[0] - 127) * (1 - Cont)); }
		if (Color[0] < 127) { Color[0] = Color[0] + ((127 - Color[0]) * (1 - Cont)); }
		if (Color[1] > 127) { Color[1] = Color[1] - ((Color[1] - 127) * (1 - Cont)); }
		if (Color[1] < 127) { Color[1] = Color[1] + ((127 - Color[1]) * (1 - Cont)); }
		if (Color[2] > 127) { Color[2] = Color[2] - ((Color[2] - 127) * (1 - Cont)); }
		if (Color[2] < 127) { Color[2] = Color[2] + ((127 - Color[2]) * (1 - Cont)); }
	}
}

// CHANGE BRIGHTNESS FROM COLOR INSIDE A RGB POINTER:
export function ysxCOLOR_ChangeBrightness(Bright, Color)
{
	if (Bright > 2.0) { Bright -= Math.floor(Bright); } if (Bright < 0.0) { Bright *= -1; }
	let R = Color[0], G = Color[1], B = Color[2];
	let L = 0;

	if (Bright <= 1.0) { R = Math.round(R * Bright); G = Math.round(G * Bright); B = Math.round(B * Bright); }
	else { L = 255 * (Bright - 1); R = R + L; G = G + L; B = B + L; }
	if (R > 255) { R = 255; } if (G > 255) { G = 255; } if (B > 255) { B = 255; }
	Color[0] = R; Color[1] = G; Color[2] = B;
}

// RETURN A RGB COLOR BY LINEAR HUE AND OVERWRITE POINTED 'uint8_t[3]':
export function ysxCOLOR_LinearRGB(x, Bright, Contrast, Color)
{
	if (x < 0.0) { x *= -1; } if (x > 1.0) { x -= Math.floor(x); }
	if (Bright > 2.0) { Bright = 2.0; } if (Bright < 0.0) { Bright = 0.0; }
	if (Contrast > 1.0) { Contrast = 1.0; } if (Contrast < 0.0) { Contrast = 0.0; }
	let m = 0;

	if (x >= 5.0 / 6) { m = (x - (5.0 / 6)) * 6; Color[0] = 255; Color[1] = 0; Color[2] = Math.round(255 - (255 * m)); }
	else if (x >= 4.0 / 6) { m = (x - (4.0 / 6)) * 6; Color[0] = Math.round(255 * m); Color[1] = 0; Color[2] = 255; }
	else if (x >= 3.0 / 6) { m = (x - (3.0 / 6)) * 6; Color[0] = 0; Color[1] = Math.round(255 - (255 * m)); Color[2] = 255; }
	else if (x >= 2.0 / 6) { m = (x - (2.0 / 6)) * 6; Color[0] = 0; Color[1] = 255; Color[2] = Math.round(255 * m); }
	else if (x >= 1.0 / 6) { m = (x - (1.0 / 6)) * 6; Color[0] = Math.round(255 - (255 * m)); Color[1] = 255; Color[2] = 0; }
	else { m = x * 6; Color[0] = 255; Color[1] = Math.round(255 * m); Color[2] = 0; }

	ysxCOLOR_ChangeContrast(Contrast, Color);
	ysxCOLOR_ChangeBrightness(Bright, Color);
}


// INSIDE A GAP OF RGB NUMBERS:
export function ysxCOLOR_InsideRGBGap(RGB, RGB0, RGB1)
{ if (RGB[0] >= RGB0[0] && RGB[0] <= RGB1[0] && RGB[1] >= RGB0[1] && RGB[1] <= RGB1[1] && RGB[2] >= RGB0[2] && RGB[2] <= RGB1[2]) { return(true); } else { return(false); } }
export function ysxCOLOR_InsideRGBGapOR(RGB, RGB0, RGB1)
{ if (RGB[0] >= RGB0[0] || RGB[0] <= RGB1[0] || RGB[1] >= RGB0[1] || RGB[1] <= RGB1[1] || RGB[2] >= RGB0[2] || RGB[2] <= RGB1[2]) { return(true); } else { return(false); } }


// #################################################