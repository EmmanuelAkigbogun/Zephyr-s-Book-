export let DeleteFx = (context) => {
  let targetObject = context.targetObject;
  let dragd = context.dragd;
  let draga = context.draga;
  let vgpath = context.vgpath;
  let vDragpointsArr = context.vDragpointsArr;
  let removectr = context.removectr;
  let deletearr = context.deletearr;
  let vectorCi = context.vectorCi;
  let vectorCj = context.vectorCj;
  let vectorCp = context.vectorCp;
  let vectorP = context.vectorP;

  let arrayhide = Object.keys(hidectr.current);

  Object.keys(targetObject.current).map((a, i) => {
    let boolpoly = false;
    ///
    let lo = [];
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
      } else if (draga.current[i][index] == "Z" && (i - oddfactor) % 2 == 0) {
        oddfactor = oddfactor + 1;
      }
      ////////////////////////////////////close///////////////////////////////////////
      if (arrayhide.includes(`${index}`)) {
        if (!boolpoly) {
          boolpoly = true;
        }
        let xval = +dragd.current[i][hidectr.current[index]];
        let yval = +dragd.current[i][hidectr.current[index]];
        if (removectr.current.includes(index)) {
        } else {
          if ((index - oddfactor) % 2 == 0) {
            lo.push(draga.current[i][index] + xval.toFixed(2));
          } else {
            lo.push(draga.current[i][index] + yval.toFixed(2));
          }
        }
      } else {
        lo.push(draga.current[i][index] + dragd.current[i][index]);
        if (boolpoly) {
          targetObject.current[a][0].removeAttribute("data-poly");
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
