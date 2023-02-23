// Almacenar Películas en un array de OBJ con los atributos Título, Director, Año y Genero
// Solicita los datos a través de un formulario, validar los campos Año que tenga 4 cifras y se encuentre entre el año 1800 y la fecha actual Los géneros serán terror, acción, comedia,romantica
// Almacenar las peliculas en un array
// Mostrar todas las películas en una tabla

//*VARIABLES ++++++++++++++++++++++++++++++++++++++++
const titleB = document.querySelector("#titleBlank");
const directorB = document.querySelector("#directorBlank");
const yearB = document.querySelector("#yearBlank");
const genreB = document.querySelector("#genreBlank");
//          ++++++++++++++++    Blanks
const blankForms = document.querySelector(".inputs");

const formM = document.querySelector("#form");

const subButton = document.querySelector("#submitButton");

const addedMovies = document.querySelector("#addedMovies");

const fragment = document.createDocumentFragment();

const arrayGenres = [
  "Choose an option",
  "Action",
  "Horror",
  "Comedy",
  "Romance",
  "Sy-Fy",
  "Thiller",
  "Drama"
];

let ObjValidate = {
  //Esto va a validar cada blank por separado, cambiando state a true.
  title: false,
  director: false,
  year: false,
  genre: false,
};

let errors = []; // con esto voy a pintar los errores

const arrayMovie = JSON.parse(localStorage.getItem('movies')) || []; // con esto voy a pintar en la tabla

const validateTitleDirector = {
    titleExp: /^[a-z]+.+.{2,130}$/i,
    directorExp: /^[a-zA-Z ]{2,30}$/i
}

//*EVENTOS ++++++++++++++++++++++++++++++++++++++++++

//todo evento Submit, una vez validado
formM.addEventListener("submit", (ev) => {
  ev.preventDefault();
  validate();
  paintTable();
});

//*FUNCIONES ++++++++++++++++++++++++++++++++++++++++
//validar form

const validate = () => {
  let title = titleB.value;
  let director = directorB.value;
  let year = yearB.value;
  let genre = genreB.value;

  if (validateTitleDirector.titleExp.test(title)) {
    ObjValidate.title = true;
  } else {
    alert("Please, insert a valid title.");
    errors.push("Title invalid");
  }
  if (validateTitleDirector.directorExp.test(director)) {
    ObjValidate.director = true;
  } else {
    alert("Please, insert a valid director's name.");
    errors.push("Director's name invalid");
  }
  if (!isNaN(year) && year > 1940 && year < 2024) {
    ObjValidate.year = true;
  } else {
    alert("Please, insert a valid year.");
    errors.push("Invalid year");
  }
  if (genre != "Choose an option") {
    ObjValidate.genre = true;
  } else {
    alert("Please, select an option.");
    errors.push("Invalid genre");
  }
  let arrayValidar = Object.values(ObjValidate);
  const valida = arrayValidar.findIndex((item) => item == false);

  if (valida === -1) {
    alert("Nice, we've added your movie!");

    let objMovie = {
      title,
      director,
      year,
      genre,
    };

    almacenar(arrayMovie,objMovie)          //aplicamos función almacenar para contener los datos de arrayMovie y del objeto
    addedMovies.innerHTML = ''              //volvemos a vaciar para que no REpinte lo que ya ha pintado.
                                            //le añadimos a la lista de movies la función creada para pintar, haciendo append de la función al contenedor.

    
  } else {
    alert("Unable to save your movie. Please, re-do the process.")
  }
};

const almacenar=(donde,objMovie)=>{
    donde.push(objMovie);
    setLocal();
}

//todo pintar opciones en Genre
const paintGenre = () => {
  arrayGenres.forEach((item) => {
    const genreOpt = document.createElement("OPTION");
    genreOpt.textContent = item;

    fragment.append(genreOpt);
  });
  genreB.append(fragment);
};



//todo pintar arrayMovie en una tabla
function paintTable() {

    const peliculas = getLocal();

    peliculas.forEach((item) => {
    const tableR = document.createElement("TR");

    const tableTitle = document.createElement("TD");
    tableTitle.textContent = item.title;

    const tableDirector = document.createElement("TD");
    tableDirector.textContent = item.director;

    const tableYear = document.createElement("TD");
    tableYear.textContent = item.year;

    const tableGenre = document.createElement("TD");
    tableGenre.textContent = item.genre;

    tableR.append(tableTitle, tableDirector, tableYear, tableGenre)

    fragment.append(tableR);

  });
    addedMovies.append(fragment);
    // return fragment
}

//todo función para pintar en Local Storage
setLocal=()=>{
    console.log("adding to Local Storage", arrayMovie)
    localStorage.setItem('movies', JSON.stringify(arrayMovie));
}

//todo función para traer del Local Storage
getLocal=()=>{
  console.log("Retrieving data from Local Storage..");
  return JSON.parse(localStorage.getItem('movies')) || []; //! faltaba el return y "|| []"
}

const init=()=>{
    paintGenre();
    paintTable();
}
init();