// la recherche de l'utilisateur
const query = document.getElementById('query').value;
// bouton de recherche
const search = document.getElementById('search');
// l'url de base de l'API
const url = 'https://imdb-api.com/en/API/SearchMovie/k_7wu03o0q/';

// la fonction qui récupère les données correspondant à la recherche
async function getFilm(){
    try{
        const endpoint = url + query;
        const request = await fetch(endpoint);
        const result = await request.json();
        console.log(result)
    }
    catch (error){
    console.log(error)
    }
}
//fonction qui montre les résultats
const displayFilm = (event) =>{
    event.preventDefault;
    console.log(getFilm());
}

//resultats 
search.addEventListener('submit', displayFilm)