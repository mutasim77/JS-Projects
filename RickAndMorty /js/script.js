import RickMortyService from "./rickMortyService.js";

const api = new RickMortyService();
console.log(api.getAllCharacters().then(item => console.log(item)));

