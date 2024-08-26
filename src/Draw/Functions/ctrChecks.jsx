import { multiLineFx } from "../Fx";
import { noduplicate } from "../mZSync";

export let checkifctrline = (context, pointcenter, ctrcheck12, cntrl12) => {
  let dragd = context.dragd;
  let px = dragd.current[0][pointcenter];

  let py = dragd.current[0][pointcenter + 1];
  let xeq = px == dragd.current[0][cntrl12[0]];
  let yeq = py == dragd.current[0][cntrl12[1]];
  //console.log(px,py,dragd.current[0][cntrl12[0]],dragd.current[0][cntrl12[1]]);
  let boolxy = xeq && yeq;
  let xeq1 = px == dragd.current[0][cntrl12[2]];
  let yeq1 = py == dragd.current[0][cntrl12[3]];
  let boolxy1 = xeq1 && yeq1;

  if (boolxy == false && boolxy1 == false) {
    return `hide`;
  }
  return ``;
};
export let checkctr = (ctrcheck12) => {
  if (ctrcheck12.length > 1) {
    if (ctrcheck12[0] == `seperator`) {
      ctrcheck12 = `ci`;
    } else {
      if (ctrcheck12.length > 3) {
        ctrcheck12 = `cjci`;
      } else {
        ctrcheck12 = `cj`;
      }
    }
  } else {
    ctrcheck12 = "null";
  }
  return ctrcheck12;
};
export let ctrlDef = (context, cntrl12, returnval, pointcenter, ctrpoint) => {
  let mirror = context.mirror;
  let vDragpointsArr = context.vDragpointsArr;
  let vectorctrmixed = context.vectorctrmixed;
  let vctrline = context.vctrline;
  cntrl12 = returnval
    .filter((f) => f !== `seperator`)
    .filter((f) => f != ctrpoint && f != ctrpoint + 1);
  mirror.current.push(
    ...cntrl12,
    ctrpoint,
    ctrpoint + 1,
    pointcenter,
    pointcenter + 1
  );
  vDragpointsArr.current = [ctrpoint, ctrpoint + 1, ...cntrl12];
  //vectorctrmixed.current = [];
  //vctrline.current = [];
  vectorctrmixed.current.push(...cntrl12, ctrpoint, ctrpoint + 1);
  multiLineFx(context, cntrl12, pointcenter);
  multiLineFx(context, [ctrpoint, ctrpoint + 1], pointcenter);
};
export let mirrorLA = (c1, c2, p1, p2) => {
  return [2 * p1 - c1, 2 * p2 - c2];
};
export let mirrorO = (context, x_control, y_control, x0, y0) => {
  let mirrorbool = context.mirrorbool;
  const dx = x_control - x0;
  const dy = y_control - y0;
  const length = Math.sqrt(dx * dx + dy * dy);
  let angle = Math.atan2(dy, dx);
  if (mirrorbool.current == `v`) {
    angle = angle + Math.PI;
  }
  const mirroredAngle = -angle;
  const mirroredDx = length * Math.cos(mirroredAngle);
  const mirroredDy = length * Math.sin(mirroredAngle);
  return [x0 + mirroredDx, y0 + mirroredDy];
};
export let mirrorA = (x0, y0, x1, y1, x2, y2) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const mirroredDx = -dx;
  const mirroredDy = -dy;
  const length = Math.sqrt((x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0));
  const scale =
    length / Math.sqrt(mirroredDx * mirroredDx + mirroredDy * mirroredDy);
  const x2_new = x0 + mirroredDx * scale;
  const y2_new = y0 + mirroredDy * scale;
  return [x2_new, y2_new];
};
export let mirrorP = (x0, y0, x1, y1, x2, y2) => {
  const dx1 = x1 - x0;
  const dy1 = y1 - y0;
  const dx2 = x2 - x0;
  const dy2 = y2 - y0;
  const perpDx = -dy1;
  const perpDy = dx1;
  const scale =
    Math.sqrt(dx2 * dx2 + dy2 * dy2) /
    Math.sqrt(perpDx * perpDx + perpDy * perpDy);
  const x2_new = x0 + perpDx * scale;
  const y2_new = y0 + perpDy * scale;
  return [x2_new, y2_new];
};
export let getLengthAndAngle = (ax, ay, x, y) => {
  const dx2 = x - ax;
  const dy2 = y - ay;
  const length = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const angle = Math.atan2(dy2, dx2);
  return [length.toFixed(2), Math.abs(angle * (180 / Math.PI)).toFixed(2)];
};

