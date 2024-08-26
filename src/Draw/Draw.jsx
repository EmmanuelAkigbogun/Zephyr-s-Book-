import { createContext, useRef, useState } from "react";
import Form from "./Form";
import Color from "../Color/Color"
import BarChart from "../BarChart/BarChart";
import OnLoad from "./OnLoad";
import Svg from "./Svg";
import Rect from "./Rect";
import PenHoverCircle from "./PenHoverCircle";
import AlignedLine from "./AlignedLine";
import Canvas from "./Canvas";
import WindowFx from "./WindowFx";
import RectP from "./RectP";
import PenClickCircle from "./PenClickCircle";
import VCirclesP from "./VCirclesP";
import Vcontrols from "./Vcontrols";
import VCntrlLine from "./VCntrlLine";
import VectorClone from "./VectorClone";
import CenterCircle from "./CenterCircle";
import Test from "../Test/Test";
import VectorCloneClone from "./VcloneClone";
import PenCtr from "./PenCtrl";
export let Context = createContext();
function Draw() {
  let thick = useRef(1.2);
  let [render, setRender] = useState(0);
  let vgpathxy = useRef({});
  //window,pendown,penhover,penclick,vcircle
  ///*
  //white
  let colorztroke = useRef(`black`);
  let wtx = useRef(`black`);
  let ctlcolor = useRef(`#AAAAAA`);
  let fillcolor = useRef(`#FFFFFF11`);
  let backgroundData = useRef(`#E5E5E5`);
  let whitecolor = useRef(`#FFFFFF`);
  let bluecolor = useRef(`#26A3FF`);
  let purplecolor = useRef(`#26A3FF`);
  //useRef(`#2572B8`);
  //useRef(`#8F2FBC`);
  let ashen = useRef("#848484");
  //*/
  /*
  //black
  let colorztroke = useRef(`white`);
  let wtx = useRef(`white`);
  let ctlcolor = useRef(`#CCCCCC`);
  let fillcolor = useRef(`#FFFFFF11`);
  let backgroundData = useRef(`black`);
  let whitecolor = useRef(`#FFFFFF`);
  let bluecolor = useRef(`#26A3FF`);
  let purplecolor = useRef(`#26A3FF`);
  let ashen = useRef("#848484");
  */
  /*
  //azhin
  let colorztroke = useRef(`white`);
   let wtx = useRef(`white`);
   let ctlcolor = useRef(`#000000`);
   let fillcolor = useRef(`#FFFFFF11`);
   let backgroundData = useRef(`#646464`);
   let whitecolor = useRef(`#FFFFFF`);
   let bluecolor = useRef(`#2572B8`);
   let purplecolor = useRef(`#2572BB`);
   //let purplecolor = useRef(`#8F2FBC`);
   let ashen = useRef("#848484");
  */
  let colorbool = useRef(false);
  let vgcolor = useRef([
    // `yellow`
    //,`red`,
    //`red`, `white`, `purple`, `yellow`, `bisque`,`orange`
  ]);
  let straightcolor = useRef([
    //`yellow`,
    //`red`,
    //  `red`,`white`,`purple`,`yellow`,`bisque`,`orange`
  ]);
  let vgpath = useRef([
    //`M249.11 541.84C507.11 682.26 406.2259615384616 633.868085106383 406.2259615384616 633.868085106383C406.2259615384616 633.868085106383 507.94 693.01 253.25 766.22`,
    //`M20 34 56 60`
    //,`M20 34 56 60`,
    // `M193.78 155.74L193.78 317.64L279.90 317.64ZM338.34 155.74L377.30 317.64L311.68 317.64Z`,
    //`M42.50100200400806 163.125040743785C70.50100200400806 183.125040743785 69.50100200400806 183.125040743785 87.50100200400806 212.125040743785C108 227 138 189 162.50100200400806 179.125040743785L173.50100200400806 147.125040743785L214.50100200400806 157.125040743785L187.50100200400806 207.125040743785C209.50100200400806 261.125040743785 161.50100200400806 290.125040743785 125.50100200400806 253.125040743785C106.50100200400806 268.125040743785 104.50100200400806 269.125040743785 91.50100200400806 273.125040743785C64.50100200400806 271.125040743785 64.50100200400806 271.125040743785 42.50100200400806 263.125040743785L23.501002004008058 307.125040743785L-20.498997995991942 305.125040743785C5.501002004008058 255.125040743785 -112 238 -45.49899799599194 166.125040743785C-6 152 -5 153 42.50100200400806 163.125040743785Z`,
    //`M656.2800729927008 234.06676673865095C466.2800729927008 259.0667667386509 723.2800729927008 319.066766738651 614.2800729927008 332.066766738651ZM659 640C620 650 448 589 533 518C513 611 422.2800729927008 369.0667667386509 339.2800729927008 496.0667667386509C419.2800729927008 606.0667667386509 387 208 473 230C537 367 684 591 702 281Z`,
    // `M234 465L467 698L234 465Z`
    //`M317.01 0.01C127.01 25.01 384.01 85.01 275.01 98.01ZM267.01 350.01 235.01 263.01C161.01 331.01 83.01 135.01 0.01 262.01C80.01 372.01 151.01 101.01 237.01 123.01Z`,
    /*
    `M195 279C259 312 270 329 250 365C206 396 183 396 139 365C131 318 143 301 195 279Z`,
  
    `M100 50C100 63 95 76 86 85C77 94 64 100 51 100C38 100 25 95 16 86C6 77 1 65 0 52C0 39 4 26 13 17C22 7 34 1 47 0C60 -1 73 4 83 12C93 21 99 33 100 50Z`,
        `M926 199C736 224 993 284 884 297ZM876 549 844 462ZC770 530 692 334 609 461C689 571 760 300 846 322Z`,
    `M565 323C360 262 638 178 488 276`,
    `M307 239 245 270C327 344 112 286 165 338C210 371 31 361 107 37`,
    `M428 324C292 382 290 202 430 264`,
    `M163 391C43 315 197 413 42 513C0 396 112 500 97 551C164 475 321 577 328 502C349 517 360 524 382 538`,
    `M273 550L260 670L297 699L368 743L492 682Z`,
    */
  ]);

  let vgkey = useRef([]);
  let vg = useRef(null);
  let ctx = useRef(null);
  let link = useRef(null);
  let vgidentity = useRef({});
  let cwidth = useRef(
    window.innerWidth
  );
  let cheight = useRef(
    window.innerHeight
  );
  let vx = useRef(0);
  let vy = useRef(0);
  let mooveboolean = useRef(false);
  let focusbool = useRef([]);
  let hovercolor = useRef(-1);
  let target = useRef([0, 0, 0, 0, 0, 0, 0, 0]);
  let targetObject = useRef({});
  let edit = useRef(true);
  let horizontal = useRef(false);
  let vertical = useRef(false);
  let line = useRef(false);
  let pen = useRef(false);
  let pencircle = useRef(0);
  let circlerad = useRef([`.33%`, `.15%`, `.1%`, `1.5%`, `.6%`, `.45%`]);
  let lineeditwidth = useRef(`.2%`);
  let pencirclearr = useRef([]);
  let pencirctr = useRef([]);
  let penpause = useRef(false);
  let penmovebool = useRef([false, false, false]);
  let penjusttrue = useRef(false);
  let movepen = useRef(``);
  let downconst = useRef([]);
  let penendindex = useRef(``);
  let editdrag = useRef(false);
  let dragx = useRef(0);
  let dragy = useRef(0);
  let dragd = useRef([]);
  let draga = useRef([]);
  let dragbool = useRef(false);
  let dragrect = useRef([]);
  let dragrectr = useRef([]);
  let drag = useRef(false);
  let bBoxColor = useRef("#434343");
  let clclonecolor = useRef(null);
  let alignedline = useRef([]);
  let pick = useRef([]);
  let pickclone = useRef([]);
  let highlight = useRef(false);
  let gendragorclick = useRef(false);
  let shapes = useRef(false);
  let rbox = useRef(false);
  let fbox = useRef(false);
  let circle = useRef(false);
  let ellipse = useRef(false);
  let polyelip = useRef([]);
  let shapebool = useRef(false);
  let shapedown = useRef(false);
  let cursor = useRef(``);
  let eliele = useRef(null);
  let duplicate = useRef(false);
  let lockdrag = useRef(null);
  let rcursor = useRef(``);
  let vpoly = useRef(true);
  let vectoredit = useRef(false);
  let vectorindex = useRef([]);
  let vectorCi = useRef([]);
  let vectorCj = useRef([]);
  let fullC = useRef([]);
  let vectorCp = useRef([]);
  let vectorCL = useRef([]);
  let vectorGp = useRef([]);
  let vectorBtwP = useRef([]);
  let vectorP = useRef([]);
  let vDragpointsArr = useRef([]);
  let velement = useRef([[], [], [], []]);
  let vectordrag = useRef(false);
  let vectord = useRef([]);
  let vectora = useRef([]);
  let vectorctrmixed = useRef([]);
  let vctrline = useRef([]);
  let centercirclearr = useRef([]);
  let centercirbool = useRef([]);
  let vage = useRef([]);
  let rangerage = useRef({});
  let replacerange = useRef({});
  let hidectr = useRef({});
  let removectr = useRef([]);
  let bend = useRef(false);
  let vmz = useRef([]);
  let rotatedown = useRef(false);
  let rectzerobool = useRef(false);
  let anglevalue = useRef([]);
  let rotatewheel = useRef(false);
  let rotatetype = useRef(``);
  let rotatepoint = useRef([]);
  let zoomvalue = useRef(0);
  let velindex = useRef(-1);
  let mirror = useRef([]);
  let mirrorbool = useRef(``);
  let penonclone = useRef([]);
  let bendclient = useRef([]);
  let vdoormo = useRef(false);
  let vdoormop = useRef(false);
  let vgroup = useRef(false);
  let groupcount = useRef(-1);
  let groupobj = useRef({});
  let darkgon = useRef(``);
  let movepointarr = useRef({});
  let deletearr = useRef([]);
  let x = useRef(0);
  let y = useRef(0);
  let o = useRef(0);
  let bendarray = useRef([]);
  let colorpick = useRef(null);
  //////////
  let highlightveditboolpoint = useRef(false);
  let vhighlightbool = useRef(false);
  let mouseon = useRef(false);
  let historydata = useRef([]);
  let historytxt = useRef(``);
  if (navigator.userAgentData.mobile){
    edit.current=false
    thick.current=3
  }
  ///////////

  let contextData = {
    render: render,
    /////////
    highlightveditboolpoint: highlightveditboolpoint,
    vhighlightbool: vhighlightbool,
    mouseon: mouseon,
    //////////
    edit: edit,
    setRender: setRender,
    vgpathxy: vgpathxy,
    thick: thick,
    vg: vg,
    wtx: wtx,
    bBoxColor: bBoxColor,
    ashen: ashen,
    ctx: ctx,
    link: link,
    vgpath: vgpath,
    vgkey: vgkey,
    vgidentity: vgidentity,
    vgcolor: vgcolor,
    colorztroke: colorztroke,
    bluecolor: bluecolor,
    purplecolor: purplecolor,
    whitecolor: whitecolor,
    cwidth: cwidth,
    cheight: cheight,
    mooveboolean: mooveboolean,
    focusbool: focusbool,
    hovercolor: hovercolor,
    straightcolor: straightcolor,
    target: target,
    velindex: velindex,
    targetObject: targetObject,
    horizontal: horizontal,
    vertical: vertical,
    line: line,
    pen: pen,
    pencircle: pencircle,
    penpause: penpause,
    penmovebool: penmovebool,
    penjusttrue: penjusttrue,
    circlerad: circlerad,
    lineeditwidth: lineeditwidth,
    pencirclearr: pencirclearr,
    pencirctr: pencirctr,
    movepen: movepen,
    downconst: downconst,
    penendindex: penendindex,
    vx: vx,
    vy: vy,
    editdrag: editdrag,
    dragx: dragx,
    dragy: dragy,
    dragd: dragd,
    draga: draga,
    dragbool: dragbool,
    dragrect: dragrect,
    dragrectr: dragrectr,
    drag: drag,
    alignedline: alignedline,
    pick: pick,
    highlight: highlight,
    gendragorclick: gendragorclick,
    shapes: shapes,
    rbox: rbox,
    fbox: fbox,
    circle: circle,
    ellipse: ellipse,
    polyelip: polyelip,
    shapebool: shapebool,
    cursor: cursor,
    shapedown: shapedown,
    eliele: eliele,
    duplicate: duplicate,
    lockdrag: lockdrag,
    rcursor: rcursor,
    rectzerobool: rectzerobool,
    vpoly: vpoly,
    vectoredit: vectoredit,
    vectorindex: vectorindex,
    vectorCi: vectorCi,
    vectorCj: vectorCj,
    fullC: fullC,
    vectorCp: vectorCp,
    vectorCL: vectorCL,
    vectorBtwP: vectorBtwP,
    vectorP: vectorP,
    vectorGp: vectorGp,
    vDragpointsArr: vDragpointsArr,
    velement: velement,
    vectordrag: vectordrag,
    vectord: vectord,
    vectora: vectora,
    vectorctrmixed: vectorctrmixed,
    vctrline: vctrline,
    centercirclearr: centercirclearr,
    centercirbool: centercirbool,
    vage: vage,
    replacerange: replacerange,
    rangerage: rangerage,
    hidectr: hidectr,
    removectr: removectr,
    bend: bend,
    vmz: vmz,
    rotatedown: rotatedown,
    anglevalue: anglevalue,
    rotatewheel: rotatewheel,
    rotatetype: rotatetype,
    rotatepoint: rotatepoint,
    zoomvalue: zoomvalue,
    mirror: mirror,
    mirrorbool: mirrorbool,
    penonclone: penonclone,
    clclonecolor: clclonecolor,
    vdoormo: vdoormo,
    vdoormop: vdoormop,
    vgroup: vgroup,
    groupcount: groupcount,
    groupobj: groupobj,
    bendclient: bendclient,
    darkgon: darkgon,
    movepointarr: movepointarr,
    ctlcolor: ctlcolor,
    fillcolor: fillcolor,
    backgroundData: backgroundData,
    x: x,
    y: y,
    o: o,
    bendarray: bendarray,
    colorpick: colorpick,
    colorbool: colorbool,
    deletearr: deletearr,
    historydata: historydata,
    historytxt: historytxt,
  };
  return (
    <>
      <input
        type="color"
        id="cp"
        ref={colorpick}
        className="fixed-input"
        onInput={(e) => {
          if (colorbool.current == `fill`) {
            Object.keys(targetObject.current).length > 0 &&
              Object.keys(targetObject.current).map((a, i) => {
                targetObject.current[a][0].setAttribute("fill", e.target.value);
                targetObject.current[a][0].classList.remove("fill");
              });
          } else {
            colorztroke.current = e.target.value;
            Object.keys(targetObject.current).length > 0 &&
              Object.keys(targetObject.current).map((a, i) => {
                targetObject.current[a][0].setAttribute(
                  "stroke",
                  e.target.value
                );
              });
            setRender((e) => e + 1);
          }
        }}
      />
      <Context.Provider value={contextData}>
        <Form />
        <OnLoad />
        <WindowFx />
        <svg
          viewBox={`${vx.current} ${vy.current} ${cwidth.current} ${cheight.current}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          ref={vg}
          id="vg"
          name="svgart$"
          cursor={cursor.current}
          style={{ backgroundColor: backgroundData.current }}
        >
          <>
            {!vgkey.current.length == 0 &&
              vgpath.current.map((e, i) => {
                let f = e.replace("POLYGON:", "");
                //  console.log(f=="",f=="Z",e==="",e=="Z");
                return (
                  f !== "Z" &&
                  (e.includes("M") && !e.includes("POLYGON:") ? (
                    <path
                      key={`val${vgkey.current[i]}`}
                      d={e}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : e.includes("CIRCLE") ? (
                    <circle
                      key={`cir${vgkey.current[i]}`}
                      r={e.replace("CIRCLE:", "").split(" ")[2]}
                      cx={e.replace("CIRCLE:", "").split(" ")[0]}
                      cy={e.replace("CIRCLE:", "").split(" ")[1]}
                      fill="#00000000"
                    />
                  ) : e.includes("ELLIPSE:") ? (
                    <ellipse
                      key={`eli${vgkey.current[i]}`}
                      rx={e.replace("ELLIPSE:", "").split(" ")[2]}
                      ry={e.replace("ELLIPSE:", "").split(" ")[3]}
                      cx={e.replace("ELLIPSE:", "").split(" ")[0]}
                      cy={e.replace("ELLIPSE:", "").split(" ")[1]}
                      fill="#00000000"
                    />
                  ) : e.includes("RECT:") ? (
                    <rect
                      key={`rec${vgkey.current[i]}`}
                      width={e.replace("RECT:", "").split(" ")[2]}
                      height={e.replace("RECT:", "").split(" ")[3]}
                      x={e.replace("RECT:", "").split(" ")[0]}
                      y={e.replace("RECT:", "").split(" ")[1]}
                      fill="#00000000"
                    />
                  ) : e.includes("FOBJ:") ? (
                    <foreignObject
                      key={`fobj${vgkey.current[i]}`}
                      width={e.replace("FOBJ:", "").split(" ")[2]}
                      height={e.replace("FOBJ:", "").split(" ")[3]}
                      x={e.replace("FOBJ:", "").split(" ")[0]}
                      y={e.replace("FOBJ:", "").split(" ")[1]}
                      // fill="#00000000"
                      className="foreign"
                    >
                      {+vgkey.current[i][vgkey.current[i].length - 1] % 2 ==
                      0 ? (
                        <Color />
                      ) : (
                        <BarChart />
                      )}
                    </foreignObject>
                  ) : e.includes("POLYGON:") ? (
                    <path
                      key={`pol${vgkey.current[i]}`}
                      d={f}
                      //strokeLinecap="round"
                      fill="#00000000"
                    />
                  ) : (
                    ""
                  ))
                );
              })}
          </>
          <g fill="none" name="hisart$">
            {historytxt.current}
          </g>
          {<VectorClone />}
          {<VectorCloneClone />}
          {<VCntrlLine />}
          {<Vcontrols />}
          {<VCirclesP />}
          {<CenterCircle />}
          {<Rect />}
          {<PenHoverCircle />}
          {
            // <PenCtr />
          }
          {<PenClickCircle />}
          {<RectP />}

          {<AlignedLine />}
        </svg>
        <a href="" ref={link}></a>
        <Canvas />
      </Context.Provider>
    </>
  );
}
export default Draw;
