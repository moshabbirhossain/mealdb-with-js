async function loadRecipes(searchText = "") {
    showLoader();
    try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await axios.get(apiUrl);
        const recipes = res.data.meals;
        displayRecipes(recipes);
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
}

function displayRecipes(recipes) {
    const recipesElement = document.getElementById("recipe-container");
    recipesElement.innerHTML = "";
    if (!recipes || recipes.length == 0) {
        recipesElement.innerHTML = `
            <p class="text-center text-red-500 font-semibold">
                No recipes found
            </p>
        `;
        return;
    }
    for (const recipe of recipes) {
        const div = document.createElement("div");
        div.classList = "card bg-base-100 w-64 shadow-md mx-auto";
        div.innerHTML = `
            <figure>
                <img src="${recipe.strMealThumb}" alt="card-image" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${recipe.strMeal}</h2>
                <p class="max-h-20 overflow-y-hidden">
                    ${recipe.strInstructions}
                </p>
                <div class="card-actions justify-end">
                    <button class="btn bg-teal-600 text-white">
                        View Details
                    </button>
                </div>
            </div>
        `;
        recipesElement.append(div);
    }
}

document.getElementById("search-btn").addEventListener("click", () => {
    showLoader();
    const searchField = document.getElementById("input-field");
    const searchText = searchField.value;
    // searchField.value = "";

    loadRecipes(searchText);
    // for (const recipe of recipes) {
    //     if (recipe.strMeal !== searchText) {
    //         console.log("Data not found");
    //         hideLoader();
    //     } else {
    //         loadRecipes(searchText);
    //     }
    // }
});
function showLoader() {
    const loaderElement = document.getElementById("loader");
    loaderElement.classList.remove("hidden");
}

function hideLoader() {
    const loaderElement = document.getElementById("loader");
    loaderElement.classList.add("hidden");
}

loadRecipes();
