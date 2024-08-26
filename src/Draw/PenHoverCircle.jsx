import { useContext } from "react";
import { Context } from "./Draw";
import { move } from "./Functions/Touch";
function PenHoverCircle() {
  let context = useContext(Context);
    let circlerad = context.circlerad;
  let movepen = context.movepen;
  let bBoxColor = context.bBoxColor;
  let anglevalue=context.anglevalue
  let pen =context.pen
  let rotatedown=context.rotatedown
    let whitecolor=context.whitecolor
  let bluecolor=context.bluecolor
  let purplecolor=context.purplecolor
   let backgroundData = context.backgroundData;
  let textlocation= movepen.current?.split(" ").map((m,i)=>i%2==0? +m +10:+m -10);
  if (!pen.current&&!rotatedown.current) {
  anglevalue.current =`` 
  }
     if (
       backgroundData.current == "#646464" ||
       backgroundData.current == "black"
     ) {
       bluecolor.current = "white";
       purplecolor.current = "white";
     }
    return (
      <>
        {movepen.current?.split(" ")[1] && (
          <circle
            cx={movepen.current?.split(" ")[0]}
            cy={movepen.current?.split(" ")[1]}
            r={circlerad.current[0]}
            strokeWidth={circlerad.current[1]}
            fill={whitecolor.current}
            stroke={bluecolor.current}
            name="mouseart$"
          />
        )}
        {pen.current && (
          <text
            x={textlocation[0] | 0}
            y={textlocation[1] | 0}
            stroke={pen.current || 1 == 2 ? `white` : `none`}
            fill={
              pen.current || 1 == 2
                ? (backgroundData.current == "#646464" ||
                    backgroundData.current == "black")?whitecolor.current:`rgb(${
                    Math.random() * 255
                  } ${Math.random() * 255} ${Math.random() * 255})`
                : `none`
            }
            strokeWidth={`.04%`}
            id="tx2"
            name="recttxtart$"
            className="draw-text"
          >
            {pen.current ? anglevalue.current : ""}
          </text>
        )}
      </>
    );
}
export default PenHoverCircle;
