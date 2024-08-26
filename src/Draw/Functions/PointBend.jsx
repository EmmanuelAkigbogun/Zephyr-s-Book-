import { cntrlFromPoint } from "../Fx";
import { reDefine } from "../Vredefine";
import { gensyncDragpoint, noduplicate } from "../mZSync";
import { AddBend } from "./AddBend";
import { addDef } from "./AddDef";
import { getPathData } from "./GetPath";
import { vectorPathData } from "./GetVectorPath";
import { Remove } from "./Remove";
export let AddReplace = (context, type) => {
  let vectord = context.vectord;
  let vectora = context.vectora;
  let dragd = context.dragd;
  let draga = context.draga;
  addDef(context, type);
  dragd.current = [];
  draga.current = [];
  getPathData(context);
  vectord.current = [];
  vectora.current = [];
  vectorPathData(context);
  AddBend(context, ``);
  reDefine(context);
  dragd.current = [];
  draga.current = [];
  getPathData(context);
  vectord.current = [];
  vectora.current = [];
  vectorPathData(context);
  gensyncDragpoint(context);
};
export let pointbend = (context) => {
  let vDragpointsArr = context.vDragpointsArr;
  let vectorCL = context.vectorCL;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let dragd = context.dragd;
  let draga = context.draga;
  let vectorGp = context.vectorGp;
  let fullC = context.fullC;
  let hidectr = context.hidectr;
  let bend = context.bend;
  ///////////bend////
  if (bend.current) {
    noduplicate(vDragpointsArr.current);
    noduplicate(vectorCL.current);
    noduplicate(fullC.current);
    let removeCp = vDragpointsArr.current.filter(
      (f) => !vectorCL.current.includes(f)
    );
    let vdlength = vDragpointsArr.current.length;
    if (removeCp.length == vdlength) {
      ////////no cntrl
      //add
      console.log("no ctl add valid");
      let type = `add`;
      AddReplace(context, type);
    } else if (
      vDragpointsArr.current.filter((f) => fullC.current.includes(f)).length ===
      vDragpointsArr.current.filter((f) => vectorGp.current.includes(f)).length
    ) {
      ////// all cntr
      let alldragpoint = vDragpointsArr.current.map(
        (m) => +dragd.current[0][m]
      );
      console.log("all cntrl");

      let dpointctr = vDragpointsArr.current
        .filter((f) => !vectorGp.current.includes(f))
        .map((m, i) => {
          if (i % 2 == 0) {
            return `${+dragd.current[0][m]} ${+dragd.current[0][m + 1]}`;
          } else {
            return null;
          }
        })
        .filter((f) => f !== null);
      let dpoint = vDragpointsArr.current
        .filter((f) => vectorGp.current.includes(f))
        .map((m, i) => {
          if (i % 2 == 0) {
            return `${+dragd.current[0][m]} ${+dragd.current[0][m + 1]}`;
          } else {
            return null;
          }
        })
        .filter((f) => f !== null);
      let pdpointctr = [...dpointctr];
      noduplicate(alldragpoint);
      noduplicate(dpointctr);
      dpointctr = dpointctr.filter((f) => !dpoint.includes(f));
      if (alldragpoint.length <= 2) {
        ////all in//////
        console.log(`all in show valid`);
        let type = `replace`;
        AddReplace(context, type);
        ////show//////
      } else if (dpointctr.length == pdpointctr.length) {
        /////////none in//////
        //////hide///
        console.log(`none in hide valid`);
        let arrayd = vDragpointsArr.current.filter((f) =>
          vectorGp.current.includes(f)
        );
        arrayd.map((m, i) => {
          if (i % 2 == 0) {
            let cntrl = cntrlFromPoint(context, m).filter(
              (f) => f !== `seperator`
            );
            cntrl.map((f, i) => {
              if (i % 2 == 0) {
                hidectr.current[f] = m;
              } else {
                hidectr.current[f] = m + 1;
              }
            });
          }
        });
        dragd.current = [];
        draga.current = [];
        getPathData(context);
        Remove(context);
        vectord.current = [];
        vectora.current = [];
        vectorPathData(context);
      } else {
        ///////mixed cntrl////
        let type = `mixed`;
        AddReplace(context, type);
        console.log(`all ctrl mixed valid`);
      }
    } else {
      /////mixed cntrl
      let type = `mixed`;
      addDef(context, type);
      AddReplace(context, type);
      console.log(`not all ctrl mixed valid`);
    }
  }
};
