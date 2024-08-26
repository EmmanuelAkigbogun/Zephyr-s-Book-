import { BendTangents } from "./ctrChecks";
export let AddBend = (context,value) => {
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let vgpath = context.vgpath;
  let vDragpointsArr = context.vDragpointsArr;
  let vectorGp = context.vectorGp;
  let replacerange = context.replacerange;
  let rangerage = context.rangerage;
  let target = context.target;
  let ragearr = Object.keys(rangerage.current).map((m) => +m);
  let replacearr = Object.keys(replacerange.current).map((m) => +m);
  if (ragearr.length !== 0) {
    vDragpointsArr.current = [];
  }
  Object.keys(targetObject.current).map((a, i) => {
    let mzbool = false;////for add node sync mz
    let morz = ``;
    let mztrackno = -1;//track control from lo length
    let mtrack=-1;// for just m
    let check = false;//detect addition to remove l
    let lo = [];
    let mValue = 0;//m index
    let mzctrm = [];//for control length in lo
    let mzctrz = [];
    let ctrbool = false;//
    for (let index = 0; index < dragd.current[i].length; index++) {
      if (draga.current[i][index] == "M") {
        mtrack = -1;
        mValue = index;
        mzbool = false;
        morz = ``;
        mzctrm = [];
        mzctrz = [];
        ctrbool = false; ////for replace node sync mz, also for mx==yz
      }
      if (ragearr.includes(index - 1) && value !== `replace`) {
        //assumption first point won't change
        //track control display
        if (vDragpointsArr.current.length == 0) {
          vDragpointsArr.current = [index - 1, index];
        }
        if (
          draga.current[i][index - 1] == "M" ||
          draga.current[i][index + 3] == "Z"
        ) {
          if (draga.current[i][index - 1] == "M") {
            mtrack = lo.length + 1;
          }
          mzbool = true;
          morz = rangerage.current[index - 1][4];
          mztrackno = lo.length + 1;
        }
        lo.push(draga.current[i][index] + dragd.current[i][index]);
        target.current[0].removeAttribute("data-poly");
        lo.push(`C` + rangerage.current[index - 1][0]);
        lo.push(`` + rangerage.current[index - 1][1]);
        lo.push(`` + rangerage.current[index - 1][2]);
        lo.push(`` + rangerage.current[index - 1][3]);
        check = true;
      } else if (replacearr.includes(index)) {
        if (value !== `replace`) {
          if (draga.current[i][index - 2] == "M") {
            mzctrm.push(lo.length);
            ctrbool = true;
          }
          if (draga.current[i][index + 4] == "Z") {
            mzctrz.push(lo.length);
            ctrbool = true;
          }
        }
        lo.push(draga.current[i][index] + replacerange.current[index]);
      } else {
        if (check) {
          lo.push(`` + dragd.current[i][index]);
          check = false;
        } else {
          lo.push(draga.current[i][index] + dragd.current[i][index]);
        }
      }

      if (
        draga.current[i][index + 1] == "Z" &&
        mzbool &&
        (morz == `z` || morz == `m`) &&
        mValue !== index - 3 &&
        ragearr.length !== 0 &&
        value !== `replace`
      ) {
        ///*
        //////////////// for add where there is a virtual line between m and z
        if (
          +dragd.current[i][mValue] !== +dragd.current[i][index - 1] ||
          +dragd.current[i][mValue + 1] !== +dragd.current[i][index]
        ) {
          //for last point  virtual line
          if (morz == `z`) {
            const pointData = [
              +dragd.current[i][index - 3],
              +dragd.current[i][index - 2],
              +dragd.current[i][index - 1],
              +dragd.current[i][index],
              +dragd.current[i][mValue],
              +dragd.current[i][mValue + 1],
            ];
            const cntData = BendTangents(...pointData);
            lo.push(`C` + cntData[2]);
            lo.push(`` + cntData[3]);
            lo.push(`` + dragd.current[i][mValue]);
            lo.push(`` + dragd.current[i][mValue + 1]);
            lo.push(`` + dragd.current[i][mValue]);
            lo.push(`` + dragd.current[i][mValue + 1]);
            lo.splice(mztrackno + 2, 1, `` + cntData[0]);
            lo.splice(mztrackno + 3, 1, `` + cntData[1]);
            check = false;
          }
          //for first point  virtual line
          else {
            const pointData = [
              +dragd.current[i][index - 1],
              +dragd.current[i][index],
              +dragd.current[i][mValue],
              +dragd.current[i][mValue + 1],
              +dragd.current[i][mValue + 2],
              +dragd.current[i][mValue + 3],
            ];
            const cntData = BendTangents(...pointData);
            lo.push(`C` + dragd.current[i][index - 1]);
            lo.push(`` + dragd.current[i][index]);
            lo.push(`` + cntData[0]);
            lo.push(`` + cntData[1]);
            lo.push(`` + dragd.current[i][mValue]);
            lo.push(`` + dragd.current[i][mValue + 1]);
            lo.splice(mztrackno, 1, `C` + cntData[2]);
            lo.splice(mztrackno + 1, 1, `` + cntData[3]);
            check = false;
          }
        }

        // */
        //////////////// for add where there is a real line between m and z (m==z)
        /////replace controls after proces
        ///*
        else if (
          +dragd.current[i][mValue] == +dragd.current[i][index - 1] &&
          +dragd.current[i][mValue + 1] == +dragd.current[i][index]
        ) {
          //mimic replace and give ctrl track
          if (mztrackno !== -1 && mtrack !== -1) {
            ctrbool = true;
            mzctrm = [mtrack];
            mzctrz = [mztrackno + 2];
          }
        }
        //  */
        mzbool = false;
      }
      //first ctr i mimic replace mz sync and give ctrl track
      if (morz == `ctrl` && mtrack !== -1) {
        ctrbool = true;
        mzctrm = [mtrack];
      }
      //last ctr j mimic replace mz sync and give ctrl track
      if (morz == `ctrlz` && mztrackno !== -1) {
        ctrbool = true;
        mzctrz = [mztrackno + 2];
      }
      /////////////////// for replace mz sync on show
      ///*
      if (
        draga.current[i][index + 1] == "Z" &&
        +dragd.current[i][mValue] == +dragd.current[i][index - 1] &&
        +dragd.current[i][mValue + 1] == +dragd.current[i][index] &&
        ctrbool &&
        value !== `replace`
      ) {
        let indexDatabf = vectorGp.current.indexOf(index - 1);
        let pbfr = vectorGp.current[indexDatabf - 2];
        let indexData = vectorGp.current.indexOf(mValue);
        let paft = vectorGp.current[indexData + 2];
        const pointData = [
          +dragd.current[i][pbfr],
          +dragd.current[i][pbfr + 1],
          +dragd.current[i][mValue],
          +dragd.current[i][mValue + 1],
          +dragd.current[i][paft],
          +dragd.current[i][paft + 1],
        ];
        const cntData = BendTangents(...pointData);
        if (mzctrm.length !== 0) {
          lo.splice(mzctrm[0], 1, `C` + cntData[2]);
          lo.splice(mzctrm[0] + 1, 1, `` + cntData[3]);
        }
        if (mzctrz.length !== 0) {
          lo.splice(mzctrz[0], 1, `` + cntData[0]);
          lo.splice(mzctrz[0] + 1, 1, `` + cntData[1]);
        }
        ctrbool = false;
      }
      ////////////////////remove virtual line from  number before last and after first
      if (
        draga.current[i][index + 1] == "Z" &&
        (+dragd.current[i][mValue] !== +dragd.current[i][index - 1] ||
          +dragd.current[i][mValue + 1] !== +dragd.current[i][index]) &&
        (ragearr.includes(index - 3) || ragearr.includes(mValue + 2)) &&
        morz !== `z` &&
        morz !== `m` &&
        value !== `replace`
      ) {
        console.log("break virtual line evil");
        lo.push(`L` + dragd.current[i][mValue]);
        lo.push(`` + dragd.current[i][mValue + 1]);
      }
      //*/
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
