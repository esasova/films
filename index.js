const film = document.getElementById('film');
const getFilm = async () => {
    const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=7cfb6335');
    const responseJson = await response.json();
    console.log(responseJson)

}