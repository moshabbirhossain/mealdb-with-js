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
                    <button class="view-data btn bg-teal-600 text-white" data-id="${recipe.idMeal}">
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

document.getElementById("recipe-container").addEventListener("click", (e) => {
    const btn = e.target.closest(".view-data");
    if (!btn) return;
    const { id } = btn.dataset;
    loadViewData(id);
});

async function loadViewData(id) {
    // console.log(id);
    openModal();

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await axios.get(apiUrl);
    const recipe = res.data.meals?.[0];
    showModalData(recipe);
    // const modal = document.getElementById("modal");

    // modal.addEventListener("click", (e) => {
    //     if (e.target === modal) modal.classList.add("hidden");
    // });
}

function showModalData(recipe) {
    const modalElement = document.getElementById("modal-content");
    modalElement.innerHTML = `
    <figure>
        <img src="${recipe.strMealThumb}" alt="card-image" class='max-h-48 w-full px-6'/>
    </figure>
    <div class="card-body">
        <h2 class="card-title">${recipe.strMeal}</h2>
        <p class="h-36 overflow-y-clip">
            ${recipe.strInstructions}
        </p>
        <!-- Close Button -->
        <div class="mt-6 flex justify-end">
            <button
                id="modal-close"
                class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
                Close
            </button>
        </div>
    </div>
`;
}
// modal functionalities
function openModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
}


// closing modal functionalities
const modal = document.getElementById("modal");
modal.addEventListener("click", (e) => {
    // 1. Check if the user clicked the Close button
    // OR if they clicked the background overlay itself
    if (e.target.id === "modal-close" || e.target === modal) {
        modal.classList.add("hidden");
    }
});
