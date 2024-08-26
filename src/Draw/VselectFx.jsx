import { cntrlFromPoint, lineDrag, multiLineFx } from "./Fx";
import { MZOnZDrag, gensyncDragpoint, mzsyncpoints, noduplicate, syncMZOnZ } from "./mZSync";
export let Vselect = (context, el) => {
  let velement = context.velement;
  let vDragpointsArr = context.vDragpointsArr;
  let vectorctrmixed = context.vectorctrmixed;
  let vectorGp = context.vectorGp;
  let vectora=context.vectora
  let vectord=context.vectord
  if (el.getAttribute("name")?.includes("cloneart$")) {
    velement.current[3].push(el);
    let listno = el
      .getAttribute("data-value")
      .split(" ")
      .map((e) => +e);
    let pointx = el
      .getAttribute("data-value")
      .split(" ")
      .map((e) => +e);

    if (listno.length > 4) {
     let dataq = syncMZOnZ(context, pointx);
      lineDrag(context, pointx, 0, 1, 6, 7);
      if (dataq !== undefined) {
     MZOnZDrag(context, dataq[0], dataq[0] + 1);
      }
    } else {
      let dataq = syncMZOnZ(context, pointx);
      lineDrag(context, pointx, 0, 1, 2, 3);
      if (dataq !== undefined) {
        MZOnZDrag(context, dataq[0], dataq[0] + 1);
      }
    }
         noduplicate(vDragpointsArr.current);
         gensyncDragpoint(context);
  } else if (el.getAttribute("name")?.includes("vcirart$")) {
    velement.current[2].push(el);
    let cntrl12 = cntrlFromPoint(
      context,
      +el.getAttribute("data-value")
    ).filter((f) => f !== `seperator`);
    let indexData = vectorGp.current.indexOf(+el.getAttribute("data-value"));
    let pointbfr = vectorGp.current[indexData - 2];
    let pointaft = vectorGp.current[indexData + 2];
    let pointcenter = +el.getAttribute("data-value");

    let cntrl34 = cntrlFromPoint(context, pointbfr).filter(
      (f) => f !== `seperator`
    );
    let cntrl56 = cntrlFromPoint(context, pointaft).filter(
      (f) => f !== `seperator`
    );
    vDragpointsArr.current.push(
      pointcenter,
      pointcenter + 1,
      ...cntrl12 //,...cntrl34,...cntrl56
    );
    vectorctrmixed.current.push(...cntrl12, ...cntrl34, ...cntrl56);
    multiLineFx(context, cntrl12, pointcenter);
    multiLineFx(context, cntrl34, pointbfr);
    multiLineFx(context, cntrl56, pointaft);
    //mz sync
    mzsyncpoints(context, pointcenter, el);
             noduplicate(vDragpointsArr.current);
             gensyncDragpoint(context);
    
  } else if (el.getAttribute("name")?.includes("vlineart$")) {
    velement.current[1].push(el);
      vDragpointsArr.current.push(
        +el.getAttribute("data-value"),
        +el.getAttribute("data-value") + 1
      );/*
    if (!vDragpointsArr.current.includes(+el.getAttribute("data-value"))) {
      vDragpointsArr.current.push(
        +el.getAttribute("data-value"),
        +el.getAttribute("data-value") + 1
      );
      let pointcenter = +el.getAttribute("data-value");
      //mz sync
      mzsyncpoints(context, pointcenter, el);
    }
      */
             noduplicate(vDragpointsArr.current);
             gensyncDragpoint(context);
  } else if (el.getAttribute("name")?.includes("vctrart$")) {
    velement.current[0].push(el);
    vDragpointsArr.current.push(
      +el.getAttribute("data-value"),
      +el.getAttribute("data-value") + 1,
    );
             noduplicate(vDragpointsArr.current);
             gensyncDragpoint(context);
  }
};