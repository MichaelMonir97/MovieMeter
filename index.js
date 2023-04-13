let movieRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = "ab7f20a6";

//fetch function
let getMovie = () => {
  let movieName = movieRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}
    `;

  // if the search is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter a movie name</h3>`;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //if Movie exist in database
        if (data.Response == "True") {
          console.log(data);
          result.innerHTML = `

          <div class='info'>
            <img src=${data.Poster} class='poster'/>
            <div>
                <h2>${data.Title}</h2>
                <div class='rating'>
                  <img src='star-icon.svg' />
                  <h4>${data.imdbRating} </h4>
                </div>
                <div class='details'>
                  <span> ${data.Rated} </span>
                  <span> ${data.Year} </span>
                  <span> ${data.Runtime} </span>
                </div>
                <div class='genre'> 
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
            </div>
            <h3>Plot: </h3>
            <p>${data.Plot}</p>
            <h3>Cast: </h3>
            <p>${data.Actors}</p>
          `;
        }
        //if Movie does not exist
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      });

    //if error occur
    Promise.catch(() => {
      result.innerHTML = `<h3 class="msg>Error Occured </h3>`;
    });
  }
};

searchBtn.onclick = () => {
  getMovie();
};
window.addEventListener("load", getMovie);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getMovie();
  }
});
