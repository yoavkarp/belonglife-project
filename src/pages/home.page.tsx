import { useCallback, useMemo, useState } from "react";
import CountryList from "../components/CountryList";
import DebounceInput from "../components/DebounceInput";
import useFetchCountries from "../hooks/useFetchCountries";
import { Country } from "../types/country";
import useCountriesIdb from "../hooks/useCountriesIdb";
import { List } from "immutable";

const HomePage = () => {

    const countriesApi = useFetchCountries();
    const [filteredText, setFilteredText] = useState<string>("");
    const countriesIdb = useCountriesIdb();
    const sortedCountries = useMemo<List<Country>>(() => {
        const sorted = countriesApi.countries?.sort((a, b) => (countriesIdb.getCountry(b.cca3)?.lastClickedTimestamp || 0) - (countriesIdb.getCountry(a.cca3)?.lastClickedTimestamp || 0)) || List();
        return sorted;
    }, [countriesApi, countriesIdb])

    const filterCountries = useCallback((bytext: string) => {
        const byTextFormatted = bytext.trim().toLowerCase();
        return sortedCountries.filter(country => country.name.common.toLowerCase().includes(byTextFormatted) || country.name.official.toLowerCase().includes(byTextFormatted));
    }, [sortedCountries]);

    const filteredCountries = useMemo(() => filterCountries(filteredText), [filteredText, filterCountries]);

    const handleCountryClick = useCallback(async (country: Country) => {
        countriesIdb.saveCountry({
            ...country,
            lastClickedTimestamp: Date.now()
        })
        window.open(country.flags.svg, "_blank", "noopener,noreferrer");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loading = countriesIdb.isLoading || countriesApi.isLoading;

    if (loading) {
        return <div>Loading...</div>
    }

    if (countriesApi.error) {
        return <div>Error while fetching countries from API: {countriesApi.error.message}</div>
    }

    if (countriesIdb.error) {
        return <div>Error while fetching countries from indexDB: {countriesIdb.error.message}</div>
    }

    return (
        <div className="page-container">
            <DebounceInput onTimeout={setFilteredText} inputProps={{ className: "search" }} />
            <CountryList countries={filteredCountries} onClickItem={handleCountryClick} />
        </div>
    );
}

export default HomePage;