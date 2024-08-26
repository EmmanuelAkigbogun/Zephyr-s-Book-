import { cntrlFromPoint } from "./Fx";
import { multiLineFx } from "./Fx";
export let syncMZOnZ = (context, pointx) => {
  let vg = context.vg;
  let vectord = context.vectord;
  let mzvalArr = [];
  Array.from(vg.current.children).map((m) => {
    mzvalArr.push(m.getAttribute("data-qz"));
  });
  //get mz from qz
  mzvalArr = mzvalArr
    .filter((e) => e !== null && e !== "")
    .join(" ")
    .split(" ")
    .map((e) => +e)
    .map((e) => e);
  //console.log(mzvalArr, pointx);
  // initial and final equality check
  let equalArr = [];
  mzvalArr
    .map((e, i) => {
      if (i % 2 == 0) {
        if (
          vectord.current[0][mzvalArr[i]] ===
            vectord.current[0][mzvalArr[i + 1]] &&
          vectord.current[0][mzvalArr[i] + 1] ===
            vectord.current[0][mzvalArr[i + 1] + 1]
        ) {
          equalArr.push(mzvalArr[i]);
          equalArr.push(mzvalArr[i + 1]);
        }
      }
    })
    .filter((e) => e !== undefined);
  // check if m or z in line
  let passedArray = [];
  let failedArray = [];
  // console.log(equalArr, "equal");
  if (equalArr.length !== 0) {
    passedArray = equalArr
      .map((e, i) => {
        if (pointx.includes(e)) {
          return i;
        }
      })
      .filter((e) => e !== undefined);
  }
  /*
  console.log(
    passedArray,
    "passed worked",
    passedArray.length !== 0,
    failedArray
  );
  */
  if (passedArray.length !== 0) {
    if (passedArray[0] % 2 == 0) {
      // console.log([equalArr[passedArray[0]], equalArr[passedArray[0] + 1]]);
      return [equalArr[passedArray[0] + 1]];
    } else {
      //console.log([equalArr[passedArray[0]], equalArr[passedArray[0] - 1]]);
      return [equalArr[passedArray[0] - 1]];
    }
  }
};
export let MZOnZDrag = (context, a, b) => {
  let vDragpointsArr = context.vDragpointsArr;
  let vectorctrmixed = context.vectorctrmixed;
  let ctrlz1 = cntrlFromPoint(context, a).filter((f) => f !== `seperator`);
  vDragpointsArr.current.push(a, b, ...ctrlz1);
  vectorctrmixed.current.push(...ctrlz1);
  multiLineFx(context, ctrlz1, a);
};
export let mzsyncpoints = (context, pointcenter, el) => {
  let vDragpointsArr = context.vDragpointsArr;
  let vectorctrmixed = context.vectorctrmixed;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let bend = context.bend;
  let hidectr = context.hidectr;
  //////////////////////////////m and z sync////////////////////////////////////////////
  if (vectora.current[0][pointcenter + 2] == "Z") {
    if (
      vectord.current[0][+el.getAttribute("data-mz")] ==
        vectord.current[0][pointcenter] &&
      vectord.current[0][+el.getAttribute("data-mz") + 1] ==
        vectord.current[0][pointcenter + 1]
    ) {
      //only i for M CURVE
      let pointmz = +el.getAttribute("data-mz");
      let cntrlz = cntrlFromPoint(context, pointmz).filter(
        (f) => f !== `seperator`
      );
      if (bend.current) {
        cntrlz.map((f, i) => {
          if (i % 2 == 0) {
            hidectr.current[f] = pointmz;
          } else {
            hidectr.current[f] = pointmz + 1;
          }
        });
      }
      vDragpointsArr.current.push(pointmz);
      vDragpointsArr.current.push(pointmz + 1);

      vDragpointsArr.current.push(...cntrlz);
      //length required
      vectorctrmixed.current.push(...cntrlz);
      multiLineFx(context, cntrlz, pointmz);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////
};
export let gensyncDragpoint = (context) => {
  let vDragpointsArr = context.vDragpointsArr;
  let vectorctrmixed = context.vectorctrmixed;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vectorCL = context.vectorCL;
  let vectorP = context.vectorP;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let dragd = context.dragd;
  let draga = context.draga;
  let vectorGp = context.vectorGp;
  let bend = context.bend;

  //////////other sync
  let pointdragpoint = vDragpointsArr.current
    .filter((f) => vectorGp.current.includes(f))
    .map((m) => dragd.current[0][m]);
  let oddfactor = 0;
  vectorGp.current.map((e, i) => {
    ////////////////////////////////////open///////////////////////////////////////
    if (
      (draga.current[0][e] == "M" ||
        vectora.current[0][e] == "C" ||
        vectora.current[0][e] == "L") &&
      (i - oddfactor) % 2 !== 0
    ) {
      oddfactor = oddfactor + 1;
    } else if (vectora.current[0][e] == "Z" && (i - oddfactor) % 2 == 0) {
      oddfactor = oddfactor + 1;
    }
    ////////////////////////////////////close///////////////////////////////////////
    if (
      pointdragpoint.includes(`${vectord.current[0][e]}`) &&
      pointdragpoint.includes(`${vectord.current[0][e + 1]}`)
    ) {
      if ((i - oddfactor) % 2 == 0) {
        vDragpointsArr.current.push(e);
        vDragpointsArr.current.push(e + 1);
      }
    }
  });
  noduplicate(vDragpointsArr.current);
  let arrayd = vDragpointsArr.current.filter((f) =>
    vectorGp.current.includes(f)
  );
  arrayd.map((m, i) => {
    let indexData = vectorGp.current.indexOf(m);
    let pbfr = vectorGp.current[indexData - 2];
    let paft = vectorGp.current[indexData + 2];
    if (i % 2 == 0) {
      let cntrl = cntrlFromPoint(context, m).filter((f) => f !== `seperator`);
      let cntbfr = cntrlFromPoint(context, pbfr).filter(
        (f) => f !== `seperator`
      );
      let cntaft = cntrlFromPoint(context, paft).filter(
        (f) => f !== `seperator`
      );
      vDragpointsArr.current.push(...cntrl);
      vectorctrmixed.current.push(...cntrl, ...cntbfr, ...cntaft);
      multiLineFx(context, cntrl, m);
      multiLineFx(context, cntbfr, pbfr);
      multiLineFx(context, cntaft, paft);
    }
  });
  /////////////////////
};

export let mzsynctrls = (context, el) => {
  let arraydata = [];
  //////////////////////////////m and z sync////////////////////////////////////////////
  //only i for M CURVE
  let pointmz = +el.getAttribute("data-mz");
  let cntrlm = cntrlFromPoint(context, pointmz).filter(
    (f) => f !== `seperator`
  );
  arraydata.push(...cntrlm);
  let pointz = +el.getAttribute("data-value");
  let cntrlz = cntrlFromPoint(context, pointz).filter((f) => f !== `seperator`);
  if (arraydata.length == 0) {
  } else {
    arraydata.push(...cntrlz);
  }
  return arraydata;
  ///////////////////////////////////////////////////////////////////////////////////////
};
export let elementFx = (context, pointcenter) => {
  let vg = context.vg;
  let vectora = context.vectora;
  return Array.from(vg.current.children).filter(
    (f) =>
      f.getAttribute("name")?.includes("art$") &&
      f.getAttribute("name")?.includes("vcirart$") &&
      f.localName == "circle" &&
      vectora.current[0][+f.getAttribute("data-value") + 2] == "Z" &&
      (f.getAttribute("data-value") == `${pointcenter}` ||
        f.getAttribute("data-mz") == `${pointcenter}`)
  )[0];
};
export let noduplicate = (array) => {
  array
    .map((e, i) => {
      return array.indexOf(e, 0) !== array.indexOf(e, i) ? i : null;
    })
    .filter((f) => typeof f === "number")
    .map((e, i) => {
      array.splice(e - i, 1);
    });
};
