import {config} from "../../Config/config";

export default async function fetchContent(_contentType, page, token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        }
    };

    if (token) {
        requestOptions.headers["Authorization"] = `Bearer ${token}`
    }

    const url = config.django_api + _contentType + `?page=${page}&`
    const response = await fetch(url, requestOptions);
    return await response.json()

}


