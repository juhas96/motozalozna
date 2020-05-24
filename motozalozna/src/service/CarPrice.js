import axios from 'axios';

// TODO Parsing HTML and return price
export const findPrice = car => {
    return axios.post('http://www.institutfinancnejpolitiky.sk/kalkulacky/aut/getprice.php', car)
        .then(response => {
            return response;
        }).catch(err => console.warn(err));
}