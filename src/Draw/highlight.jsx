import { Vselect } from "./VselectFx"

export let highlightMove=(context,e,x,y,valx,valy,valw,valh)=> {
    let vg=context.vg
    let pick=context.pick
    let dragbool=context.dragbool
    let targetObject=context.targetObject
    let target=context.target
                dragbool.current = false;
                pick.current.splice(2, 1, valx);
                pick.current.splice(3, 1, valy);
                pick.current.splice(4, 1, valw);
                pick.current.splice(5, 1, valh);
                valx = pick.current[2];
                valy = pick.current[3];
                if (!e.ctrlKey) {
                  targetObject.current = {};
                }
                Array.from(vg.current.children)
                  .filter((f) => !f.getAttribute("name")?.includes("art$"))
                  .map((p, i) => {
                    target.current = [];
                    let vx = pick.current[0];
                    let vy = pick.current[1];
                    let x1 = p.getBBox().x;
                    let y1 = p.getBBox().y;
                    let x2 = x1 + p.getBBox().width;
                    let y2 = y1 + p.getBBox().height;
                    /*
                console.log(
                  x ,x1 , x2 ,
                y , y1,  y2,
                p
                );

                 (x >= x1 && x <= x2 && y >= y1 && y <= y2) ||
                    (valx >= x1 && valx <= x2 && valy >= y1 && valy <= y2)
                */
                    if (
                      (x1 >= valx && x1 <= x && y1 >= valy && y1 <= y) ||
                      (x2 >= valx && x2 <= x && y2 >= valy && y2 <= y) ||
                      (x1 >= valx && x1 <= x && y2 >= valy && y2 <= y) ||
                      (x2 >= valx && x2 <= x && y1 >= valy && y1 <= y) ||
                      (x1 <= valx && x1 >= x && y1 <= valy && y1 >= y) ||
                      (x2 <= valx && x2 >= x && y2 <= valy && y2 >= y) ||
                      (x1 <= valx && x1 >= x && y2 <= valy && y2 >= y) ||
                      (x2 <= valx && x2 >= x && y1 <= valy && y1 >= y) ||
                      (x >= x1 && x <= x2 && y >= y1 && y <= y2) ||
                      (x >= x1 && x <= x2 && valy >= y1 && valy <= y2) ||
                      (valx >= x1 && valx <= x2 && y >= y1 && y <= y2) ||
                      (valx >= x1 && valx <= x2 && valy >= y1 && valy <= y2) ||
                      (x <= x1 && x >= x2 && y <= y1 && y >= y2) ||
                      (x <= x1 && x >= x2 && valy <= y1 && valy >= y2) ||
                      (valx <= x1 && valx >= x2 && y <= y1 && y >= y2) ||
                      (valx <= x1 && valx >= x2 && valy <= y1 && valy >= y2) ||
                      p == e.target
                    ) {
                      target.current.push(p);
                      target.current.push(p.getBBox().x);
                      target.current.push(p.getBBox().y);
                      target.current.push(p.getBBox().width);
                      target.current.push(p.getBBox().height);
                      target.current.push(
                        target.current[1] + target.current[3]
                      );
                      target.current.push(
                        target.current[2] + target.current[4]
                      );
                      target.current.push(i);
                      targetObject.current[i] = target.current;
                    }
                  });
              
}
export let highlightVMove = (context, e, x, y, valx, valy, valw, valh) => {
  let vg = context.vg;
  let pick = context.pick;
  let dragbool = context.dragbool;
  let vectorctrmixed=context.vectorctrmixed
  let vctrline = context.vctrline.current;
  let vDragpointsArr = context.vDragpointsArr;
  let velement=context.velement
  let whitecolor = context.whitecolor;
  let bluecolor = context.bluecolor;
  let purplecolor = context.purplecolor;
  let circlerad = context.circlerad;
  let vgcolor=context.vgcolor
  let targetObject=context.targetObject
  let ashen=context.ashen
  dragbool.current = false;
  pick.current.splice(2, 1, valx);
  pick.current.splice(3, 1, valy);
  pick.current.splice(4, 1, valw);
  pick.current.splice(5, 1, valh);
  valx = pick.current[2];
  valy = pick.current[3];
  if (!e.ctrlKey) {
  vctrline.current = [];
  vectorctrmixed.current = [];
  vDragpointsArr.current = [];
  }
  

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
  Array.from(vg.current.children)
    .filter(
      (f) =>
        f.getAttribute("name")?.includes("art$") ||
        f.getAttribute("name")?.includes("vctrart$") ||
        f.getAttribute("name")?.includes("cloneart$") ||
        f.getAttribute("name")?.includes("vlineart$") ||
        f.getAttribute("name")?.includes("vcirart$")&&
        f.localName!="svg"
    )
    .map((p, i) => {
      let vx = pick.current[0];
      let vy = pick.current[1];
      let x1 = p.getBBox().x;
      let y1 = p.getBBox().y;
      let x2 = x1 + p.getBBox().width;
      let y2 = y1 + p.getBBox().height;
    
      if (
        
        (x1 >= valx && x1 <= x && y1 >= valy && y1 <= y) ||
        (x2 >= valx && x2 <= x && y2 >= valy && y2 <= y) ||
        (x1 >= valx && x1 <= x && y2 >= valy && y2 <= y) ||
        (x2 >= valx && x2 <= x && y1 >= valy && y1 <= y) ||
        (x1 <= valx && x1 >= x && y1 <= valy && y1 >= y) ||
        (x2 <= valx && x2 >= x && y2 <= valy && y2 >= y) ||
        (x1 <= valx && x1 >= x && y2 <= valy && y2 >= y) ||
        (x2 <= valx && x2 >= x && y1 <= valy && y1 >= y) ||
        (x >= x1 && x <= x2 && y >= y1 && y <= y2) ||
        (x >= x1 && x <= x2 && valy >= y1 && valy <= y2) ||
        (valx >= x1 && valx <= x2 && y >= y1 && y <= y2) ||
        (valx >= x1 && valx <= x2 && valy >= y1 && valy <= y2) ||
        (x <= x1 && x >= x2 && y <= y1 && y >= y2) ||
        (x <= x1 && x >= x2 && valy <= y1 && valy >= y2) ||
        (valx <= x1 && valx >= x2 && y <= y1 && y >= y2) ||
        (valx <= x1 && valx >= x2 && valy <= y1 && valy >= y2) ||
        p == e.target
      ) {
          Vselect(context,p);
      }
    
    });
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
            m.setAttribute("stroke", whitecolor.current);
            m?.setAttribute("r", circlerad.current[5]);
          });
          velement.current[3]?.map((m) => {
            m.classList.add("highlightblue");
            m.classList.remove("cloneblue");
          });
};