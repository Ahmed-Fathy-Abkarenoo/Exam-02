let menuLinks = document.querySelectorAll(".nav-link");
let mealNameInput = $("#meal-name");
let firstLetter = $("#meal-first-letter");

let linkName;
let searchMeals = [];
let areas = [];
let ingreds = [];
let cats = [];
let catMeals = [];
let areaMeals = [];
let ingedMeals = [];
let catName;
let areaName;
let ingredName;

loadingScreen();

window.addEventListener("load", () => {
  searchPageByname();
  $(".meals-section").removeClass("hidden");
});

$(".opcl-nav").click(() => {
  let left = $(".navbar").css("left");
  if (left != "0px") {
    openNav();
  } else {
    closeNav();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    linkName = e.currentTarget.innerHTML;
    if (linkName == "Search") {
      $(".search-section").removeClass("hidden");
      $(".categories-section").addClass("hidden");
      $(".area-section").addClass("hidden");
      $(".ingredients-section").addClass("hidden");
      $(".contact-section").addClass("hidden");
      $(".meals-section").addClass("hidden");
      $(".meal-detials").addClass("hidden");
      $(".meal-details-body-content").empty();
      $(".meal-details-body-img").empty();

      closeNav();
    } else if (linkName == "Categories") {
      $(".categories-section").removeClass("hidden");
      $(".search-section").addClass("hidden");
      $(".area-section").addClass("hidden");
      $(".ingredients-section").addClass("hidden");
      $(".contact-section").addClass("hidden");
      $(".meals-section").addClass("hidden");
      $(".meal-detials").addClass("hidden");
      $(".meal-details-body-content").empty();
      $(".meal-details-body-img").empty();

      loadingScreen();
      closeNav();
      categoriesPage();
      // console.log("Categories");
    } else if (linkName == "Area") {
      $(".area-section").removeClass("hidden");
      $(".search-section").addClass("hidden");
      $(".categories-section").addClass("hidden");
      $(".ingredients-section").addClass("hidden");
      $(".contact-section").addClass("hidden");
      $(".meals-section").addClass("hidden");
      $(".meal-detials").addClass("hidden");
      $(".meal-details-body-content").empty();
      $(".meal-details-body-img").empty();

      loadingScreen();
      closeNav();
      areaPage();
      // console.log("Area");
    } else if (linkName == "Ingredients") {
      $(".ingredients-section").removeClass("hidden");
      $(".search-section").addClass("hidden");
      $(".categories-section").addClass("hidden");
      $(".area-section").addClass("hidden");
      $(".contact-section").addClass("hidden");
      $(".meals-section").addClass("hidden");
      $(".meal-detials").addClass("hidden");
      $(".meal-details-body-content").empty();
      $(".meal-details-body-img").empty();

      loadingScreen();
      closeNav();
      ingredientsPage();
      // console.log("Ingredients");
    } else if (linkName == "Contact Us") {
      $(".contact-section").removeClass("hidden");
      $(".search-section").addClass("hidden");
      $(".categories-section").addClass("hidden");
      $(".area-section").addClass("hidden");
      $(".ingredients-section").addClass("hidden");
      $(".meals-section").addClass("hidden");
      $(".meal-detials").addClass("hidden");
      $(".meal-details-body-content").empty();
      $(".meal-details-body-img").empty();

      closeNav();

      // console.log("contact us");
    }
  });
});

mealNameInput.keyup(() => {
  let mealName = mealNameInput.val();

  searchPageByname(mealName);

  $(".meals-section").removeClass("hidden");

  console.log(mealName);
});

firstLetter.keyup(() => {
  let mealFirstLetter = firstLetter.val();

  searchPageByFl(mealFirstLetter);

  $(".meals-section").removeClass("hidden");

  console.log(mealFirstLetter);
});

$(".email").keyup(() => {
  emailValidation();
});

$(".age").keyup(() => {
  ageValidation();
});

$(".phone").keyup(() => {
  phoneValidation();
});

$(".pass").keyup(() => {
  passValidation();
});

$(".repass").keyup(() => {
  repassValidation();
});

/**----------------open & close Nav Bar ---------------------- */

