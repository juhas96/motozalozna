import axios from 'axios';

export const findPrice = async (car) => {
    return await axios.post('http://localhost:5000/check_price', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}

export const checkStolen = car => {
    return axios.post('http://localhost:5000/check_stolen', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}

export const sendData = data => {
    return axios.post('http://localhost:5000/upload', data, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}