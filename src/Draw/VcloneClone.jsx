import { useContext, useRef } from "react";
import { Context } from "./Draw";
import { start } from "./Functions/Touch";
function VectorCloneClone() {
  let context = useContext(Context);
  let vectorGp = context.vectorGp;
  let vectorCp = context.vectorCp;
  let vectorP = context.vectorP;
  let vectord = context.vectord;
  let vectoredit = context.vectoredit;
  let vectora = context.vectora;
  let targetObject = context.targetObject;
  let target=context.target
  let vgcolor = context.vgcolor;
  let pen =context.pen
  let oddfactor = 0;
  let start = 0;
  // console.log(vectora.current,vectord.current);
  return (
    vectoredit.current &&pen.current&&
    vectorGp.current.map((e, i) => {
      //console.log(vectora.current[0][vectorGp.current[i + 2]] === "Z");

      // console.log(i);
      //////////////////////////////////////open////////////////////////////////
      if (
        (vectora.current[0][vectorGp.current[i]] == "M" ||
          vectora.current[0][vectorGp.current[i]] == "C" ||
          vectora.current[0][vectorGp.current[i]] == "L") &&
        (i - oddfactor) % 2 !== 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (
        vectora.current[0][vectorGp.current[i]] == "V" &&
        (i - oddfactor) % 2 === 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (
        vectora.current[0][vectorGp.current[i]] == "Z" &&
        (i - oddfactor) % 2 === 0
      ) {
        oddfactor = oddfactor + 1;
      } else if (
        vectora.current[0][vectorGp.current[i]] == "H" &&
        (i - oddfactor) % 2 != 0
      ) {
        oddfactor = oddfactor + 1;
      }
      ////////////////////////////////////close///////////////////////////////////////
      if ((i - oddfactor) % 2 == 0 && i < vectorGp.current.length - 2) {
        if (vectora.current[0][vectorGp.current[i]] === "M") {
          //  console.log("hi",i);
          start = i;
        }
        if (vectorCp.current.includes(e)) {
          
          return (
            !isNaN(vectord.current[0][vectorGp.current[i + 2]]) &&(
              <path
                key={e}
                d={`${"M" + vectord.current[0][vectorGp.current[i]]} ${
                  vectora.current[0][vectorGp.current[i + 1]] +
                  vectord.current[0][vectorGp.current[i + 1]]
                } ${vectora.current[0][e + 2] + vectord.current[0][e + 2]} ${
                  vectora.current[0][e + 3] + vectord.current[0][e + 3]
                } ${vectora.current[0][e + 4] + vectord.current[0][e + 4]} ${
                  vectora.current[0][e + 5] + vectord.current[0][e + 5]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectord.current[0][vectorGp.current[start]]
                    : vectora.current[0][vectorGp.current[i + 2]] +
                      vectord.current[0][vectorGp.current[i + 2]]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectord.current[0][vectorGp.current[start + 1]]
                    : vectora.current[0][vectorGp.current[i + 3]] +
                      vectord.current[0][vectorGp.current[i + 3]]
                }`}
                stroke={target.current[0].getAttribute("stroke")}
                name="clclart$"
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray={0}
                data-value={`${vectorGp.current[i]} ${
                  vectorGp.current[i + 1]
                } ${e + 2} ${e + 3} ${e + 4} ${e + 5} ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectorGp.current[start]
                    : vectorGp.current[i + 2]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectorGp.current[start + 1]
                    : vectorGp.current[i + 3]
                }`}
                data-qz={
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectorGp.current[start] + " " + vectorGp.current[i]
                    : ""
                }
              />
            )
          );
        } else {
                 
          return (
            vectora.current[0][vectorGp.current[i + 2]] !== "M" &&
            !isNaN(vectord.current[0][vectorGp.current[i + 2]]) &&
            vectord.current[0][vectorGp.current[i + 3]] !== undefined &&
            vectorGp.current[i + 3] !== undefined && (
              <path
                key={e}
                d={`${"M" + vectord.current[0][vectorGp.current[i]]} ${
                  vectora.current[0][vectorGp.current[i + 1]] +
                  vectord.current[0][vectorGp.current[i + 1]]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectord.current[0][vectorGp.current[start]]
                    : vectora.current[0][vectorGp.current[i + 2]] +
                      vectord.current[0][vectorGp.current[i + 2]]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectord.current[0][vectorGp.current[start + 1]]
                    : vectora.current[0][vectorGp.current[i + 3]] +
                      vectord.current[0][vectorGp.current[i + 3]]
                }`}
                stroke={target.current[0].getAttribute("stroke")}
                name="clclart$"
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray={0}
                data-value={`${vectorGp.current[i]} ${
                  vectorGp.current[i + 1]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectorGp.current[start]
                    : vectorGp.current[i + 2]
                } ${
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectorGp.current[start + 1]
                    : vectorGp.current[i + 3]
                }`}
                data-qz={
                  vectora.current[0][vectorGp.current[i + 2]] === "Z"
                    ? vectorGp.current[start] + " " + vectorGp.current[i]
                    : ""
                }
              />
            )
          );
        }
      }
      ///////////////////////////////////////open/////////////////////////////////////////////
      if (vectora.current[0][vectorGp.current[i]] == "H") {
        oddfactor = oddfactor + 1;
      }
      ////////////////////////////////////close////////////////////////////////////////////////
    })
  );
}
export default VectorCloneClone;
