import { List } from "immutable";
import { useEffect, useState } from "react";
import { Country } from "../types/country";
import { IDBPDatabase, openDB } from "idb";


const DB_NAME = "CountriesDB";
const STORE_NAME = "countries";
let instance: IDBPDatabase | null = null;

const getIdb = async () => {
    if (instance) return instance;
    instance = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "cca3" });
            }
        },
    });

    return instance;
}

// hook to control countries from indexDB
export default function useCountriesIdb() {
    const [countries, setCountries] = useState<List<Country> | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {

        // on mount get all countries from indexDB store and save it to state
        async function onMount() {
            try {
                instance = await getIdb();
                const response = await instance.getAll(STORE_NAME);
                setCountries(List(response));
            }
            catch (e) {
                setError(e as Error);
            }
        }

        onMount();
    }, [])

    // set country to indexDB store and update state
    const saveCountry = async (country: Country) => {
        await instance?.put(STORE_NAME, country);
        setCountries(prev => prev?.filter((c) => c.cca3 !== country.cca3).unshift(country) || List([country]))
    }

    // get country by cca3 string value
    const getCountry = (cca3: string): Country | null => {
        const country = countries?.find(country => country.cca3 === cca3);
        return country || null;
    }

    return { isLoading: !countries && !error, error, countries, getCountry, saveCountry }
}