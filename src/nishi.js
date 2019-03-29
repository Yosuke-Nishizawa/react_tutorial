function hello(){
  return 'I am Nishizawa';
}
function judge(squares, sign){
  const ans = squares.findIndex((e) => e === null);
  return ans;
}
export{ hello,judge };