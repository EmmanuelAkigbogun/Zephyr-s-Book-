import { BendTangents } from "./ctrChecks";
export let addDef = (context, type) => {
  let vDragpointsArr = context.vDragpointsArr;
  let dragd = context.dragd;
  let draga = context.draga;
  let vectorGp = context.vectorGp;
  let rangerage = context.rangerage;
  let fullC = context.fullC;
  let replacerange = context.replacerange;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  //just point
  let arrayd = vDragpointsArr.current.filter((f) =>
    vectorGp.current.includes(f)
  );
  //add
  rangerage.current = {};
  //replace
  replacerange.current = {};
  let mindex = 0;
  arrayd.map((m, i) => {
    if (i % 2 == 0) {
      let indexData = vectorGp.current.indexOf(m);
      let pbfr = vectorGp.current[indexData - 2];
      let paft = vectorGp.current[indexData + 2];
      let pb = pbfr;
      let pa = paft;
      //valid point before and point after
      if (
        pbfr == undefined ||
        draga.current[0][pbfr + 1] == undefined ||
        draga.current[0][m - 1] == "Z" ||
        draga.current[0][m] == "M"
      ) {
        pb = m;
      }
      if (
        paft == undefined ||
        draga.current[0][paft + 1] == undefined ||
        draga.current[0][m + 2] == "Z" ||
        draga.current[0][m + 2] == "M"
      ) {
        pa = m;
      }
      //get cntrl from point before after anc center (m)
      let bendtan = BendTangents(
        +dragd.current[0][pb],
        +dragd.current[0][pb + 1],
        +dragd.current[0][m],
        +dragd.current[0][m + 1],
        +dragd.current[0][pa],
        +dragd.current[0][pa + 1]
      );
      //tracking m or x in add bend
      let pointmz = ``;
      if (draga.current[0][m] === "M") {
        pointmz = `m`;
        mindex = m;
      }
      if (
        draga.current[0][m + 2] === "Z" ||
        (draga.current[0][m + 4] === "Z" &&
          +dragd.current[0][m + 4] == +dragd.current[0][mindex] &&
          +dragd.current[0][m + 5] == +dragd.current[0][mindex + 1])
      ) {
        pointmz = pointmz + `z`;
      }
      // set data for bfr bend with valid points
      if (
        pbfr !== undefined &&
        draga.current[0][pbfr + 1] !== undefined &&
        draga.current[0][m - 1] !== "Z" &&
        draga.current[0][m] !== "M"
      ) {
        if (type == `add`) {
          rangerage.current[pbfr] = [
            +dragd.current[0][pbfr],
            +dragd.current[0][pbfr + 1],
            bendtan[0],
            bendtan[1],
            pointmz,
          ];
        }
        if (
          type == `replace` &&
          vectorCj.current.includes(m - 2) &&
          +dragd.current[0][m - 2] == +dragd.current[0][m] &&
          +dragd.current[0][m - 1] == +dragd.current[0][m + 1]
        ) {
          replacerange.current[m - 2] = bendtan[0];
          replacerange.current[m - 1] = bendtan[1];
        }
        if (type == `mixed`) {
          // cntrl j and in
          if (
            vectorCj.current.includes(m - 2) &&
            +dragd.current[0][m - 2] == +dragd.current[0][m] &&
            +dragd.current[0][m - 1] == +dragd.current[0][m + 1]
          ) {
            replacerange.current[m - 2] = bendtan[0];
            replacerange.current[m - 1] = bendtan[1];
          }
          // cntrl j and out
          else if (vectorCj.current.includes(m - 2)) {
          }
          // no cntrl j
          else {
            // last cntrl j track on add bend
            if (pointmz == `z`) {
              pointmz = `ctrlz`;
            }
            rangerage.current[pbfr] = [
              +dragd.current[0][pbfr],
              +dragd.current[0][pbfr + 1],
              bendtan[0],
              bendtan[1],
              pointmz,
            ];
          }
        }
      }
      // set data for aft bend with valid points
      if (
        paft !== undefined &&
        draga.current[0][paft + 1] !== undefined &&
        draga.current[0][m + 2] !== "Z" &&
        draga.current[0][m + 2] !== "M"
      ) {
        if (type == `add`) {
          rangerage.current[m] = [
            bendtan[2],
            bendtan[3],
            +dragd.current[0][paft],
            +dragd.current[0][paft + 1],
            pointmz,
          ];
        }
        if (
          type == `replace` &&
          vectorCi.current.includes(m + 2) &&
          +dragd.current[0][m + 2] == +dragd.current[0][m] &&
          +dragd.current[0][m + 3] == +dragd.current[0][m + 1]
        ) {
          replacerange.current[m + 2] = bendtan[2];
          replacerange.current[m + 3] = bendtan[3];
        }
        if (type == `mixed`) {
          // cntrl i and in
          if (
            vectorCi.current.includes(m + 2) &&
            +dragd.current[0][m + 2] == +dragd.current[0][m] &&
            +dragd.current[0][m + 3] == +dragd.current[0][m + 1]
          ) {
            replacerange.current[m + 2] = bendtan[2];
            replacerange.current[m + 3] = bendtan[3];
          }
          // cntrl i and out
          else if (vectorCi.current.includes(m + 2)) {
          }
          // no cntrl i
          else {
            // first cntrl i track on add bend
            if (pointmz == `m`) {
              pointmz = `ctrl`;
            }
            rangerage.current[m] = [
              bendtan[2],
              bendtan[3],
              +dragd.current[0][paft],
              +dragd.current[0][paft + 1],
              pointmz,
            ];
          }
        }
      }
    }
  });
};
4