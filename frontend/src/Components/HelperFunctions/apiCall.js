import { config } from "../../Config/config";

export default async function apiCall(resource, token, params) {
    let body = new FormData
    if ("payload" in params) {
        for (const [key, val] of Object.entries(params.payload)) {
            body.append(key, val)
        }
    }



    let requestOptions = {
        method: params.method,
        headers: {}
    }
    if (token) requestOptions.headers["Authorization"] = `Bearer ${token}`;

    // you can either enter the resource name e.g. "posts" or the actual full url
    let url;
    if ("fullUrl" in params && params.fullUrl){
        url = resource
    } else {
        url = config.django_api + resource;
    }

    switch (params.method) {
        case 'GET':
            if ("page" in params){
                if (url.includes("?")) {
                    url += `page=${params.page}&`;
                } else {
                    url += `?page=${params.page}&`;
                }
            }
            break

        case 'POST':
            requestOptions["body"] = body
            break

        case 'DELETE':
            break

        case 'PATCH':
            requestOptions["body"] = body
            break

        case "PUT":
            requestOptions["body"] = body
            break
    }

    try {
        const response = await fetch(url, requestOptions);
        if ([200,201].includes(response.status)) {
            return await response.json()
        } else {
            throw JSON.stringify(await response.json())
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }

}

