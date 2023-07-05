const API = "http://sample.bmaster.kro.kr/contacts";

function getPageno(){
 const params = new URLSearchParams(location.search);
 const pageno = parseInt(params.get('pageno')); 

 //pageno가 없거나 숫자로 바꿀 수 없는 값인 경우 parseInt의 결과는 NaN(Not a Number)
 //변수를 NaN와 비교하면 무조건 false(JS에서 NaN는 비교되는 값이 아니다)
 //비교할 때는 isNaN()함수를 사용해야 한다
 if(isNaN(pageno)){ //숫자로 해석될 수 없다면
    return 1;
  }else if(pageno<1){
    return 1;
  }else{
    return pageno;
  }
}

// 기본 매개변수(default parameter)
async function fetch(pageno=1, pagesize=10){
  const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`;
  try{
    return await $.ajax(url);
  }catch(err){
    console.log(err);
    return null;
  }
}

function getpagination({pageno,pagesize,totalcount, blockSize=5}){

}
