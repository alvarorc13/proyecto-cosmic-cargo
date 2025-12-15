const urlCharacter: string = "https://rickandmortyapi.com/api/character";

export async function getFirst20Characters(): Promise</*Character*/any> {
    try {
        return await fetch(urlCharacter, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}

export async function get20CharactersFromPage(page: number): Promise</*Character*/any> {
    try {
        return await fetch(urlCharacter + "?page=" + page, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}

export async function getCharacterById(id: number): Promise</*Character*/any> {
    try {
        return await fetch(urlCharacter + "/" + id, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}