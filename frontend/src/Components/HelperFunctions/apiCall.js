import { config } from "../../Config/config";

export default async function apiCall(_contentType, token, params) {
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
          if (typeof object[key] !== 'object') formData.append(key, object[key])
          else formData.append(key, JSON.stringify(object[key]))
        })
        return formData;
    }

    let requestOptions = {
        method: params.method,
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        }
    }
    if (token) requestOptions.headers["Authorization"] = `Bearer ${token}`;

    let url = config.django_api + _contentType;

    switch (params.method) {
        case 'GET':
            url += `?page=${params.page}&`
            break

        case 'POST':
            // requestOptions.headers = {}
            requestOptions["body"] = JSON.stringify(params.payload)
            break

        case 'DELETE':
            break

        case 'PATCH':
            break
    }

    try {
        const response = await fetch(url, requestOptions);
        return await response.json()
    } catch (error) {
        throw new Error(error)
    }

}

