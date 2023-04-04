import axios from "axios";

async function searchApi(searchTerm: string) {
    return axios.get(`https://itunes.apple.com/search?term=${searchTerm}`+`&limit=300`);
}

export default searchApi;