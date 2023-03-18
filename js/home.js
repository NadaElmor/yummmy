/// <reference types="../@types/jquery" />

export class Home {
  constructor() {
    this.meals = [];
    this.meal;
    (async () => {
      await this.getMeals()
        .then(() => {
          this.displayMeals(this.meals);
        })
        .then(() => {
          $("#home .item").click((e) => {
            this.getMealById(e.currentTarget.id).then(() => {
              this.displayMeal(this.meal);
            });
          });
        });
    })();
  }

  async getMeals() {
    $("#load").removeClass("d-none");
    const req = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const response = await req.json();
    this.meals = response.meals;
    console.log(response);
    $("#load").addClass("d-none");
  }
  displayMeals(meals) {
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
    $("#home-meals").html(cartoona);
  }
  async getMealById(idMeal) {
    $("#load").removeClass("d-none");
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const response = await req.json();
    this.meal = response.meals[0];
    $("#load").addClass("d-none");
  }
  displayMeal(meal) {
    let cartoona = `
    <div class="col-lg-4 pe-3">
                    <div class="item">
                        <img src="${
                          meal.strMealThumb
                        }" alt="food" class="rounded-3">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="item">
                        <h3>Instructions</h3>
                        <p>${meal.strInstructions}</p>
                        <div class="d-flex align-items-center ">
                            <h3>Area : </h3>
                            <p>${meal.strArea}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <h3 class="mb-0">Category : </h3>
                            <p class="mb-0 pb-0">${meal.strCategory}</p>
                        </div>
                        <div class="recipes">
                            <h3 class="mb-2">Recipes :</h3>
                            <ul class="d-flex list-unstyled">
                                <li>${
                                  meal.strMeasure1 + " " + meal.strIngredient1
                                }</li>
                                <li>${
                                  meal.strMeasure2 + " " + meal.strIngredient2
                                }</li>
                                <li>${
                                  meal.strMeasure3 + " " + meal.strIngredient3
                                }</li>
                                <li>${
                                  meal.strMeasure4 + " " + meal.strIngredient4
                                }</li>
                                <li>${
                                  meal.strMeasure5 + " " + meal.strIngredient5
                                }</li>
                                
                            </ul>
                        </div>
                        <div class="tag">
                            <h3 class="mb-2">Tags</h3>
                            <span>${
                              meal.strTags != null
                                ? meal.strTags
                                : "not matched"
                            }</span>
                        </div>
                        <div>
                            <span><a href="https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/" target="_blank" class="s">Source</a></span>
                            <span><a href="${
                              meal.strYoutube
                            }" target="_blank" class="youtube">Youtube</a></span>
                        </div>
                    </div>
                </div>
    `;
    $(" #details").html(cartoona);
    $("#home").addClass("d-none");
    $("#meal-details").removeClass("d-none");
  }
}
