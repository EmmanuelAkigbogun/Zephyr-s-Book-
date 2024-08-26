///*
// Function to interpolate between two points
export let interpolate = (p0, p1, t) => {
  return {
    x: (1 - t) * p0.x + t * p1.x,
    y: (1 - t) * p0.y + t * p1.y
  };
};

// Function to evaluate the Bezier curve at parameter t
export let evaluateBezier = (t, P1, C1, C2, P2) => {
  const A = interpolate(P1, C1, t);
  const B = interpolate(C1, C2, t);
  const C = interpolate(C2, P2, t);
  const D = interpolate(A, B, t);
  const E = interpolate(B, C, t);
  return interpolate(D, E, t);
};

// Function to evaluate the derivative of the Bezier curve at parameter t
export let evaluateBezierDerivative = (t, P1, C1, C2, P2) => {
  const A = interpolate(P1, C1, t);
  const B = interpolate(C1, C2, t);
  const C = interpolate(C2, P2, t);
  const D = interpolate(A, B, t);
  const E = interpolate(B, C, t);
  
  const derivative = {
    x: 3 * (E.x - D.x),
    y: 3 * (E.y - D.y)
  };
  
  return derivative;
};

// Function to find the parameter t for a given point P on the Bezier curve using binary search and Newton-Raphson method
export let findParameterForPoint = (P, P1, C1, C2, P2, epsilon = 1e-8, maxIterations = 200) => {
  let t0 = 0;
  let t1 = 1;
  let t = 0.5;

  // Binary search to narrow down the range
  for (let i = 0; i < maxIterations; i++) {
    const point = evaluateBezier(t, P1, C1, C2, P2);
    const dist = Math.sqrt((point.x - P.x) ** 2 + (point.y - P.y) ** 2);

    if (dist < epsilon) {
      return t;
    }

    if (point.x < P.x) {
      t0 = t;
    } else {
      t1 = t;
    }

    t = (t0 + t1) / 2;
  }

  // Newton-Raphson refinement
  for (let i = 0; i < maxIterations; i++) {
    const point = evaluateBezier(t, P1, C1, C2, P2);
    const dist = Math.sqrt((point.x - P.x) ** 2 + (point.y - P.y) ** 2);

    if (dist < epsilon) {
      return t;
    }

    const derivative = evaluateBezierDerivative(t, P1, C1, C2, P2);
    const dt = ((point.x - P.x) * derivative.x + (point.y - P.y) * derivative.y) /
               (derivative.x ** 2 + derivative.y ** 2);

    t -= dt;
    
    if (t < 0 || t > 1||isNaN(t)) {
      if (isNaN(t)) {
        console.log(NaN,"dayo");
      }
      t = (t0 + t1) / 2; // Reset to binary search midpoint if out of bounds
    }
  }
 console.log(t);
  return t;
};

// Function to add a control point P to the Bezier curve defined by P1, C1, C2, P2
export let addControlPointToBezier = (P1, C1, C2, P2, P) => {
  // Find parameter t for point P on the original curve
  const t = findParameterForPoint(P, P1, C1, C2, P2);

  // Calculate intermediate points
  const A = interpolate(P1, C1, t);
  const B = interpolate(C1, C2, t);
  const C = interpolate(C2, P2, t);

  const D = interpolate(A, B, t);
  const E = interpolate(B, C, t);

  // New points NP1 and NP2
  const NP1 = interpolate(D, E, t);

  // Return new control points and segments
  return [
     P1,
     A,
     D,
     NP1,  // Keeping P unchanged
     E,
     C,
     P2
  ];
};

//*/

