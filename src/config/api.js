
export async function apiWrapper(query, option) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${query}`, option);
        return response.json();
    } catch (error) {
        throw new Error(`Error : ${error}`)
    }
}

export async function store(query, { body }) {
    try {
        let response = await apiWrapper(query, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        return response;
    } catch (error) {
        throw new Error(`Error : ${error}`)
    }
}

export async function show(query) {
    try {
        let response = await apiWrapper(query);
        return response;
    } catch (error) {
        throw new Error(`Error : ${error}`)
    }
}


export async function remove(query) {
    try {
        let response = await apiWrapper(query, {
            method: "DELETE"
        });
        return response;
    } catch (error) {
        throw new Error(`Error : ${error}`)
    }
}
export async function edit(query, { body }) {
    try {
        let response = await apiWrapper(query, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        return response;
    } catch (error) {
        throw new Error(`Error : ${error}`)
    }
}

