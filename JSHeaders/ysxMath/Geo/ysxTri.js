// #####################
// ####### By Sophia Cristina
// ####### Triangle maths.
// #####################

/* #################################################
ATTENTION: Side 'a' of a triangle is always the bottom horizontal line (and seem as straight), and 'b' always the line at the left (and above) of 'a'.

ANNOTATIONS:

@ = Angle; # = Area; | = Height;
    Alpha
     @            | 'class' 'Triangle' works with '{ a, b, Gamma }'; And I believe all triangle functions I made works like this.
     |##    H     | As you can see, 'Gamma' is going to be the most used angle, ex.: ysxGEO_LawCos(a, b, Gamma);
  b  |#### hypot  | An useful function on 'ysxAngle.h' is 'LawSinRadSOH' to get an angle by SOHCAHTOA: '{ b, c }' returns 'asin(((b / c) * b) / c))'.
O    |######      | SOH: b / c = sin(Beta) | CAH: a / c = cos(Beta) | TOA = b / a = tan(Beta)
     @#######@    | SOH = b / c = 0.469472 = sin(Beta) | Beta = 28� = 0.48869219 rad = (7 * PI) / 45;
Gamma    A     Beta
	   Adjacent


          @ Alpha | We can see that the variables order mantain independent of the triangle type.
         #|#
      b ##|## c
       ###|###
Gamma @###|###@ Beta
          a


#################################################

CHANGES:
 * Triangle class now uses only 'rad';

 #################################################
 REFERENCES:
 #################################################*/

import { ysxGEO_LawSinRad } from "/JSHeaders/ysxMath/Geo/ysxAngle.js";

// #################################################
// #################################################
// #################################################

// ANGLES:
// Angle by sides, division by '0' returns '0' | Alpha = bc, Beta = ac, Gama = ab
export function ysxTRI_Ang(a, b, c) { let d = 2 * b * c; if (d == 0) { return(0); } return(Math.acos(((b ** 2) + (c ** 2) - (a ** 2)) / d)); }

// SIZES:
export function ysxTRI_Ret2TriRetIso(a, b) { return(Math.sqrt((a * a + b * b)) / Math.sqrt(2)); } // Make an 'a & b' Triangle to an 'a & a' Triangle // Soon to change the function name
export function ysxTRI_Side(hip, Length) { return(Math.sqrt(hip * hip - Length * Length)); } // Height or Width

// https://en.wikipedia.org/wiki/Triangle#Medians,_angle_bisectors,_perpendicular_side_bisectors,_and_altitudes:
// The altitude from, for example, the side of length a
// Altitude of a right triangle is 'h^2 = pq; h = sqrt(pq)", 'h' is altitude and 'p + q' is the 'hipotenuse' divided by the Altitude line.
export function ysxTRI_Alt(Area, a) { return(a == 0 ? 0 : (2.0 * Area) / a); }

// PERIMETERS AND AREAS:
export function ysxTRI_Perim(a, b, c) { return(a + b + c); } // Perimeter
export function ysxTRI_Area(a, b, Rad) { return(0.5 * a * b * Math.sin(Rad)); } // Area
export function ysxTRI_AreaAAS(b, Alpha, Beta) { let S = Math.sin(Beta); return(S == 0 ? 0 : ((b ** 2) * Math.sin(Alpha) * Math.sin(Alpha + Beta)) / 2 * S); } // Area
export function ysxTRI_AreaASA(a, Beta, Gama) { let S = Math.sin(Beta + Gama); return(S == 0 ? 0 : ((a ** 2) * Math.sin(Beta) * Math.sin(Gama)) / 2 * S); } // Area
export function ysxTRI_AreaHeron(a, b, c) { let s = (a + b + c) * 0.5; return(Math.sqrt(s * (s - a) * (s - b) * (s - c))); } // Area

