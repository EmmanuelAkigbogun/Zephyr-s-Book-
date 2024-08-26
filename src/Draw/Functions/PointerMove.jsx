import { highlightMove, highlightVMove } from "../highlight";
import { BfrSetPathV } from "./BfrSetPathV";
import { CntrlBend, CtrlMotion } from "./CntrlBend";
import { vectorPathData } from "./GetVectorPath";
import { setPathData } from "./SetPath";
import { setPathDataV } from "./SetPathV";
import { setRz } from "./SetRz";
import { getRotateAngle } from "./getRotateAngle";
export let PointerMove = (e, context) => {
  let cwidth = context.cwidth;
  let cheight = context.cheight;
  let setRender = context.setRender;
  let vg = context.vg;
  let edit = context.edit;
  let straightcolor = context.straightcolor;
  let vgcolor = context.vgcolor;
  let vgpath = context.vgpath;
  let vgkey = context.vgkey;
  let targetObject = context.targetObject;
  let vx = context.vx;
  let vy = context.vy;
  let editdrag = context.editdrag;
  let dragbool = context.dragbool;
  let drag = context.drag;
  let pick = context.pick;
  let highlight = context.highlight;
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
  let rcursor = context.rcursor;
  let vectoredit = context.vectoredit;
  let centercirclearr = context.centercirclearr;
  let dragx = context.dragx;
  let dragy = context.dragy;
  let centercirbool = context.centercirbool;
  let mouseon = context.mouseon;
  let vDragpointsArr = context.vDragpointsArr;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let bend = context.bend;
  let mirrorbool = context.mirrorbool;
  let vectordrag = context.vectordrag;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let vectorctrmixed = context.vectorctrmixed;
  let vctrline = context.vctrline;
  let highlightveditboolpoint = context.highlightveditboolpoint;
  let vdoormo = context.vdoormo;
  let vdoormop = context.vdoormop;
  let bendclient = context.bendclient;
  let darkgon=context.darkgon
  let wtx = context.wtx;
  let fillcolor = context.fillcolor; 
  let colorztroke = context.colorztroke;
  let fbox=context.fbox
  let x =
    (e.clientX - vg.current.getBoundingClientRect().x) *
      (cwidth.current / vg.current.clientWidth) +
    vx.current;
  let y =
    (e.clientY - vg.current.getBoundingClientRect().y) *
      (cheight.current / vg.current.clientHeight) +
    vy.current;
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
        if (bend.current) {
          let ctrpoint = null;
          let centerpoint = +document
            .elementFromPoint(...bendclient.current)
            .getAttribute("data-value");
          if (vectorCi.current.includes(centerpoint + 2)) {
            ctrpoint = centerpoint + 2;
          } else if (vectorCj.current.includes(centerpoint - 2)) {
            ctrpoint = centerpoint - 2;
          }
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
      } else if (rcursor.current == "sw-resize" || rcursor.current == "move") {
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
      } else if (rcursor.current == "ne-resize" || rcursor.current == "move") {
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
      let elArr = Array.from(vg.current.children).filter(
                (e) => !e.getAttribute("name")?.includes("art$")
              );
      let indexvalue = 0;
      if (shapedown.current) {
        indexvalue = vgpath.current.length;
        shapedown.current = false;
        //vgcolor.current.push(wtx.current);
        //straightcolor.current.push(wtx.current);
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
        pick.current[0] + (x - pick.current[0] < 0 ? x - pick.current[0] : 0);
      valy =
        pick.current[1] + (y - pick.current[1] < 0 ? y - pick.current[1] : 0);
      pick.current.splice(6, 1, `${valx + valw / 2}`);
      pick.current.splice(7, 1, `${valy + valh / 2}`);
      pick.current.splice(8, 1, `${valw / 2}`);
      pick.current.splice(9, 1, `${valh / 2}`);
      if (ellipse.current) {
        vgpath.current.splice(
          indexvalue,
          1,
          `ELLIPSE:${(valx + valw / 2).toFixed(2)} ${(valy + valh / 2).toFixed(
            2
          )} ${(valw / 2).toFixed(2)} ${(valh / 2).toFixed(2)}`
        );
      } else if (circle.current) {
        vgpath.current.splice(
          indexvalue,
          1,
          `CIRCLE:${(valx + valw / 2).toFixed(2)} ${(valy + valh / 2).toFixed(
            2
          )} ${(valh / 2).toFixed(2)}`
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
              let point = eliele.current.current.getPointAtLength(polynumber);
              polyguy =
                polyguy + `M${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
            } catch (e) {}
          } else {
            try {
              let point = eliele.current.current.getPointAtLength(polynumber);
              polyguy =
                polyguy + `L${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
            } catch (e) {}
          }
          polynumber = polynumber + increment;
        }
        ///*
        //////////////////////
        if (darkgon.current !== ``) {
          let brownkingirl = polyguy
            .replace(/[A-Z]/g, " ")
            .split(" ")
            .filter((f) => f !== "");
          let bkgn = brownkingirl
            .map((m, i) => {
              if (i % 2 == 0) {
                return i !== brownkingirl.length - 2
                  ? `${i}bkg${i + 2}`
                  : `${0}bkg${i}`;
              } else {
                return i - 1 !== brownkingirl.length - 2
                  ? `${i + 1}bkg${i - 1}`
                  : `${i - 1}bkg${0}`;
              }
            })
            .filter((f) => f !== undefined);
          if (darkgon.current == `darkgonx`) {
            polyguy = ``;
          } else {
            polyguy = polyguy + `Z`;
          }
          brownkingirl.map((m, i) => {
            if (i % 2 == 0) {
              for (let index = 0; index < brownkingirl.length; index++) {
                if (index % 2 == 0) {
                  if (
                    !bkgn.includes(`${i}bkg${index}`) &&
                    !bkgn.includes(`${index}bkg${i}`) &&
                    i !== index
                  ) {
                    polyguy =
                      polyguy +
                      `M${brownkingirl[index]} ${brownkingirl[index + 1]}`;
                    polyguy =
                      polyguy + `L${brownkingirl[i]} ${brownkingirl[i + 1]}`;
                    bkgn.push(`${i}bkg${index}`);
                    bkgn.push(`${index}bkg${i}`);
                  }
                }
              }
            }
          });
        }
        ////////////////////////////

        //*/
        vgpath.current.splice(
          indexvalue,
          1,
          `${polyguy}${darkgon.current == `` ? `Z` : ``}`
        );
        elArr[indexvalue]?.setAttribute("data-poly", `${numb}`);
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
      } else if (fbox.current) {
        vgpath.current.splice(
          indexvalue,
          1,
          `FOBJ:${pick.current[0].toFixed(2)} ${pick.current[1].toFixed(2)} ${
            x.toFixed(2) - pick.current[0].toFixed(2)
          } ${
            y.toFixed(2) - pick.current[1].toFixed(2)
          }`
        );
      }
         if (!lockdrag.current) {
               elArr[indexvalue]?.setAttribute( "stroke",colorztroke.current);
               if (!fbox.current) {
              elArr[indexvalue]?.setAttribute("fill", fillcolor.current);
               }
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
