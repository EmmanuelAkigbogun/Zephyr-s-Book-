import { SetShear } from "./Functions/SetShear";
import { getPathData } from "./Functions/GetPath";
import { setPathData } from "./Functions/SetPath";
import { setRotate } from "./Functions/SetRotate";
import { pathToRect, rectToPath, setRz } from "./Functions/SetRz";
import { HeightFx, rotateFx, xfx } from "./Functions/xFx";
import Circle from "./PenHoverCircle";
import { vectorPathData } from "./Functions/GetVectorPath";
import { PenV } from "./Functions/PenVSync";
export let keydownfx = (e, context, target) => {
  //console.log(e.key);
  let setRender = context.setRender;
  let ctx = context.ctx;
  let link = context.link;
  let vg = context.vg;
  let edit = context.edit;
  let vgcolor = context.vgcolor;
  let vgpath = context.vgpath;
  let vgkey = context.vgkey;
  let horizontal = context.horizontal;
  let vertical = context.vertical;
  let line = context.line;
  let pen = context.pen;
  let pencirclearr = context.pencirclearr;
  let movepen = context.movepen;
  let downconst = context.downconst;
  let straightcolor = context.straightcolor;
  let shapes = context.shapes;
  let rbox = context.rbox;
  let fbox = context.fbox;
  let circle = context.circle;
  let ellipse = context.ellipse;
  let polyelip = context.polyelip;
  let hovercolor = context.hovercolor;
  let cursor = context.cursor;
  let duplicate = context.duplicate;
  let editdrag = context.editdrag;
  let targetObject = context.targetObject;
  let draga = context.draga;
  let dragd = context.dragd;
  let vectora = context.vectora;
  let vectord = context.vectord;
  let lockdrag = context.lockdrag;
  let vpoly = context.vpoly;
  let dragx = context.dragx;
  let dragy = context.dragy;
  let vectoredit = context.vectoredit;
  let bend = context.bend;
  let dragrectr = context.dragrectr;
  let anglevalue = context.anglevalue;
  let penpause = context.penpause;
  let mirrorbool = context.mirrorbool;
  let mirror = context.mirror;
  let darkgon = context.darkgon;
  let velindex = context.velindex;
  let colorpick=context.colorpick;
  let colorbool = context.colorbool;
  let colorztroke = context.colorztroke;
  let vgroup = context.vgroup;
  let groupcount = context.groupcount;
  let groupobj = context.groupobj;
  let thick=context.thick
  penpause.current = false;
  let clclonecolor = context.clclonecolor;
  let alignedline=context.alignedline
  if (clclonecolor.current !== null) {
    clclonecolor.current.classList.remove("red");
    clclonecolor.current = null;
  }
  if (e.key== "G" ||e.key == "g") {
    if (e.shiftKey) {
          let attrdata = "";
          Object.keys(targetObject.current).map((m, i) => {
              attrdata = targetObject.current[m][0].getAttribute("d");
              if (attrdata!==null) {
              attrdata.split('M').map((p,j)=>{
                if (j == 0) {
                  //console.log(p == "");
                } else {
                  if (j == 1) {
                    vgpath.current.splice(m, 1, "M" + p);
                    //console.log("M" + p, "le");
                  } else {
                    if(groupobj.current[m]==undefined)groupobj.current[m] = [vgkey.current.length];
                    else groupobj.current[m].push(vgkey.current.length);
                    vgpath.current.push("M" + p);
                    vgkey.current.push(
                      Math.random().toFixed(5) +
                        i +
                        Math.random().toFixed(5) +
                        vg.current.getCurrentTime().toFixed(5)
                    );
                    //console.log("M" + p);
                  }
                }
              })
            }
             // console.log(          vgpath.current[m],"jo");      
          });
        //  attrdata
          /*
          vgpath.current[m].map((p)=>{
    
          
          })
          */
      
    }
    if (Object.keys(targetObject.current).length>0) {
          let count = 0;
          if (vgroup.current) {
          let element=null
          let attrdata=''
                Object.keys(targetObject.current).map((m, i) => {
                  if (
                    targetObject.current[m][0].getAttribute("d") !==
                    null
                  ) {
                    if (count == 0) {
                      element = targetObject.current[m][0];
                      attrdata = targetObject.current[m][0].getAttribute("d");
                      count++
                      groupcount.current=m;
                    } else {
                      attrdata += targetObject.current[m][0].getAttribute("d");
                    }
                  } else {
                  }
                });

                element!==null&&element.setAttribute("d", attrdata);
                //console.log(attrdata);
          }
                //console.log(count);
          
                    vgkey.current = vgkey.current.filter(
                      (e, i) =>
                        i !== target ||
                        i == groupcount.current ||
                        targetObject.current[i][0].getAttribute("d") == null
                    );
                    vgpath.current = vgpath.current.filter(
                      (e, i) =>
                        i !== target ||
                        i == groupcount.current ||
                        targetObject.current[i][0].getAttribute("d") == null
                    );    
    }  
  }
  if (e.key == "C" || e.key == "c") {
    if (e.altKey){
            colorztroke.current = `rgb(${Math.random() * 255} ${
              Math.random() * 255
            } ${Math.random() * 255})`;
            Object.keys(targetObject.current).length > 0 &&
              Object.keys(targetObject.current).map((a, i) => {
                targetObject.current[a][0].setAttribute(
                  "stroke",
                  `rgb(${Math.random() * 255} ${Math.random() * 255} ${
                    Math.random() * 255
                  })`
                );
                targetObject.current[a][0].classList.remove("stroke");
              });
    }
    else{
   colorpick.current.showPicker()
   colorbool.current=`stroke`;
  }
    }
    if (e.key == "-") {
           let dash = prompt("stroke width");
          dash=dash.replace(" ",",")
          if (dash=="") {
               Object.keys(targetObject.current).map((a, i) => {
                 targetObject.current[a][0].removeAttribute(
                   "stroke-dasharray"
                 );
               });
          }
          else{
                   Object.keys(targetObject.current).map((a, i) => {
                     targetObject.current[a][0].setAttribute(
                       "stroke-dasharray",dash
                     );
                   });
            }

    }
    if (!e.altKey&&(e.key == "F" || e.key == "f")) {
      if (e.shiftKey) {
        Object.keys(targetObject.current).length > 0 &&
          Object.keys(targetObject.current).map((a, i) => {
            targetObject.current[a][0].setAttribute(
              "fill",
              `rgb(${Math.random() * 255} ${Math.random() * 255} ${
                Math.random() * 255
              })`
            );
            targetObject.current[a][0].classList.remove("fill");
          });
      } else {
        colorpick.current.showPicker();
        colorbool.current = `fill`;
      }
    }
    if (e.key == "I" || e.key == "i") {
     let swidth=prompt("stroke width")
     thick.current = swidth;
     if (swidth) {
       Object.keys(targetObject.current).length > 0 &&
         Object.keys(targetObject.current).map((a, i) => {
           targetObject.current[a][0].setAttribute("stroke-width", swidth);
         if (targetObject.current[a][0].getAttribute("data-s-width") !== null) {
            targetObject.current[a][0].setAttribute("data-s-width", swidth);
         }
         });
         
          setRender((e) => e + 1);
     }
    }
  if (
    pen.current &&
    e.key !== "W" &&
    e.key !== "w" &&
    e.key !== "C" &&
    e.key !== "c" &&
    e.key !== "f" &&
    e.key !== "F" &&
    e.key !== "i" &&
    e.key !== "I"
  ) {
    if (downconst.current.length !== 0) {
      if (vectoredit.current) {
        vgpath.current.splice(velindex.current, 1, downconst.current.join(""));
        if (vectoredit.current) {
          targetObject.current[velindex.current][0].classList.remove(
            "cloneblue"
          );
        }
      } else {
        vgpath.current.splice(
          vgpath.current.length - 1,
          1,
          downconst.current.join("")
        );
      }
    }
    pen.current = false;
    downconst.current = [];
    ///*
    edit.current = true;
    movepen.current = ``;
    pencirclearr.current = [];
    //pen.current = false;
    rbox.current = false;
    fbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = ``;
    setRender((r) => r + 1);
    //*/
  }
  if (e.key === "e" || e.key === "E") {
    alignedline.current=[]
    edit.current = true;
    movepen.current = ``;
    pencirclearr.current = [];
    pen.current = false;
    rbox.current = false;
    fbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = ``;
    setRender((r) => r + 1);
  } else if (e.key === "m" || e.key === "M") {
    if (e.shiftKey) {
      mirrorbool.current = `a`;
    } else if (e.altKey) {
      mirrorbool.current = `al`;
    } else {
      mirrorbool.current = ``;
    }
  } else if (e.altKey&&(e.key === "f" || e.key === "F")) {
    let obj = targetObject.current;
    let arraynumber = [];
    Object.keys(targetObject.current).map((e) => {
      if (targetObject.current[e][0].localName === "rect") {
        arraynumber.push(targetObject.current[e][7]);
        rectToPath(context, targetObject.current[e][7]);
        setRender((r) => r + 1);
      } else if (targetObject.current[e][0].localName === "path") {
        pathToRect(context, targetObject.current[e][7]);
        arraynumber.push(targetObject.current[e][7]);
        setRender((r) => r + 1);
      }
    });
        //targetObject.current = {};
          setRender((r) => r + 1);
          setTimeout(() => {
            let elemArr = Array.from(vg.current.children).filter(
              (f) => !f.getAttribute("name")?.includes("art$")
            );
            arraynumber.map((m) => {
              elemArr[m].setAttribute("stroke", "black");
                  let el = elemArr[m];
                  let tgt = [];
                  tgt.push(el);
                  tgt.push(tgt[0].getBBox().x);
                  tgt.push(tgt[0].getBBox().y);
                  tgt.push(tgt[0].getBBox().width);
                  tgt.push(tgt[0].getBBox().height);
                  tgt.push(tgt[1] + tgt[3]);
                  tgt.push(tgt[2] + tgt[4]);
                  tgt.push(m);
                  targetObject.current[m] = tgt;
            }, 100);
          });

  } else if (e.key === "D" || e.key === "d") {
    if (!e.shiftKey) {
      movepen.current = ``;
      pencirclearr.current = [];
      pen.current = false;
      rbox.current = false;
      fbox.current = false;
      ellipse.current = false;
      polyelip.current.splice(0, 1, false);
      circle.current = false;
      shapes.current = false;
      cursor.current = ``;
      edit.current = false;
    } else {
      Object.keys(targetObject.current).map((m, i) => {
        vgpath.current.push(vgpath.current[m]);
        vgkey.current.push(
          Math.random().toFixed(5) + i + vg.current.getCurrentTime().toFixed(5)
        );
        //vgcolor.current.push(vgcolor.current[m]);
        //straightcolor.current.push(straightcolor.current[m]);
      });
    }
    setRender((r) => r + 1);
  } else if (e.key === "N" || e.key === "n") {
    movepen.current = ``;
    pencirclearr.current = [];
    pen.current = false;
    edit.current = false;
    horizontal.current = false;
    vertical.current = false;
    line.current = false;
    rbox.current = false;
    fbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = ``;
    setRender((r) => r + 1);
  } else if (e.key === "W" || e.key === "w") {
    horizontal.current = false;
    vertical.current = false;
    line.current = false;
    pen.current = true;
    edit.current = false;
    rbox.current = false;
    fbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = ``;
    if (vectoredit.current) {
      dragd.current = [];
      draga.current = [];
      getPathData(context);
      vectora.current = [];
      vectord.current = [];
      vectorPathData(context);
      PenV(context);
    }
    setRender((r) => r + 1);
  } else if (e.key === "L" || e.key === "l") {
    horizontal.current = false;
    vertical.current = false;
    line.current = true;
    pen.current = false;
    edit.current = false;
    rbox.current = false;
    fbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = `crosshair`;
    setRender((r) => r + 1);
  } else if (e.key === "H" || e.key === "h") {
    let wihi = prompt("width height");
    let wid;
    let hei;
    if (+wihi.split(" ")[0] === 0) wid = 0;
    else wid = +wihi.split(" ")[0];
    if (+wihi.split(" ")[1] === 0) hei = 0;
    else hei = +wihi.split(" ")[1];
    HeightFx(context, wid, hei);
  } else if (e.key === "X" || e.key === "x") {
    let xy = prompt("x y");
    let xq;
    let yq;
    if (+xy.split(" ")[0] === 0) xq = 0.01;
    else xq = +xy.split(" ")[0];
    if (+xy.split(" ")[1] === 0) yq = 0.01;
    else yq = +xy.split(" ")[1];
    xfx(context, xq, yq);
  } else if (
    e.key === "ArrowRight" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft"
  ) {
    if (e.key === "ArrowUp") {
      if (shapes.current) {
        vpoly.current = true;
      }

      mirrorbool.current = `v`;
    } else if (e.key === "ArrowRight") {
      if (shapes.current) {
        vpoly.current = false;
      }

      mirrorbool.current = `h`;
    } else if (e.key === "ArrowLeft") {
      if (shapes.current) {
        if (darkgon.current == ``||darkgon.current == `darkgon`) {
          darkgon.current = `darkgonx`;
        } else {
          darkgon.current = ``;
        }
      }
    } else {
      if (shapes.current) {
        if (darkgon.current == ``||darkgon.current == `darkgonx`) {
          darkgon.current = `darkgon`;
        } else {
          darkgon.current = ``;
        }
      }
    }
    setRender((r) => r + 1);
  } else if (e.key === "PageUp") {
    if (e.shiftKey) {
      let xy = prompt("x y");
      let xq;
      let yq;
      if (+xy.split(" ")[0] === 0) xq = 0.01;
      else xq = +xy.split(" ")[0];
      if (+xy.split(" ")[1] === 0) yq = 0.01;
      else yq = +xy.split(" ")[1];
      let coriginx = -(dragrectr.current[1] - dragrectr.current[0]) / 2;
      let coriginy = -(dragrectr.current[3] - dragrectr.current[2]) / 2;
      let c2x =
        dragrectr.current[0] +
        (dragrectr.current[1] - dragrectr.current[0]) / 2;
      let c2y =
        dragrectr.current[2] +
        (dragrectr.current[3] - dragrectr.current[2]) / 2;
      xfx(context, coriginx, coriginy);
      dragd.current = [];
      draga.current = [];
      getPathData(context);
      SetShear(context, xq, yq);
      xfx(context, c2x + coriginx, c2y + coriginy);
    } else {
      let angle = prompt("angle");
      anglevalue.current = +angle;
      rotateFx(context, 0);
      rotateFx(context, +angle);
    }
    setRender((r) => r + 1);
  } else if (e.key === "R" || e.key === "r") {
    horizontal.current = true;
    vertical.current = false;
    line.current = false;
    pen.current = false;
    edit.current = false;
    fbox.current = false;
    rbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = `crosshair`;
    setRender((r) => r + 1);
  } else if (e.key === "T" || e.key === "t") {
    vertical.current = true;
    horizontal.current = false;
    pen.current = false;
    line.current = false;
    edit.current = false;
    rbox.current = false;
    fbox.current = false;
    ellipse.current = false;
    polyelip.current.splice(0, 1, false);
    circle.current = false;
    shapes.current = false;
    cursor.current = `crosshair`;
    setRender((r) => r + 1);
  } else if (e.key === "Delete") {
    ///*
    vgkey.current = vgkey.current.filter((e, i) => i !== target);
    vgpath.current = vgpath.current.filter((e, i) => i !== target);
    
    //straightcolor.current = straightcolor.current.filter(  (e, i) => i !== target);
    //vgcolor.current = vgcolor.current.filter((e, i) => i !== target);
    //*/
    // setRender((r) => r + 1);
  } else if (
    e.key === "o" ||
    e.key === "O" ||
    e.key === "q" ||
    e.key === "Q" ||
    e.key === "b" ||
    e.key === "B" ||
    e.key === "PageDown"
  ) {
    if (!vectoredit.current) {
      movepen.current = ``;
      pencirclearr.current = [];
      pen.current = false;
      edit.current = false;
      horizontal.current = false;
      vertical.current = false;
      line.current = false;
      shapes.current = true;
      cursor.current = `crosshair`;
    }
    if (e.key === "o" || e.key === "O") {
      circle.current = true;
      rbox.current = false;
      fbox.current = false;
      ellipse.current = false;
      polyelip.current.splice(0, 1, false);
    }

    if (e.key === "q" || e.key === "Q") {
      ellipse.current = true;
      rbox.current = false;
      fbox.current = false;
      polyelip.current.splice(0, 1, false);
      circle.current = false;
    }
    if (e.key === "b" || e.key === "B") {
      if (e.altKey && vectoredit.current) {
        if (!bend.current) {
          bend.current = true;
        } else {
          bend.current = false;
        }
      } else {
        if (e.shiftKey) {
                  fbox.current = true;
                  rbox.current = false;
                  polyelip.current.splice(0, 1, false);
                  ellipse.current = false;
                  circle.current = false;
        }
        else{
        rbox.current = true;
        fbox.current = false;
        polyelip.current.splice(0, 1, false);
        ellipse.current = false;
        circle.current = false;
        }
      }
    }
    if (e.key === "PageDown") {
      rbox.current = false;
      fbox.current = false;
      ellipse.current = false;
      circle.current = false;
      let val = prompt("sides");
      polyelip.current.splice(0, 1, true);
      val > 1
        ? polyelip.current.splice(1, 1, +val)
        : polyelip.current.splice(1, 1, 2);
    }
    setRender((r) => r + 1);
  } else {
    ctx.current.reset();
    let value = btoa(vg.current.outerHTML);
    if (e.key === "v" || e.key === "v") {
      link.current.href = "data:image/svg+xml;base64," + value;
      link.current.download = "draw";
      link.current.click();
    }
    if (e.key === "p" || e.key === "P" || e.key === "j" || e.key === "J") {
      let img = new Image();
      img.src = "data:image/svg+xml;base64," + value;
      img.onload = () => {
        ctx.current.drawImage(img, 0, 0);
        link.current.href =
          e.key === "j" || e.key === "J"
            ? ctx.current.canvas.toDataURL("image/jpeg", 1)
            : ctx.current.canvas.toDataURL("image/png", 1);
        link.current.download = "draw";
        link.current.click();
      };
      img.remove();
    }
  }
};
export let bounded = (string, a, z) => {
  return string
    .split(a)
    .join(z)
    .split(z)
    .filter((e, i) => i % 2 !== 0);
};
export let promptfx = () => {
  let m = {};
  m["key"] = prompt("Function", "svg png jpeg edit draw delete");
  m["key"] = m["key"]
    .replace("svg", "v")
    .replace("png", "p")
    .replace("jpeg", "j")
    .replace("delete", "Delete")
    .replace("edit", "e")
    .replace("draw", "d");
  m["key"] !== "v" &&
  m["key"] !== "p" &&
  m["key"] !== "j" &&
  m["key"] !== "d" &&
  m["key"] !== "e" &&
  m["key"] !== "Delete"
    ? (m["key"] = "d")
    : "";
  return m;
};
