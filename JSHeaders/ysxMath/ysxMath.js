// #################################################
// ############## TOOLS ##############

// ####### STRUCTS:
export class Point { constructor(x, y) { this.x = x; this.y = y; } }
export class Point3D { constructor(x, y, z) { this.x = x; this.y = y; this.z = z; } }
export class LinePoint { constructor(x0, y0, x1, y1) { this.x0 = x0; this.y0 = y0; this.x1 = x1; this.y1 = y1; } }
export class LinePoint3D { constructor(x0, y0, z0, x1, y1, z1) { this.x0 = x0; this.y0 = y0; this.z0 = z0; this.x1 = x1; this.y1 = y1; this.z1 = z1; } }

// #################################################

// IS INTEGER?:
export function IsInt(x) { if (1.0 == x / Math.round(x)) { return (true); } else { return (false); } }

// GET DECIMALS / MANTISSA (x - floor(x)):
export function GetDecimal(x) { return(x - Math.floor(x)); }

// #################################################

//#include "ysxConst.h"
//#include "ysxTable.h" // Const tables
//#include "ysxConv.h" // Conversors
//#include "ysxComplex.h" // Complex number stuffs
//#include "ysxVector.h" // std::vector
//#include "ysxNumbers.h" // Things related to number and its study
//#include "ysxTime.h" // Time things, but NOT system clock
//#include "ysxArith.h" // Arithmetic
//#include "ysxEucVector.h" // Euclidean Vector
//#include "ysxPolyNom.h" // Polynomials
import * as ysxGeo from "/JSHeaders/ysxMath/Geo/ysxGeo.js";
//#include "Geo/ysxGeo.h" // Geometry
//#include "ysxCalc.h" // Calculus
//#include "Physics/ysxPhys.h" // Physics
//#include "ysxField.h" // Field arithmetics
//#include "ysxMusic.h" // Things about music, like, freq. to midi, BPM, tone, melodies and etc...
//#include "ysxMoney.h" // Things about money and related to economy and etc... This may not even be used after my trading directory
//#include "ysxFractal.h"

// #################################################