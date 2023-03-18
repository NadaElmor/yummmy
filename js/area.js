/// <reference types="../@types/jquery" />

export class Area {
  constructor() {
    //====global
    this.areas = [];
    this.mealsOfArea = [];
    console.log("h");
    //====events
    (async () => {
      await this.getAreas()
        .then(() => {
          this.displayAreas(this.areas);
        })
        .then(() => {
          $("#home-area .item").click((e) => {
            console.log(e.currentTarget.getAttribute("data"));
            this.getMealByArea(e.currentTarget.getAttribute("data")).then(
              () => {
                this.displayMealByCategory(this.mealsOfArea);
              }
            );
          });
        });
    })();
  }

  async getAreas() {
    $("#load").removeClass("d-none");
    const req = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    console.log(req);
    const response = await req.json();
    this.areas = response.meals;
    console.log(response);
    $("#load").addClass("d-none");
  }
  displayAreas(meals) {
    console.log(meals);
    let cartoona = "";
    for (let i = 0; i < meals.length; i++) {
      cartoona += `<div class="col-lg-3 col-md-4">
      <div class="item   rounded-3 overflow-hidden text-white text-center" data="${meals[
        i
      ].strArea.toLowerCase()}">
          <i class="fa-solid fa-house fa-4x"></i>
          <h2>${meals[i].strArea}</h2>
      </div>
  </div>`;
    }
    $("#home-meals-areas").html(cartoona);
  }
  async getMealByArea(area) {
    $("#load").removeClass("d-none");
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const response = await req.json();
    console.log(response);
    this.mealsOfArea = response.meals;
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
    $("#home-meals-areas").html(cartoona);
  }
}
