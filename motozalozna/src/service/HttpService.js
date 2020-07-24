import axios from 'axios';
import { dataService } from './AppStateService';

export const findPrice = async (car) => {
    dataService.send('loading');
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/check_price', car)
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
};

export const checkStolen = car => {
    dataService.send('loading');
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/check_stolen', car)
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
};

export const sendData = data => {
    dataService.send('loading');
    return axios.post('https://motozalozna-backend.herokuapp.com/api/form/upload', data, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
};

export const updateLoanPrice = (data, loanId) => {
    dataService.send('loading');
    return axios.put('https://motozalozna-backend.herokuapp.com/api/loans/update_price',
        data,
        {
            headers:
                {
                    'Content-Type': 'application/json',
                }
        }
    ).then(response => {
        dataService.send('normal');
        return response;
    }).catch(err => {
        console.warn(err);
        dataService.send('normal');
        return err;
    })
}

export const getAllLoans = () => {
    dataService.send('loading');
    return axios.get('https://motozalozna-backend.herokuapp.com/api/loans')
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
};

export const getUsersLoan = async (id) => {
    dataService.send('loading');
    return axios.get("https://motozalozna-backend.herokuapp.com/api/loans/by_user", {
        headers: {"user_id": id}
        })
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
};

export const pay = data => {
    dataService.send('loading');
    return axios.post('https://motozalozna-backend.herokuapp.com/api/loans/pay', data)
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
};

export const login = data => {
    dataService.send('loading');
    return axios.post('https://motozalozna-backend.herokuapp.com/api/auth/login', data)
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
                dataService.send('normal');
                console.warn(err);
                return err;
            }
        );
}

export const logout = () => {
    dataService.send('loading');
    return axios.delete('https://motozalozna-backend.herokuapp.com/api/auth/logout')
        .then(response => {
            dataService.send('normal');
            return response;
        }).catch(err => {
            console.warn(err);
            dataService.send('normal');
            return err;
        });
}