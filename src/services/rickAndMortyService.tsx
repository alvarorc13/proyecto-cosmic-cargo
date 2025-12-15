import type { Location } from "react-router-dom";
import type { Character } from "../types/character";

const urlCharacter: string = "https://rickandmortyapi.com/api/character";
const urlLocation: string = "https://rickandmortyapi.com/api/location";

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

export async function get20CharactersFromPage(page: number): Promise<Character> {
    try {
        return await fetch(urlCharacter + "?page=" + page, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}

export async function getCharacterById(id: number): Promise<Character> {
    try {
        return await fetch(urlCharacter + "/" + id, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}

export async function getFirst6Locations(): Promise<Location> {
    try {
        return await fetch(urlLocation, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}

export async function get6LocationsFromPage(page: number): Promise<Location> {
    try {
        return await fetch(urlLocation + "?page=" + page, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}

export async function getLocationById(id: number): Promise<Location> {
    try {
        return await fetch(urlLocation + "/" + id, { method: "GET" })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
        return new Promise(() => {});
    }
}