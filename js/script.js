let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let allRecipes = [];
allRecipesDetails = {};


//  ده جزء اللى لما اسيرش عن نوع معين من الاكل يظهرلى تحت كل الوصفات اللى تخصه 
async function getRecipes(term) {
    let apiRecipes = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`)
    allRecipes = await apiRecipes.json();
    allRecipes = allRecipes.recipes;
    // console.log(allRecipes);
    displayResipes();
}

function displayResipes() {
    cartoona = ``;
    for (let i = 0; i < allRecipes.length; i++) {
        let myId = "'" + allRecipes[i].recipe_id + "'";
        cartoona += `<div class="col-md-4 text-center">
        <div class="details" onclick="getDetailsRecipes(${myId})">
        <img src="${allRecipes[i].image_url}" alt="" class="img-fluid pb-2">
        <h5 class="mb-2">${allRecipes[i].title}</h5>
        <p class="mb-5 font-weight-bolder">${allRecipes[i].publisher}</p>
        </div>
    </div>`
    }
    document.getElementById("recipesRow").innerHTML = cartoona;
}

// ده عشان لما اتك على زرار السيرش يستجيب ويجبلى الوجبات 
searchBtn.addEventListener("click", function () {
    getRecipes(searchInput.value);
})


// ده جزء اللى لما اتك على اى صورة او وصفة يقولى مكوناتها فى جنب 
async function getDetailsRecipes(id) {
    let detailsApi = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    allRecipesDetails = await detailsApi.json();
    allRecipesDetails = allRecipesDetails.recipe;
    displayDetailsRecipes();
    // window.alert(id);
}

function displayDetailsRecipes() {
    let cartona2 = ``;
    for (let x of allRecipesDetails.ingredients) {
        cartona2 += `<li class="d-flex py-1 align-items-center font-weight-bolder"><span class="fa-li"><i class="fas fa-utensils"></i></span>${x}</li>`;
    }
    let cartona = `<div>
         <h5 class="pt-5">${allRecipesDetails.title}</h5>
         <img src="${allRecipesDetails.image_url}" class="w-100 py-2">
         <ul class="fa-ul py-3">
            ${cartona2}
         </ul>
     </div>`

    document.getElementById("recipesDetailsRow").innerHTML = cartona;

}





