function fetchClient(url, body, method = 'POST') {
    return fetch(url, {
        method,
        body
    })
        .then(response => response.json())
        .catch(error => console.error(error))
};


export default fetchClient;
