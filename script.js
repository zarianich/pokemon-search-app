const pokemonListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonNameText = document.getElementById("pokemon-name");
const pokemonIDText = document.getElementById("pokemon-id");
const pokemonWeightText = document.getElementById("weight");
const pokemonHeightText = document.getElementById("height");
const pokemonPictureContainer = document.getElementById("picture");
const pokemonTypesContainer = document.getElementById("types");
const pokemonHPText = document.getElementById("hp");
const pokemonAttackText = document.getElementById("attack");
const pokemonDefenseText = document.getElementById("defense");
const pokemonSpecialAttackText = document.getElementById("special-attack");
const pokemonSpecialDefenseText = document.getElementById("special-defense");
const pokemonSpeedText = document.getElementById("speed");
const result = document.getElementById("result");

const fetchPokemon = async (input) => {
  try {
    const res = await fetch(pokemonListUrl + `/${input}`);
    const data = await res.json();
    loadPokemon(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

const loadPokemon = ({
  "name": name,
  "id": id,
  "weight": weight,
  "height": height,
  "sprites": {"front_default": picture},
  "types": types,
  "stats": [
      {"base_stat": hp},
      {"base_stat": attack},
      {"base_stat": defense},
      {"base_stat": specialAttack},
      {"base_stat": specialDefense},
      {"base_stat": speed},
    ],
}) => {
  result.classList.remove("hidden");
  pokemonNameText.innerText = name.toUpperCase();
  pokemonIDText.innerText = `#${id}`;
  pokemonWeightText.innerText = `Weight: ${weight}`;
  pokemonHeightText.innerText = `Height: ${height}`;
  pokemonPictureContainer.innerHTML = `<img src="${picture}" alt="${name}" id="sprite">`;
  pokemonTypesContainer.innerHTML = loadTypes(types);
  pokemonHPText.innerText = hp;
  pokemonAttackText.innerText = attack;
  pokemonDefenseText.innerText = defense;
  pokemonSpecialAttackText.innerText = specialAttack;
  pokemonSpecialDefenseText.innerText = specialDefense;
  pokemonSpeedText.innerText = speed;
}

const loadTypes = (types) => {
  let result = ``;
  types.forEach(type => {
    result += `<span class="type">${type["type"]["name"].toUpperCase()}</span>`;
  });
  return result;
};

searchBtn.addEventListener("click", () => fetchPokemon(cleanUpInput(searchInput.value)));

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

const cleanUpInput = input => {
  return input.toLowerCase().replace(/\s/g, "-").replace(/♀/g, "-f").replace(/♂/g, "-m");
};