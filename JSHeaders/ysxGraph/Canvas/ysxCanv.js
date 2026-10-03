/*#####################
####### By Sophia Cristina
####### Personal header made do some useful stuffs with 'CImg.h'.
####### The namespace of this library is giant, so i'll keep it here.
####### This header was one of the first ones i made in my C++ journey. mostly of it migrated to other headers that are now included by this header
#####################*/


// ###################################


// ###################################
// ############## GENERALLY USEFUL:
	
// CHECK IF PIXEL IS INSIDE IMAGE (MAYBE SOON TO BE OBSOLETE):
//bool ysxCIMG_InImg(const CImg<uint8_t>& Img, size_t y, size_t x) { if (y < Img.height()) { if (x < Img.width()) { return (true); } return (false); } return (false); }

// ADD TEXT ON IMAGE:
export function ysxDRAW_AddText(Context, x, y, String, C, FontSize = 12, FontType = null)
{
    if (FontType === null) { FontType = "monospace"; }
    Context.font = FontSize + "px " + FontType;
    Context.textBaseline = "top";
    Context.fillStyle = "rgb(" + C[0] + "," + C[1] + "," + C[2] + ")";
    Context.fillText(String, x, y);
}

// SAME AS 'AddText', BUT PRINT IN CIRCLE DIVISION WITH A VECTOR OF STRINGS:
export function ysxDRAW_AddTextCirc(Canvas, r, x, y, Strings, C, FontSize = 12, FontType = null)
{
    const Div = (Math.PI * 2.0) / Strings.length;
    let Count = 0;
    for (let rad = 0; rad <= Math.PI * 2.0; rad += Div)
    {
        if (Count >= Strings.length) { break; }
        ysxDRAW_AddText(Canvas, x + Math.round(Math.cos(rad) * (r - 8)), y + Math.round(Math.sin(rad) * (r - 8)), Strings[Count], C, FontSize, FontType);
        ++Count;
    }
}

//void ysxCIMG_CleanImg(CImg<uint8_t>& Img, uint8_t* C = nullptr)
//{
//	Img = CImg<uint8_t>::CImg(Img.width(), Img.height(), 1, 3, 0);
//	if (C) { Img.draw_fill(1, 1, C, 1, 1, false); }
//}


// ###################################
// ############## TECHNICAL:


// ###################################

// ############## GRAPHICS:

// EZ CREATE NEW IMAGE WITH BACKGROUND COLOR:
//CImg<uint8_t> ysxCIMG_NewImgBGColor(int Width, int Height, uint8_t C[3])
//{
//	CImg<uint8_t> FilledImg(Width, Height, 1, 3, 0);
//	if (C) { FilledImg.draw_fill(1, 1, C, 1, 1, false); }
//	return(FilledImg);
//}

// ############## FILL:

// CLEAN BY DRAWING A RECTANGLE OVER THE IMAGE:
//void ImgCleanRect(CImg<uint8_t>& Img) { uint8_t c[] = { 0, 0, 0 }; Img.draw_rectangle(0, 0, Img.width() - 1, Img.height() - 1, c); }
//void ImgCleanRect(CImg<uint8_t>& Img, uint8_t C[3]) { Img.draw_rectangle(0, 0, Img.width() - 1, Img.height() - 1, C); }


// ###################################
// EXTRA:
//#include "ysxLibsUtils/CImg/ysxciColors.h"
import * as ysxCanvUtils from "/JSHeaders/ysxGraph/Canvas/ysxCanvUtils.js"; export { ysxCanvUtils };
import * as ysxPlotters from "/JSHeaders/ysxGraph/Canvas/Plotter/ysxPlotters.js"; export { ysxPlotters };
//#include "ysxLibsUtils/CImg/ysxciElecPlotters.h" // For class 'Component' of 'ysxElec.h'
//#include "ysxLibsUtils/CImg/ysxciMisc.h"
// ###################################

// ###################################

