import { bendCntrlDragLine, cntrlFromPoint, lineDrag } from "../Fx";
import { reDefine } from "../Vredefine";
import { MZOnZDrag, elementFx, gensyncDragpoint, mzsynctrls, syncMZOnZ } from "../mZSync";
import { AddBend } from "./AddBend";
import { AddPath } from "./AddPath";
import { CntrlBend, CtrlMotion } from "./CntrlBend";
import { getPathData } from "./GetPath";
import { vectorPathData } from "./GetVectorPath";
import { pointbend } from "./PointBend";
export let PointerDown = (e, context) => {
  let cwidth = context.cwidth;
  let cheight = context.cheight;
  let setRender = context.setRender;
  let hovercolor = context.hovercolor;
  let vg = context.vg;
  let edit = context.edit;
  let target = context.target;
  let vgcolor = context.vgcolor;
  let targetObject = context.targetObject;
  let vx = context.vx;
  let vy = context.vy;
  let editdrag = context.editdrag;
  let dragx = context.dragx;
  let dragy = context.dragy;
  let dragd = context.dragd;
  let draga = context.draga;
  let dragbool = context.dragbool;
  let dragrect = context.dragrect;
  let drag = context.drag;
  let pick = context.pick;
  let highlight = context.highlight;
  let alignedline = context.alignedline;
  let gendragorclick = context.gendragorclick;
  let shapes = context.shapes;
  let shapebool = context.shapebool;
  let shapedown = context.shapedown;
  let lockdrag = context.lockdrag;
  let rotatedown = context.rotatedown;
  let rotatewheel = context.rotatewheel;
  let vectoredit = context.vectoredit;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vDragpointsArr = context.vDragpointsArr;
  let velement = context.velement;
  let vectordrag = context.vectordrag;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let vectorctrmixed = context.vectorctrmixed;
  let vctrline = context.vctrline;
  let centercirbool = context.centercirbool;
  let vage = context.vage;
  let replacerange = context.replacerange;
  let rangerage = context.rangerage;
  let hidectr = context.hidectr;
  let bend = context.bend;
  let ashen = context.ashen;
  let whitecolor = context.whitecolor;
  let bluecolor = context.bluecolor;
  let backgroundData = context.backgroundData;
  let purplecolor = context.purplecolor;
  let rotatetype = context.rotatetype;
  let mirror = context.mirror;
  let mirrorbool = context.mirrorbool;
  let vhighlightbool = context.vhighlightbool;
  let highlightveditboolpoint = context.highlightveditboolpoint;
  let vdoormo = context.vdoormo;
  let vdoormop = context.vdoormop;
  let bendclient = context.bendclient;
  let circlerad = context.circlerad;
  let dataX =
    (e.clientX - vg.current.getBoundingClientRect().x) *
      (cwidth.current / vg.current.clientWidth) +
    vx.current;
  let dataY =
    (e.clientY - vg.current.getBoundingClientRect().y) *
      (cheight.current / vg.current.clientHeight) +
    vy.current;
  alignedline.current = [];
  if (vectoredit.current) {
    mirror.current = [];
    if (e.target.localName == "svg") {
      highlightveditboolpoint.current = true;
      pick.current = [];
      drag.current = false;
      highlight.current = true;
      pick.current.push(dataX, dataY);
    } else {
      if (
        !bend.current &&
        vhighlightbool.current &&
        (velement.current[0].includes(e.target) ||
          velement.current[1].includes(e.target) ||
          velement.current[2].includes(e.target) ||
          velement.current[3].includes(e.target))
      ) {
        dragd.current = [];
        draga.current = [];
        getPathData(context);
        vectorPathData(context);
        dragx.current = dataX;
        dragy.current = dataY;
        vectordrag.current = true;
      } else {
        if (
          backgroundData.current == "#646464" ||
          backgroundData.current == "black"
        ) {
          bluecolor.current = "white";
          purplecolor.current = "white";
        }
        vhighlightbool.current = false;
        if (e.target.getAttribute("name")?.includes("art$")) {
          velement.current[0]?.map((m) => {
            m?.setAttribute("fill", whitecolor.current);
            m?.setAttribute("stroke", ashen.current);
          });
          velement.current[1]?.map((m) => {
            m?.setAttribute("fill", whitecolor.current);
            m?.setAttribute("stroke", bluecolor.current);
            m?.setAttribute("r", circlerad.current[0]);
          });
          velement.current[2]?.map((m) => {
            m?.setAttribute("fill", whitecolor.current);
            m?.setAttribute("stroke", purplecolor.current);
            m?.setAttribute("r", circlerad.current[0]);
          });
          velement.current[3]?.map((m) => {
            m.classList.remove("highlightblue");
            m.classList.remove("cloneblue");
          });
          velement.current = [[], [], [], []];
        }
        if (e.target.getAttribute("name")?.includes("cloneart$")) {
          vDragpointsArr.current = [];
          velement.current[3].push(e.target);
          vDragpointsArr.current = e.target
            .getAttribute("data-value")
            .split(" ")
            .map((e) => +e);
          vectorctrmixed.current = [];
          vctrline.current = [];
          let ndx = e.target
            .getAttribute("data-value")
            .split(" ")
            .map((e) => +e)
            .slice(0, 2);
          let pointx = e.target
            .getAttribute("data-value")
            .split(" ")
            .map((e) => +e);

          if (vDragpointsArr.current.length > 4) {
            if (bend.current) {
              vDragpointsArr.current = [];
              vectorctrmixed.current = [];
              vctrline.current = [];
              bendCntrlDragLine(context, ndx);
              vectordrag.current = true;
            } else {
              let dataq = syncMZOnZ(context, pointx);
              vDragpointsArr.current = [];
              vectorctrmixed.current = [];
              vctrline.current = [];
              lineDrag(context, pointx, 0, 1, 6, 7);
              if (dataq !== undefined) {
                MZOnZDrag(context, dataq[0], dataq[0] + 1);
              }
            }
          } else {
            if (bend.current) {
              vDragpointsArr.current = [];
              vage.current = e.target
                .getAttribute("data-value")
                .split(" ")
                .map((e) => +e)
                .slice(0, 2);

              vage.current.push(
                e.target.getPointAtLength((2 * e.target.getTotalLength()) / 5).x
              );
              vage.current.push(
                e.target.getPointAtLength((2 * e.target.getTotalLength()) / 5).y
              );
              vage.current.push(
                e.target.getPointAtLength(
                  e.target.getTotalLength() -
                    (2 * e.target.getTotalLength()) / 5
                ).x
              );
              vage.current.push(
                e.target.getPointAtLength(
                  e.target.getTotalLength() -
                    (2 * e.target.getTotalLength()) / 5
                ).y
              );

              dragd.current = [];
              draga.current = [];
              getPathData(context);
              vectorPathData(context);
              AddPath(context);
              reDefine(context);
              bendCntrlDragLine(context, ndx);
            } else {
              let dataq = syncMZOnZ(context, pointx);
              vDragpointsArr.current = [];
              vectorctrmixed.current = [];
              vctrline.current = [];
              lineDrag(context, pointx, 0, 1, 2, 3);
              if (dataq !== undefined) {
                MZOnZDrag(context, dataq[0], dataq[0] + 1);
              }
            }
          }
          dragd.current = [];
          draga.current = [];
          getPathData(context);
          !bend.current && gensyncDragpoint(context);
          vectorPathData(context);
          dragx.current = dataX;
          dragy.current = dataY;
          vectordrag.current = true;
          setRender((r) => r + 1);
        } else if (
          e.target.getAttribute("name")?.includes("centercircleart$")
        ) {
          //assuming break is strictly line point to point
          let dataarr = [centercirbool.current[4]];
          ////////////////////////////////////////////////
          dragd.current = [];
          draga.current = [];
          getPathData(context);
          vectorPathData(context);
          if (draga.current[0][vage.current[0]] == `C`) {
            //assuming break is curve point to point
            dataarr = [+vage.current[0] + 2];
            vDragpointsArr.current = [
              dataarr[0],
              dataarr[0] + 1,
              dataarr[0] + 2,
              dataarr[0] + 3,
              dataarr[0] + 4,
              dataarr[0] + 5,
            ];
          } else {
            vDragpointsArr.current = [dataarr[0] + 2, dataarr[0] + 3];
          }
          AddPath(context);
          reDefine(context);
          setRender((r) => r + 1);
          dragd.current = [];
          draga.current = [];
          getPathData(context);
          vectorPathData(context);
          dragx.current = dataX;
          dragy.current = dataY;
          vectordrag.current = true;
        }

        ////////////////////////////////////////
        else if (
          !e.target.getAttribute("name")?.includes("art$") &&
          e.target.localName == "path" &&
          e.target == target.current[0]
        ) {
          drag.current = true;
          draga.current = [];
          dragd.current = [];
          dragx.current = dataX;
          dragy.current = dataY;
          /*
            getPathData(context);
            vectorPathData(context);
            vectordrag.current = true;
          */
          ///*
            getPathData(context);
            editdrag.current = true;
          //*/
        } else {
          if (
            e.target.getAttribute("name")?.includes("vcirart$") ||
            e.target.getAttribute("name")?.includes("vlineart$")
          ) {
            bendclient.current = [e.clientX, e.clientY];
            hidectr.current = [];
            if (e.target.getAttribute("name")?.includes("vcirart$")) {
              velement.current[2].push(e.target);
              let pointcenter = +e.target.getAttribute("data-value");
              vDragpointsArr.current = [pointcenter, pointcenter + 1];
            }
            if (e.target.getAttribute("name")?.includes("vlineart$")) {
              velement.current[1].push(e.target);
              let pointcenter = +e.target.getAttribute("data-value");
              vctrline.current = [];
              vectorctrmixed.current = [];
              vDragpointsArr.current = [pointcenter, pointcenter + 1];
            }
            dragd.current = [];
            draga.current = [];
            getPathData(context);
            gensyncDragpoint(context);
            pointbend(context);
            if (bend.current) {
                 vdoormop.current = true;
            }
            dragx.current = dataX;
            dragy.current = dataY;
            vectordrag.current = true;
          }
          if (e.target.getAttribute("name")?.includes("vctrart$")) {
            velement.current[0].push(e.target);
            let ctrpoint = +e.target.getAttribute("data-value");
            if (bend.current) {
              vdoormo.current = true;
            }
            /*CntrlBend(context,ctrpoint)*/
            CtrlMotion(context, ctrpoint);
            dragd.current = [];
            draga.current = [];
            getPathData(context);
            dragx.current = dataX;
            dragy.current = dataY;
            vectordrag.current = true;
          }
        }
   if (
     backgroundData.current == "#646464" ||
     backgroundData.current == "black"
   ) {
     bluecolor.current = "#2572B8";
     purplecolor.current = "#2572B8";
   }
        velement.current[0]?.map((m) => {
          m.setAttribute("fill", ashen.current);
          m.setAttribute("stroke", whitecolor.current);
        });
        velement.current[1]?.map((m) => {
          m.setAttribute("fill", bluecolor.current);
          m.setAttribute("stroke", whitecolor.current);
          m?.setAttribute("r", circlerad.current[5]);
        });
        velement.current[2]?.map((m) => {
          m.setAttribute("fill", purplecolor.current);
          m.setAttribute("stroke", whitecolor.current)
          m?.setAttribute("r", circlerad.current[5]);;
        });
        velement.current[3]?.map((m) => {
            m.classList.add("cloneblue");
            m.classList.remove("highlightblue");
        });
      }
    }
    setRender((r) => r + 1);
  } else {
    if (!edit.current && shapes.current) {
      pick.current = [];
      drag.current = false;
      highlight.current = false;
      pick.current.push(dataX, dataY);
      shapebool.current = true;
      shapedown.current = true;
      setRender((r) => r + 1);
    }
    if (edit.current && hovercolor.current >= 0) {
      if (!e.target.getAttribute("name")?.includes("art$")) {
        target.current = [];
        dragd.current = [];
        draga.current = [];
        gendragorclick.current = false;
        let ObjectData = targetObject.current;
        dragbool.current = false;
        if (!e.ctrlKey) {
          targetObject.current = {};
          dragd.current = [];
          draga.current = [];
        }

        target.current.push(
          Array.from(vg.current.children).filter(
            (e) => !e.getAttribute("name")?.includes("art$")
          )[hovercolor.current]
        );
        target.current.push(target.current[0].getBBox().x);
        target.current.push(target.current[0].getBBox().y);
        target.current.push(target.current[0].getBBox().width);
        target.current.push(target.current[0].getBBox().height);
        target.current.push(target.current[1] + target.current[3]);
        target.current.push(target.current[2] + target.current[4]);
        target.current.push(hovercolor.current);
       /*
        target.current[0].setAttribute(
          "stroke",
          vgcolor.current[hovercolor.current]
        );
        */
        ///*
        Object.values(ObjectData).filter((e) => e[0] === target.current[0])
          .length
          ? e.ctrlKey
            ? delete targetObject.current[hovercolor.current] //in obj del on cntrl
            : (gendragorclick.current = true) //in obj new or drag
          : (targetObject.current[hovercolor.current] = target.current); //not in obj
        //*/
        if (gendragorclick.current) {
          targetObject.current = ObjectData;
          targetObject.current[hovercolor.current] = target.current;
        }
        // targetObject.current[hovercolor.current] = target.current;
        if (
          dataX >= dragrect.current[0] &&
          dataX <= dragrect.current[1] &&
          dataY >= dragrect.current[2] &&
          dataY <= dragrect.current[3]
        ) {
          drag.current = true;
        } else {
          drag.current = false;
        }
        setRender((r) => r + 1);
      }
    } else {
      if (edit.current) {
        if (
          e.target.getAttribute("name") === "rectcirart$" ||
          e.target.getAttribute("name") === "rectart$"
        ) {
          dragd.current = [];
          draga.current = [];
          dragx.current = dataX;
          dragy.current = dataY;
          lockdrag.current = true;
          getPathData(context);
        } else if (e.target.getAttribute("name") === "rotcirart$") {
          dragd.current = [];
          draga.current = [];
          dragx.current = dataX;
          dragy.current = dataY;
          rotatedown.current = true;
          rotatewheel.current = true;
          rotatetype.current = e.target.getAttribute("data-rotate");
        } else {
          if (
            dataX >= dragrect.current[0] &&
            dataX <= dragrect.current[1] &&
            dataY >= dragrect.current[2] &&
            dataY <= dragrect.current[3]
          ) {
            drag.current = true;
            highlight.current = false;
          } else {
            pick.current = [];
            drag.current = false;
            highlight.current = true;
            pick.current.push(dataX, dataY);
          }
          if (!e.ctrlKey) {
            dragbool.current = true;
            dragd.current = [];
            draga.current = [];
          } else {
            dragbool.current = true;
          }
        }
      }
    }
    if (
      //Object.keys(targetObject.current).length > 0 &&
      edit.current &&
      !lockdrag.current &&
      !rotatedown.current
    ) {
      //////
      drag.current = true;
      dragd.current = [];
      draga.current = [];
      //////
      dragx.current = dataX;
      dragy.current = dataY;
      getPathData(context);
      editdrag.current = true;
    }
  }
};
