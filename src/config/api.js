
export async function apiWrapper(query) {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${query}`);
        return response.json();
    }catch(error){
        throw new Error(`Error : ${error}`)
    }
}
