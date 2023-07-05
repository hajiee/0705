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

function printContacts(contacts) {
  const $parent = $('#tbody');
  for(c of contacts) {
    const html = `
      <tr>
        <td>${c.no}</td>
        <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
        <td>${c.tel}</td>
        <td>${c.address}</td>
      </tr>
    `;
    $parent.append(html);
  }
}

function getPagination({pageno,pagesize,totalcount, blockSize=5}){
  const countOfPage = Math.ceil(totalcount/pagesize);
  const prev = Math.floor((pageno-1)/blockSize)*blockSize;
  const start = prev+1;
  let end = prev + blockSize;
  let next = end + 1;
  if(end>=countOfPage) {
    end = countOfPage;
    next = 0;
  }
  return {prev, start, end, next, pageno};
}

function printPagination({prev, start, end, next, pageno}) {
  const $parent = $('#pagination');
  if(prev>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list_0705.html?pageno=${prev}'>이전으로</a>
      </li>`;
    $parent.append(html);
  }
  for(let i=start; i<=end; i++) {
    const className = pageno===i? 'page-item active' : 'page-item';
    const html =`
      <li class='${className}'>
        <a class='page-link' href='list_0705.html?pageno=${i}'>${i}</a>
      </li>`;
    $parent.append(html);  
  }
  if(next>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list_0705.html?pageno=${next}'>다음으로</a>
      </li>`;
    $parent.append(html);
  }
}