export let AddPathCurve = (context) => {
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let vgpath = context.vgpath;
  let vage = context.vage;
  Object.keys(targetObject.current).map((a, i) => {
    let lo = [];
    for (let index = 0; index < dragd.current[i].length; index++) {
      if (vage.current[0].includes(index)) {
        let indexval = vage.current[0].indexOf(index);
        if (indexval == 0 || indexval == 1 ) {
          lo.push(draga.current[i][index] + vage.current[1][indexval]);
          if (indexval == 1) {
                      lo.push(`C` + vage.current[1][indexval+1]);
                       lo.push(`` + vage.current[1][indexval+2]);
                        lo.push(`` + vage.current[1][indexval+3]);
                         lo.push(`` + vage.current[1][indexval+4]);
                          lo.push(`` + vage.current[1][indexval+5]);
                           lo.push(`` + vage.current[1][indexval+6]);
                            lo.push(`C` + vage.current[1][indexval+7]);
                             lo.push(`` + vage.current[1][indexval+8]);
                              lo.push(`` + vage.current[1][indexval+9]);
                              lo.push(`` + vage.current[1][indexval+10]);
          }
        }
        else if (indexval == 6 || indexval == 7) {
                 lo.push(`` + vage.current[1][indexval+6]);
        
        } else {
          //lo.push(draga.current[i][index] + vage.current[1][indexval]);
        }
      }
      else{
             lo.push(draga.current[i][index] + dragd.current[i][index]);
      }
    }

    if (targetObject.current[a][0].localName == "path") {
      targetObject.current[a][0].setAttribute(
        "d",
        lo
          .map((m) => m)
          .join(" ")
          .replace(/ (?=[A-Z]|[a-z])/g, "")
      );
      vgpath.current.splice(a, 1, targetObject.current[a][0].getAttribute("d"));
    }
  });
};
/*
// Function to interpolate between two points
export let interpolate = (p0, p1, t) => {
  return {
    x: (1 - t) * p0.x + t * p1.x,
    y: (1 - t) * p0.y + t * p1.y
  };
};

// Function to evaluate the Bezier curve at parameter t
export let evaluateBezier = (t, P1, C1, C2, P2) => {
  const A = interpolate(P1, C1, t);
  const B = interpolate(C1, C2, t);
  const C = interpolate(C2, P2, t);
  const D = interpolate(A, B, t);
  const E = interpolate(B, C, t);
  return interpolate(D, E, t);
};

// Function to evaluate the derivative of the Bezier curve at parameter t
export let evaluateBezierDerivative = (t, P1, C1, C2, P2) => {
  const A = interpolate(P1, C1, t);
  const B = interpolate(C1, C2, t);
  const C = interpolate(C2, P2, t);
  const D = interpolate(A, B, t);
  const E = interpolate(B, C, t);

  return {
    x: 3 * (E.x - D.x),
    y: 3 * (E.y - D.y)
  };
};

// Function to find the parameter t for a given point P on the Bezier curve using binary search and Newton-Raphson method
export let findParameterForPoint = (P, P1, C1, C2, P2, epsilon = 1e-6, maxIterations = 200) => {
  let t0 = 0.0;
  let t1 = 1.0;
  let t = 0.5;

  const isPointCloseEnough = (point, P) => {
    const dist = Math.sqrt((point.x - P.x) ** 2 + (point.y - P.y) ** 2);
    return dist < epsilon;
  };

  // Binary search to narrow down the range
  for (let i = 0; i < maxIterations / 2; i++) {
    const point = evaluateBezier(t, P1, C1, C2, P2);

    if (isPointCloseEnough(point, P)) {
      return t;
    }

    if (point.x < P.x) {
      t0 = t;
    } else {
      t1 = t;
    }

    t = (t0 + t1) / 2;
  }

  // Newton-Raphson refinement
  for (let i = 0; i < maxIterations / 2; i++) {
    const point = evaluateBezier(t, P1, C1, C2, P2);

    if (isPointCloseEnough(point, P)) {
      return t;
    }

    const derivative = evaluateBezierDerivative(t, P1, C1, C2, P2);
    const numerator = (point.x - P.x) * derivative.x + (point.y - P.y) * derivative.y;
    const denominator = derivative.x ** 2 + derivative.y ** 2;

    if (denominator === 0) {
      break; // Avoid division by zero
    }

    const dt = numerator / denominator;

    t -= dt;

    // Ensure t stays within [0, 1]
    if (t < 0 || t > 1 || isNaN(t)) {
      t = (t0 + t1) / 2; // Reset to binary search midpoint if out of bounds or NaN
    }
  }

  const finalPoint = evaluateBezier(t, P1, C1, C2, P2);
  if (isPointCloseEnough(finalPoint, P)) {
    return t;
  } else {
    throw new Error('Point P does not lie on the Bezier curve within the given tolerance.');
  }
};

// Function to add a control point P to the Bezier curve defined by P1, C1, C2, P2
export let addControlPointToBezier = (P1, C1, C2, P2, P) => {
  try {
    // Find parameter t for point P on the original curve
    const t = findParameterForPoint(P, P1, C1, C2, P2);

    // Calculate intermediate points
    const A = interpolate(P1, C1, t);
    const B = interpolate(C1, C2, t);
    const C = interpolate(C2, P2, t);

    const D = interpolate(A, B, t);
    const E = interpolate(B, C, t);

    // New points NP1 and NP2
    const NP1 = interpolate(D, E, t);

    // Return new control points and segments
    return [
      P1,
      A,
      D,
      NP1,  // Keeping P unchanged
      E,
      C,
      P2
    ];
  } catch (error) {
    console.error("err");
    return null;
  }
};

*/