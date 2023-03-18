/// <reference types="../@types/jquery" />
export class Search {
  constructor() {
    // ===global
    this.searchName = $("#searchByName");
    this.searchLetter = $("#searchByLetter");
    this.meals = [];

    //===events
    this.searchName.keyup(async () => {
      await this.getMeals(this.searchName.val());
      this.displayMeals(this.meals.meals);
    });
    //event 2
    this.searchLetter.keyup(async (e) => {
      await this.getMealsByLetter(this.searchLetter.val());
      this.displayMeals(this.meals.meals);
    });
  }

  async getMeals(name) {
    console.log(name);
    $("#load").removeClass("d-none");
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    const response = await req.json();
    this.meals = response;
    $("#load").addClass("d-none");
  }
  displayMeals(meals) {
    if (meals != null) {
      console.log(meals);
      let cartoona = "";
      for (let i = 0; i < meals.length; i++) {
        cartoona += `<div class="col-lg-3 col-md-4 ">
      <div class="item rounded-3 overflow-hidden" id="${meals[i].idMeal}" >
        <div class="image position-relative">
          <img src="${meals[i].strMealThumb}" alt="food" class="img-fluid" >

          <div class="layer position-absolute d-flex justify-content-center align-items-center">
            <div class="meal-name ">
              ${meals[i].strMeal}
            </div>
          </div>
        </div>

      </div>
    </div>`;
      }
      $("#home-meals-search").html(cartoona);
    } else {
      $("#home-meals-search").html("");
    }
  }
  async getMealsByLetter(letter) {
    $("#load").removeClass("d-none");
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
    );

    const response = await req.json();
    this.meals = response;
    console.log(response);
    $("#load").addClass("d-none");
  }
}
