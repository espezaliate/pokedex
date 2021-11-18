async function init() {

const searchButton = document.querySelector('[title="Search for pokemon"]');
const resultArea = document.querySelector('[class="result"]');
const formNode = document.querySelector('form');
const statsArea = document.querySelector('[class=stats]')
const heightField = document.getElementById('height')
const weightField = document.getElementById('weight')
const categoryField = document.getElementById('category')
const abilitiesField = document.getElementById('abilities')
const pokemonName = resultArea.children[0]


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


async function fetchPokemon(input)  {
    const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const parsedData = await rawData.json();
    return parsedData
}

formNode.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allStats = document.querySelectorAll('h4')

    allStats.forEach((e) => {
        e.innerText = ''
        console.log(e)
    })


    await fetchPokemon(e.target.querySelector('[type=search]').value)
    .then((event) => {
        
        pokemonName.innerHTML = capitalizeFirstLetter(event.name)
        heightField.innerHTML = event.height
        weightField.innerHTML = event.weight/10 + ' Kg'

        const types = event.types
        const abilities = event.abilities
        let finalTypes = []
        let finalAbilities = []

        abilities.forEach((e) => {
            finalAbilities.push(e.ability.name)
        })

        types.forEach((e) => {
            finalTypes.push(e.type.name);
        })
        
        finalAbilities.forEach((e) => {
            const newField = document.createElement('h4')
            statsArea.children[5].insertAdjacentElement('beforeend', newField)
            newField.innerText = ' ' + capitalizeFirstLetter(e)
        })

        finalTypes.forEach((e) => {
            const newField = document.createElement('h4')
            statsArea.insertAdjacentElement('beforeend', newField)
            newField.innerText = ' ' + capitalizeFirstLetter(e)
        })
        
    })
})


}

window.onload = init;