const RestService = (baseUrl) => {

    return {
        get: (url, args) => {
            return fetch(baseUrl + url, args).then(res => res.json())
        },
        post: (url, body, args) => {
            return fetch(baseUrl + url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                ...args,
                body: JSON.stringify(body)
            }).then(res => res.json());
        },
        put: (url, body, args) => {
            return fetch(baseUrl + url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                ...args,
                body: JSON.stringify(body)
            }).then(res => res.json());
        },
        delete: (url, args) => {
            return fetch(baseUrl + url, {
                method: "DELETE",
                ...args
            }).then(res => res.json());
        }
    };
}