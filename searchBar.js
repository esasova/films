// la recherche de l'utilisateur
const input = document.getElementById('query');

// bouton de recherche
const search = document.getElementById('search');

// l'url de base de l'API
const url = 'https://imdb-api.com/en/API/SearchMovie/k_7wu03o0q/';

//la section où sont stockés les resultats
const section = document.getElementById('choice');


// la fonction qui récupère les données correspondant à la recherche
async function getFilms(){
    const query = input.value;
    const endpoint = `${url}${query}`;
    try{
        const request = await fetch(endpoint);
        const result = await request.json();
        showFilms(result.results)
    }
    catch (error){
    console.log(error)
    }
}

//resultats 
search.addEventListener('click', function(){
    getFilms();
    section.innerHTML = '';
});

const showFilms = (filmsArray) =>{
    for(const filmObject of filmsArray){
        const article = document.createElement('article');
        section.appendChild(article);
        article.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mt-2');
        for(const element in filmObject) {
            if(element === 'title'){
                let filmTitle = document.createElement('h3');
                filmTitle.textContent = `${filmObject[element]}`;
                article.appendChild(filmTitle);
//récupération de l'id IMDB du film pour la recherche par id (plus détaillée)
                const newUrl = 'https://imdb-api.com/en/API/Title/k_7wu03o0q/';
                const newEndpoint = `${newUrl}${filmObject.id}`;
                filmTitle.addEventListener('click', async function getDetails(e){
                    e.preventDefault;
//envoie de requête à l'API avec l'id du film
                    try{
                        const newReq = await fetch(newEndpoint);
                        const newRes = await newReq.json();
                        showDetails(newRes)
//fonction qui affiche les résultats de la deuxième requête
                        
//fin de la fonction d'affichage
                        }
                    catch(error){
                        console.log(error)
                    }
                })
            }                
            else if(element === 'image'){
                let image = document.createElement('p');
                image.innerHTML += `<img class="imgPres" src="${filmObject[element]}"></img>`;
                article.appendChild(image) 
                
            } else if(element === 'description') {
                let year = document.createElement('p');
                year.textContent = `Year : ${filmObject[element]}`;
                article.appendChild(year)
            }
        }
    }
}
//fonction qui  affiche les infos détaillées dans un popup
const showDetails = (filmDetails) =>{
    const popup = document.createElement('aside');
    section.appendChild(popup);
    const bouton = document.createElement('button');
    bouton.textContent = 'Close';
    bouton.id = 'bouton';
    popup.appendChild(bouton);

//test avec le switch
for (const property in filmDetails){
    switch(property){
        case 'title':
            let movieTitle = document.createElement('h3');
            movieTitle.textContent = filmDetails[property];
            popup.appendChild(movieTitle);
            break;
        case 'releaseDate':
            let movieDate = document.createElement('p');
            movieDate.textContent = `Release date: ${filmDetails[property]}`;
            popup.appendChild(movieDate);
            break;
        case 'runtimeStr':
            let movieRuntime = document.createElement('p');
            movieRuntime.textContent = `Runtime: ${filmDetails[property]}`;
            popup.appendChild(movieRuntime)
            break;
        case 'plot':
            let moviePlot = document.createElement('p');
            moviePlot.textContent = filmDetails[property];
            popup.appendChild(moviePlot);
            break;
        case 'directors':
            let movieDir = document.createElement('p');
            movieDir.textContent = `Director: ${filmDetails[property]}`;
            popup.appendChild(movieDir);
            break;
        case 'writers':
            let movieWrit = document.createElement('p');
            movieWrit.textContent = `Writer: ${filmDetails[property]}`;
            popup.appendChild(movieWrit);
            break;
        case 'genres':
            let movieGenre = document.createElement('p');
            movieGenre.textContent = `Genre: ${filmDetails[property]}`;
            popup.appendChild(movieGenre);
            break;
//affichage des photos des acteurs 
        case 'actorList':
            let actorsDiv = document.createElement('div');
        actorsDiv.classList.add('card-group');
        popup.appendChild(actorsDiv);
        for(const actor of filmDetails[property]){
        let actorCard = document.createElement('div');
        actorCard.classList.add('col-12', 'col-md-6', 'col-lg-4');
        actorsDiv.appendChild(actorCard);
                    let actorImg = document.createElement('div');
                    actorImg.innerHTML = `<img src="${actor.image}" class="card-img-top"></img>`;
                    actorCard.appendChild(actorImg);
                
                    let actorName = document.createElement('h5');
                    actorName.textContent = actor.name;
                    actorCard.appendChild(actorName);
                
                    let actorChar = document.createElement('p');
                    actorChar.textContent = `as ${actor.asCharacter}`;
                    actorCard.appendChild(actorChar);
                
                actorsDiv.appendChild(actorCard)
            }
    }
}
    
    bouton.addEventListener('click', ()=>{
        popup.innerHTML = '';
        section.removeChild(popup);
    })
}
