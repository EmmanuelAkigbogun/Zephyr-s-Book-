import { cntrlFromPoint } from "../Fx";
import { reDefine } from "../Vredefine";
import { elementFx, gensyncDragpoint, mzsynctrls } from "../mZSync";
import { AddBend } from "./AddBend";
import { getPathData } from "./GetPath";
import { vectorPathData } from "./GetVectorPath";
import { checkctr, ctrlDef } from "./ctrChecks";
export let CntrlBend=(context,ctrpoint)=>{
  let dragd = context.dragd;
  let draga = context.draga;
  let vectorCi = context.vectorCi;
  let vDragpointsArr = context.vDragpointsArr;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let replacerange = context.replacerange;
  let rangerage = context.rangerage;
  let bend = context.bend;
if (bend.current) {
  dragd.current = [];
  draga.current = [];
  getPathData(context);
  vectord.current = [];
  vectora.current = [];
  vectorPathData(context);
  replacerange.current = {};
  rangerage.current = {};
  let point = [];
  if (vectorCi.current.includes(ctrpoint)) {
    point = [ctrpoint - 2, ctrpoint - 1];
  } else {
    point = [ctrpoint + 2, ctrpoint + 3];
  }
  replacerange.current[ctrpoint] = +dragd.current[0][point[0]];
  replacerange.current[ctrpoint + 1] = +dragd.current[0][point[1]];
  AddBend(context, `replace`);
  reDefine(context);
  vDragpointsArr.current = [...point];
  dragd.current = [];
  draga.current = [];
  getPathData(context);
  vectord.current = [];
  vectora.current = [];
  vectorPathData(context);
  gensyncDragpoint(context);
} 
}
export let CtrlMotion = (context, ctrpoint) => {
  let vectorCi = context.vectorCi;
  let vDragpointsArr = context.vDragpointsArr;
  let mirrorbool = context.mirrorbool;
  if (mirrorbool.current !== ``) {
    ////////////////////////////////////////
    let cntrl12 = [];
    let pointcenter = 0;
    if (vectorCi.current.includes(ctrpoint)) {
      pointcenter = ctrpoint - 2;
    } else {
      pointcenter = ctrpoint + 2;
    }
    cntrl12 = cntrlFromPoint(context, pointcenter);
    let val = checkctr(cntrl12);
    if (val == `cjci`) {
      ctrlDef(context, cntrl12, cntrl12, pointcenter, ctrpoint);
    }
    /////////////////////////////////////////////
    else {
      ////////////////
      let element = elementFx(context, pointcenter);
      if (element !== undefined) {
        let returnval = mzsynctrls(context, element);
        if (returnval.length !== 0) {
          ctrlDef(context, cntrl12, returnval, pointcenter, ctrpoint);
        }
        /////////////////////////
        else {
          vDragpointsArr.current = [ctrpoint, ctrpoint + 1];
        }
      } else {
        vDragpointsArr.current = [ctrpoint, ctrpoint + 1];
      }
    }
  } else {
    vDragpointsArr.current = [ctrpoint, ctrpoint + 1];
  }
};