// MEDIANS:
// https://en.wikipedia.org/wiki/Triangle#Medians,_angle_bisectors,_perpendicular_side_bisectors,_and_altitudes:
export function ysxTRI_MedianSideRelation(a, b, c) { return(0.75 * (a * a + b * b + c * c)); }
export function ysxTRI_Median(a, b, c) { return(0.5 * Math.sqrt((2 * (b ** 2)) + (2 * (c ** 2)) - (a ** 2))); }
// Formula to 'Median a'. For 'Median b', use this input order "b, c, a" and "c, a, b" for 'Median c'
export function ysxTRI_SideMedian(a, b, c) { return(Math.sqrt((2 * (b * b) + 2 * (c * c) - (a * a)) / 4.0)); }

/* BISECTORS:
Use 'Rad BC'and 'Lgth a' for 'AC' bis.,
use 'Rad AC'and 'Lgth b' for 'BC' bis..*/
export function ysxTRI_BisAC(Lgth, Rad) { let S = Math.sin(Math.PI - Math.PI - Rad + (Math.PI - Math.PI * 0.5 + Rad) * 0.5);  return(S == 0 ? 0 : Lgth / S); }
// Bisector (acute):
// For 'c' shorter than 'b', else, make 'c' the new 'b'.
export function ysxTRI_BisAct(a, b, Rad)
{
	let Beta = ysxGEO_LawSinRad(a, b, Rad); if (a < Math.cos(Rad) * b) { Beta = Math.PI - Beta; }
	let R = 0.5 * (Beta - Rad);
	let Alt; if (Rad <= Math.PI * 0.5) { Alt = b * Math.sin(Rad); } else { Alt = b * Math.sin(Math.PI - Rad); }
	return(Alt / Math.cos(R));
}

// https://en.wikipedia.org/wiki/Bisection:
// If the side lengths of a triangle are 'a,b,c', the semiperimeter 's = (a + b + c) / 2', and A is the angle opposite side 'a',
// then the length of the internal bisector of angle A is: "(2 * sqrt(b * c * s * (s - a))) / (b + c)":
//ysxTRI_LghtBis(a, b, c) { let s = (a + b + c) * 0.5; return((2 * sqrt(b * c * s * (s - a))) / (b + c)); } // Lenght of a bisector
//export function ysxTRI_PerpBisa(a, b, c, Area) { return((2.0 * a * Area) / pow(a, 2) + pow(b, 2) - pow(c, 2)); } // Interior perpendicular bisectors
//export function ysxTRI_PerpBisb(a, b, c, Area) { return((2.0 * b * Area) / pow(a, 2) + pow(b, 2) - pow(c, 2)); } // Interior perpendicular bisectors
//export function ysxTRI_PerpBisc(a, b, c, Area) { return((2.0 * c * Area) / pow(a, 2) - pow(b, 2) + pow(c, 2)); } // Interior perpendicular bisectors

// CIRCUMCENTER, INRADIUS, INCENTER AND ETC, CARE WITH DIV BY 0:
export function ysxTRI_CircumR(a, b, c) { return(Math.sqrt(((a ** 2) * (b ** 2) * (c ** 2)) / ((a + b + c) * (- a + b + c) * (a - b + c) * (a + b - c)))); } // Circumradius
export function ysxTRI_Inrad(a, b, c) { let s = (a + b + c) * 0.5; return(Math.sqrt(((s - a) * (s - b) * (s - c)) / s)); } // Inradius
// export function ysxTRI_Inrad(a, b, c) { let s = (a + b + c) * 0.5; return(sqrt(s * (s - a) * (s - b) * (s - c)) / s); } // Inradius
export function ysxTRI_Incenter(a, b, Rad) // Lenght from 'I' to 'B'
{
	let B = ysxGEO_LawSinRad(a, b, Rad); if (a < Math.cos(Rad) * b) { B = Math.PI - B; }
	return(ysxTRI_BisAct(ysxTRI_BisAct(a, b, Rad), ysxGEO_LawCos(a, b, Rad), Math.PI - (Rad + B) * 0.5));
}

// ADJACENT TRIANGLE, CARE WITH DIV BY 0:
// Suppose two adjacent but non - overlapping triangles share the same side of length f and share the same circumcircle,
// so that the side of length f is a chord of the circumcircle and the triangles have side lengths(a, b, f) and (c, d, f),
// with the two triangles together forming a cyclic quadrilateral with side lengths in sequence(a, b, c, d). Then:
//export function ysxTRI_Adjcnt(a, b, c, d) { return(sqrt((((a * c) + (b * d)) * ((a * d) + (b * c))) / ((a * b) + (c * d)))); }

