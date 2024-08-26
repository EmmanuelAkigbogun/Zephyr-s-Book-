import { useContext } from "react";
import { Context } from "./Draw";
import { noduplicate } from "./mZSync";
function VCirclesP() {
  let context = useContext(Context);
  let vectorCL = context.vectorCL;
  let vectorP = context.vectorP;
  let circlerad = context.circlerad;
  let vectord = context.vectord;
  let vectora = context.vectora;
  let vectoredit = context.vectoredit;
  let vectorGp = context.vectorGp;
  let whitecolor = context.whitecolor;
  let bluecolor = context.bluecolor;
  let purplecolor = context.purplecolor;
   let backgroundData = context.backgroundData;
  let mval = 0;
  let mulval=``
  let oddfactor = 0;
  let zbool = true;
  noduplicate(vectorGp.current);
       if (
         backgroundData.current == "#646464" ||
         backgroundData.current == "black"
       ) {
         bluecolor.current = "white";
         purplecolor.current = "white";
       }
  return (
    vectoredit.current &&
    vectorGp.current.map((e, i) => {
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
      if ((i - oddfactor) % 2 == 0 && vectord.current[0][e] !== "") {
        if (vectora.current[0][e] == "M") {
          mval = e;
          if (zbool) {
            mulval=`${e}`
            zbool=false
          } 
          else {
               mulval = mulval+` ${e}`;
          }
        }
        if (vectora.current[0][e + 2] === "Z") {
          zbool = true;
      
        }
        else{}
      
  
        return (
          vectord.current[0][e] != null &&
          vectord.current[0][e + 1] != null &&
          vectord.current[0][e] != "" &&
          vectord.current[0][e + 1] != "" &&
          vectorGp.current[i + 1]!==undefined && (
            <circle
              cx={vectord.current[0][e]}
              cy={vectord.current[0][e + 1]}
              r={circlerad.current[0]}
              strokeWidth={circlerad.current[1]}
              fill={"white"}
              stroke={
                vectorCL.current.includes(e)
                  ? purplecolor.current
                  : bluecolor.current
              }
              key={`${e}c${i}`}
              name={vectorCL.current.includes(e) ? "vcirart$" : "vlineart$"}
              data-value={e}
              data-mz={vectora.current[0][e + 2] === "Z" ? mval : ""}
              data-multi={
                vectora.current[0][e + 2] === "Z" && mulval.includes(" ")
                  ? mulval
                  : ""
              }
            />
          )
        );
      }
    })
  );
}
export default VCirclesP;
