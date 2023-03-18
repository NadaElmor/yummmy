/// <reference types="../@types/jquery" />

export class Ingrediants {
  constructor() {
    //====global
    this.ing = [];
    this.mealsOfing = [];
    console.log("h");
    //====events
    (async () => {
      await this.getIngrediants()
        .then(() => {
          this.displayAreas(this.ing);
        })
        .then(() => {
          $("#home-ing .item").click((e) => {
            console.log(e.currentTarget.getAttribute("data"));
            this.getMealByIngrediants(
              e.currentTarget.getAttribute("data")
            ).then(() => {
              this.displayMealByIngrediants(this.mealsOfing);
            });
          });
        });
    })();
  }

  async getIngrediants() {
    $("#load").removeClass("d-none");
    const req = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    console.log(req);
    const response = await req.json();
    this.ing = response.meals;
    console.log(response);
    $("#load").addClass("d-none");
  }
  displayAreas(meals) {
    console.log(meals);
    let cartoona = "";
    for (let i = 0; i < 50; i++) {
      cartoona += `<div class="col-lg-3 col-md-4">
      <div class="item rounded-3 overflow-hidden text-white text-center" data="${meals[
        i
      ].strIngredient.toLowerCase()}">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h2>${meals[i].strIngredient}</h2>
          <p${meals[i].strDescription}</p>
      </div>
  </div>`;
    }
    $("#home-meals-ing").html(cartoona);
  }
  async getMealByIngrediants(ing) {
    $("#load").removeClass("d-none");
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
    );
    const response = await req.json();
    console.log(response);
    this.mealsOfing = response.meals;
    $("#load").addClass("d-none");
  }
  displayMealByIngrediants(meals) {
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
    $("#home-meals-ing").html(cartoona);
  }
}
