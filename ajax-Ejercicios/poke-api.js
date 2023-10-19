const d = document;

const $pokemons = d.querySelector(".pokemons"),
  $template = d.querySelector(".pokemon-template").content,
  $fragment = d.createDocumentFragment(),
  $adelante = d.querySelector(".adelante"),
  $atras = d.querySelector(".atras");

let pagination = 0;
let limit = 20;

const pokemons = async () => {
  //************************* SOLUCIÓN MIRANDO LOS VIDEOS ****************************************
  try {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${pagination}`),
      json = await res.json();
    //console.log(res, json);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) {
      //console.log(json.results[i]);
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();
        //console.log(pokemon);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        $template.querySelector("img").src = pokemon.sprites.front_default;
        $template.querySelector("figcaption").innerHTML = pokemon.name;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        $pokemons.innerHTML = `Error ${err.status}: ${message}`;
      }
    }
    $pokemons.appendChild($fragment);
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrió un error";
    $pokemons.innerHTML = `Error ${err.status}: ${message}`;
  }

};
d.addEventListener("DOMContentLoaded", pokemons);
d.addEventListener("click", (e) => {
  if (e.target.matches(".adelante")) {
    if (limit === 11) {
      return;
    } else if (pagination === 120) {
      limit = 11;
      pagination = pagination + 20;
      $pokemons.innerHTML = "";
      pokemons();
    } else {
      pagination = pagination + 20;
      $pokemons.innerHTML = "";
      pokemons();
    }
  }

  if (e.target.matches(".atras")) {
    if (pagination != 0) {
      pagination = pagination - 20;
      limit = 20;
      $pokemons.innerHTML = "";
      pokemons();
    }
  }
});