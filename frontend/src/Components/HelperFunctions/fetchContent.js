import {config} from "../../Config/config";

export default async function fetchContent(_contentType, page, token){

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        };

        const url = config.django_api + _contentType + `?page=${page}`

        const response = await fetch(url, requestOptions);
        return await response.json()
    }