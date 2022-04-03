import axios from 'axios';

const url = 'http://localhost:5000/api/restaurants'

export const getLength = async () => {
    return await axios.get(url)
}

export const getOneData = async (restaurant_id) => {
    return await axios.get(`${url}/restaurant?_id=${restaurant_id}`)
}

export const getData = async (page = 1, limit = 10) => {

    return await axios.get(`${url}?page=${page}&limit=${limit}`)
}

export const getSearchData = async (borough='', cuisine='') => {
    return await axios.get(`${url}/search?borough=${borough}&cuisine=${cuisine}`)
}