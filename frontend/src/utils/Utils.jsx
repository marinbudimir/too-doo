import axios from 'axios';

export async function ApiGet (path) {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(process.env.REACT_APP_API_URL + path, {
        headers: ({
            Authorization: 'Bearer ' + token
        })
    });

    return data;
}

export async function ApiPost (path, data) {
    const token = localStorage.getItem('token');
    await axios.post(process.env.REACT_APP_API_URL + path, data, {
        headers: ({
            Authorization: 'Bearer ' + token
        })
    });
}

export async function ApiPut (path, data) {
    const token = localStorage.getItem('token');
    await axios.put(process.env.REACT_APP_API_URL + path, data, {
        headers: ({
            Authorization: 'Bearer ' + token
        })
    });
}

export async function ApiDelete (path) {
    const token = localStorage.getItem('token');
    await axios.delete(process.env.REACT_APP_API_URL + path, {
        headers: ({
            Authorization: 'Bearer ' + token
        })
    });
}
