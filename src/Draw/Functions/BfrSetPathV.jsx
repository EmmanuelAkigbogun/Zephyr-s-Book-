import { noduplicate } from "../mZSync";

export let BfrSetPathV=(context)=>{
  let vDragpointsArr = context.vDragpointsArr;
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let dragx = context.dragx;
  let dragy = context.dragy;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vectorCp = context.vectorCp;
    let vectorCL = context.vectorCL;
  let vectorGp = context.vectorGp;
  let vectorP = context.vectorP;
  let alignedline=context.alignedline
  let movepointarr = context.movepointarr;
  let vectord=context.vectord
    let vectora = context.vectora;
  let vectorctrmixed=context.vectorctrmixed
  noduplicate(vDragpointsArr.current);
  noduplicate(vectorctrmixed.current);
  noduplicate(vectorGp.current);
movepointarr.current={};
  let pnut = vDragpointsArr.current
    //.filter((e) => !vectorCi.current.includes(e))
    //.filter((e) => !vectorCj.current.includes(e));
  ///*
      alignedline.current = [];
      let newx = 0;
      let newy = 0;
      let movepoint =pnut;
      let pointzz = [
        ...(vectorctrmixed.current),
        ...(vectorGp.current),
      ];
       pointzz=pointzz.filter(e=>!pnut.includes(e))
     let oddfactor=0
      pointzz
    .map((e,i) => {
      ////////////////////////////////////open///////////////////////////////////////
      if (
        (vectora.current[0][e] == "M" ||
          vectora.current[0][e] == "C" ||
          vectora.current[0][e] == "L") &&
        (i - oddfactor) % 2 !== 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (vectora.current[0][e] == "Z" && (i - oddfactor) % 2 == 0) {
        oddfactor = oddfactor + 1;
      }
      ////////////////////////////////////close///////////////////////////////////////
      if (
        (i - oddfactor) % 2 == 0
      ) {
        //  /*
        const digital = 3;
        let evnum = [
          vectord.current[0][pointzz[i]],
          vectord.current[0][pointzz[i + 1]],
        ];
        let evring = evnum.join(" ");
        let evamax = evnum.map((m) => +m + digital);
        let evamin = evnum.map((n) => +n - digital);
        movepoint.map((k, j) => {
          if (
            j % 2 == 0 
          ) {
            let lmove = [
              vectord.current[0][movepoint[j]],
              vectord.current[0][movepoint[j + 1]],
            ];
          
            let x = lmove[0];
            let y = lmove[1];

            if (
              (+x <= evamax[0] && +x >= evamin[0]) ||
              (+y <= evamax[1] && +y >= evamin[1])
            ) {
              if (y - evnum[1] <= digital && y - evnum[1] >= -digital) {
                newy = evnum[1];
                movepointarr.current[movepoint[j + 1]] = pointzz[i + 1]; 
              }
              if (x - evnum[0] <= digital && x - evnum[0] >= -digital) {
                newx = evnum[0];
                movepointarr.current[movepoint[j]] = pointzz[i];
              }
              if (newx == 0) {
                newx = x;
              }
              if (newy == 0) {
                newy = y;
              }
              alignedline.current.push(`${newx} ${newy} ${evring}`);
              alignedline.current =
              alignedline.current.filter(
                      (f) =>
                        (f.split(" ")[0] == newx && f.split(" ")[2] == newx) ||
                        (f.split(" ")[1] == newy && f.split(" ")[3] == newy)
                    );
                    noduplicate(alignedline.current)                 
            }
          }
        });
        //*/
      }
    })
    //.filter((e) => e == true)[0];
  //  */
}
export let rota=(cx,cy,x,y)=>{
    const pi = Math.PI;
    let differy = cy - y;
    let differx = cx - x;
    let yita = Math.atan(differy / differx);
    let ym = yita * 180;
    let gh = ym / pi;
    if (y < cy && -gh < 0) {
                 gh = -gh + 180;
               } else if (x < cx && -gh < 180 && -gh >= 0) {
                 gh = -gh - 180;
               } else {
                 gh = -gh;
               }
               if (gh == 90 && y > cy) {
                gh=-gh
               }
    return gh;
}