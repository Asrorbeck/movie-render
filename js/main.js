var elMovieCardTemplate = document.querySelector("#cardTemplate").content;
var elMoviesWrapper = document.querySelector(".movies_wrapper");
var elresult = document.querySelector(".result");
var elForm = document.querySelector(".main-form");
var elRating = document.querySelector(".movie__rating");
var elYear = document.querySelector(".movie__year");
var elAlert = document.querySelector(".movie__alert");
var elAlertText = document.querySelector(".alert__text");
var elAlertTextBold = document.querySelector(".movie__bold-text");
var elSelect = document.querySelector(".movie__select");
var elFindMovie = document.querySelector(".movie__find");

let moviesArray = movies.slice(0, 50);

function normolize(array) {
    let normolized = []
    
    array.forEach(function (item) {
        let newItem = {}
        
        newItem.title = item.Title.toString();
        newItem.movieYear = item.movie_year;
        newItem.categories = item.Categories.split("|");
        newItem.rating = item.imdb_rating;
        newItem.img =  `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        newItem.videoUrl =  `https://www.youtube.com/watch?v=${item.ytid}`;
        
        
        normolized.push(newItem)
        
    });
    
    return normolized
}

let normolizedArray = normolize(moviesArray);


function renderMovies(array) {
    
    elMoviesWrapper.innerHTML = null;
    elresult.textContent = array.length;
    
    if (elresult.textContent === "0") {
        elAlert.classList = "alert alert-danger alert-dismissible p-2 fade show"
        elAlertText.textContent = "Kechirasiz, Siz kiritgan ma'lumotlar bo'yicha hech qanday kino topilmadi :(";
    } else {
        elAlert.classList = "alert alert-success alert-dismissible p-2 fade show movie__alert";
        elAlertText.textContent = "O'zingiz yoqtirgan Kinoyingizni toping va tomosha qiling!"
    }
    
    let elFragment = document.createDocumentFragment()
    
    for (const item of array) {
        let movieCard = elMovieCardTemplate.cloneNode(true);
        
        movieCard.querySelector(".card-img-top").src = item.img;
        movieCard.querySelector(".card__heading").textContent = item.title;
        movieCard.querySelector(".movie__year").textContent = item.movieYear;
        movieCard.querySelector(".movie__rating").textContent = item.rating;
        movieCard.querySelector(".movie__link").href = item.videoUrl;
        movieCard.querySelector(".movie_category").textContent = item.categories
        movieCard.querySelector(".movie__link").setAttribute("target", "blank");
        
        elFragment.appendChild(movieCard)
        
    }
    
    elMoviesWrapper.appendChild(elFragment)
    
    return elMoviesWrapper
    
}

function generateCategoy(array) {
    let newCategorieArray = [];
    
    for (const item of array) {
        let categorieArray = item.categories;
        for (const categoryItem of categorieArray) {
            if (!newCategorieArray.includes(categoryItem)) {
                newCategorieArray.push(categoryItem);
            }
        }
    }
    return newCategorieArray
}

let categoryList = generateCategoy(normolizedArray)


function renderCategory(array, wrapper) {
    let newFragment = document.createDocumentFragment()
    
    for (const item of array) {
        let newOption = document.createElement("option");
        newOption.textContent = item;
        newOption.value = item;
        
        newFragment.appendChild(newOption)
    }
    
    wrapper.appendChild(newFragment);
}








elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    
    let inputYear = elYear.value.trim();
    let inputRating = elRating.value.trim();
    let selectedCategory = elSelect.value.trim();
    
    
    let byRatingAndYear = normolizedArray.filter(function (item)  {
        let select = selectedCategory == "all" ? true : item.categories.includes(selectedCategory); 
        
        let validation = (item.rating >= inputRating) && (item.movieYear >= inputYear) && select;
        
        return validation
    });

   
    renderMovies(byRatingAndYear);
    
    
})
renderCategory(categoryList, elSelect)
renderMovies(normolizedArray)

