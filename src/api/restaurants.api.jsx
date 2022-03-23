import axios from 'axios';

const url = 'http://localhost:5000/api/restaurants'
export const getData = async (page = 1, limit = 10) => {

    return await axios.get(`${url}?page=${page}&limit=${limit}`)
}

export const getSearchData = async (borough='Brooklyn', cuisine='Chinese') => {
    return await axios.get(`${url}/search?borough=${borough}&cuisine=${cuisine}`)
}