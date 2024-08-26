export let  getArrayDef=(context,e)=>{
  let targetObject=context.targetObject
  let vectoredit=context.vectoredit
  let rotatedown=context.rotatedown
          let newarrayd=[]
            let newarraya = [];
            let arrayd = targetObject.current[e][0]
              .getAttribute("d")
              .replace(/ [A-Z]|[a-z]/g, /[A-Z]|[a-z]/g)
              .replace(/[A-Z]|[a-z]/g, " $&")
              .trim()
              .replace(/[A-Z]|[a-z]/g, "")
              .split(" ");
            let arraya = targetObject.current[e][0]
              .getAttribute("d")
              .replace(/ [A-Z]|[a-z]/g, /[A-Z]|[a-z]/g)
              .replace(/[A-Z]|[a-z]/g, " $&")
              .trim()
              .replace(/(\.*|-)\d/g, "")
              .split(" ");
              if ((arraya.includes("H") || arraya.includes("V"))&&(vectoredit.current||rotatedown.current)) {
                arraya.map((e,i)=>{
                        if (e==="H") {
                                  newarraya.push(`L`);
                                  newarrayd.push(arrayd[i]);
                                  newarraya.push(``);
                                  newarrayd.push(arrayd[i-1]);
                        }
                        else if (e==="V") {
                                    newarraya.push(`L`);
                                    newarrayd.push(arrayd[i-2]);
                                    newarraya.push(``);
                                    newarrayd.push(arrayd[i]);
                        }
                        else{
                          newarraya.push(e)
                          newarrayd.push(arrayd[i])
                        }
                })
              }
              else{
                newarraya=arraya
                newarrayd=arrayd
              }
              return [newarraya,newarrayd]
             
}
export let vectorPathData=(context)=>{
  let targetObject = context.targetObject;
  let vectord = context.vectord;
  let vectora = context.vectora;
  Object.keys(targetObject.current).map((e) => {
      let [newarraya, newarrayd] = getArrayDef(context,e);
    if (targetObject.current[e][0].localName == "path") {
      vectord.current.push(
      newarrayd
      );
      vectora.current.push(
       newarraya
      );
    } 
  });

};
