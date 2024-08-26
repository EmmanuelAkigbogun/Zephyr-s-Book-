   import { useContext } from "react";
    import { Context } from "./Draw";
    import { move } from "./Functions/Touch";
    import { calculateDistancesAndTangents } from "./Functions/ctrChecks";
function  Try()  {
      let context = useContext(Context);
      let [d1, d2, x, y, q, z] = calculateDistancesAndTangents(
        120,
        130,
        70,
        90,
        200,
        50
      );
      return (
        <>
          <svg
            viewBox={`0 0 1000 1000`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            id="vg"
            name="svgart$"
          >
            <circle
              cx={120}
              cy={130}
              r={5}
              fill="red"
              name="eart$"
              stroke="white"
            />
            <circle
              cx={70}
              cy={90}
              r={5}
              fill="red"
              name="eart$"
              stroke="white"
            />
            <circle
              cx={200}
              cy={50}
              r={5}
              fill="red"
              name="eart$"
              stroke="white"
            />
            <circle
              cx={x | null}
              cy={y | null}
              r={5}
              fill="blue"
              name="eart$"
              stroke="white"
            />
            <circle
              cx={q | null}
              cy={z | null}
              r={5}
              fill="blue"
              name="eart$"
              stroke="white"
            />
          </svg>
        </>
      );
    }
    export default Try;