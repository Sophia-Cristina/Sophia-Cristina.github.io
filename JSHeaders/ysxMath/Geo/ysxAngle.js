// #####################
// ####### By Sophia Cristina
// ####### Angle maths
// #####################

// #################################################
// REFERENCES:
// #################################################

/* ROTATIONS:
Ang = Angle; // radians are used by standard;
Deg = Degree = 0 to 360;
Rad = Radians = 0 to 2 * PI;
Turn = 0 to 1;*/

// #################################################

// #####################
// ####### ANGLE STUFF:

export function ysxGEO_RadAct(Rad) { return((Math.Math.PI * 0.5) - Rad); } // Acute
export function ysxGEO_RadObt(Rad) { return(Math.PI - Rad); } // Obtuse
export function ysxGEO_RadWhl(Rad) { return((Math.PI * 2) - Rad); } // Whole
export function ysxGEO_SumInternAngPolygn(Sides) { return(Math.PI * (Sides - 2)); } // Sum of the internal angles of a Polygon
export function ysxGEO_PolygnAng(Sides) { return(Sides == 0 ? 0 : (Math.PI * (Sides - 2)) / Sides); } // Internal angles of a Polygon
export function ysxGEO_PolygrmAng(Sides) { return(Sides == 0 ? 0 : (((Math.PI * 2) * (Sides - 2)) / Sides) - Math.PI); } // Math.PI - ((Math.PI * 2) - (((Math.PI * (Sides - 2)) / Sides) * 2)) Before Wolfam Alpha

// Paralel over Transversal:
export function ysxGEO_ParaTrans(Rad) { if (Rad > (Math.PI * 2)) { Rad = (Math.PI * 2); } if (Rad > Math.PI) { Rad = (Math.PI * 2) - Rad; } let R = { x: Rad, y: Math.PI - Rad, z: Math.PI + Rad }; return(R); }

// #################################################

// #####################
// ####### TRIG. LAWS:

// LAW OF COSINE:
export function ysxGEO_LawCos(a, b, Rad) { return(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(Rad))); } // Return side size using one angle and two values
export function ysxGEO_LawCosRad(a, b, c) { if (a == 0 || b == 0) { return(0); } return(Math.acos((a * a + b * b - c * c) / (2 * a * b))); } // Return angle. Return '0' if 'a == 0 || b == 0':

// LAW OF SINE:
export function ysxGEO_LawSinH(Height, Rad) { if (Math.sin(Rad) != 0) { return(Height / Math.sin(Rad)); } else { return(0); } } // Height / sin() = Length
export function ysxGEO_LawSinW(Width, Rad) { if (Math.cos(Rad) != 0) { return(Width / Math.cos(Rad)); } else { return(0); } } // Width / cos() = Length
// Input and Return in Radians, find an angle by Law of Sine:
export function ysxGEO_LawSinRad(a, b, Rad) { let c = ysxGEO_LawCos(a, b, Rad); return(c == 0 ? 0 : Math.asin((Math.sin(Rad) * b) / c)); }
export function ysxGEO_LawSinRadbc(b, c, Rad) { return(c == 0 ? 0 : Math.asin((Math.sin(Rad) * b) / c)); }
export function ysxGEO_LawSinRadSOH(b, c) { return(Math.asin(b / c)); } // Law of Sine, but SOHCAHTOA instead of sine function, returns 'Beta' angle

// LAW OF TANGENT:
// Care with div by 0! The law of tangents states that: (a - b)/(a + b) = tan(0.5 * (Alpha - Beta)) / tan(0.5 * (Alpha + Beta)):
export function ysxGEO_LawTan(a, b) { return((a - b) / (a + b)); }
export function ysxGEO_LawTanRad(Alpha, Beta) { return(Math.tan(0.5 * (Alpha - Beta)) / Math.tan(0.5 * (Alpha + Beta))); }
// Wolfram A. gave me this 'b' solution: a * csc(Alpha) * Math.sin(Beta);
export function ysxGEO_LawTanb(a, Alpha, Beta) { return(a * (1 / Math.sin(Alpha)) * Math.sin(Beta)); }
//export function LawTana(b, Alpha, Beta) { return(a * csc(Alpha) * Math.sin(Beta)); } // N�o sei solucionar

// LAW OF COTANGENT (CARE WITH DIV BY 0):
export function ysxGEO_LawCota(a, b, c, Alpha) { return((1 / Math.tan(Alpha)) / (((a + b + c) * 0.5) - a)); }
export function ysxGEO_LawCotb(a, b, c, Beta) { return((1 / Math.tan(Beta)) / (((a + b + c) * 0.5) - b)); }
export function ysxGEO_LawCotc(a, b, c, Gama) { return((1 / Math.tan(Gama)) / (((a + b + c) * 0.5) - c)); }
export function ysxGEO_Mollweidepos(a, b, c) { return((a + b) / c); } // Based on Law of Cotangent = Math.cos((Alpha - Beta) * 0.5) / Math.sin(Gama * 0.5)
export function ysxGEO_Mollweideneg(a, b, c) { return((a - b) / c); } // Based on Law of Cotangent = Math.sin((Alpha - Beta) * 0.5) / Math.cos(Gama * 0.5)
 // Based on Law of Cotangent = (a + b) / c
export function ysxGEO_MollweideposRad(Alpha, Beta, Gama) { let S = Math.sin(Gama * 0.5);  return(S == 0 ? 0 : Math.cos((Alpha - Beta) * 0.5) / S); }
// Based on Law of Cotangent = (a - b) / c
export function ysxGEO_MollweidenegRad(Alpha, Beta, Gama) { let C = Math.cos(Gama * 0.5);  return(C == 0 ? 0 : Math.sin((Alpha - Beta) * 0.5) / C); }

// #################################################
