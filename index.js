// la recherche de l'utilisateur
const input = document.getElementById('query');

// bouton de recherche
const search = document.getElementById('search');

// l'url de base de l'API
const url = 'https://imdb-api.com/en/API/SearchMovie/k_7wu03o0q/';



// la fonction qui récupère les données correspondant à la recherche
async function getFilm(){
    const query = input.value;
    const endpoint = `${url}${query}`;
    try{
        const request = await fetch(endpoint);
        const result = await request.json();
        affichage(result.results)


    }
    catch (error){
    console.log(error)
    }
}

//resultats 
search.addEventListener('click', function(){
    getFilm();
    section.innerHTML = '';
});

//la section où sont stockés les resultats
const section = document.getElementById('choice');

//la fonction qui itère l'array des résultats et affiche les données
const affichage = (tableau) =>{
    for(objet of tableau){
        const article = document.createElement('article');
        section.appendChild(article);
        article.classList.add('col-4');
        for(element in objet) {
            if(element === 'title'){
                let titre = document.createElement('h3');
                titre.textContent = `${objet[element]}`;
                article.appendChild(titre)
            } else if(element === 'image'){
                let image = document.createElement('p');
                image.innerHTML += `<img src="${objet[element]}"></img>`;
                article.appendChild(image) 
                
            } else if(element === 'description') {
                let year = document.createElement('p');
                year.textContent = `Year : ${objet[element]}`;
                article.appendChild(year)
            }
        }
    }
}