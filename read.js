function getno(){
  const params = new URLSearchParams(location.search).get('no');
  const no = parseInt(params);
  if(isNaN(no)){
    return 1;
  }else if(no<1){
    return 1;
  }else{
    return no;
  }
}

async function fetch(no){
  const url = `http://sample.bmaster.kro.kr/contacts/${no}`;
  try{
    return await $.ajax(url);
  }catch(err){
    console.log(err);
    return null;
  }
}

function printContacts(contact){
  $('#photo').attr('src', contact.photo);
  $('#name').text(contact.name);
  $('#address').text(contact.address);
  $('#tel').text(contact.tel);
}