import { useContext } from "react";
import { Context } from "./Draw";
import { noduplicate } from "./mZSync";
function VCntrlLine() {
  let context = useContext(Context);
  let circlerad = context.circlerad;
  let vctrline = context.vctrline;
 let vectorctrmixed = context.vectorctrmixed;
 let vectord=context.vectord
 let ctlcolor = context.ctlcolor;
noduplicate(vctrline.current);
  return vctrline.current.map((e, i) => {
      return (
        <line
          x1={vectord.current[0][+e.split(" ")[0]]}
          y1={vectord.current[0][+e.split(" ")[1]]}
          x2={vectord.current[0][+e.split(" ")[2]]}
          y2={vectord.current[0][+e.split(" ")[3]]}
          strokeWidth={`.1%`}
          stroke={ctlcolor.current}
          key={`${e}l${i}`}
          name="vliart$"
        />
      );
  });
}
export default VCntrlLine;