export let getParallelPoints = (x1, y1, x2, y2, x3, y3) => {
  //getParallelPoints
  const dx1 = x1 - x2;
  const dy1 = y1 - y2;
  const dx2 = x3 - x2;
  const dy2 = y3 - y2;
  const dx1_scaled = dx1 * 0.4;
  const dy1_scaled = dy1 * 0.4;
  const dx2_scaled = dx2 * 0.4;
  const dy2_scaled = dy2 * 0.4;
  const x_prime = x2 + dx1_scaled;
  const y_prime = y2 + dy1_scaled;
  const x_prime_prime = x2 + dx2_scaled;
  const y_prime_prime = y2 + dy2_scaled;
  return [0, 0, x_prime, y_prime, x_prime_prime, y_prime_prime];
};
export let calculateDistancesAndTangents = (x1, y1, x2, y2, x3, y3) => {
  let dx = x3 - x1;
  let dy = y3 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const scaledLength = length * 0.4;
  const x_prime = x2 - (dx / length) * scaledLength;
  const y_prime = y2 - (dy / length) * scaledLength;
  const x_prime_prime = x2 + (dx / length) * scaledLength;
  const y_prime_prime = y2 + (dy / length) * scaledLength;
  return [0, 0, x_prime, y_prime, x_prime_prime, y_prime_prime];
};
export let BendTangentso = (x1, y1, x2, y2, x3, y3) => {
  const dx1 = x1 - x2;
  const dy1 = y1 - y2;
  const dx2 = x3 - x2;
  const dy2 = y3 - y2;
  const dx1_scaled = dx1 * 0.4;
  const dy1_scaled = dy1 * 0.4;
  const dx2_scaled = dx2 * 0.4;
  const dy2_scaled = dy2 * 0.4;
  const x_prime = x2 + dx1_scaled;
  const y_prime = y2 + dy1_scaled;
  const x_prime_prime = x2 + dx2_scaled;
  const y_prime_prime = y2 + dy2_scaled;
  return [ x_prime, y_prime, x_prime_prime, y_prime_prime];
};
export let BendTangentsad = (x1, y1, x2, y2, x3, y3) => {
  if (x1==x2&&x2==x3&&y1==y2&&y2==y3&&1==2) {
    console.log("jik");
     return [x1,y1,x1,y1];
  }
  else{
  let dx = x3 - x1;
  let dy = y3 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const scaledLength = length * (0.35);
  const x_prime = x2 - (dx / length) * scaledLength;
  const y_prime = y2 - (dy / length) * scaledLength;
  const x_prime_prime = x2 + (dx / length) * scaledLength;
  const y_prime_prime = y2 + (dy / length) * scaledLength;
  console.log(
    x_prime,
    y_prime,
    x_prime_prime,
    y_prime_prime,
    x1,
    y1,
    x2,
    y2,
    x3,
    y3
  );
  return [x_prime, y_prime, x_prime_prime, y_prime_prime];
  }
};
export let forward = (h, context) => {
  let x = context.x;
  let y = context.y;
  let o = context.o;
  let x1 = x.current + h * Math.cos((Math.PI / 180) * o.current);
  let y1 = y.current + h * Math.sin((Math.PI / 180) * o.current);
  x.current = x1;
  y.current = y1;
  return [x.current.toFixed(2),y.current.toFixed(2)]
};
export let right = (p, context) => {
  let o = context.o;
  o.current += p;
};
export let star = (w, context) => {
  let arrayData=[`M`]
  for (let index = 0; index < 5; index++) {
    let data=forward(w, context);
    right(144, context);
    arrayData.push(`L${data[0]} ${data[1]}`)
  }
  return arrayData.join("").replace("ML","M")
};

export let BendTangents = (x1, y1, x2, y2, x3, y3) => {
  let dx = x3 - x1;
  let dy = y3 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const scaledLength = length * (0.35);
  const x_prime = x2 - (dx / length) * scaledLength;
  const y_prime = y2 - (dy / length) * scaledLength;
  const x_prime_prime = x2 + (dx / length) * scaledLength;
  const y_prime_prime = y2 + (dy / length) * scaledLength;
  return [x_prime, y_prime, x_prime_prime, y_prime_prime];
};

