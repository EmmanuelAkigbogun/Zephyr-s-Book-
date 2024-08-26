import { getPathData } from "./Functions/GetPath";
import { vectorPathData } from "./Functions/GetVectorPath";
export let reDefine=(context)=>{
      let dragd = context.dragd;
      let draga = context.draga;
      let vectorindex = context;
      let vectoredit = context.vectoredit;
      let vectorCi = context.vectorCi;
      let vectorCj = context.vectorCj;
      let vectorCp = context.vectorCp;
      let vectorCL = context.vectorCL;
      let vectorGp = context.vectorGp;
      let fullC=context.fullC
      let vectorP = context.vectorP;
      let vectord = context.vectord;
      let vectora = context.vectora;
      let vectorctrmixed = context.vectorctrmixed;
      let vctrline = context.vctrline;
      let vage = context.vage;
   vectorindex.current = [];
   vectorCi.current = [];
   vectorCj.current = [];
   vectorCp.current = [];
   vectorCL.current = [];
   vectorGp.current = [];
   vectorP.current = [];
   fullC.current=[]
   vectoredit.current = true;
   draga.current = [];
   dragd.current = [];
   vectord.current = [];
   vectora.current = [];
   vctrline.current = [];
   vectorctrmixed.current = [];
   vage.current = [];
   getPathData(context);
   vectorPathData(context);
   draga.current[0].map((e, i) => {
     if (e === "C") {
       vectorCi.current.push(i);
       vectorCi.current.push(i + 1);
       vectorCj.current.push(i + 2);
       vectorCj.current.push(i + 3);
       if (!vectorCp.current.includes(i - 2)) {
         vectorCp.current.push(i - 2);
         vectorCp.current.push(i - 1);
         vectorCL.current.push(i - 2);
         vectorCL.current.push(i - 1);
          if (draga.current[0][i-2] === "M") {
               fullC.current.push(i-2);
                fullC.current.push(i-1);
             } else if (
               vectorCj.current.includes(i - 4)
             ) {
               fullC.current.push(i-2);
               fullC.current.push(i-1);
             }
       }

       if (!vectorCL.current.includes(i + 4)) {
         vectorCL.current.push(i + 4);
         vectorCL.current.push(i + 5);
                 if (
                   draga.current[0][i + 4] === "M" ||
                   draga.current[0][i + 6] === "M" ||
                   draga.current[0][i + 6] === "Z" ||
                   draga.current[0].length-1===i+5
                 ) {
                   fullC.current.push(i + 4);
                   fullC.current.push(i + 5);
                 } else if (vectorCi.current.includes(i + 6)) {
                   fullC.current.push(i + 4);
                   fullC.current.push(i + 5);
                 }
       }
     }
   });
   draga.current[0].map((e, i) => {
     if (
       !vectorCp.current.includes(i) &&
       !vectorCi.current.includes(i) &&
       !vectorCj.current.includes(i)
     ) {
       vectorP.current.push(i);
     }
   });
   vectorGp.current = [];
   draga.current[0].map((e, i) => {
     if (vectorCp.current.includes(i)) {
       vectorGp.current.push(i);
     }
     if (vectorP.current.includes(i)) {
       vectorGp.current.push(i);
     } 
   });
   
}