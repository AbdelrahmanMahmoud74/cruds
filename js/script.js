let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count =document.getElementById('count');
let cateogry=document.getElementById('cateogry');
let submit=document.getElementById('submit');

let mood='create';
let tmp;

function getTotal()
{
  if(price.value !=''){
     let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
     total.innerHTML = result;
     total.style.background='green';
  }
  else{
    total.innerHTML='';
    total.style.background='#a00d02'
  }

}
///// Create product
let dataPro;
if(localStorage.product!=null){
  dataPro=JSON.parse(localStorage.product);

}
else{
  dataPro=[];
}
submit.onclick = function(){
  let newpro ={
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count:count.value,
    cateogry:cateogry.value,
  }
  if(title.value !=''&& price.value !=''&& cateogry.value !='' && newpro.count <100){
  if(mood==='create'){
  if(newpro.count>1){
    for(let i=0;i<newpro.count;i++){
      dataPro.push(newpro);
    }

  }

  else{
    dataPro.push(newpro);
  }
}else{
  dataPro[tmp]=newpro;
  mood='create';
  submit.innerHTML='Create';
  count.style.display='block';
}
clearData()
}
  localStorage.setItem('product',    JSON.stringify(dataPro)    )
  
  showData()
}


///// clear product
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  cateogry.value = '';
}

/// read product
function showData(){
  getTotal()
let table='';
for(let i=0; i< dataPro.length;i++){
  table +=`
 <tr>
  <td>${i+1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].cateogry}</td>
  <td><button onclick="updateData(${i})" id="update">Update </button></td>
  <td><button onclick="deleteone(${i})" id="delete">Delete </button></td>

  </tr>
`
}

document.getElementById('tbody').innerHTML= table;
let btndelete=document.getElementById('deleteall');
if(dataPro.length>0){
btndelete.innerHTML =`
<button onclick="deleteall()">Delete All(${dataPro.length})</button>
`
}
else{
  btndelete.innerHTML='';
}
}

showData()
function deleteone(i){
dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
showData()
}
function deleteall(){
  localStorage.clear()
  dataPro.splice(0);
  showData()
}
function updateData(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal()
  cateogry.value = dataPro[i].cateogry;
  count.style.display='none';
  submit.innerHTML='Update';
  mood='update';
  tmp=i;
  scroll({
    top:0,
    behavior:'smooth',
  })
  

}
let searchMood='title';
function getSearchMood(id){
  let search=document.getElementById('search');
  if(id=='searchtitle'){
    searchMood='title';
    search.placeholder='Search By Title';
  }
  else{
    searchMood='cateogry';
    search.placeholder='Search By Category';
  }
  search.focus()
  search.value='';
  showData()
}
function searchData(value){
  let table='';
  if(searchMood=='title'){
    for(let i=0;i<dataPro.length;i++){
      if(dataPro[i].title.toLowerCase().includes(value)){
        table+=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].cateogry}</td>
        <td><button onclick="updateData(${i})" id="update">Update </button></td>
        <td><button onclick="deleteone(${i})" id="delete">Delete </button></td>
      
        </tr>

        `
      }
    }
  }
  else {
for(let i=0;i<dataPro.length;i++){
      if(dataPro[i].cateogry.toLowerCase().includes(value)){
        table+=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].cateogry}</td>
        <td><button onclick="updateData(${i})" id="update">Update </button></td>
        <td><button onclick="deleteone(${i})" id="delete">Delete </button></td>
      
        </tr>

        `
  }
}
  }
  document.getElementById('tbody').innerHTML= table;

}

