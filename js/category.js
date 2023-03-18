/// <reference types="../@types/jquery" />

export class Category {
  constructor() {
    //====global
    this.meals = [];
    this.mealsOfCategory = [];
    console.log("h");
    //====events
    (async () => {
      await this.getMeals()
        .then(() => {
          this.displayMeals(this.meals);
        })
        .then(() => {
          $("#home-category .item").click((e) => {
            console.log(e.currentTarget.getAttribute("data"));
            this.getMealByCategory(e.currentTarget.getAttribute("data")).then(
              () => {
                this.displayMealByCategory(this.mealsOfCategory);
              }
            );
          });
        });
    })();
  }

  async getMeals() {
    $("#load").removeClass("d-none");
    const req = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    console.log(req);
    const response = await req.json();
    this.meals = response.categories;
    console.log(response);
    $("#load").addClass("d-none");
  }
  displayMeals(meals) {
    console.log(meals);
    let cartoona = "";
    for (let i = 0; i < meals.length; i++) {
      cartoona += `<div class="col-lg-3 col-md-4 ">
      <div class="item rounded-3 overflow-hidden" data="${
        meals[i].strCategory
      }" >
        <div class="image position-relative">
          <img src="${meals[i].strCategoryThumb}" alt="food" class="img-fluid" >

          <div class="layer position-absolute d-flex justify-content-center align-items-center">
            <div>
            <h3 class="meal-name text-center "> ${meals[i].strCategory}</h3>
            <p>${meals[i].strCategoryDescription.substring(0, 150)}</p>
            </div>
            
          </div>
        </div>

      </div>
    </div>`;
    }
    $("#home-meals-category").html(cartoona);
  }
  async getMealByCategory(category) {
    $("#load").removeClass("d-none");
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const response = await req.json();
    console.log(response);
    this.mealsOfCategory = response.meals;
    $("#load").addClass("d-none");
  }
  displayMealByCategory(meals) {
    console.log(meals);
    let cartoona = "";
    for (let i = 0; i < meals.length; i++) {
      cartoona += `<div class="col-lg-3 col-md-4 ">
      <div class="item rounded-3 overflow-hidden">
        <div class="image position-relative">
          <img src="${meals[i].strMealThumb}" alt="food" class="img-fluid" >

          <div class="layer position-absolute d-flex justify-content-center align-items-center">
            <div>
            <h3 class="meal-name text-center "> ${meals[i].strMeal}</h3>
            
            </div>
            
          </div>
        </div>

      </div>
    </div>`;
    }
    $("#home-meals-category").html(cartoona);
  }
}
