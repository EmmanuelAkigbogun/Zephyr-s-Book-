import { useContext, useEffect, useRef } from "react";
import { Context } from "./Draw";
import { keydownfx } from "./Download";
import { penAngleLength } from "./Functions/Mouse";
import { setPathData } from "./Functions/SetPath";
import { getPathData } from "./Functions/GetPath";
import { setRz } from "./Functions/SetRz";
import { vectorPathData } from "./Functions/GetVectorPath";
import { setPathDataV } from "./Functions/SetPathV";
import { reDefine } from "./Vredefine";
import { noduplicate } from "./mZSync";
import { getRotateAngle } from "./Functions/getRotateAngle";
import { BfrSetPathV } from "./Functions/BfrSetPathV";
import { highlightMove, highlightVMove } from "./highlight";
import { PointerDown } from "./Functions/PointerDown";
import { PointerMove } from "./Functions/PointerMove";
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
      if (
        edit.current ||
        (vectoredit.current && !pen.current) ||
        shapes.current
      ) {
        PointerDown(e, context);
      } else {
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
      if (
        edit.current ||
        (vectoredit.current && !pen.current) ||
        shapes.current
      ) {
        PointerMove(e, context);
      } else {
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
            } else {
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
              } else {
                vgpath.current.splice(
                  vgpath.current.length - 1,
                  1,
                  downconst.current.join("") + `L${newx} ${newy}`
                );
              }
            }
            movepen.current = `${newx} ${newy}`;
          } else {
            alignedline.current = [];
            if (vectoredit.current) {
            } else {
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
