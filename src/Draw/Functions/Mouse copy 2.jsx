import { reDefine } from "../Vredefine";
import { gensyncDragpoint, noduplicate } from "../mZSync";
import { AddPath } from "./AddPath";
import { rota } from "./BfrSetPathV";
import { getPathData } from "./GetPath";
import { vectorPathData } from "./GetVectorPath";
import { PenV } from "./PenVSync";
import { AddPathCurve, addControlPointToBezier } from "./RetainCurve";
import {
  calculateDistance,
  eleFx,
  eleMx,
  getElementClosestToCoordinates,
  getLengthAndAngle,
  getMousePoint,
} from "./ctrChecks";

export let down = (e, context, ref) => {
  console.log("down");
  let vg = context.vg;
  let vgpath = context.vgpath;
  let vgkey = context.vgkey;
  let vgpathxy = context.vgpathxy;
  let setRender = context.setRender;
  let vgcolor = context.vgcolor;
  let cwidth = context.cwidth;
  let cheight = context.cheight;
  let mooveboolean = context.mooveboolean;
  let straightcolor = context.straightcolor;
  let pen = context.pen;
  let pencirclearr = context.pencirclearr;
  let pencirctr = context.pencirctr;
  let movepen = context.movepen;
  let downconst = context.downconst;
  let vx = context.vx;
  let vy = context.vy;
  let alignedline = context.alignedline;
  let penpause = context.penpause;
  let penmovebool = context.penmovebool;
  let penjusttrue = context.penjusttrue;
  let penendindex = context.penendindex;
  let vectoredit = context.vectoredit;
  let target = context.target;
  let targetObject = context.targetObject;
  let draga = context.draga;
  let dragd = context.dragd;
  let vectora = context.vectora;
  let vectord = context.vectord;
  let vectorGp = context.vectorGp;
  let velindex = context.velindex;
  let vage = context.vage;
  let wtx = context.wtx;
  let vectorctrmixed = context.vectorctrmixed;
  let vDragpointsArr = context.vDragpointsArr;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  pencirclearr.current = pencirclearr.current.reverse();
  noduplicate(pencirclearr.current);
  pencirclearr.current = pencirclearr.current.reverse();
  penmovebool.current[0] = true;
  penmovebool.current[1] = false;

  let x =
    (e.clientX - ref.current.getBoundingClientRect().x) *
      (cwidth.current / ref.current.clientWidth) +
    vx.current;
  let y =
    (e.clientY - ref.current.getBoundingClientRect().y) *
      (cheight.current / ref.current.clientHeight) +
    vy.current;
  x = x.toFixed(2);
  y = y.toFixed(2);
  let clclonecolor = context.clclonecolor;
  let clone = clclonecolor.current;
  let curveorline = false;
  if (
    clclonecolor.current !== null
    //  &&penpause.current
  ) {
    x = movepen.current.split(" ")[0];
    y = movepen.current.split(" ")[1];
    if (
      clone
        .getAttribute("data-value")
        .split(" ")
        .map((e) => +e).length > 4
    ) {
      vage.current = clone
        .getAttribute("data-value")
        .split(" ")
        .map((e) => +e);
      //.slice(2, 4);
      curveorline = true;
    } else {
      vage.current = clone
        .getAttribute("data-value")
        .split(" ")
        .map((e) => +e)
        .slice(0, 2);
    }
    vage.current.push(x);
    vage.current.push(y);

    //assuming break is strictly line point to point
    // let dataarr = [centercirbool.current[4]];
    ////////////////////////////////////////////////
    dragd.current = [];
    draga.current = [];
    getPathData(context);
    vectorPathData(context);
    /*
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
        */
    if (curveorline) {
      let bezier = [
        {
          x: +dragd.current[0][vage.current[0]],
          y: +dragd.current[0][vage.current[1]],
        },
        {
          x: +dragd.current[0][vage.current[2]],
          y: +dragd.current[0][vage.current[3]],
        },
        {
          x: +dragd.current[0][vage.current[4]],
          y: +dragd.current[0][vage.current[5]],
        },
        {
          x: +dragd.current[0][vage.current[6]],
          y: +dragd.current[0][vage.current[7]],
        },
      ];
      let p4 = { x: +x, y: +y };
      let dataax = addControlPointToBezier(...bezier, p4);
      let dataay = [...vage.current];
      vage.current = [];
      //console.log(dataax);
      dataax.map((m) => {
        vage.current.push(m.x);
        vage.current.push(m.y);
      });
      vage.current = [dataay, vage.current];
      console.log(vage.current, "va");
      //eleMx(context, clone);
      AddPathCurve(context);
      vDragpointsArr.current = [dataay[0] + 6, dataay[0] + 7];
    } else {
      AddPath(context);
    }
    reDefine(context);
    setRender((r) => r + 1);
    dragd.current = [];
    draga.current = [];
    getPathData(context);
    vectorPathData(context);
    PenV(context);
    pencirclearr.current.push(`${x} ${y}`);
  } else {
    if (vgpathxy.current[`pathmouse`] === undefined && !vectoredit.current) {
      vgpathxy.current[`pathmouse`] = [`M${x} ${y}L${x} ${y}`];
      vgpath.current.push(`M${x} ${y} ${x} ${y}`);
      vgkey.current.push(
        Math.random().toFixed(5) + vg.current.getCurrentTime().toFixed(5)
      );

      if (pen.current) {
        downconst.current = [`M${x} ${y}`];
        penendindex.current = `${x} ${y}`;
      }

      //vgcolor.current.push(wtx.current);
      //straightcolor.current.push(wtx.current);
    } else {
      if (vectoredit.current && vgpathxy.current[`pathmouse`] === undefined) {
        vgpathxy.current[`pathmouse`] = [`M${x} ${y}L${x} ${y}`];
        movepen.current = `${x} ${y}`;
      }
      if (pen.current) {
        if (e.target.getAttribute("name") === "circledbcart$") {
          x = e.target.getAttribute("cx");
          y = e.target.getAttribute("cy");
        } else {
          x = movepen.current?.split(" ")[0];
          y = movepen.current?.split(" ")[1];
        }
        if (penpause.current) {
          penpause.current = false;
          downconst.current.push(`M${x} ${y}`);
          penjusttrue.current = true;
          penendindex.current = `${x} ${y}`;
        } else if (penjusttrue.current) {
          if (penmovebool.current[2]) {
            downconst.current.push(
              `C${pencirctr.current[pencirctr.current.length - 1]}`
            );
            downconst.current.push(` ${x} ${y}`);
            downconst.current.push(` ${x} ${y}`);
          } else {
            downconst.current.push(`L${x} ${y}`);
          }
          if (
            pencirclearr.current[pencirclearr.current.length - 1] !==
            `${x} ${y}`
          ) {
            penjusttrue.current = false;
          }
          if (
            pencirclearr.current[pencirclearr.current.length - 2] ==
              `${x} ${y}` &&
            !e.ctrlKey
          ) {
            penpause.current = true;
          }
        } else {
          if (
            //no repeat
            pencirclearr.current[pencirclearr.current.length - 2] !==
              `${x} ${y}` &&
            pencirclearr.current[pencirclearr.current.length - 1] !==
              `${x} ${y}`
          ) {
            if (penmovebool.current[2]) {
              downconst.current.push(
                `C${pencirctr.current[pencirctr.current.length - 1]}`
              );
              downconst.current.push(` ${x} ${y}`);
              downconst.current.push(` ${x} ${y}`);
            } else {
              downconst.current.push(`L${x} ${y}`);
            }
          }
        }
      }
    }
    if (pen.current) {
      if (
        pencirclearr.current.includes(`${x} ${y}`) &&
        pencirclearr.current[pencirclearr.current.length - 2] !== `${x} ${y}` &&
        pencirclearr.current[pencirclearr.current.length - 1] !== `${x} ${y}` &&
        !penjusttrue.current &&
        !e.ctrlKey
      ) {
        penpause.current = true;

        ///*
        // return to single path
        //vgpathxy.current = {};
        //pencirclearr.current = [];
        //movepen.current = `L `;
        //*/
        if (penendindex.current == `${x} ${y}`) {
          if (!penmovebool.current[2]) {
            downconst.current.pop();
          }
          downconst.current.push(`Z`);
        }
      } else {
        pencirclearr.current.push(`${x} ${y}`);
      }
      //console.log(downconst.current,pencirclearr.current);
      if (vectoredit.current) {
        vgpath.current.splice(velindex.current, 1, downconst.current.join(""));
      } else {
        vgpath.current.splice(
          vgpath.current.length - 1,
          1,
          downconst.current.join("")
        );
      }
    }
    mooveboolean.current = true;
    alignedline.current = [];
  }
  if (penmovebool.current[2]) {
    penmovebool.current[2] = false;
  }
  if (vectoredit.current) {
    reDefine(context);
    /*
            vectorGp.current.push(
              !isNaN(vectorGp.current[vectorGp.current.length - 1])
                ? vectorGp.current[vectorGp.current.length - 1] + 1
                : 1,
              !isNaN(vectorGp.current[vectorGp.current.length - 1])
                ? vectorGp.current[vectorGp.current.length - 1] + 2
                : 2
            );
        */
  } else {
    if (downconst.current.length > 1) {
      velindex.current = vgpath.current.length - 1;
      targetObject.current = {};
      target.current = [
        Array.from(vg.current.children).filter(
          (e) => !e.getAttribute("name")?.includes("art$")
        )[vgpath.current.length - 1],
      ];
      target.current.push(target.current[0].getBBox().x);
      target.current.push(target.current[0].getBBox().y);
      target.current.push(target.current[0].getBBox().width);
      target.current.push(target.current[0].getBBox().height);
      target.current.push(target.current[1] + target.current[3]);
      target.current.push(target.current[2] + target.current[4]);
      target.current.push(vgpath.current.length - 1);
      targetObject.current[vgpath.current.length - 1] = target.current;
      console.log(vectorGp.current, "a");
      console.log(vectorCi.current);
      console.log(vectorCj.current);
      reDefine(context);
      /*
            vectorGp.current.push(
              !isNaN(vectorGp.current[vectorGp.current.length - 1])
                ? vectorGp.current[vectorGp.current.length - 1] + 1
                : 1,
              !isNaN(vectorGp.current[vectorGp.current.length - 1])
                ? vectorGp.current[vectorGp.current.length - 1] + 2
                : 2
            );
            */

      console.log(vectorGp.current, "b");
      console.log(vectorCi.current);
      console.log(vectorCj.current);
    }
  }
  if (vDragpointsArr.current.length !== 0) {
    gensyncDragpoint(context);
  }
  setRender((r) => r + 1);
};
export let mousemove = (e, context, ref) => {
  let vgpath = context.vgpath;
  let vgkey = context.vgkey;
  let vgpathxy = context.vgpathxy;
  let setRender = context.setRender;
  let cwidth = context.cwidth;
  let cheight = context.cheight;
  let mooveboolean = context.mooveboolean;
  let vertical = context.vertical.current;
  let horizontal = context.horizontal.current;
  let line = context.line.current;
  let straightcolor = context.straightcolor;
  let vgcolor = context.vgcolor;
  let vg = context.vg;
  let pen = context.pen.current;
  let movepen = context.movepen;
  let pencirclearr = context.pencirclearr;
  let downconst = context.downconst;
  let vx = context.vx;
  let vy = context.vy;
  let alignedline = context.alignedline;
  let anglevalue = context.anglevalue;
  let penpause = context.penpause;
  let penmovebool = context.penmovebool;
  let velindex = context.velindex;
  let vectoredit = context.vectoredit;
  let clclonecolor = context.clclonecolor;
  let colorztroke = context.colorztroke;
  let targetObject = context.targetObject;
  let pencirctr = context.pencirctr;
  if (clclonecolor.current !== null) {
    clclonecolor.current.classList.remove("red");
    clclonecolor.current = null;
  }
  anglevalue.current = ``;
  if (mooveboolean.current) {
    let x =
      (e.clientX - ref.current.getBoundingClientRect().x) *
        (cwidth.current / ref.current.clientWidth) +
      vx.current;
    let y =
      (e.clientY - ref.current.getBoundingClientRect().y) *
        (cheight.current / ref.current.clientHeight) +
      vy.current;
    if (vgpathxy.current[`pathmouse`] !== undefined) {
      x = x.toFixed(2);
      y = y.toFixed(2);
      let end = vg.current.children[vgpath.current.length - 1].getPointAtLength(
        vg.current.children[vgpath.current.length - 1].getTotalLength()
      );
      let begin =
        vg.current.children[vgpath.current.length - 1].getPointAtLength(0);
      vgpathxy.current[`pathmouse`].splice(
        1,
        vgpathxy.current[`pathmouse`].length
      );
      vgpathxy.current[`pathmouse`].push(`L${x} ${y}`);

      !horizontal &&
        !vertical &&
        !line &&
        !pen &&
        vgpath.current.splice(
          vgpath.current.length - 1,
          1,
          vgpath.current[vgpath.current.length - 1] + `L${x} ${y}`
        );
      vertical &&
        vgpath.current.splice(
          vgpath.current.length - 1,
          1,
          vgpath.current[vgpath.current.length - 1].replace(
            /[V][-|0-9|.]*/g,
            ""
          ) + `V${y}`
        );
      horizontal &&
        vgpath.current.splice(
          vgpath.current.length - 1,
          1,
          vgpath.current[vgpath.current.length - 1].replace(
            /[H][-|0-9|.]*/g,
            ""
          ) + `H${x}`
        );
      line &&
        vgpath.current.splice(
          vgpath.current.length - 1,
          1,
          vgpath.current[vgpath.current.length - 1].replace(
            /[L][-|0-9|.]* [0-9|.]*/g,
            ""
          ) + `L${x} ${y}`
        );
      if (pen) {
        if (penmovebool.current[2]) {
          penmovebool.current[1] = false;
          penmovebool.current[0] = false;
        }
        if (penmovebool.current[0]) {
          pencirctr.current.push(movepen.current);
          penmovebool.current[1] = true;
          penmovebool.current[0] = false;
        }
        if (penmovebool.current[1]) {
          pencirctr.current.splice(
            pencirctr.current.length - 1,
            1,
            movepen.current
          );
        }
        if (penpause.current) {
        } else {
          if (vectoredit.current) {
            if (vectoredit.current) {
              vgpath.current.splice(
                velindex.current,
                1,
                downconst.current.join("") +
                  (penmovebool.current[1]
                    ? `C${x} ${y} ${x} ${y} ${x} ${y}`
                    : penmovebool.current[2]
                    ? `C${
                        pencirctr.current[pencirctr.current.length - 1]
                      }  ${x} ${y} ${x} ${y}`
                    : `L${x} ${y}`)
              );
            }
          } else {
            vgpath.current.splice(
              vgpath.current.length - 1,
              1,
              downconst.current.join("") +
                (penmovebool.current[1]
                  ? `C${x} ${y} ${x} ${y} ${x} ${y}`
                  : penmovebool.current[2]
                  ? `C${
                      pencirctr.current[pencirctr.current.length - 1]
                    } ${x} ${y} ${x} ${y}`
                  : `L${x} ${y}`)
            );
          }
        }
        movepen.current = `${x} ${y}`;
      }
      alignedline.current = [];
      let newx = 0;
      let newy = 0;
      if (line && (begin.x === end.x || begin.y === end.y)) {
        //vgcolor.current.splice(vgcolor.current.length - 1, 1, "green");
        //goodbye
      } else if (
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
              if (newx == 0) {
                newx = x;
              }
              if (newy == 0) {
                newy = y;
              }
              alignedline.current.push(`${newx} ${newy} ${e}`);
              alignedline.current = alignedline.current.filter(
                (f) =>
                  (f.split(" ")[0] == newx && f.split(" ")[2] == newx) ||
                  (f.split(" ")[1] == newy && f.split(" ")[3] == newy)
              );
              return alignedline.current.length !== 0;
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
              downconst.current.join("") +
                (penmovebool.current[1]
                  ? `C${newx} ${newy} ${newx} ${newy} ${newx} ${newy}`
                  : penmovebool.current[2]
                  ? `C${
                      pencirctr.current[pencirctr.current.length - 1]
                    } ${newx} ${newy} ${newx} ${newy}`
                  : `L${newx} ${newy}`)
            );
          } else {
            vgpath.current.splice(
              vgpath.current.length - 1,
              1,
              downconst.current.join("") +
                (penmovebool.current[1]
                  ? `C${newx} ${newy} ${newx} ${newy} ${newx} ${newy}`
                  : penmovebool.current[2]
                  ? `C${
                      pencirctr.current[pencirctr.current.length - 1]
                    } ${newx} ${newy} ${newx} ${newy}`
                  : `L${newx} ${newy}`)
            );
          }
        }
        movepen.current = `${newx} ${newy}`;
      } else {
        alignedline.current = [];
        //////////////not needed for pen
        /*
        !pen &&
          vgcolor.current.splice(
            vgcolor.current.length - 1,
            1,
            straightcolor.current[vgcolor.current.length - 1]
          );
          */
      }
      penAngleLength(context);
    } else {
      if (vectoredit.current) {
        movepen.current = `${x} ${y}`;
        vgpathxy.current[`pathmouse`] = [`M${x} ${y}L${x} ${y}`];
      }
    }
  }
  if (
    vectoredit.current &&
    pen //&&alignedline.current.length==0
  ) {
    const constantdata = 4;
    const elements = eleFx(
      e.clientX - constantdata,
      e.clientY - constantdata,
      e.clientX + constantdata,
      e.clientY + constantdata
    );

    if (elements.length === 0 || elements == "failed") {
    } else {
      let xyval = elements[1].split(" ");
      let nextx =
        (+xyval[0] - ref.current.getBoundingClientRect().x) *
          (cwidth.current / ref.current.clientWidth) +
        vx.current;
      let nexty =
        (+xyval[1] - ref.current.getBoundingClientRect().y) *
          (cheight.current / ref.current.clientHeight) +
        vy.current;
      // console.log(nextx, nexty,"nxy");
      /*
          const data = getMousePoint(
            +elements[1].split(" ")[0],
            +elements[1].split(" ")[1],
            elements[0],
            vg.current
          );
        */
      // const data = eleMx(context, elements[0]);
      movepen.current = `${nextx} ${nexty}`;
      if (penpause.current) {
      } else {
        vgpath.current.splice(
          velindex.current,
          1,
          downconst.current.join("") +
            (penmovebool.current[1]
              ? `C${nextx} ${nexty} ${nextx} ${nexty} ${nextx} ${nexty}`
              : penmovebool.current[2]
              ? `C${
                  pencirctr.current[pencirctr.current.length - 1]
                } ${nextx} ${nexty} ${nextx} ${nexty}`
              : `L${nextx} ${nexty}`)
        );
      }
      //console.log(elements[0]);
      clclonecolor.current = elements[0];
      clclonecolor.current.classList.add("red");
    }
  }
  if (vgpathxy.current[`pathmouse`] !== undefined) {
    let elArr = Array.from(vg.current.children).filter(
      (e) => !e.getAttribute("name")?.includes("art$")
    );
    if (
      !Object.values(elArr[vgpath.current.length - 1].attributes)
        .map((m) => m.name)
        .includes("stroke")
    ) {
      elArr[vgpath.current.length - 1]?.setAttribute(
        "stroke",
        colorztroke.current
      );
    }
  }
  if (vectoredit.current) {
    targetObject.current[velindex.current][0].classList.add("cloneblue");
  }

  setRender((r) => r + 1);
};
export let up = (e, context) => {
  let vgpathxy = context.vgpathxy;
  let setRender = context.setRender;
  let mooveboolean = context.mooveboolean;
  let vgpath = context.vgpath;
  let vgkey = context.vgkey;
  let vgcolor = context.vgcolor;
  let straightcolor = context.straightcolor;
  let penmovebool = context.penmovebool;
  let pencirctr = context.pencirctr;
  let movepen = context.movepen;
  let pen = context.pen;
  if (!penmovebool.current[1] && penmovebool.current[0]) {
    penmovebool.current[0] = false;
    penmovebool.current[1] = false;
  }

  if (penmovebool.current[1]) {
    penmovebool.current[0] = false;
    penmovebool.current[1] = false;
    penmovebool.current[2] = true;
  }

  if (!pen.current) {
    vgpathxy.current[`pathmouse`].length > 1 &&
      vgpath.current.splice(
        vgpath.current.length - 1,
        1,
        `M` +
          vgpath.current[vgpath.current.length - 1].replace(
            /[M][-|0-9|.]* [-|0-9|.]* /g,
            ""
          )
      );
    //////////////not needed for pen
    /*
    vgcolor.current.splice(
      vgcolor.current.length - 1,
      1,
      straightcolor.current[vgcolor.current.length - 1]
    );
    */
  }

  console.log("up");
  setRender((r) => r + 1);
  if (!pen.current) {
    vgpathxy.current = {};
    mooveboolean.current = false;
  }
};
export let penAngleLength = (context) => {
  let movepen = context.movepen;
  let pencirclearr = context.pencirclearr;
  let anglevalue = context.anglevalue;
  if (pencirclearr.current[pencirclearr.current.length - 1] !== undefined) {
    let cc = pencirclearr.current[pencirclearr.current.length - 1]
      .split(" ")
      .map((m) => +m)
      .filter((f) => f !== undefined);
    let xval = movepen.current
      .split(" ")
      .map((m) => +m)
      .filter((f) => f !== undefined);
    //let cval = pencirclearr.current[pencirclearr.current.length - 2]
    //?.split(" ")
    //.map((m) => +m).filter(f=>f!==undefined);
    let [length, angle] = getLengthAndAngle(...cc, ...xval);
    anglevalue.current = `${length}m ${angle}deg`;
  }
};
