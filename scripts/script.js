const url = "https://www.prevision-meteo.ch/services/json/";

const ville = document.getElementById("ville");
const lever = document.getElementById("lever");
const coucher = document.getElementById("coucher");
const prev = document.getElementById("prev");
const picto = document.getElementById("picto");
const temp = document.getElementById("temperature");
const textRecherche = document.getElementById("textRecherche");
const jourSemaine1 = document.getElementById("jourSemaine1");
const prevJour1 = document.getElementById("prevJour1");
const pictoJour1 = document.getElementById("pictoJour1");
const temperatureJour1 = document.getElementById("temperatureJour1");
const jourSemaine2 = document.getElementById("jourSemaine2");
const prevJour2 = document.getElementById("prevJour2");
const pictoJour2 = document.getElementById("pictoJour2");
const temperatureJour2 = document.getElementById("temperatureJour2");
const jourSemaine3 = document.getElementById("jourSemaine3");
const prevJour3 = document.getElementById("prevJour3");
const pictoJour3 = document.getElementById("pictoJour3");
const temperatureJour3 = document.getElementById("temperatureJour3");

const appelAPI = (villeRecherche) => {
    let tabInfos = document.getElementsByClassName("infos");
    let lblError = document.querySelector("#lblError");
    lblError.style.display = "none";
    lblError.innerText = `Ville ${villeRecherche} inconnue`
    for(element of tabInfos){
        element.style.display = "none";
    }
    let tabLoadings = document.getElementsByClassName("loading");
    for(element of tabLoadings){
        element.style.display = "block";
    }
    console.log("appel de l'url : ");
    console.log(url + villeRecherche);
    fetch(url + villeRecherche)
    .then(response => {
        return response.json();
    })
    .then(jsonResp =>{
        //Jour courant
        ville.innerText = jsonResp.city_info.name;
        lever.innerText = `Lever: ${jsonResp.city_info.sunrise}`;
        coucher.innerText = `Coucher: ${jsonResp.city_info.sunset}`;
        prev.innerText = jsonResp.current_condition.condition;
        console.log(jsonResp.current_condition.icon);
        picto.src = jsonResp.current_condition.icon;
        temp.innerText = `${jsonResp.current_condition.tmp}°C`;

        //Jour 1 (lendemain)
        jourSemaine1.innerText = jsonResp.fcst_day_1.day_short;
        prevJour1.innerText = jsonResp.fcst_day_1.condition;
        pictoJour1.src = jsonResp.fcst_day_1.icon;
        temperatureJour1.innerText = `${jsonResp.fcst_day_1.tmin}/${jsonResp.fcst_day_1.tmax}°C`;

        //Jour 2 
        jourSemaine2.innerText = jsonResp.fcst_day_2.day_short;
        prevJour2.innerText = jsonResp.fcst_day_2.condition;
        pictoJour2.src = jsonResp.fcst_day_2.icon;
        temperatureJour2.innerText = `${jsonResp.fcst_day_2.tmin}/${jsonResp.fcst_day_2.tmax}°C`;

        //Jour 3
        jourSemaine3.innerText = jsonResp.fcst_day_3.day_short;
        prevJour3.innerText = jsonResp.fcst_day_3.condition;
        pictoJour3.src = jsonResp.fcst_day_3.icon;
        temperatureJour3.innerText = `${jsonResp.fcst_day_3.tmin}/${jsonResp.fcst_day_3.tmax}°C`;
    })
    .catch(error => {
        console.log("un problème est survenu !!");
        console.log(error.message);
        let lblError = document.querySelector("#lblError");
        lblError.style.display = "inline";
        lblError.innerText = `Ville ${villeRecherche} inconnue`
    }).finally( () => {
        let tabInfos = document.getElementsByClassName("infos");
        for(element of tabInfos){
            element.style.display = "block";
        }
        let tabLoadings = document.getElementsByClassName("loading");
        for(element of tabLoadings){
            element.style.display = "none";
        }
        ;
    });    
}

appelAPI("acheres-78");



const chercher = () => {
    console.log("Je cherche :D");
    appelAPI(textRecherche.value);
}