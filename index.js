// la recherche de l'utilisateur
const input = document.getElementById('query');

// bouton de recherche
const search = document.getElementById('search');

// l'url de base de l'API
const url = 'https://imdb-api.com/en/API/SearchMovie/k_7wu03o0q/';

//la section où sont stockés les resultats
const section = document.getElementById('choice');


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

const affichage = (tableau) =>{
    for(objet of tableau){
        const article = document.createElement('article');
        section.appendChild(article);
        article.classList.add('col-4');
        for(element in objet) {
            if(element === 'title'){
                let titre = document.createElement('h3');
                titre.textContent = `${objet[element]}`;
                article.appendChild(titre);
//récupération de l'id IMDB du film pour la recherche par id (plus détaillée)
                const newUrl = 'https://imdb-api.com/en/API/Title/k_7wu03o0q/';
                const newEndpoint = `${newUrl}${objet.id}`;
                titre.addEventListener('click', async function reqDetails(e){
                    e.preventDefault;
//envoie de requête à l'API avec l'id du film
                    try{
                        const newReq = await fetch(newEndpoint);
                        const newRes = await newReq.json();
                        getDetails(newRes)
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
const getDetails = (table) =>{
    const popup = document.createElement('aside');
    section.appendChild(popup);
    const bouton = document.createElement('button');
    bouton.textContent = 'X';
    bouton.id = 'bouton';
    popup.appendChild(bouton);
                            let list = document.createElement('ul');
    popup.appendChild(list);
    for (property in table){
    let line = document.createElement('li');
    line.textContent = `${table[property]}`;
    list.appendChild(line);
    bouton.addEventListener('click', ()=>{
        popup.innerHTML = '';
        section.removeChild(popup);
    })
}}
