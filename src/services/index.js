import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMovies(){
    try{
        const response  = await axios({
            url:`${baseUrl}/films`,
            method: 'GET'
        })
        return response;
    }catch(e){
        console.log(e);
    }
}

export async function getPlanets(){
    try{
        const response  = await axios({
            url:`${baseUrl}/planets`,
            method: 'GET'
        })
        return response;
    }catch(e){
        console.log(e);
    }
}