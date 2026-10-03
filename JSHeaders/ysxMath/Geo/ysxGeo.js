// #####################################################################################################################################

// ####### GLOSSARY:
// # GEO SPACE:
// 'A, Ar = Area';
// 'P, Pr, Peri = Perimeter';
// 'Surf = Surface Area';
// 'Vol = Volume';
// 'Eq & Eql = Equal OR Equilateral OR Something related';

// # FIGURES:
// 'Tri = Triangle';
// 'Rect = Rectangle';
// 'Sqr = Square';
// 'Circ = Circle';
// 'Cicumf & Circum = Circumference';
// 'Cylin = Cylinder';

// The pattern is "FIGURE + QUALITY", ex.: 'FIGURE = Triangle', 'QUALITY = Side', name result is 'TriSide'.

// #################################################

/* These functions were more useful in C++, because it is a less verbose way to deal with such stuff.
However, in JS you need to import such functions, consequently, it is more verbose.
And so, functions here are mostly a reference, since in other headers i may just re-write the functions.*/

// CONVERTERS:
export function Ang2Rad(a) { return((a / 360) * (Math.PI * 2)); }
export function Rad2Ang(r) { return((r / (Math.PI * 2)) * 360); }

// PI AND ANGLES:
export function PiRatio(Div) { return (PI / Div); }
export function AngRatio(Div) { return (360.0 / Div); }

// TRIG.:
export function csc(x) { return(1.0 / Math.sin(x)); }
export function sec(x) { return(1.0 / Math.cos(x)); }
export function cot(x) { return(1.0 / Math.tan(x)); }
export function versin(x) { return(1.0 - Math.cos(x)); }
export function exsec(x) { return((1.0 / Math.cos(x)) - 1.0); }
export function excsc(x) { return(exsec((PI * 0.5) - x)); }
export function crd(x) { return(2.0 * Math.sin(x * 0.5)); }
export function cos2(x) { return(Math.cos(x) * Math.cos(x)); }
export function sin2(x) { return(Math.sin(x) * Math.sin(x)); }
export function rect(x) { x /= (Math.PI * 2); x -= Math.floor(x); return(x < 0.5 ? 1 : -1); }
export function rectpw(x, PW) { x /= (Math.PI * 2); x -= Math.floor(x); if (PW < 0) { PW *= -1; } if (PW > 1) { PW -= Math.floor(PW); } return(x < PW ? 1 : -1); } // Rectangle wave with Pulse Width
export function saw(x) { x /= (Math.PI * 2); x -= Math.floor(x); x = (x * 2) - 1; return(x); }
export function phasor(x) { x /= (Math.PI * 2); x -= Math.floor(x); return(x); }
export function tri(x) { let f = Math.floor(((2 * x) / (Math.PI * 2)) + 0.5); x = (4 / (Math.PI * 2)) * (x - PI * f) * Math.pow(-1, f); return(x); }

// #################################################

/* !!! THIS IS JUST A REFERENCE TO THE ORIGINAL C++ FILE !!!
C++ 'include' works akin to copying and pasting all that is on the file at the same order.
This is not the same behavior from JS. For JS, you need to import what you need for each header.
The reference is a way to map how i'm going to work my geometry headers when translating, and also for people that want to understand the headers.*/

// TOOLS:
//#include "ysxAngle.h"
// 2D:
//#include "ysxTri.h" // Triangles
//#include "ysxCircle.h"
//#include "ysxCylinder.h"
//#include "ysxQuadri.h" // Quadrilateral
//#include "ysxPolygon.h"
// 3D:
//#include "ysxCuboid.h"
//#include "ysxSphere.h"
//#include "ysxCone.h"
//#include "ysxFrustrum.h"

// #################################################
