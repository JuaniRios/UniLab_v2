import {config} from "../../Config/config";

export default async function postContent(_contentType, token, payload) {
    let body = new FormData
    for (const [key, val] of Object.entries(payload)) {
        body.append(key, val)
    }

    const requestOptions = {
        method: 'POST',
        body: body,
        headers: {}
    };

    if (token) {
        requestOptions.headers["Authorization"] = `Bearer ${token}`
    }

    const url = config.django_api + _contentType
    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            console.log("response not ok. error is " + response.status)

            return await response.json()
        } else {
            return await response.json()
        }
    } catch (e) {
        console.log(e)
    }
}