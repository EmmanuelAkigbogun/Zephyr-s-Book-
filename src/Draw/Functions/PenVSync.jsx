import { noduplicate } from "../mZSync";
export let PenV = (context) => {
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let vgpath = context.vgpath;
  let vgpathxy=context.vgpathxy
  let vg=context.vg
  let velindex = context.velindex;
  let downconst=context.downconst
  let pencirclearr=context.pencirclearr
  let penpause=context.penpause
  let mooveboolean = context.mooveboolean;
  penpause.current=true
    
      vgpathxy.current={}
  Object.keys(targetObject.current).map((a, i) => {
    velindex.current = +a;
    downconst.current = [];
    let oddfactor = 0;
    for (let index = 0; index < dragd.current[i].length; index++) {
      //////////////////////////////////////open////////////////////////////////
      if (
        (draga.current[i][index] == "M" ||
          draga.current[i][index] == "C" ||
          draga.current[i][index] == "L") &&
        (index - oddfactor) % 2 !== 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (
        draga.current[i][index] == "V" &&
        (index - oddfactor) % 2 === 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (
        draga.current[i][index] == "H" &&
        (index - oddfactor) % 2 != 0
      ) {
        oddfactor = oddfactor + 1;
      }
      ////////////////////////////////////close///////////////////////////////////////
      if ((index - oddfactor) % 2 == 0) {
        ///////////////////////////////////////open/////////////////////////////////////////////
        if (draga.current[i][index] == "H") {
          oddfactor = oddfactor + 1;
        }
        if (draga.current[i][index] == "Z"){
            downconst.current.push(draga.current[i][index]); 
        }
        ////////////////////////////////////close////////////////////////////////////////////////
      } else {
              downconst.current.push(
                (draga.current[i][index - 1] == ""
                  ? " "
                  : draga.current[i][index - 1]) +
                  (+dragd.current[i][index - 1]).toFixed(2) +
                  " " +
                  draga.current[i][index] +
                  (+dragd.current[i][index]).toFixed(2)
              );            
      }
    }
  });
  pencirclearr.current=[]
  pencirclearr.current = Array.from(vg.current.children)
    .filter(
      (f) =>
        f.getAttribute("name")?.includes("vcirart$") ||
        f.getAttribute("name")?.includes("vlineart$")
    )
    .map((m) => m.getAttribute("cx") + " " + m.getAttribute("cy"));
    noduplicate(pencirclearr.current);
    mooveboolean.current = true;      
};

