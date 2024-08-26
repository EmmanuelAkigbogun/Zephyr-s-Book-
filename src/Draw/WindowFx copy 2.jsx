import { useContext, useEffect, useRef } from "react";
import { Context } from "./Draw";
import { keydownfx } from "./Download";
import { penAngleLength} from "./Functions/Mouse";
import { setPathData } from "./Functions/SetPath";
import { getPathData } from "./Functions/GetPath";
import { setRz } from "./Functions/SetRz";
import { vectorPathData } from "./Functions/GetVectorPath";
import { setPathDataV } from "./Functions/SetPathV";
import { reDefine } from "./Vredefine";
import {
  gensyncDragpoint,
  noduplicate,
} from "./mZSync";
import { getRotateAngle } from "./Functions/getRotateAngle";
import { BfrSetPathV } from "./Functions/BfrSetPathV";
import { highlightMove, highlightVMove } from "./highlight";
import { PointerDown } from "./Functions/PointerDown";
import { AddBend } from "./Functions/AddBend";
import { CntrlBend, CtrlMotion } from "./Functions/CntrlBend";
function WindowFx() {
  let context = useContext(Context);
  let cwidth = context.cwidth;
  let cheight = context.cheight;
  let setRender = context.setRender;
  let hovercolor = context.hovercolor;
  let canvas = context.canvas;
  let link = context.link;
  let vg = context.vg;
  let edit = context.edit;
  let target = context.target;
  let straightcolor = context.straightcolor;
  let vgcolor = context.vgcolor;
  let vgpath = context.vgpath;
  let vgkey = context.vgkey;
  let vgpathxy = context.vgpathxy;
  let targetObject = context.targetObject;
  let thick = context.thick;
  let bBoxColor = context.bBoxColor;
  let vx = context.vx;
  let vy = context.vy;
  let editdrag = context.editdrag;
  let dragx = context.dragx;
  let dragy = context.dragy;
  let dragd = context.dragd;
  let draga = context.draga;
  let ctx = context.ctx;
  let dragbool = context.dragbool;
  let dragrect = context.dragrect;
  let drag = context.drag;
  let pick = context.pick;
  let highlight = context.highlight;
  let movepen = context.movepen;
  let downconst = context.downconst;
  let alignedline = context.alignedline;
  let pencirclearr = context.pencirclearr;
  let pen = context.pen;
  let penpause = context.penpause;
  let penendindex = context.penendindex;
  let gendragorclick = context.gendragorclick;
  let shapes = context.shapes;
  let shapebool = context.shapebool;
  let rbox = context.rbox;
  let circle = context.circle;
  let ellipse = context.ellipse;
  let polyelip = context.polyelip;
  let shapedown = context.shapedown;
  let cursor = context.cursor;
  let eliele = context.eliele;
  let lockdrag = context.lockdrag;
  let rotatedown = context.rotatedown;
  let rotatewheel = context.rotatewheel;
  let rcursor = context.rcursor;
  let vectorindex = context;
  let vectoredit = context.vectoredit;
   let velindex = context.velindex;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vectorCp = context.vectorCp;
  let vectorCL = context.vectorCL;
  let vectorGp = context.vectorGp;
  let vectorP = context.vectorP;
  let vDragpointsArr = context.vDragpointsArr;
  let velement = context.velement;
  let vectordrag = context.vectordrag;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let vectorctrmixed = context.vectorctrmixed;
  let vctrline = context.vctrline;
  let vectorBtwP = context.vectorBtwP;
  let centercirclearr = context.centercirclearr;
  let centercirbool = context.centercirbool;
  let vage = context.vage;
  let replacerange = context.replacerange;
  let rangerage = context.rangerage;
  let removectr = context.removectr;
  let hidectr = context.hidectr;
  let bend = context.bend;
  let ashen = context.ashen;
  let rotatetype = context.rotatetype;
  let mirror = context.mirror;
  let mirrorbool = context.mirrorbool;
  let mouseon = context.mouseon;
  let vhighlightbool = context.vhighlightbool;
  let highlightveditboolpoint = context.highlightveditboolpoint;
  let vdoormo = context.vdoormo;
    let vdoormop = context.vdoormop;
  useEffect(() => {
    window.onresize = (e) => {
      ///*
      cwidth.current = window.innerWidth;
      cheight.current = window.innerHeight;
      setRender((r) => r + 1);
      //*/
    };
    window.onkeydown = (e) => {
      let hovervalue = null;
      if (e.ctrlKey) {
      } else {
        vgpathxy.current = {};
        if (
          e.key === "Delete" &&
          Object.values(targetObject.current).length > 0
        ) {
          if (hovercolor.current === -1) {
          } else {
            hovervalue = Array.from(vg.current.children)[hovercolor.current];
          }
          Object.values(targetObject.current)
            .reverse()
            .map((m) => {
              keydownfx(e, context, m[7]);
            });

          if (hovervalue !== null) {
            hovercolor.current = Array.from(vg.current.children)
              .filter((f) => !f.getAttribute("name")?.includes("art$"))
              .map((m, i) => {
                if (hovervalue === m) {
                  return i;
                }
              })
              .filter((e) => e !== undefined)[0];
            setRender((r) => r + 1);
          } else {
            hovercolor.current = -1;
            setRender((r) => r + 1);
          }
          targetObject.current = {};
        } else {
          // edit draw download
          const lengthval = vgpath.current.length;
          keydownfx(e, context, "m");
          setRender((r) => r + 1);
          setTimeout(() => {
            if (e.shiftKey && (e.key == "D" || e.key == "d")) {
              let elemArr = Array.from(vg.current.children).filter(
                (f) => !f.getAttribute("name")?.includes("art$")
              );
              Object.keys(targetObject.current).map((m, i) => {
                const attn = targetObject.current[m][0].getAttributeNames();
                for (let index = 0; index < attn.length; index++) {
                  const attr = attn[index];
                  const val = targetObject.current[m][0].getAttribute(attr);
                  elemArr[lengthval + i].setAttribute(attr, val);
                }
              });
            }
          }, 10);
        }
      }
    };
    window.ondblclick = (e) => {
      if (vectoredit.current) {
        vectorindex.current = [];
        vectorCi.current = [];
        vectorCj.current = [];
        vectorCp.current = [];
        vectorCL.current = [];
        vectorGp.current = [];
        vectorP.current = [];
        vectoredit.current = false;
        vctrline.current = [];
        vectorctrmixed.current = [];
        vDragpointsArr.current = [];
        dragd.current = [];
        draga.current = [];
        vectord.current = [];
        vectora.current = [];
        alignedline.current = [];
        vectordrag.current = false;
        bend.current = false;
        // target.current[0].classList.remove("none");
        let el = target.current[0];
        target.current = [];
        targetObject.current = {};
        target.current.push(el);
        target.current.push(target.current[0].getBBox().x);
        target.current.push(target.current[0].getBBox().y);
        target.current.push(target.current[0].getBBox().width);
        target.current.push(target.current[0].getBBox().height);
        target.current.push(target.current[1] + target.current[3]);
        target.current.push(target.current[2] + target.current[4]);
        target.current.push(Array.from(vg.current.children).indexOf(el));
        targetObject.current[Array.from(vg.current.children).indexOf(el)] =
          target.current;
      } else {
        if (
          !e.target.getAttribute("name")?.includes("art$") &&
          e.target.localName === "path"
        ) {
          reDefine(context);
        }
      }
      setRender((r) => r + 1);
    };
    window.onpointerdown = (e) => {
      if (edit.current||(vectoredit.current&&!pen.current)||shapes.current) {
          PointerDown(e, context);
      }
      else{
    
      }
    };
    window.onpointermove = (e) => {
      let x =
        (e.clientX - vg.current.getBoundingClientRect().x) *
          (cwidth.current / vg.current.clientWidth) +
        vx.current;
      let y =
        (e.clientY - vg.current.getBoundingClientRect().y) *
          (cheight.current / vg.current.clientHeight) +
        vy.current;
      if (
        (mouseon.current &&
          x <= centercirbool.current[0] &&
          x >= centercirbool.current[2] &&
          x <= centercirbool.current[0] &&
          x >= centercirbool.current[2]) ||
        (y <= centercirbool.current[1] &&
          y >= centercirbool.current[3] &&
          y <= centercirbool.current[1] &&
          y >= centercirbool.current[3])
      ) {
      } else {
        centercirclearr.current = [];
        mouseon.current = false;
        setRender((r) => r + 1);
      }
      if (pen.current) {
        movepen.current = `${x} ${y}`;
        cursor.current = `none`;
      }
      if (polyelip.current[0] && !vectoredit.current) {
        polyelip.current[2] = `${"0"} ${"0"} ${"0"} ${"0"}`;
      }
      if (vectoredit.current) {
        if (vectordrag.current) {
        if (vdoormo.current) {
          vdoormo.current = false;
        }
        if (vdoormop.current) {
          vdoormop.current = false;
          if (
            bend.current 
          ) {
            let ctrpoint = vDragpointsArr.current.filter(
              (f) =>
                vectorCi.current.includes(f) || vectorCj.current.includes(f)
            )[0];
            CntrlBend(context, ctrpoint);
            mirrorbool.current = `al`;
            CtrlMotion(context, ctrpoint);
          }
        }
          BfrSetPathV(context);
          setPathDataV(context, x, y);
          vectord.current = [];
          vectora.current = [];
          vectorPathData(context);
          setRender((r) => r + 1);
        } else if (drag.current && !highlight.current && editdrag.current) {
          dragbool.current = false;
          cursor.current = `grabbing`;
          setPathData(context, x, y);
          vectord.current = [];
          vectora.current = [];
          vectorPathData(context);
          //setTran(context, x - dragx.current, y - dragy.current);
          editdrag.current = true;
          setRender((r) => r + 1);
        } else {
          if (highlight.current) {
            vctrline.current = [];
            vectorctrmixed.current = [];
            vDragpointsArr.current = [];
            highlightveditboolpoint.current = false;
            let valw = x;
            let valh = y;
            let valx = pick.current[0];
            let valy = pick.current[1];
            highlightVMove(context, e, x, y, valx, valy, valw, valh);
            setRender((r) => r + 1);
          }
        }
      } else {
        if (rotatedown.current) {
          getRotateAngle(context, x, y);
          cursor.current = rcursor.current;
        }
        if (lockdrag.current) {
          dragbool.current = false;
          cursor.current = rcursor.current;
          let x1 = Object.keys(targetObject.current).map(
            (e) => targetObject.current[e][1]
          );
          x1 = Math.min(...x1);
          let x2 = Object.keys(targetObject.current).map(
            (e) => targetObject.current[e][5]
          );
          x2 = Math.max(...x2);
          let y1 = Object.keys(targetObject.current).map(
            (e) => targetObject.current[e][2]
          );
          y1 = Math.min(...y1);
          let y2 = Object.keys(targetObject.current).map(
            (e) => targetObject.current[e][6]
          );
          y2 = Math.max(...y2);

          pick.current[0] = x1;
          pick.current[1] = y1;
          pick.current[2] = x2;
          pick.current[3] = y2;
          //w1,w2,h1,h2
          let w1 = 1;
          let w2 = 1;
          let h1 = 1;
          let h2 = 1;
          let xn = 1;
          let yn = 1;
          if (rcursor.current == "se-resize") {
            w1 = x2 - x1;
            w2 = x - pick.current[0];
            h1 = y2 - y1;
            h2 = y - pick.current[1];
            if (h1 == 0) {
              h1 = 1;
              h2 = 1;
            }
            if (w1 == 0) {
              w1 = 1;
              w2 = 1;
            }
            xn = x1;
            yn = y1;
          } else if (rcursor.current == "sw-resize") {
            w1 = x1 - x2;
            w2 = x - pick.current[2];
            h1 = y2 - y1;
            h2 = y - pick.current[1];
            if (h1 == 0) {
              h1 = 1;
              h2 = 1;
            }
            if (w1 == 0) {
              w1 = 1;
              w2 = 1;
            }
            xn = x2;
            yn = y1;
          } else if (rcursor.current == "nw-resize") {
            w1 = x1 - x2;
            w2 = x - pick.current[2];
            h1 = y1 - y2;
            h2 = y - pick.current[3];
            if (h1 == 0) {
              h1 = 1;
              h2 = 1;
            }
            if (w1 == 0) {
              w1 = 1;
              w2 = 1;
            }
            xn = x2;
            yn = y2;
          } else if (rcursor.current == "ne-resize") {
            w1 = x2 - x1;
            w2 = x - pick.current[0];
            h1 = y1 - y2;
            h2 = y - pick.current[3];
            if (h1 == 0) {
              h1 = 1;
              h2 = 1;
            }
            if (w1 == 0) {
              w1 = 1;
              w2 = 1;
            }
            xn = x1;
            yn = y2;
          } else if (rcursor.current == "n-resize") {
            h1 = y1 - y2;
            h2 = y - pick.current[3];
            if (h1 == 0) {
              h1 = 1;
              h2 = 1;
            }
            xn = 1;
            yn = y2;
          } else if (rcursor.current == "s-resize") {
            h1 = y2 - y1;
            h2 = y - pick.current[1];
            if (h1 == 0) {
              h1 = 1;
              h2 = 1;
            }
            xn = 1;
            yn = y1;
          } else if (rcursor.current == "e-resize") {
            w1 = x2 - x1;
            w2 = x - pick.current[0];
            if (w1 == 0) {
              w1 = 1;
              w2 = 1;
            }
            xn = x1;
            yn = 1;
          } else if (rcursor.current == "w-resize") {
            w1 = x1 - x2;
            w2 = x - pick.current[2];
            if (w1 == 0) {
              w1 = 1;
              w2 = 1;
            }
            xn = x2;
            yn = 1;
          }
          if (y2 - y1 === 0 && x2 - x1 === 0) {
            setPathData(context, x, y);
            //setTran(context, x - dragx.current, y - dragy.current);
          } else if (y2 - y1 === 0 || x2 - x1 === 0) {
            if (
              rcursor.current == "s-resize" ||
              rcursor.current == "n-resize" ||
              rcursor.current == "e-resize" ||
              rcursor.current == "w-resize"
            ) {
              setPathData(context, x, y);
              //setTran(context, x - dragx.current, y - dragy.current);
            } else {
              setRz(
                context,
                xn,
                yn,
                w1, //w1
                w2, //w2
                h1, //h1
                h2 //h2
              );
            }
          } else {
            setRz(
              context,
              xn,
              yn,
              w1, //w1
              w2, //w2
              h1, //h1
              h2 //h2
            );
          }
        }

        let valw = x;
        let valh = y;
        let valx = pick.current[0];
        let valy = pick.current[1];

        if (
          (shapes.current && !edit.current && shapebool.current) ||
          lockdrag.current
        ) {
          let indexvalue = 0;
          if (shapedown.current) {
            indexvalue = vgpath.current.length;
            shapedown.current = false;
            vgcolor.current.push(`white`);
            straightcolor.current.push(`white`);
            vgkey.current.push(
              Math.random().toFixed(5) + vg.current.getCurrentTime().toFixed(5)
            );
          } else {
            indexvalue = vgpath.current.length - 1;
          }
          pick.current.splice(2, 1, valx);
          pick.current.splice(3, 1, valy);
          pick.current.splice(4, 1, valw);
          pick.current.splice(5, 1, valh);
          valw = Math.abs(x - pick.current[0]);
          valh = Math.abs(y - pick.current[1]);
          valx =
            pick.current[0] +
            (x - pick.current[0] < 0 ? x - pick.current[0] : 0);
          valy =
            pick.current[1] +
            (y - pick.current[1] < 0 ? y - pick.current[1] : 0);
          pick.current.splice(6, 1, `${valx + valw / 2}`);
          pick.current.splice(7, 1, `${valy + valh / 2}`);
          pick.current.splice(8, 1, `${valw / 2}`);
          pick.current.splice(9, 1, `${valh / 2}`);
          if (ellipse.current) {
            vgpath.current.splice(
              indexvalue,
              1,
              `ELLIPSE:${(valx + valw / 2).toFixed(2)} ${(
                valy +
                valh / 2
              ).toFixed(2)} ${(valw / 2).toFixed(2)} ${(valh / 2).toFixed(2)}`
            );
            /*
                   `M${pick.current[0] + (x - pick.current[0]) / 2} ${
                pick.current[1]
              }C${x + (x - pick.current[0]) / 6} ${pick.current[1]} ${x} ${
                pick.current[1] - (y - pick.current[1]) / 6
              } ${x} ${pick.current[1] + (y - pick.current[1]) / 2}C${x} ${
                y + (y - pick.current[1]) / 6
              } ${x + (x - pick.current[0]) / 6} ${y} ${
                pick.current[0] + (x - pick.current[0]) / 2
              } ${y}C${pick.current[0] - (x - pick.current[0]) / 6} ${y} ${
                pick.current[0]
              } ${y + (y - pick.current[1]) / 6} ${pick.current[0]} ${
                pick.current[1] + (y - pick.current[1]) / 2
              }C${pick.current[0]} ${
                pick.current[1] - (y - pick.current[1]) / 6
              } ${pick.current[0] - (x - pick.current[0]) / 6} ${
                pick.current[1]
              } ${pick.current[0] + (x - pick.current[0]) / 2} ${
                pick.current[1]
              }Z`
            */
            /*
                 `M${pick.current[0] + (x - pick.current[0]) / 2} ${
                pick.current[1]
              }C${x + (x - pick.current[0]) / 6} ${pick.current[1]} ${
                x + (x - pick.current[0]) / 6
              } ${y} ${pick.current[0] + (x - pick.current[0]) / 2} ${y}C${
                pick.current[0] - (x - pick.current[0]) / 6
              } ${y} ${pick.current[0] - (x - pick.current[0]) / 6} ${
                pick.current[1]
              } ${pick.current[0] + (x - pick.current[0]) / 2} ${
                pick.current[1]
              }Z`
           */
            /*
               `M${pick.current[0] + (x - pick.current[0]) / 2} ${
                pick.current[1]
              }C${x} ${pick.current[1]} ${x} ${
                pick.current[1]
              } ${x} ${pick.current[1] + (y - pick.current[1]) / 2}C${x} ${
                y 
              } ${x } ${y} ${
                pick.current[0] + (x - pick.current[0]) / 2
              } ${y}C${pick.current[0] } ${y} ${
                pick.current[0]
              } ${y } ${pick.current[0]} ${
                pick.current[1] + (y - pick.current[1]) / 2
              }C${pick.current[0]} ${
                pick.current[1] 
              } ${pick.current[0]} ${
                pick.current[1]
              } ${pick.current[0] + (x - pick.current[0]) / 2} ${
                pick.current[1]
              }Z` */
          } else if (circle.current) {
            vgpath.current.splice(
              indexvalue,
              1,
              `CIRCLE:${(valx + valw / 2).toFixed(2)} ${(
                valy +
                valh / 2
              ).toFixed(2)} ${(valh / 2).toFixed(2)}`
            );
          } else if (polyelip.current[0]) {
            let polynumber = 0;
            let polyguy = ``;
            let lengthval = eliele.current.current.getTotalLength();
            let numb = +polyelip.current[1];
            let increment = lengthval / numb;
            for (let index = 0; index < polyelip.current[1]; index++) {
              if (index === 0) {
                try {
                  let point =
                    eliele.current.current.getPointAtLength(polynumber);
                  polyguy =
                    polyguy + `M${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
                } catch (e) {}
              } else {
                try {
                  let point =
                    eliele.current.current.getPointAtLength(polynumber);
                  polyguy =
                    polyguy + `L${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
                } catch (e) {}
              }
              polynumber = polynumber + increment;
            }

            vgpath.current.splice(indexvalue, 1, `${polyguy}Z`);
            let elArr = Array.from(vg.current.children).filter(
              (e) => !e.getAttribute("name")?.includes("art$")
            );
            elArr[indexvalue]?.setAttribute("data-poly", `${numb}`);
            elArr[indexvalue]?.setAttribute("fill", `#ffffff11`);
          } else if (rbox.current) {
            vgpath.current.splice(
              indexvalue,
              1,
              `M${pick.current[0].toFixed(2)} ${pick.current[1].toFixed(
                2
              )}L${x.toFixed(2)} ${pick.current[1].toFixed(2)}L${x.toFixed(
                2
              )} ${y.toFixed(2)}L${pick.current[0].toFixed(2)} ${y.toFixed(2)}Z`
            );
          }
          setRender((r) => r + 1);
        }
        if (edit.current) {
          gendragorclick.current = false;
          if (
            drag.current &&
            !highlight.current &&
            editdrag.current &&
            Object.keys(targetObject.current).length > 0
          ) {
            dragbool.current = false;
            cursor.current = `grabbing`;
            setPathData(context, x, y);
            //setTran(context, x - dragx.current, y - dragy.current);
            editdrag.current = true;
            setRender((r) => r + 1);
          } else {
            if (highlight.current) {
              highlightMove(context, e, x, y, valx, valy, valw, valh);
              setRender((r) => r + 1);
            }
          }
        }
      }
    };
    window.onpointerup = (e) => {
      let dataX =
        (e.clientX - vg.current.getBoundingClientRect().x) *
          (cwidth.current / vg.current.clientWidth) +
        vx.current;
      let dataY =
        (e.clientY - vg.current.getBoundingClientRect().y) *
          (cheight.current / vg.current.clientHeight) +
        vy.current;

      if (vectoredit.current) {
        if (vdoormo.current) {
          if (e.target.getAttribute("name") == "vctrart$") {
                let ctrpoint = +e.target.getAttribute("data-value");
                CntrlBend(context,ctrpoint);
            setRender((r) => r + 1);
          } 
          vdoormo.current=false;
        }
        //highlight
        drag.current = false;
        pick.current = [0, 0, 0, 0];
        editdrag.current = false;
        cursor.current = ``;
        if (highlight.current && !highlightveditboolpoint.current) {
          vhighlightbool.current = true;
        }

        highlight.current = false;
        if (highlightveditboolpoint.current) {
          vctrline.current = [];
          vectorctrmixed.current = [];
          vDragpointsArr.current = [];
          velement.current[0]?.map((m) => {
            m?.setAttribute("fill", "white");
            m?.setAttribute("stroke", "white");
          });
          velement.current[1]?.map((m) => {
            m?.setAttribute("fill", "white");
            m?.setAttribute("stroke", "white");
          });
          velement.current[2]?.map((m) => {
            m?.setAttribute("fill", "white");
            m?.setAttribute("stroke", "white");
          });
          velement.current[3]?.map((m) => {
            m.setAttribute(
              "stroke",
              vgcolor.current[Object.keys(targetObject.current)[0]]
            );
          });
          velement.current = [[], [], [], []];
          highlightveditboolpoint.current = false;
          setRender((r) => r + 1);
        }
        //
        vectordrag.current = false;
        vectord.current = [];
        vectora.current = [];
        dragd.current = [];
        draga.current = [];
        getPathData(context);
        vectorPathData(context);
      } else {
        drag.current = false;
        pick.current = [0, 0, 0, 0];
        highlight.current = false;
        if (edit.current) {
          if (gendragorclick.current) {
            targetObject.current = {};
            targetObject.current[hovercolor.current] = target.current;
          }

          if (editdrag.current || lockdrag.current || rotatedown.current) {
            if (editdrag.current) {
              editdrag.current = false;
            }
            if (lockdrag.current) {
              lockdrag.current = false;
            }
            if (rotatedown.current) {
              rotatedown.current = false;
              Object.keys(targetObject.current).map((a, i) => {
                targetObject.current[a][0].setAttribute(
                  "rotate-data",
                  +targetObject.current[a][0]?.getAttribute("rotate-dataw") +
                    +targetObject.current[a][0]?.getAttribute("rotate-data")
                );
                targetObject.current[a][0].removeAttribute("rotate-dataw");
              });
            }
            if (
              e.target.getAttribute("cursor")?.includes("cursor") &&
              e.target.getAttribute("cursor")?.includes("art$")
            ) {
              cursor.current = rcursor.current;
            } else {
              cursor.current = ``;
            }

            Object.keys(targetObject.current).map((e) => {
              targetObject.current[e][1] =
                targetObject.current[e][0].getBBox().x;
              targetObject.current[e][2] =
                targetObject.current[e][0].getBBox().y;
              targetObject.current[e][3] =
                targetObject.current[e][0].getBBox().width;
              targetObject.current[e][4] =
                targetObject.current[e][0].getBBox().height;
              targetObject.current[e][5] =
                targetObject.current[e][1] + targetObject.current[e][3];
              targetObject.current[e][6] =
                targetObject.current[e][2] + targetObject.current[e][4];
            });
            if (dragbool.current) {
              targetObject.current = {};
            }
          }
          setRender((r) => r + 1);
        }
        if (shapes.current) {
          if (shapedown.current) {
            if (circle.current) {
              vgpath.current.push(`CIRCLE:${dataX} ${dataY} ${50}`);
              vgcolor.current.push(`white`);
              straightcolor.current.push(`white`);
            } else if (ellipse.current) {
              vgpath.current.push(`ELLIPSE:${dataX} ${dataY} ${100} ${50}`);
              vgcolor.current.push(`white`);
              straightcolor.current.push(`white`);
            } else if (rbox.current) {
              vgpath.current.push(
                `M${dataX} ${dataY} ${dataX + 100} ${dataY} ${dataX + 100} ${
                  dataY + 100
                } ${dataX} ${dataY + 100}Z`
              );
              vgkey.current.push(
                Math.random().toFixed(5) +
                  vg.current.getCurrentTime().toFixed(5)
              );
              vgcolor.current.push(`white`);
              straightcolor.current.push(`white`);
            }
            shapedown.current = false;
          }
          shapebool.current = false;
          setRender((r) => r + 1);
        }
      }
    };
    window.onpointerover = (e) => {
      let x =
        (e.clientX - vg.current.getBoundingClientRect().x) *
          (cwidth.current / vg.current.clientWidth) +
        vx.current;
      let y =
        (e.clientY - vg.current.getBoundingClientRect().y) *
          (cheight.current / vg.current.clientHeight) +
        vy.current;
      if (
        !e.target.getAttribute("name")?.includes("art$") &&
        e.target.localName != "html"
      ) {
        hovercolor.current = Array.from(vg.current.children)
          .filter((e) => !e.getAttribute("name")?.includes("art$"))
          .indexOf(e.target);
        edit.current && e.target.setAttribute("stroke", bBoxColor.current);
        if (
          Array.from(e.target.attributes)
            .map((m) => m.name)
            .filter((f) => f === "fill")[0] === "fill"
        ) {
        } else {
          edit.current && e.target.classList.add("fill");
        }
        edit.current &&
          e.target.setAttribute("stroke-width", thick.current + 1);
      }
      if (e.target.getAttribute("name")?.includes("cloneart$")) {
        e.target.setAttribute("stroke", `#007fff`);
        e.target.setAttribute("stroke-width", thick.current + 3);
        let curvearray = [];
        if (
          e.target
            .getAttribute("data-value")
            .split(" ")
            .map((e) => +e).length > 4
        ) {
          curvearray = e.target
            .getAttribute("data-value")
            .split(" ")
            .map((e) => +e)
            .map((m, i) => {
              if (i % 2 == 0) {
                return `${+dragd.current[0][m]} ${+dragd.current[0][m + 1]}`;
              } else {
                return null;
              }
            })
            .filter((f) => f !== null);
          noduplicate(curvearray);
        }
        if (
          (e.target
            .getAttribute("data-value")
            .split(" ")
            .map((e) => +e).length == 4 ||
            (curvearray.length <= 2 &&
              e.target
                .getAttribute("data-value")
                .split(" ")
                .map((e) => +e).length > 4)) &&
          !vectordrag.current &&
          !bend.current
        ) {
      
          centercirbool.current = [
            x + 3,
            y + 3,
            x - 3,
            y - 3,
            e.target
              .getAttribute("data-value")
              .split(" ")
              .map((e) => +e)[0],
          ];
          mouseon.current = true;
          centercirclearr.current = [
            e.target.getPointAtLength(e.target.getTotalLength() / 2).x,
            e.target.getPointAtLength(e.target.getTotalLength() / 2).y,
          ];
          if (
            e.target
              .getAttribute("data-value")
              .split(" ")
              .map((e) => +e).length > 4
          ) {
            vage.current = e.target
              .getAttribute("data-value")
              .split(" ")
              .map((e) => +e)
              .slice(2, 4);
          } else {
            vage.current = e.target
              .getAttribute("data-value")
              .split(" ")
              .map((e) => +e)
              .slice(0, 2);
          }
          vage.current.push(
            e.target.getPointAtLength(e.target.getTotalLength() / 2).x
          );
          vage.current.push(
            e.target.getPointAtLength(e.target.getTotalLength() / 2).y
          );
        }
        setRender((r) => r + 1);
      }
    };
    window.onwheel = (e) => {
      ///*
      //  console.log(
      //  e.dataY < 0 && e.ctrlKey ? ("zoom" ? e.ctrlKey : "zoom") : "scroll"
      //);
      //console.log(e.deltaX,"dx dy",e.deltaY,e.deltaZ);
      // console.log(e.wheelDeltaX, "wdx wdy","wd", e.wheelDeltaY, e.wheelDelta);
      if (e.ctrlKey) {
      } else {
        let x =
          (e.clientX - vg.current.getBoundingClientRect().x) *
            (cwidth.current / vg.current.clientWidth) +
          vx.current;
        let y =
          (e.clientY - vg.current.getBoundingClientRect().y) *
            (cheight.current / vg.current.clientHeight) +
          vy.current;
        if (pen.current) {
          movepen.current = `${x} ${y}`;
          penAngleLength(context);
        }
        if (
          (!vectoredit.current || (vectoredit.current && pen.current)) &&
          !penpause.current &&
          pencirclearr.current.length !== 0
        ) {
          if (pen.current) {
              if (vectoredit.current) {
          vgpath.current.splice(
            velindex.current,
            1,
            downconst.current.join("") + `L${x} ${y}`
          );
    }
    else{
              
            
            vgpath.current.splice(
              vgpath.current.length - 1,
              1,
              downconst.current.join("") + `L${x} ${y}`
            );
          }
          }
          alignedline.current = [];
          penendindex.current = -1;
          let newx = 0;
          let newy = 0;
          if (
            pen &&
            pencirclearr.current
              .map((e, i) => {
                const digital = 3;
                let evnum = e.split(" ");
                let evamax = evnum.map((m) => +m + digital);
                let evamin = evnum.map((n) => +n - digital);
                if (
                  (+x <= evamax[0] && +x >= evamin[0]) ||
                  (+y <= evamax[1] && +y >= evamin[1])
                ) {
                  if (y - evnum[1] <= digital && y - evnum[1] >= -digital) {
                    newy = evnum[1];
                  }
                  if (x - evnum[0] <= digital && x - evnum[0] >= -digital) {
                    newx = evnum[0];
                  }
                  if (
                    y - evnum[1] <= digital &&
                    y - evnum[1] >= -digital &&
                    x - evnum[0] <= digital &&
                    x - evnum[0] >= -digital
                  ) {
                    //console.log("in");
                    penendindex.current = i;
                  }
                  if (newx == 0) {
                    newx = x;
                  }
                  if (newy == 0) {
                    newy = y;
                  }
                  alignedline.current.push(`${newx} ${newy} ${e}`);
                  return alignedline.current.length != 0;
                }
              })
              .filter((e) => e == true)[0]
          ) {
            if (penpause.current) {
            } else {
                 if (vectoredit.current) {
                   vgpath.current.splice(
                     velindex.current,
                     1,
                     downconst.current.join("")
                   );
                 }
                 else{
              vgpath.current.splice(
                vgpath.current.length - 1,
                1,
                downconst.current.join("") + `L${newx} ${newy}`
              );}
            }
            movepen.current = `${newx} ${newy}`;
          } else {
            alignedline.current = [];
            if (vectoredit.current) {}
            else{
            vgcolor.current.splice(
              vgcolor.current.length - 1,
              1,
              straightcolor.current[vgcolor.current.length - 1]
            );
          }
          }
        }

        vx.current = vx.current + e.deltaX;
        vy.current = vy.current + e.deltaY;
      }
      setRender((r) => r + 1);
      // */
    };

    window.onpointerout = (e) => {
      if (
        !e.target.getAttribute("name")?.includes("art$") &&
        e.target.localName != "html"
      ) {
        //&& e.target !== target.current[0]
        edit.current &&
          e.target.setAttribute("stroke", vgcolor.current[hovercolor.current]);
        if (
          Array.from(e.target.attributes)
            .map((m) => m.name)
            .filter((f) => f === "fill")[0] === "fill"
        ) {
        } else {
          e.target.classList.remove("fill");
        }
        edit.current && e.target.setAttribute("stroke-width", thick.current);
        hovercolor.current = -1;
      }
      if (e.target.getAttribute("name")?.includes("cloneart$")) {
        if (velement.current[3].includes(e.target)) {
          e.target.setAttribute("stroke", "#557fff");
        } else {
          e.target.setAttribute(
            "stroke",
            vgcolor.current[Object.keys(targetObject.current)[0]]
          );
        }
        e.target.setAttribute("stroke-width", thick.current + 1);

        setRender((r) => r + 1);
      }
    };
  }, []);

  return <></>;
}
export default WindowFx;
