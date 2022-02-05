import { config } from "../../Config/config";

export default async function apiCall(resource, token, params={}) {
    /*
    resource REQUIRED:   a string containing the name of the resource (e.g. "companies")
                OR a string containing the full url (in which case fullUrl: true should be included in params

    token OPTIONAL:      string containing the auth token of the user

    params OPTIONAL:     JSON containing 0 or more parameters. they can be:
                            page: int, for pagination of the results
                            search: str, for search filtering
                            payload: JSON, for the data to be sent to the api (will be converted to FormData)
                            fullUrl: bool, for treating the resource as a full url

     */

    // create FormData object from payload
    let body = new FormData()
    if ("payload" in params) {
        for (const [key, val] of Object.entries(params.payload)) {
            body.append(key, val)
        }
    }

    // initialize fetchApi request options
    let requestOptions = {
        method: params.method,
        headers: {}
    }

    // add token to request options if it was included
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
            if (!url.includes("?")) {
                url += `?`;
            }

            if ("page" in params){
                 url += `page=${params.page}&`;
            }

            if ("search" in params) {
                url += `search=${params.search}&`;
            }

            if ("queries" in params) {
                url += new URLSearchParams(params.queries) + "&"
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
        console.log(error)
        throw new Error(error)
    }

}

