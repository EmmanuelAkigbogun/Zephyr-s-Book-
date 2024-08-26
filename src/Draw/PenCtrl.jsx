import { useContext } from "react";
import { Context } from "./Draw";
function PenCtr() {
  let context = useContext(Context);
  let pencirctr = context.pencirctr;
  let circlerad = context.circlerad;
  let whitecolor = context.whitecolor;
  let bluecolor = context.bluecolor;
  let purplecolor = context.purplecolor;
  let ashen=context.ashen
  let pen=context.pen
  if(!pen.current)pencirctr.current=[]
  return pencirctr.current.map((e, i) => {
    return (pen.current&&
      <circle
        cx={e.split(" ")[0]}
        cy={e.split(" ")[1]}
        r={
            circlerad.current[0]
        }
        strokeWidth={circlerad.current[1]}
        fill={"white"}
        stroke={ashen.current}
        key={`${e}c${i}`}
        name="circlctrart$"
      />
    );
  });
}
export default PenCtr;
