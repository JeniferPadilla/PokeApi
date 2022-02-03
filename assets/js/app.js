const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=00";

const getAPI = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      fillData(json.results), pagination(json.next,json.previous);
    })
    .catch((error) => {
      console.log("error in the API", error);
    });
};

const fillData = (data) => {

  let i = document.getElementById("charac");
i.innerHTML = "";

  data.forEach((p) => {
    let url = p.url;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        i.innerHTML += `
      <div class="col carta">
      <div class="card bg-light cardHover card border-danger mb-3 card text-white bg-dark mb-3">
      <div class="card-body ">
      <img src="${json.sprites.other.dream_world.front_default}" class="card-img-top imagen text-dark bg-warning mb-3" alt="...">
      <h4 class="card-title text-white bg-danger mb-3">Nombre: ${p.name}</h4>
      <h5 class="card-title">Altura: ${json.height}</h5>
      <h5 class="card-title">Peso: ${json.weight}</h5>
      </div>
      </div>
      </div>
  `;
      })
      .catch((error) => {
        console.log("error in the API", error);
      });
  });
};

const pagination = (next , previous) => {
  let html = "";
  
  html += `<li class="page-item ${
    previous == null ? "disabled" : (previousDisabled = "")
  }">
  <a class="btn btn-dark btn-lg" onclick="getAPI('${previous}')">PREVIOUS</a></li> `;

  html += `<li class="page-item  ${
    next == null ? "disabled" : (nextDisabled = "")} " >
  <a class="btn btn-light btn-lg" onclick="getAPI('${next}')">NEXT</a></li>`;

  document.getElementById("pagination").innerHTML = html;
};


getAPI(API); // cuando se ejecuta se le pone la variable de la url, cuando esta se ejecute se devuelve a la funcion para que funcione
