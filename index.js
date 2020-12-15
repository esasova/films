// la recherche de l'utilisateur
const input = document.getElementById('query');
const query = input.value;
// bouton de recherche
const search = document.getElementById('search');
// l'url de base de l'API
const url = 'https://imdb-api.com/en/API/SearchMovie/k_7wu03o0q/';

// la fonction qui récupère les données correspondant à la recherche
async function getFilm(){
    const endpoint = `${url}${query}`;
    try{
        const request = await fetch(endpoint);
        const result = await request.json();
        console.log(result)
    }
    catch (error){
    console.log(error)
    }
}
// //fonction qui montre les résultats
// function displayFilm() {
    
//     let essai = getFilm();
//     console.log(essai);
// }

//resultats 
search.addEventListener('click', getFilm)