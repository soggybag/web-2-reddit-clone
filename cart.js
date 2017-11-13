


var characters = [];

function addCharacter(name, race, class) {
  characters.push({
    name,
    race,
    class
  });

  localStorage.setItem("characters-key", JSON.stringify(characters));
}


function fetchCharacters() {
  let c = localStorage.getItem("characters-key");
  if (c === null) {
    characters = []
  }
  characters = JSON.parse(c);
}




var shoppingCart = (function(){

  return obj;
})();
