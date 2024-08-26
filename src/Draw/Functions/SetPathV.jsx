import { noduplicate } from "../mZSync";
import { mirrorA, mirrorLA, mirrorO } from "./ctrChecks";

export let setPathDataV = (context, x, y) => {
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let dragx = context.dragx;
  let dragy = context.dragy;
  let vgpath = context.vgpath;
  let vDragpointsArr = context.vDragpointsArr;
  let mirror = context.mirror;
  let mirrorbool = context.mirrorbool;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vectorCp = context.vectorCp;
  let vectorP = context.vectorP;
    let alignedline = context.alignedline;
    let movepointarr=context.movepointarr
    let poalignx=[]
    let poaligny=[]
    let poalignmx = [];
    let poalignmy = [];
    let movedata=[]
    if (alignedline.current.length!==0) {
     movedata = Object.keys(movepointarr.current).map(m=>+m);
    }
  noduplicate(vDragpointsArr.current);
  Object.keys(targetObject.current).map((a, i) => {
    let boolpoly = false;
    ///
    let lo = [];
    let oddfactor = 0;
    for (let index = 0; index < dragd.current[i].length; index++) {
      //////////////////////////////////////open////////////////////////////////
      if (
        (draga.current[i][index] == "M" ||
          draga.current[i][index] == "C" ||
          draga.current[i][index] == "L") &&
        (index - oddfactor) % 2 !== 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (draga.current[i][index] == "Z" && (i - oddfactor) % 2 == 0) {
        oddfactor = oddfactor + 1;
      } else if (
        draga.current[i][index] == "V" &&
        (index - oddfactor) % 2 === 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (
        draga.current[i][index] == "H" &&
        (index - oddfactor) % 2 !== 0
      ) {
        oddfactor = oddfactor + 1;
      }
      ////////////////////////////////////close///////////////////////////////////////
      if (vDragpointsArr.current.includes(index)) {
        if (!boolpoly) {
          boolpoly = true;
        }
        let xval = +dragd.current[i][index] - dragx.current + x;
        let yval = +dragd.current[i][index] - dragy.current + y;
        const digital = 3;
        let zod = dragd.current[i][movepointarr.current[index]];
        if (
          mirror.current.length != 0 &&
          mirrorbool.current !== `` &&
          (index == mirror.current[0] || index == mirror.current[1])
        ) {
          let p1 = +dragd.current[i][mirror.current[4]];
          let p2 = +dragd.current[i][mirror.current[5]];
          let c1 = +dragd.current[i][mirror.current[2]] - dragx.current + x;

          let c2 = +dragd.current[i][mirror.current[3]] - dragy.current + y;
           let cb0=0
           let cb1=0

          if (mirrorbool.current == `a`) {
             cb0 = +dragd.current[i][mirror.current[0]];
             cb1 = +dragd.current[i][mirror.current[1]];
          }

          if (index == mirror.current[0]) {
            
            if (mirrorbool.current == `a`) {
              xval = mirrorA(p1, p2, c1, c2, cb0, cb1)[0];
            } else if (mirrorbool.current == `v` || mirrorbool.current == `h`) {
              xval = mirrorO(context,c1, c2, p1, p2)[0];
            } else {
              xval = mirrorLA(c1, c2, p1, p2)[0];
            }
          } else {
          
            if (mirrorbool.current == `a`) {
              yval = mirrorA(p1, p2, c1, c2, cb0, cb1)[1];
            } 
            else if (mirrorbool.current == `v` || mirrorbool.current == `h`) {
              yval = mirrorO(context,c1, c2, p1, p2)[1];
            } else {
              yval = mirrorLA(c1, c2, p1, p2)[1];
            }
          }
          console.log(vDragpointsArr.current);
          if (
            mirror.current[0] + 4 !== mirror.current[2] &&
            mirror.current[0] - 4 !== mirror.current[2] 
          ) {
            //xval = +dragd.current[i][index];
            //yval = +dragd.current[i][index];
          }
        }
        if ((index - oddfactor) % 2 == 0) {
          ///////////////////////////////////////open/////////////////////////////////////////////
          if (draga.current[i][index] == "H") {
            lo.push(
              `L` + (dragd.current[i][index] !== "" ? xval.toFixed(2) : "")
            );
            lo.push(`0`);
          }
          ////////////////////////////////////close////////////////////////////////////////////////
          else {
            lo.push(
              draga.current[i][index] +
                (dragd.current[i][index] !== "" ? xval.toFixed(2) : "")
            );
          }
          if (
            movedata.includes(index) &&
            +zod-xval <= digital &&
            +zod-xval >= -digital
          ) {
            lo.splice(
              lo.length - 1,
              1,
              draga.current[i][index] +
              zod
            );
          }

          ///////////////////////////////////////open/////////////////////////////////////////////
          if (draga.current[i][index] == "H") {
            oddfactor = oddfactor + 1;
          }
          ////////////////////////////////////close////////////////////////////////////////////////
        } else {
          if (draga.current[i][index] == "V") {
            lo.push(`L0`);
            lo.push(
              `` + (dragd.current[i][index] !== "" ? yval.toFixed(2) : "")
            );
          }
          lo.push(
            draga.current[i][index] +
              (dragd.current[i][index] !== "" ? yval.toFixed(2) : "")
          );
          if (
            movedata.includes(index) &&
            +zod-yval <= digital &&
            +zod-yval >= -digital
          ) {
            lo.splice(
              lo.length - 1,
              1,
              draga.current[i][index] +
                zod
            );
          }
        }
      } else {
        lo.push(draga.current[i][index] + dragd.current[i][index]);
        if (boolpoly) {
          targetObject.current[a][0].removeAttribute("data-poly");
        }
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
