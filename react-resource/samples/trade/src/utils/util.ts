export function createType(keys:any){
    let obj={};
    keys.forEach(item=>{
      obj[item]=item;
    })
    return obj;
}