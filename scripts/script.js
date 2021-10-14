const url = "https://www.prevision-meteo.ch/services/json/";

const ville = document.getElementById("ville");
const lever = document.getElementById("lever");
const coucher = document.getElementById("coucher");
const prev = document.getElementById("prev");
const picto = document.getElementById("picto");
const temp = document.getElementById("temperature");
const textRecherche = document.getElementById("textRecherche");

console.log(textRecherche);

const appelAPI = (villeRecherche) => {
    console.log("appel de l'url : ");
    console.log(url + villeRecherche);
    fetch(url + villeRecherche)
    .then(response => {
        return response.json();
    })
    .then(jsonResp =>{
        ville.innerText = jsonResp.city_info.name;
        lever.innerText = `Lever: ${jsonResp.city_info.sunrise}`;
        coucher.innerText = `Coucher: ${jsonResp.city_info.sunset}`;
        prev.innerText = jsonResp.current_condition.condition;
        console.log(jsonResp.current_condition.icon);
        picto.src = jsonResp.current_condition.icon;
        temp.innerText = `${jsonResp.current_condition.tmp}°C`;
    })
    .catch(error => {
        console.log("un problème est survenu !!");
        console.log(error.message);
    });    
}

appelAPI("acheres-78");



const chercher = () => {
    console.log("Je cherche :D");
    appelAPI(textRecherche.value);
}