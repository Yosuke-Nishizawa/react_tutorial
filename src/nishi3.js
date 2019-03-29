function hello(){
  return 'I am Nishizawa';
}
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const multi = [
  {puted:[0,4],put:[1,3]},
  {puted:[2,4],put:[1,5]},
  {puted:[6,4],put:[7,3]},
  {puted:[8,4],put:[5,7]},
]
function judge(squares, sign){
  const m = squares.reduce((acc,curr,index)=>{
    if(curr === null){
      acc['null_arr'] = acc['null_arr'].concat(index);
      return acc;
    } else if(curr === sign){
      acc['sign_arr'] = acc['sign_arr'].concat(index);
      return acc;
    } else{
      acc['enemy_arr'] = acc['enemy_arr'].concat(index);
    }
    return acc;
  },{'null_arr':[],'sign_arr':[], 'enemy_arr':[]});
  const null_arr = m['null_arr'];
  const sign_arr = m['sign_arr'];
  const enemy_arr = m['enemy_arr'];
  //すべてnull
  if(null_arr.length === 9){
    return 4;
  }
  if(null_arr.includes(4)){
    return 4;
  }
  //2手目
  if(null_arr.length === 7){
    for(var index of [0, 2, 6, 8]){
      if(null_arr.includes(index)){
        return index;
      }
    }
  }
  //2個以上そろってる
  for(let line of lines){
    const notInclude = line.filter(e => false === sign_arr.includes(e));
    if(notInclude.length === 1){
      if(null_arr.includes(notInclude[0])){
        return notInclude[0];
      }
    }
  }
  //防御
  for(let line of lines){
    const notInclude = line.filter(e => false === enemy_arr.includes(e));
    if(notInclude.length === 1){
      if(null_arr.includes(notInclude[0])){
        return notInclude[0];
      }
    }
  }
  //3手目
  if(null_arr.length === 5){
    for(let m of multi){
      const isTiming = m.puted.every((e) => sign_arr.includes(e));
      const canPut = m.put.find((e) => null_arr.includes(e));
      if(isTiming && canPut){
        return canPut;
      }
    }
  }
  return null_arr[Math.floor(Math.random() * null_arr.length)];
}
export{ hello,judge };