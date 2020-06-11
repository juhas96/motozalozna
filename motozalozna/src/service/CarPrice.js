import axios from 'axios';

// TODO Parsing HTML and return price
export const findPrice = car => {
    return axios.post('http://localhost:5000/check_price', car)
        .then(response => {
            console.log(response);
            return response;
        }).catch(err => console.warn(err));
}