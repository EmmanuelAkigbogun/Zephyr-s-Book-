import { useContext } from "react";
import { Context } from "./Draw";
import { noduplicate } from "./mZSync";
function AlignedLine() {
  let context = useContext(Context);
  let alignedline = context.alignedline;
  let pen=context.pen
  let vectoredit=context.vectoredit
  noduplicate(alignedline.current);
  return (pen.current||vectoredit.current)&&alignedline.current.map((e,i) => {
    return (
      <line
        x1={e.split(" ")[0] | 0}
        y1={e.split(" ")[1] | 0}
        x2={e.split(" ")[2] | 0}
        y2={e.split(" ")[3] | 0}
        stroke="red"
        strokeWidth=".1%"
        key={e + i}
        name="alignart$"
      ></line>
    );
  });
}
export default AlignedLine;