export let getElementClosestToCoordinates=(x, y)=> {
  const elements = document.elementsFromPoint(x, y);
  let closestElement = null;
  let closestDistance = Infinity;

  for (const element of elements) {
    const distance = calculateDistance(x, y, element);
    if (distance < closestDistance && distance <= 5) {
      closestElement = element;
      closestDistance = distance;
    }
  }

  return closestElement;
}

export let calculateDistance=(x1, y1, element) =>{
  const rect = element.getBoundingClientRect();
  const x2 = rect.left + (rect.width / 2);
  const y2 = rect.top + (rect.height / 2);

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
export let eleFx=(xbegin,ybegin,xend,yend)=>{
  let elements=[]
  let distance=[]
  let axis=[]
  for (let x = xbegin; x <= xend; x++) {
      for (let y = ybegin; y <= yend; y++) {
        const elementPosition = document
          .elementsFromPoint(x, y)
          .filter(
            (f) =>
              //f.getAttribute("name") == "cloneart$" ||
              f.getAttribute("name") == "clclart$" ||
              f.getAttribute("name") == "vcirart$" ||
              f.getAttribute("name") == "vlineart$"
          )[0];
          if ( elementPosition!=undefined) {
          if (
            elementPosition.getAttribute("name") == "vcirart$" ||
            elementPosition.getAttribute("name") == "vlineart$"
          ) {
            return "failed"
          }
          elements.push(elementPosition);
          distance.push(
              Math.sqrt((x - (xbegin + 1)) ** 2 + (y - (ybegin + 1)) ** 2)
            );
          axis.push(`${x} ${y}`)
        }
      }
  }
  if (distance.length!==0) {
  let minimum=Math.min(...distance)
  let minel=[]
  let xy=[]
  distance.map((m,i)=>{
    if (m==minimum) {
        minel.push(elements[i])
        xy.push(axis[i])
    }
  })
  return [minel[minel.length - 1], xy[minel.length - 1]];
}

  return elements
}
export let eleMx=(context,el)=>{
    let movepen = context.movepen;
    let movex=+movepen.current.split(" ")[0]
    let movey=+movepen.current.split(" ")[1]
    let array=[]
    for (let index = 0; index < el.getTotalLength(); index++) {
      let point= el.getPointAtLength(index);
     // console.log(+movepen.current.split(" ")[0],point.x,point.y);
      if (
        (point.x - 0.8 < movex &&
        point.x + 0.8 > movex) && 
        (point.y - 0.8 < movey &&
        point.y + 0.8 > movey)  
      ) {
        console.log(point.x,point.y,movex,movey,"aden");
      }
    
    }

};
////////////////////////////
export let  getMousePointOnPath= (clientX,clientY,path,vgval) => {
  const matrix = vgval.getScreenCTM().inverse();
  let point = vgval.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  point = point.matrixTransform(matrix);
  const pathLength = path.getTotalLength();
 // console.log(pathLength, point.x);
  ///*
  const mousePoint = path.getPointAtLength(
    (pathLength * point.x) / vgval.width.baseVal.value
  );
  return mousePoint;
  //*/
};

export let getMousePoint = (clientX, clientY, path, vgval) => {
  const matrix = vgval.getScreenCTM().inverse();
  let point = vgval.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  point = point.matrixTransform(matrix);
  const startPoint = path.getPointAtLength(0);
  const distance = Math.sqrt(
    (point.x - startPoint.x) ** 2 + (point.y - startPoint.y) ** 2
  );
  const pathLength = path.getTotalLength();
  const mousePointOnPath = path.getPointAtLength(
    (distance / pathLength) * pathLength
  );
  return mousePointOnPath;
};
export let getMousePointq = (clientX, clientY, path, vgval) => {
  const matrix = vgval.getScreenCTM().inverse();
  let point = vgval.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  point = point.matrixTransform(matrix);
  const startPoint = path.getPointAtLength(0);
  const distance = Math.sqrt(
    (point.x - startPoint.x) ** 2 + (point.y - startPoint.y) ** 2
  );
  const length = path.getTotalLength();
  const mousePointOnPath = path.getPointAtLength(distance);
  return mousePointOnPath;
};