// #################################################
// #################################################
// #################################################

// #####################
// ####### TRIANGLE #######
// #####################

export class ysxTRI_Triangle
{
	a = 0.0; b = 0.0; c = 0.0;
  Alpha = 0.0; Beta = 0.0; Gamma = 0.0;

	// Largest side: 'a', 'b', 'c', or 'n' if there is no unique largest side.
	BiggerSide = 'n';

	// Height relative to side 'a'.
	// 'a = Base0 + Base1', at the point the height line splits it.
	Height = 0.0;
	Base0 = 0.0; Base1 = 0.0;

	// Area and perimeter.
	Area = 0.0;
	Perimeter = 0.0;

	// Median lengths.
	Mediana = 0.0;
	Medianb = 0.0;
	Medianc = 0.0;

	// Side ratios relative to the largest side.
	Ratios = [ 0, 0, 0 ];

  // Coordinates:
	Coord = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
  Mid = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]; // Midpoints
  Circumcenter = { x: 0, y: 0 };
    
  //enum TriTypeLength { NoTypeLgt, Equilateral, Isoceles, Scalene };
	//enum TriTypeAngle { NoTypeAng, Right, Acute, Obtuse };
	TypeLength = 0;
	TypeAngle = 0;
	
		// DERIVED GEOMETRY:
	// Angle bisectors from vertices A, B and C.
	BisA = 0.0; BisB = 0.0; BisC = 0.0;

	// Distances from the incenter to vertices A, B and C.
	IA = 0.0; IB = 0.0; IC = 0.0;

	// Incenter and incircle.
	Incircle = 0.0; Inradius = 0.0;

	// Perpendicular bisectors.
	PerpBisAC = 0.0; PerpBisBC = 0.0;

	// Circumcircle.
	Circumcircle = 0.0; Circumradius = 0.0;

  // #################################################

  // Utility:
	Epsilon = 1e-10;
	NearlyEqual(x, y) { return(Math.abs(x - y) <= this.Epsilon); }
	ClampCosine(Value) { if (Value < -1.0) { return(-1.0); } if (Value > 1.0) { return(1.0); } return(Value); }
	
	// Law of Cosines: c² = a² + b² - 2ab cos(γ)
  SetSides() { this.c = Math.sqrt(this.a * this.a + this.b * this.b - 2.0 * this.a * this.b * Math.cos(this.Gamma)); }

	// Side classification:
	SetBiggerSide()
	{
		if (this.NearlyEqual(this.a, this.b) && this.NearlyEqual(this.b, this.c)) { this.BiggerSide = 'n'; return; }

		if (this.a > this.b && this.a > this.c) { this.BiggerSide = 'a'; }
		else if (this.b > this.a && this.b > this.c) { this.BiggerSide = 'b'; }
		else if (this.c > this.a && this.c > this.b) { this.BiggerSide = 'c'; }
		else { this.BiggerSide = 'n'; } // There is no unique bigger side.
	}

	SetRatios()
	{
		this.SetBiggerSide();
		if (this.BiggerSide == 'a') { this.Ratios[0] = 1; this.Ratios[1] = this.b / this.a; this.Ratios[2] = this.c / this.a; }
		else if (this.BiggerSide == 'b') { this.Ratios[0] = this.a / this.b; this.Ratios[1] = 1; this.Ratios[2] = this.c / this.b; }
		else if (this.BiggerSide == 'c') { this.Ratios[0] = this.a / this.c; this.Ratios[1] = this.b / this.c; this.Ratios[2] = 1; }
		else { this.Ratios[0] = 1.0; this.Ratios[1] = 1.0; this.Ratios[2] = 1; }

		if (this.NearlyEqual(this.a, this.b) && this.NearlyEqual(this.b, this.c)) { this.TypeLength = 1; }
		else if ( this.NearlyEqual(this.a, this.b) || this.NearlyEqual(this.a, this.c) || this.NearlyEqual(this.b, this.c)) { this.TypeLength = 2; }
		else { this.TypeLength = 3; }
	}

	// Angles:
	SetAngles()
	{
		const CosAlpha = (this.b * this.b + this.c * this.c - this.a * this.a) / (2 * this.b * this.c);
		const CosBeta = (this.a * this.a + this.c * this.c - this.b * this.b) / (2 * this.a * this.c);
		const CosGamma = (this.a * this.a + this.b * this.b - this.c * this.c) / (2 * this.a * this.b);
		this.Alpha = Math.acos(CosAlpha); this.Beta = Math.acos(CosBeta); this.Gamma = Math.acos(CosGamma);
		
		if (this.NearlyEqual(this.Alpha, Math.PI * 0.5) || this.NearlyEqual(this.Beta, Math.PI * 0.5) || this.NearlyEqual(this.Gamma, Math.PI * 0.5)) { this.TypeAngle = 1; }
		else if (this.Alpha < Math.PI * 0.5 && this.Beta < Math.PI * 0.5 && this.Gamma < Math.PI * 0.5) { this.TypeAngle = 2; }
		else { this.TypeAngle = 3; }
	}

	// Angle bisectors:
	SetBisectors()
	{
		let Numerator = this.b * this.c * ((this.b + this.c) * (this.b + this.c) - this.a * this.a);
		this.BisA = Math.sqrt(Math.max(0.0, Numerator)) / (this.b + this.c);
		Numerator = this.a * this.c * ((this.a + this.c) * (this.a + this.c) - this.b * this.b);
    this.BisB = Math.sqrt(Math.max(0.0, Numerator)) / (this.a + this.c);
    Numerator = this.a * this.b * ((this.a + this.b) * (this.a + this.b) - this.c * this.c);
    this.BisC = Math.sqrt(Math.max(0.0, Numerator)) / (this.a + this.b);
	}

	// Incenter:
	SetIncenter()
  {
    this.Inradius = ysxTRI_Inrad(this.a, this.b, this.c);
    this.IA = this.Inradius / Math.sin(this.Gamma * 0.5);
    this.IB = this.Inradius / Math.sin(this.Alpha * 0.5);
    this.IC = this.Inradius / Math.sin(this.Beta * 0.5);
  }

	SetInradius() { this.Inradius = ysxTRI_Inrad(this.a, this.b, this.c); }

	// Medians:
	SetMedians() { this.Mediana = ysxTRI_SideMedian(this.a, this.b, this.c); this.Medianb = ysxTRI_SideMedian(this.b, this.a, this.c); this.Medianc = ysxTRI_SideMedian(this.c, this.a, this.b); }

	// Height and coordinate-system dimensions:
	SetHeightAndBase()
	{
		this.Height = this.b * Math.sin(this.Gamma);
		const Projection = this.b * Math.cos(this.Gamma);
		if (Projection >= 0.0) { this.Base0 = Math.min(this.c, Projection); this.Base1 = Math.abs(this.c - Projection); }
		else { this.Base0 = Math.abs(Projection); this.Base1 = this.c; }
	}

	// Coordinates:
	SetCoords()
	{
		const Cx = this.b * Math.cos(this.Gamma);
		const Cy = this.b * Math.sin(this.Gamma);

		this.Coord[0].x = 0; this.Coord[0].y = 0;
		this.Coord[1].x = Cx; this.Coord[1].y = Cy;
		this.Coord[2].x = this.a; this.Coord[2].y = 0;
	}

	// Midpoints:
	SetMidpoints()
	{
		this.SetCoords();
		for (let i = 0; i < 3; ++i)
		{
			const Next = (i + 1) % 3;
			this.Mid[i].x = (this.Coord[i].x + this.Coord[Next].x) * 0.5;
			this.Mid[i].y = (this.Coord[i].y + this.Coord[Next].y) * 0.5;
		}
	}

	// Area / perimeter:
	SetArea() { this.Area = 0.5 * this.a * this.Height; }
	SetPerimeter() { this.Perimeter = this.a + this.b + this.c; }

	// Circumcenter:
	SetCircumcenter()
	{
		const Cx = this.b * Math.cos(this.Gamma);
		const Cy = this.b * Math.sin(this.Gamma);
		const Ox = this.c * 0.5;
		let Oy = 0.0;

		if (Math.abs(Cy) > this.Epsilon) { Oy = (Cx * Cx + Cy * Cy - this.c * Cx) / (2 * Cy); }
		this.Circumcenter.x = Ox;
		this.Circumcenter.y = Oy;
		this.Circumradius = Math.sqrt(Ox * Ox + Oy * Oy);
		this.Circumcircle = Math.PI * 2 * this.Circumradius;
	}

	// Validation:
	IsValidTriangle()
	{
		if (this.a <= 0.0 || this.b <= 0.0 || this.c <= 0.0) { return(false); }
		return(this.a + this.b > this.c && this.a + this.c > this.b && this.b + this.c > this.a);
	}
	
	// #################################################

    // Return a string with triangle mathematical information. It is 'cout', because this is a translation from C++.
    CoutInfo()
    {
        let StringTypeLength = "Unknown";
        if (this.TypeLength == 1) { StringTypeLength = "Equilateral"; }
        else if (this.TypeLength == 2) { StringTypeLength = "Isoceles"; }
        else if (this.TypeLength == 3) { StringTypeLength = "Scalene"; }

        let StringTypeAngle = "Unknown";
        if (this.TypeAngle == 1) { StringTypeAngle = "Right"; }
        else if (this.TypeAngle == 2) { StringTypeAngle = "Acute"; }
        else if (this.TypeAngle == 3) { StringTypeAngle = "Obtuse"; }

        let cout = "";
        cout += "\n############## TRIANGLE ##############<br><br>";
        cout += "Triangle = " + StringTypeLength + " & " + StringTypeAngle + " | Bigger: " + this.BiggerSide + "<br>";
        cout += "*** a: " + this.a + " | Alpha: " + this.Alpha + " | BisA: " + this.BisA + " ***<br>";
        cout += "*** b: " + this.b + " | Beta: " + this.Beta + " | BisB: " + this.BisB + " ***<br>";
        cout += "*** c: " + this.c + " | Gamma: " + this.Gamma + " | BisC: " + this.BisC + " ***<br><br>";
        cout += "# Height: " + this.Height + " #<br>";
        cout += "# Area: " + this.Area + " | Perimeter: " + this.Perimeter + " #<br><br>";
        cout += "Incenter distances: " + "IA: " + this.IA + " | IB: " + this.IB + " | IC: " + this.IC + " | Inradius: " + this.Inradius + "<br>";
        cout += "&nbsp;* Incircle Area: " + Math.PI * this.Inradius * this.Inradius + " | Incircle Perimeter: " + Math.PI * 2 * this.Inradius + "<br>";
        cout += "Circumcenter: " + "x: " + this.Circumcenter.x + " | y: " + this.Circumcenter.y + " | Circumradius: " + this.Circumradius + "<br><br>";
        cout += "\n#####################<br><br>";
        cout += "Coordinates:<br>";
        for (let i = 0; i < 3; ++i) { cout += "  " + i + ": { " + this.Coord[i].x + ", " + this.Coord[i].y + " }<br>"; }
        cout += "<br>Midpoints:<br>";
        for (let i = 0; i < 3; ++i) { cout += "  " + i + ": { " + this.Mid[i].x + ", " + this.Mid[i].y + " }<br>"; }
        cout += "<br>Ratios: " + "a: " + this.Ratios[0] + " | b: " + this.Ratios[1] + " | c: " + this.Ratios[2] + "<br><br>";
        cout += "\n############## END TRI INFO ##############<br><br>";
        return(cout);
    }
    
  // #################################################
  
  // Recalculate everything:
	SetAll()
	{
		//if (!this.IsValidTriangle()) { this.TypeLength = 0; this.TypeAngle = 0; return; }
		this.SetSides();
		this.SetRatios();
		this.SetAngles();
		this.SetHeightAndBase();
		this.SetArea();
		this.SetPerimeter();
		this.SetBisectors();
		this.SetInradius();
		this.SetIncenter();
		this.SetMedians();
		this.SetMidpoints();
		this.SetCircumcenter();
	}
	
	constructor(a_in, b_in, gamma_in) { this.a = a_in; this.b = b_in; this.Gamma = gamma_in; this.SetAll(); }
	
	// #################################################
	
}

// #################################################

