export let bendCntrlDragLine=(context,ndx)=>{
      let vectorctrmixed = context.vectorctrmixed;
      let vctrline = context.vctrline;
      let vDragpointsArr = context.vDragpointsArr;
               vDragpointsArr.current = [
                 ndx[0] + 2,
                 ndx[0] + 3,
                 ndx[0] + 4,
                 ndx[0] + 5,
               ];
               vectorctrmixed.current = [
                 ndx[0] + 2,
                 ndx[0] + 3,
                 ndx[0] + 4,
                 ndx[0] + 5,
               ];
               vctrline.current.push(
                 `${ndx[0] + 2} ${ndx[0] + 3}` +
                   ` ` +
                   `${ndx[0]} ${ndx[0] + 1}` +
                   ` `
               );
               vctrline.current.push(
                 `${ndx[0] + 4} ${ndx[0] + 5}` +
                   ` ` +
                   `${ndx[0] + 6} ${ndx[0] + 7}` +
                   ` `
               );
}
export let cntrlFromPoint=(context,pointx)=>{
  let vectorCj=context.vectorCj
  let vectorCi = context.vectorCi;
  let cntrl1=[]
  let cntrl2 = [];
         if (
                vectorCj.current.includes(
                  pointx - 1
                )
              ) {
                cntrl1 = [
                  pointx - 2,
                  pointx - 1,
                ];
              }
              if (
                vectorCi.current.includes(
                  pointx + 2
                )
              ) {
                cntrl2 = [
                  pointx + 2,
                  pointx + 3,
                ];
              }
              return [...cntrl1,`seperator`,...cntrl2]
}
export let multiLineFx=(context,arraydata,pointcenter)=>{
        let vctrline = context.vctrline;
                if (arraydata.length == 0) {
                } else {
                  /*
                  if (
                    pointcenter + 2 !== arraydata[0] &&
                    pointcenter - 2 !== arraydata[0]
                  ) {
                  } else {
                   */
                    vctrline.current.push(
                      arraydata.slice(0, 2).join(" ") +
                        " " +
                        pointcenter +
                        " " +
                        (pointcenter + 1) +
                        " "
                    );
                  //}
                if (arraydata.length == 4) {
                  /*
                     if (
                       pointcenter + 2 !== arraydata[2] &&
                       pointcenter - 2 !== arraydata[2]
                     ) {
                     } 
                     else{
                     */
                    vctrline.current.push(
                      arraydata.slice(2, 4).join(" ") +
                        " " +
                        pointcenter +
                        " " +
                        (pointcenter + 1) +
                        " "
                    );
                  //}
                  }
                }
};
export let lineDrag=(context,pointx,a,b,c,d)=>{
  let vDragpointsArr=context.vDragpointsArr
  let vectorctrmixed=context.vectorctrmixed
  let vctrline = context.vctrline;
                     
                          let ctrlz1 = cntrlFromPoint(
                            context,
                            pointx[a]
                          ).filter((f) => f !== `seperator`);
                          let ctrlz2 = cntrlFromPoint(
                            context,
                            pointx[c]
                          ).filter((f) => f !== `seperator`);

                          vDragpointsArr.current.push(
                            pointx[a],
                            pointx[b],
                            pointx[c],
                            pointx[d],
                            ...ctrlz1,
                            ...ctrlz2
                          );

                          vectorctrmixed.current.push(...ctrlz1, ...ctrlz2);
                          multiLineFx(context, ctrlz1, pointx[a]);
                          multiLineFx(context, ctrlz2, pointx[c]); 
}