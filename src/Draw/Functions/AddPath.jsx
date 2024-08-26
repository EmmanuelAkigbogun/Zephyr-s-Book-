export let AddPath = (context) => {
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let vgpath = context.vgpath;
  let vDragpointsArr = context.vDragpointsArr;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vectorCp = context.vectorCp;
  let vectorP = context.vectorP;
  let vage = context.vage
  let bend=context.bend
  let target=context.target
  let pen=context.pen
  Object.keys(targetObject.current).map((a, i) => {
    //console.log();
    ///
    let check=false
    let lo = [];
    let mValue=0
    for (let index = 0; index < dragd.current[i].length; index++) {
   if (draga.current[i][index]=="M") {
         mValue = index;
   }

      if (index == vage.current[0]+1) {
          lo.push(draga.current[i][index] + dragd.current[i][index]);
            target.current[0].removeAttribute("data-poly")
            if (bend.current&&!pen.current) {
             
                     lo.push(`C` + vage.current[2]);
                     lo.push( ``+vage.current[3]);
                     lo.push( ``+vage.current[4]);
                     lo.push( ``+vage.current[5]);
            
                     check=true
                    if (draga.current[i][index + 1] == "Z") {
                            lo.push(`` + dragd.current[i][mValue]);
                            lo.push(`` + dragd.current[i][mValue+1]);
                            check=false
              
                    }
            }
            else{
              if (draga.current[i][vage.current[0]]==`C`) {
                     lo.push(`` + vage.current[2]);
                     lo.push(`` + vage.current[3]);
                     lo.push(`` + vage.current[2]);
                     lo.push(`` + vage.current[3]);
                     lo.push(`C` + vage.current[2]);
                     lo.push(`` + vage.current[3]);
              }
              else{
                lo.push(`L` + vage.current[2]);
                lo.push(`` + vage.current[3]);
              }
            }
      } else {
        if (check) {
          lo.push(``+ dragd.current[i][index]);
          check=false;
        }
        else{
        lo.push(draga.current[i][index] + dragd.current[i][index]);
        }
      }
    }

    if (targetObject.current[a][0].localName == "path") {
      targetObject.current[a][0].setAttribute(
        "d",
        lo
          .map((m) => m)
          .join(" ")
          .replace(/ (?=[A-Z]|[a-z])/g, "")
      );
      vgpath.current.splice(a, 1, targetObject.current[a][0].getAttribute("d"));
    }
  });

};
