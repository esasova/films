// methode fetch et l'API oMDB ; résultat = récupérer les données d'un film avec son id
// const film = document.getElementById('film');
async function getFilm(){
    try{
        const reponse = await fetch('https://imdb-api.com/en/API/Title/k_7wu03o0q/tt0411008');
        const result = await reponse.json();
        const film = document.getElementById('titre');
        film.textContent = result.Title;
        for(property in result){
            let line = document.createElement('li');
            if(property === 'Poster'){
                line.innerHTML = `<img src="${result[property]}"></img>`;
            } else if (property === 'Ratings') {
                for (rating of result[property]){
                    line.textContent = `${rating.Source} : ${rating.Value}`;
                }
            } else {
                line.textContent = `${property} : ${result[property]}`;
            }
            const list = document.getElementById('film');
            list.appendChild(line)
        }
    }
    catch(error){
        console.log(error)
    }
}
getFilm();



//methode GET avec l'API OMDB ; résultat : récupérer les données d'un film avec son id
// const getFilm = new XMLHttpRequest();
// getFilm.onreadystatechange = function(){
//     if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         let response = JSON.parse(this.responseText);
//         const film = document.getElementById('titre');
//         film.textContent = response.Title;
//         for(property in response){
//             let ligne = document.createElement('li');
//             if (property === "Poster") {
//                 ligne.innerHTML = `<img src="${response[property]}"></img>`;
//             } else if (property === 'Ratings') { 
//                 let rates = document.createElement('ul');
//                 for(rating of response[property]) {
//                     console.log(rating)
//                     let ratesLine = document.createElement('li');
//                     ratesLine.textContent = `${rating.Source} : ${rating.Value}`;
//                     rates.appendChild(ratesLine);
//                     ligne.appendChild(rates);
//                 }
//             } else {
//                 ligne.textContent = `${property} : ${response[property]}`;
//             }
//             let list = document.getElementById('film');
//             list.appendChild(ligne);
//         }
//     }
// }
// getFilm.open('GET', 'http://www.omdbapi.com/?i=tt3896198&apikey=7cfb6335');
// getFilm.send();

