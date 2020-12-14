const film = document.getElementById('film');

const getFilm = new XMLHttpRequest();
getFilm.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response.Title)
        const film = document.getElementById('film');
        film.textContent = response.Title;
    }
}
getFilm.open('GET', 'http://www.omdbapi.com/?i=tt3896198&apikey=7cfb6335');
getFilm.send();

// const getFilm = async () => {
//     const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=7cfb6335');
//     const responseJson = await response.json();
//     console.log(responseJson)

// }