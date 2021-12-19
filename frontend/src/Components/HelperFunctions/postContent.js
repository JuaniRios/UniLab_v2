import {config} from "../../Config/config";

export default async function postContent(_contentType, token, payload) {
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
            if (typeof object[key] !== 'object') formData.append(key, object[key])
            else formData.append(key, JSON.stringify(object[key]))
        })
        return formData;
    }

    let body = new FormData
    body.append("image", payload["image"])
    body.append("content", payload["content"])
    console.log("image is" + payload["image"])

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