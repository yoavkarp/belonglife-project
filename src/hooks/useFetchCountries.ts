import { List } from "immutable";
import { useMemo } from "react";
import { Country } from "../types/country";
import useFetch from "./useFetch";

export default function useFetchCountries() {

    const { isLoading, error, data } = useFetch<Country[]>('https://restcountries.com/v3.1/all');
    const countries = useMemo<List<Country>>(() => data ? List(data) : List(), [data])

    return {
        isLoading,
        error,
        countries
    }
}