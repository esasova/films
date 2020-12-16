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

//la fonction qui itère l'array des résultats et affiche les données
const affichage = (tableau) =>{
    for(objet of tableau){
        const article = document.createElement('article');
        section.appendChild(article);
        article.classList.add('col-4');
        for(element in objet) {
            if(element === 'title'){
                let titre = document.createElement('a');
                titre.href = '#';
                titre.textContent = `${objet[element]}`;
                article.appendChild(titre)
                const newUrl = 'https://imdb-api.com/en/API/Title/k_7wu03o0q/';
                const newEndpoint = `${newUrl}${objet.id}`;
                titre.addEventListener('click', async function getDetails(e){
                    e.preventDefault;
                    try{
                        const newReq = await fetch(newEndpoint);
                        const newRes = await newReq.json();
                        const popup = document.createElement('aside');
                        section.appendChild(popup);
                        let list = document.createElement('ul');
                        popup.appendChild(list);
                        for (property in newRes){
                        let line = document.createElement('li');
                        line.textContent = `${newRes[property]}`;
                        list.appendChild(line)
                        }
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


//la fonction qui envoie les données détaillées du film en cliquant sur le titre

                    // section.appendChild(popup);
                    // async function showDetails(){
                    //     try{
                    //         const newReq = await fetch(newEndpoint);
                    //         const newRes = await newReq.json();
                    //         console.log(newRes);
                    //     } catch(error){
                    //         console.log(error)
                    //     }
                    // }