function openNav() {
  $(".opcl-nav").removeClass("fa-bars");
  $(".opcl-nav").addClass("fa-xmark");
  $(".navbar").animate({ left: "0px" }, 400, () => {
    $(".search").animate({ top: "0px" }, 30, () => {
      $(".cat").animate({ top: "0px" }, 60, () => {
        $(".area").animate({ top: "0px" }, 90, () => {
          $(".ingred").animate({ top: "0px" }, 120, () => {
            $(".cont").animate({ top: "0px" }, 150);
          });
        });
      });
    });
  });
}

function closeNav() {
  let navWidth = $(".nav-l").width();
  $(".cont").animate({ top: "176px" }, 30, () => {
    $(".ingred").animate({ top: "176px" }, 60, () => {
      $(".area").animate({ top: "176px" }, 90, () => {
        $(".cat").animate({ top: "176px" }, 120, () => {
          $(".search").animate({ top: "176px" }, 150, () => {
            $(".navbar").animate({ left: `-${navWidth}px` }, 400);
          });
        });
      });
    });
  });

  $(".opcl-nav").removeClass("fa-xmark");
  $(".opcl-nav").addClass("fa-bars");
}
//**----------------------Pages---------------------------------------- */

async function areaPage() {
  await getAreas();
  displayAreas(areas);
}

async function categoriesPage() {
  await getCategories();
  displayCategories(cats);
}

async function ingredientsPage() {
  await getIngredients();
  displayIngredients(ingreds);
}

async function areaMealsPage() {
  await getAreaMeals(areaName);
  displaymeals(areaMeals);
}

async function catMealsPage() {
  await getCategoryMeals(catName);
  displaymeals(catMeals);
}

async function ingredMealsPage() {
  await getIngredientMeals(ingredName);
  displaymeals(ingedMeals);
}

async function searchPageByname(name = "") {
  await getSearchByName(name);
  displaymeals(searchMeals);
}

async function searchPageByFl(firstLetter) {
  await getSearchByFL(firstLetter);
  displaymeals(searchMeals);
}

/**--------------------------API---------------------------------- */

async function getAreas() {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await httpReq.json();
  // console.log(response);

  areas = response.meals;
  // console.log(areas);
}

async function getCategories() {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await httpReq.json();
  // console.log(response);

  cats = response.categories;
  // console.log(cats);
}

async function getIngredients() {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await httpReq.json();
  // console.log(response);

  ingreds = response.meals;
  // console.log(ingreds);
}

async function getAreaMeals(name = "Canadian") {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  let response = await httpReq.json();
  // console.log(response);

  areaMeals = response.meals;
  // console.log(areaMeals);
}

async function getCategoryMeals(name = "Seafood") {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );
  let response = await httpReq.json();
  // console.log(response);

  catMeals = response.meals;
  // console.log(catMeals);
}

async function getIngredientMeals(name = "chicken_breast") {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  let response = await httpReq.json();
  // console.log(response);

  ingedMeals = response.meals;
  // console.log(ingedMeals);
}

async function getSearchByName(name = "Arrabiata") {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let response = await httpReq.json();
  // console.log(response);

  searchMeals = response.meals;
  // console.log(searchMeals);
}

async function getSearchByFL(name = "A") {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let response = await httpReq.json();
  // console.log(response);

  searchMeals = response.meals;
  // console.log(searchMeals);
}

