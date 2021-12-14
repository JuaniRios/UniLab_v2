import {config} from "../../Config/config";

export default async function deleteContent(_contentType, token, payload) {
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
          if (typeof object[key] !== 'object') formData.append(key, object[key])
          else formData.append(key, JSON.stringify(object[key]))
        })
        return formData;
    }

    const requestOptions = {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            // 'Accept': 'application/json',

        },
        body: getFormData(payload)
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