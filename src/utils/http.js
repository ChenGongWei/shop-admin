import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.baseurl = '';
/*
    封装一个 get 方法
*/

function get(url, params = {}) {
    let token = sessionStorage.getItem('token') || '';
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'get',
            baseURL: axios.defaults.baseurl,
            params,
            headers: {
                'Authorization': token
            },
        }).then(res => {
            resolve(res.data);
        }).catch(rej => {
            reject(rej);
        });
    });
}

/*
    封装一个 post 方法
*/

function post(url, data = {}) {
    let token = sessionStorage.getItem('token') || '';
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            baseURL: axios.defaults.baseurl,
            data,
            headers: {
                'Authorization': token
            },
        }).then(res => {
            resolve(res.data);
        }).catch(rej => {
            reject(rej);
        });
    });
}

export {
    get,
    post
}