async function mealDetails(id = "52772") {
  let httpReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let response = await httpReq.json();
  // console.log(response);

  let mealDetal = response.meals[0];
  // console.log(mealDetal);

  let title = mealDetal.strMeal;
  let mealImg = mealDetal.strMealThumb;
  let mealInstructure = mealDetal.strInstructions;
  let mealArea = mealDetal.strArea;
  let mealCat = mealDetal.strCategory;
  let mealSource = mealDetal.strSource;
  let mealVideo = mealDetal.strYoutube;
  let mealTag = mealDetal.strTags ?? "";

  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    let ingredient = mealDetal[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  let ingredientsQty = [];

  for (let i = 1; i <= ingredients.length; i++) {
    let ingredientQty = mealDetal[`strMeasure${i}`];
    if (ingredientQty) {
      ingredientsQty.push(ingredientQty);
    }
  }

  // console.log(ingredients);
  // console.log(ingredientsQty);

  displaymealDetails(
    title,
    mealImg,
    mealInstructure,
    mealArea,
    mealCat,
    mealSource,
    mealVideo,
    mealTag,
    ingredients,
    ingredientsQty
  );
}

/**------------------------------UI Functions--------------------------------- */

function displayCategories(arr) {
  let categoriesBox = "";
  let categoriesData = document.querySelector(".categories-container");

  for (let i = 0; i < arr.length; i++) {
    categoriesBox += ` 
<div class="card px-3 overflow-hidden group cursor-pointer" id="${
      arr[i].idCategory
    }" -data-catName = "${arr[i].strCategory}">
  <div class="card-body rounded-md relative">
    <img class="w-full rounded-md" src=${arr[i].strCategoryThumb} alt="beef" />
    <div
      class="card-content text-center bg-stone-200/[0.8] h-full text-black absolute bottom-[-100%] rounded-md px-4 overflow-hidden group-hover:bottom-0 transition-all duration-500">
      <h3 class="text-2xl font-medium mt-2 mb-3">${arr[i].strCategory}</h3>
      <p>
      ${arr[i].strCategoryDescription.substr(0, 100)}
      </p>
    </div>
  </div>
</div>`;
  }
  categoriesData.innerHTML = categoriesBox;

  $(".loading-section").addClass("hidden");

  cardsEvent();
}

function displayAreas(arr) {
  let areasBox = "";
  let areasData = document.querySelector(".area-container");

  for (let i = 0; i < arr.length; i++) {
    areasBox += `
        <div class="card text-white text-center cursor-pointer" -data-areaName = "${arr[i].strArea}">
          <div class="card-body text-3xl">
            <i class="fa-solid fa-house-laptop fa-2xl"></i>
            <h3 class="mt-3 font-medium"> ${arr[i].strArea}</h3>
          </div>
        </div> `;
  }
  areasData.innerHTML = areasBox;

  $(".loading-section").addClass("hidden");

  cardsEvent();
}

function displayIngredients(arr) {
  let ingredBox = "";
  let ingredData = document.querySelector(".ingredients-container");

  for (let i = 0; i < 20; i++) {
    ingredBox += `
         <div class="card text-white text-center cursor-pointer" id="${
           arr[i].idIngredient
         }" -data-ingedName = "${arr[i].strIngredient}">
          <div class="card-body text-3xl">
            <i class="fa-solid fa-drumstick-bite fa-2xl"></i>
            <h3 class="mt-3 font-medium">${arr[i].strIngredient}</h3>
            <p class="text-base font-normal">${arr[i].strDescription.substr(
              0,
              100
            )}</p>
          </div>
        </div>`;
  }
  ingredData.innerHTML = ingredBox;

  $(".loading-section").addClass("hidden");

  cardsEvent();
}

function displaymeals(arr) {
  let mealsBox = "";
  let mealsData = document.querySelector(".meals-container");

  for (let i = 0; i < arr.length; i++) {
    mealsBox += `
        <div class="card px-3 overflow-hidden group cursor-pointer" id="${arr[i].idMeal}">
          <div class="card-body rounded-md relative">
            <img class="w-full rounded-md" src=${arr[i].strMealThumb} alt="beef" />
            <div
              class="card-content flex justify-center items-center bg-stone-200/[0.8] w-full h-full text-black absolute bottom-[-100%] rounded-md px-3 overflow-hidden group-hover:bottom-0 transition-all duration-500">
              <h3 class="text-2xl font-medium mt-2 mb-3">${arr[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
  }
  mealsData.innerHTML = mealsBox;

  $(".loading-section").addClass("hidden");

  cardsEvent();
}

function displaymealDetails(
  title,
  img,
  instruction,
  area,
  cat,
  source,
  video,
  tag,
  ingreds,
  ingredsQty
) {
  $(".meal-details-body-img ").append(
    `<img class="w-full rounded-md" src="" alt="" />`
  );
  $(".meal-details-body-img img").attr("src", `${img}`);
  $(".meal-details-body-img img").after(
    `<h2 class="meal-name text-3xl font-medium">${title}</h2>`
  );

  $(".meal-details-body-content").append(
    `<h2 class="text-3xl font-medium mb-2">Instructions</h2>`
  );
  $(".meal-details-body-content").append(
    `<p class="meal-instructure mb-2">${instruction}</p>`
  );

  $(".meal-details-body-content").append(
    `<p class="text-2xl font-medium mb-3"><span class="text-2xl font-bold mr-2">Area:</span>${area}</p>`
  );
  $(".meal-details-body-content").append(
    `<p class="text-2xl font-medium mb-3"><span class="text-2xl font-bold mr-2">Category:</span>${cat}</p>`
  );
  $(".meal-details-body-content").append(
    '<p class="text-2xl font-medium mb-1">Recipes:</p>'
  );
  $(".meal-details-body-content").append(
    ` <ul class="recipes mb-5 *:rounded-md *:border *:border-cyan-400 *:p-1 *:m-1 *:inline-block *:bg-cyan-200 *:text-[#055160]"></ul>`
  );

  for (let i = 0; i < ingreds.length; i++) {
    $(".recipes").append(`<li>${ingredsQty[i]} ${ingreds[i]}</li>`);
  }

  if (tag != "") {
    $(".meal-details-body-content").append(
      '<p class="text-2xl font-medium mb-1">Tags:</p>'
    );
    $(".meal-details-body-content").append(
      `<ul class="tags mb-5 *:rounded-md *:border *:border-red-400 *:p-1 *:m-1 *:inline-block *:bg-red-300 *:text-[#842029]"></ul>`
    );

    let mealTags = tag.split(",");

    mealTags.forEach((tag) => {
      $(".tags").append(`<li>${tag}</li>`);
    });
  }

  $(".btns").children().first().attr("href", `${source}`);
  $(".btns").children().last().attr("href", `${video}`);

  $(".loading-section").addClass("hidden");
}

function cardsEvent() {
  let mealCards = document.querySelectorAll(".card");

  mealCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (linkName == "Categories") {
        catName = card.getAttribute("-data-catName");
        loadingScreen();
        // console.log(catName);

        catMealsPage();

        $(".categories-section").addClass("hidden");
        $(".meals-section").removeClass("hidden");
        $(".meal-detials").addClass("hidden");
        $(".meal-details-body-content").empty();
        $(".meal-details-body-img").empty();

        linkName = "";
      } else if (linkName == "Area") {
        areaName = card.getAttribute("-data-areaName");
        // $(".loading-section").removeClass("hidden");
        loadingScreen();
        // console.log(areaName);

        areaMealsPage();

        $(".area-section").addClass("hidden");
        $(".meals-section").removeClass("hidden");
        $(".meal-detials").addClass("hidden");
        $(".meal-details-body-content").empty();
        $(".meal-details-body-img").empty();

        linkName = "";
      } else if (linkName == "Ingredients") {
        ingredName = card.getAttribute("-data-ingedName");
        loadingScreen();
        // console.log(ingredName);

        ingredMealsPage();

        $(".ingredients-section").addClass("hidden");
        $(".meals-section").removeClass("hidden");
        $(".meal-detials").addClass("hidden");
        $(".meal-details-body-content").empty();
        $(".meal-details-body-img").empty();

        linkName = "";
      } else {
        let mealId = card.getAttribute("id");
        mealDetails(mealId);

        $(".meal-detials").removeClass("hidden");
        $(".search-section").addClass("hidden");
        $(".categories-section").addClass("hidden");
        $(".area-section").addClass("hidden");
        $(".ingredients-section").addClass("hidden");
        $(".contact-section").addClass("hidden");
        $(".meals-section").addClass("hidden");

        console.log(mealId);
      }
    });
  });
}

function loadingScreen() {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive") {
      $(".loading-section").removeClass("hidden");
    }
  });
}

/**-------------------contact Validation----------------------------- */

function emailValidation() {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test($(".email").val())
  ) {
    $("#emailInvalid").addClass("hidden");
  } else {
    $("#emailInvalid").removeClass("hidden");
  }
}

function passValidation() {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/gi.test(
      $(".pass").val()
    )
  ) {
    $("#passInvalid").addClass("hidden");
  } else {
    $("#passInvalid").removeClass("hidden");
  }
}

function repassValidation() {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/gi.test(
      $(".pass").val()
    )
  ) {
    $("#repassInvalid").addClass("hidden");
  } else {
    $("#repassInvalid").removeClass("hidden");
  }
}

function ageValidation() {
  if ($(".age").val() >= 18 || $(".age").val() != "string") {
    $("#ageInvalid").addClass("hidden");
  } else {
    $("#ageInvalid").removeClass("hidden");
  }
}

function phoneValidation() {
  if ($(".phone").val().length == 11) {
    $("#phoneInvalid").addClass("hidden");
  } else {
    $("#phoneInvalid").removeClass("hidden");
  }
}
