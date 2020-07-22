import axios from 'axios';

export const findPrice = async (car) => {
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/check_price', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
};

export const checkStolen = car => {
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/check_stolen', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
};

export const sendData = data => {
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/upload', data, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
};

export const getAllLoans = () => {
    return axios.get('https://motozalozna-backend.herokuapp.com/api/loans')
        .then(response => {
            return response;
        }).catch(err => console.warn(err));
};

export const getUsersLoan = async (id) => {
    return axios.get("http://localhost:5000/api/loans/by_user", {
        headers: {"user_id": id}
        })
        .then(response => {
            return response;
        }).catch(err => console.warn(err));
};

export const pay = data => {
    return axios.post('http://localhost:5000/api/loans/pay', data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
};

export const login = data => {
    return axios.post('http://localhost:5000/api/auth/login', data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}

export const logout = () => {
    return axios.delete('http://localhost:5000/api/auth/logout')
        .then(response => {
            return response;
        }).catch(err => console.warn(err));
}