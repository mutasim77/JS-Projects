class RickMortyService {
    _apiBase = `https://rickandmortyapi.com/api/`

    getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    }

    //! get all characters using above api and below maping result
    getAllCharacters = async (page) => {
        const res = await this.getResources(`${this._apiBase}character?page=${page}`);
        return res.results.map(this._transformCharacter);
    }

    //! get Info about character using above api and below maping result
    getCharacterInfo = async (id) => {
        const res = await this.getResources(`${this._apiBase}character/${id}`);
        return res;
    }

    _transformCharacter = (results) => {
        return {
            name: results.name,
            status: results.status,
            gender: results.gender,
            image: results.image,
            id: results.id
        }
    }
}

export default RickMortyService;

