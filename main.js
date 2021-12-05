async function init() {
  const resultArea = document.querySelector('[class="result"]');
  const formNode = document.querySelector("form");
  const statsArea = document.querySelector("[class=stats]");
  const heightField = document.getElementById("height");
  const weightField = document.getElementById("weight");
  const pokemonName = resultArea.children[0];
  const pokemonSprite = document.querySelector("img");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function fetchPokemon(input) {
    const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const parsedData = await rawData.json();
    return parsedData;
  }

  formNode.addEventListener("submit", async (e) => {
    e.preventDefault();

    let allStats = document.querySelectorAll("h4");

    allStats.forEach((e) => {
      e.innerText = "";
    });

    await fetchPokemon(e.target.querySelector("[type=search]").value).then(
      (event) => {
        pokemonSprite.src =
          event.sprites.other["official-artwork"].front_default;

        pokemonName.innerHTML = capitalizeFirstLetter(event.name);
        heightField.innerHTML =
          event.height * 10 >= 100
            ? event.height / 10 + " m"
            : event.height * 10 + " cm";
        weightField.innerHTML = event.weight / 10 + " kg";

        const types = event.types;
        const abilities = event.abilities;
        let finalTypes = [];
        let finalAbilities = [];

        abilities.forEach((e) => {
          finalAbilities.push(e.ability.name);
        });

        types.forEach((e) => {
          finalTypes.push(e.type.name);
        });

        finalAbilities.forEach((e) => {
          const newField = document.createElement("h4");
          statsArea.children[5].insertAdjacentElement("beforeend", newField);
          newField.innerText = " " + capitalizeFirstLetter(e);
        });

        finalTypes.forEach((e) => {
          const newField = document.createElement("h4");
          statsArea.insertAdjacentElement("beforeend", newField);
          newField.innerText = " " + capitalizeFirstLetter(e);
        });

        resultArea.className = "result";
        resultArea.classList.add(finalTypes[0]);
      }
    );
  });
}

window.onload = init;
