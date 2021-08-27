const searchFood = () => {
    const input = document.getElementById('search-input');
    const searchText = input.value;
    input.value = '';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals))
}

function displayFood(meals){
    const searchResult = document.getElementById('search-result');
    for(const meal of meals){
       const div = document.createElement('div');
       div.classList.add('col')
       const detail = meal.strInstructions;
       div.innerHTML = 
       `
       <div class="card" onclick ="loadMealDetails(${meal.idMeal})" style="width: 20rem;">
       <img src="${meal.strMealThumb}" class="card-img-top px-3 py-3" alt="...">
       <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <p class="card-text">${detail.slice(0,100)}</p>
       </div>
     </div> 
       `
       searchResult.appendChild(div)
    }
    
}


const loadMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals[0]))
}

const displayMeal = (meal) =>{
    const mealDetails = document.getElementById('meal-details');
    console.log(mealDetails)
    const div = document.createElement('div');
    div.className = 'card mx-auto p-3';
    div.style.width = '25rem'
    
    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
            </div>

    `
    mealDetails.appendChild(div)
}