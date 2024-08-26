import { useContext } from "react";
import { Context } from "./Draw";
function PenClickCircle() {
  let context = useContext(Context);
  let pencirclearr = context.pencirclearr;
  let circlerad = context.circlerad;
  let whitecolor = context.whitecolor;
  let bluecolor = context.bluecolor;
  let purplecolor = context.purplecolor;
   let backgroundData = context.backgroundData;
  if (
    backgroundData.current == "#646464" ||
    backgroundData.current == "black"
  ) {
    bluecolor.current = "#2572B8";
    purplecolor.current = "#2572B8";
  }
  return pencirclearr.current.map((e, i) => {
    return (
      <circle
        cx={e.split(" ")[0]}
        cy={e.split(" ")[1]}
        r={
          i == pencirclearr.current.length - 1
            ? circlerad.current[5]
            : circlerad.current[0]
        }
        strokeWidth={circlerad.current[1]}
        fill={
          i == pencirclearr.current.length - 1
            ? bluecolor.current
            : whitecolor.current
        }
        stroke={
          i == pencirclearr.current.length - 1
            ? whitecolor.current
            : backgroundData.current == "#646464" ||
              backgroundData.current == "black"
            ? "white"
            : bluecolor.current
        }
        key={`${e}c${i}`}
        name="circledbcart$"
      />
    );
  });
}
export default PenClickCircle;
