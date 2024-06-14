var addBtn = document.getElementById("addBtn");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescriptio = document.getElementById("productDescriptio")
var productImage = document.getElementById("productImage")
var updateBtn = document.getElementById("updateBtn ");
var deleteBt = document.getElementById("deleteBtn");
var updateB = document.getElementById("updateB");
var productList=[];
var currentIndex;

if(localStorage.getItem("productList")!= null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  display(productList);
}


addBtn.addEventListener("click",function(){
    var product = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDescription.value,
        img:`image/${productImage.files[0]?.name}`,
        id:productList.length
    }
   
    productList.push(product);
    findId()
    updateLocalstorage()
    
    display(productList)
    updateInputValue()

})
    
function display(list){
    var displayItem=``;
    for(var i =0;i<list.length;i++){
        displayItem+=`  <div class="col-md-4 gy-4">
          <div class="card" >
            <img src="${list[i].img}" class="w-100 mb-3" alt="...">
            <div class="card-body">
              <h5 class="card-title">product: <span>${list[i].name}</span> </h5>
              <h3 class="h5">price: <span>${list[i].price}</span></h3>
              <h3 class="h5 card-text">description: <span>${list[i].description}</span></h3>
              
              <h3 class="h5">category:<span>${list[i].category}</span> </h3>
              <button id="updateBtn" onclick="getDateToUpdate(${list[i].id})" class="btn btn-outline-warning w-100 mb-2">update</button>
              <button id="deleteBtn" onclick="deleteBtn(${list[i].id})" class="btn btn-outline-danger w-100 ">delete</button>
              
            </div>
          </div>
        </div>`
    }
    document.getElementById('myData').innerHTML=displayItem;
}


function deleteBtn(index){
  productList.splice(index,1)
  findId()
  updateLocalstorage()
  
  display(productList)
  
}
function updateInputValue(config){
  productName.value= config ? config.name :null;
  productPrice.value= config ? config.price :null;
  productCategory.value= config ? config.category :null;
  productDescription.value= config ? config.description :null;
 
 
  
}
 function getDateToUpdate(index){
  updateInputValue(productList[index])
  currentIndex=index;
  
  addBtn.classList.add("d-none");
  updateB.classList.remove("d-none");

  
 } 

function updateProduct(){
productList[currentIndex].name=productName.value;
productList[currentIndex].price=productPrice.value;
productList[currentIndex].category=productCategory.value;
productList[currentIndex].description=productDescription.value;
productList[currentIndex].img= `image/${productImage.files[0]?.name}`;
findId()
display(productList)
updateLocalstorage()
addBtn.classList.remove("d-none");
updateB.classList.add("d-none");
updateInputValue()

}



function search(searchValue){

  var searchItem =[]
  for(var i=0 ; i< productList.length ; i++ ){
    item=productList[i];
      if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
        item.newName=item.name.toLowerCase().replace(searchValue.toLowerCase(),`<span class='text-danger'>${searchValue}</span>`)
          searchItem.push(item)
      }
  }
  display(searchItem)
}

function updateLocalstorage(){
  localStorage.setItem("productList",JSON.stringify(productList));

}

function findId(){
    for(var i=0 ; i< productList.length ; i++ ){
    productList[i].id=i;
    }
}

function validteInputs(element) {


  console.log(element.value , element.id);
  var regex= {

    productName:/^[A-Z][a-z]{2,8}$/,
    productPrice:/^[1-9][0-9][0-9]/,
    productCategory:/^(tv|LapeTop|Mobile|Screens)$/,
    ProductDiscription:/^.{6}$/,

  }

 if (regex[element.id ].test(element.value)==true) {
  element.classList.add("is-valid")
  element.classList.remove("is-invalid")
  element.nextElementSibling.classList.replace("d-block","d-none")
  return true
 } 
  else{
    element.classList.add("is-invalid")
    element.classList.remove("is-valid")
    element.nextElementSibling.classList.replace("d-none","d-block")
    return false
  }
  
}