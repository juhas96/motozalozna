import axios from 'axios';

export const findPrice = async (car) => {
    return await axios.post('https://motozalozna-backend.herokuapp.com/api/form/check_price', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}

export const checkStolen = car => {
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/check_stolen', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}

export const sendData = data => {
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/upload', data, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}

export const getAllLoans = () => {
    return axios.get('https://motozalozna-backend.herokuapp.com/api/loans')
        .then(response => {
            return response;
        }).catch(err => console.warn(err))
}

export const getUsersLoan = async (id) => {
    return await axios.get("https://motozalozna-backend.herokuapp.com/api/loans/by_user", {
        headers: {"user_id": id}
        })
        .then(response => {
            return response;
        }).catch(err => console.warn(err))
}

export const pay = data => {
    return axios.post('https://motozalozna-backend.herokuapp.com/api/pay', data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err))
}