// Almacenar Películas en un array de OBJ con los atributos Título, Director, Año y Genero
// Solicita los datos a través de un formulario, validar los campos Año que tenga 4 cifras y se encuentre entre el año 1800 y la fecha actual Los géneros serán terror, acción, comedia,romantica
// Almacenar las peliculas en un array
// Mostrar todas las películas en una tabla

//*VARIABLES ++++++++++++++++++++++++++++++++++++++++
const titleB = document.querySelector('#titleBlank');
const directorB = document.querySelector('#directorBlank');
const yearB = document.querySelector('#yearBlank');
const genreB = document.querySelector('#genreBlank');
//          ++++++++++++++++    Blanks
const blankForms = document.querySelector(".inputs");
const formM = document.querySelector("#form")
const subButton = document.querySelector("#submitButton");
const fragment = document.createDocumentFragment();

const arrayGenres = [
  "Choose an option",
  "Action",
  "Horror",
  "Comedy",
  "Romance",
];

let ObjValidate = {  //Esto va a validar cada blank por separado, cambiando state a true.
    title: false,
    director: false,
    year: false,
    genre: false,
}

let errors = []; // con esto voy a pintar los errores

const arrayMovie = []; // con esto voy a pintar en la tabla

//*EVENTOS ++++++++++++++++++++++++++++++++++++++++++

//todo evento Submit, una vez validado
formM.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    validate();
});

//*FUNCIONES ++++++++++++++++++++++++++++++++++++++++
//validar form

const validate = () => {
    let tittle = titleB.value;
    let director = directorB.value;
    let year = yearB.value;
    let genre = genreB.value;

    if (isNaN(tittle)) {
    ObjValidate.title = true;
    }   else {
        alert("Please, insert a valid title.");
        errors.push("Title invalid");

    }   if (isNaN(director)) {
        ObjValidate.director = true;
    }   else {
        alert("Please, insert a valid director's name.");
        errors.push("Director's name invalid");

    }   if (year > 1940 && year < 2024) {
        ObjValidate.year = true;
    }   else {
        alert("Please, insert a valid year.");
        errors.push("Invalid year");

    }   if (genre != "Choose a genre") {
        ObjValidate.genre = true;
    }   else {
        alert("Please, select an option.");
        errors.push("Invalid genre");
    }   
        let arrayValidar = Object.values(ObjValidate)
        const validation = arrayValidar.findIndex(item => item == false)

        if (validation === -1) {
            alert("Nice, we've added your movie!");
        
        let ObjMovie = {
            tittle,
            director,
            year,
            genre
        }
        arrayMovie.push(ObjMovie);
        return paintTable(arrayMovie);
}}

//todo pintar opciones en Genre
const paintGenre = () => {
  arrayGenres.forEach((item) => {
    const genreOpt = document.createElement("OPTION");
    genreOpt.textContent = item;

    fragment.append(genreOpt);
  })
    genreB.append(fragment);
};

paintGenre();

//todo pintar arrayMovie en una tabla
function paintTable(array) {
    const tableR = document.createElement("TR")
    console.log(array);

    array.forEach((item) => {
    const tableD = document.createElement("TD")
    tableD.textContent = item.director
    tableR.append(tableD);
        //  tableR.innerHTML = `<td>${tittle}</td>`
    })
}
