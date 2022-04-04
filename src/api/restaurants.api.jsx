import axios from 'axios';


const url_main = process.env.REACT_APP_API_URL;

const url = `${url_main}/api/restaurants`
export const getLength = async () => {
    return await axios.get(url)
}

export const getOneData = async (restaurant_id) => {
    return await axios.get(`${url}/restaurant?_id=${restaurant_id}`)
}

export const getData = async (page = 1, limit = 25) => {

    return await axios.get(`${url}?page=${page}&limit=${limit}`)
}

export const getSearchData = async (borough='', cuisine='') => {
    return await axios.get(`${url}/search?borough=${borough}&cuisine=${cuisine}`)
}