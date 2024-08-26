import { useContext } from "react";
import { Context } from "./Draw";
function CenterCircle() {
  //pen line divide
  let context = useContext(Context);
  let centercirclearr = context.centercirclearr;
  let circlerad = context.circlerad;
  let whitecolor=context.whitecolor
  let bluecolor=context.bluecolor
  //return centercirclearr.current.map((e, i) => {
    return (
      !centercirclearr.current[0]==""&&<circle
        cx={centercirclearr.current[0]}
        cy={centercirclearr.current[1]}
        r={circlerad.current[0]}
        strokeWidth={circlerad.current[1]}
        fill={
          1 == centercirclearr.current.length - 1
            ? whitecolor.current
            : bluecolor.current
        }
        stroke={
          1 == centercirclearr.current.length - 1
            ? bluecolor.current
            : whitecolor.current
        }
       // key={`${e}c${i}`}
        name="centercircleart$"
      />
    );
  //});
}
export default CenterCircle;
/*
import { useContext } from "react";
import { Context } from "./Draw";
import { noduplicate } from "./mZSync";
function CenterCircle() {
  //pen line divide
  let context = useContext(Context);
  let centercirclearr = context.centercirclearr;
  let circlerad = context.circlerad;
  let whitecolor = context.whitecolor;
  let bluecolor = context.bluecolor;
  let purplecolor = context.purplecolor;
  noduplicate(centercirclearr.current)
    return (
      <circle
        cx={centercirclearr.current[0]}
        cy={centercirclearr.current[1]}
        r={circlerad.current[0]}
        strokeWidth={circlerad.current[1]}
        fill={whitecolor.current}
        stroke={bluecolor.current}
        name="centercircleart$"
        onPointerDown={(e)=>{
          e.target.setAttribute("fill", bluecolor.current);
          e.target.setAttribute("stroke", whitecolor.current);
          e.target.setAttribute("r", circlerad.current[5]);
        }}
      />
    );
}
export default CenterCircle;

*/