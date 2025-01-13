import { act, fireEvent, render, screen } from "@testing-library/react";
import { List } from "immutable";
import HomePage from "./home.page";
import useFetchCountries from "../hooks/useFetchCountries";
import { Country } from "../types/country";
import useCountriesIdb from "../hooks/useCountriesIdb";

const countriesMock: Country[] = [
    {
        name: {
            common: "Israel3",
            official: "Israel3"
        },
        cca3: "IS3",
        flags: {
            png: "https://restcountries.com/data/isr.png",
            svg: "https://restcountries.com/data/isr.svg"
        }
    },
    {
        name: {
            common: "Israel1",
            official: "Israel1"
        },
        cca3: "IS1",
        flags: {
            png: "https://restcountries.com/data/isr.png",
            svg: "https://restcountries.com/data/isr.svg"
        }
    },
    {
        name: {
            common: "Israel2",
            official: "Israel2"
        },
        cca3: "IS2",
        flags: {
            png: "https://restcountries.com/data/isr.png",
            svg: "https://restcountries.com/data/isr.svg"
        }
    }
]
jest.useFakeTimers();


jest.mock("../hooks/useFetchCountries", () => jest.fn());
jest.mock("../hooks/useCountriesIdb", () => jest.fn());

const mockedUseFetchCountries = useFetchCountries as jest.Mock;
const mockedUseCountriesIdb = useCountriesIdb as jest.Mock;

const mockCountries = List(countriesMock);

beforeEach(() => {
    mockedUseFetchCountries.mockReturnValue({
        isLoading: false,
        error: null,
        countries: mockCountries,
    });

    mockedUseCountriesIdb.mockReturnValue({
        isLoading: false,
        error: null,
        countries: [],
        getCountry: jest.fn(),
        saveCountry: jest.fn()
    })
})

describe("HomePage", () => {

    it("showing search input", () => {
        render(<HomePage />);
        expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("showing countries list", async () => {
        render(<HomePage />);

        await act(async () => { return null; });

        const input = screen.getByTestId("search-input");

        fireEvent.change(input, { target: { value: "Israel1" } });

        expect(screen.getByText("Israel1")).toBeInTheDocument();
    });

    it("filter countries by search input", async () => {

        render(<HomePage />);

        const input = screen.getByTestId("search-input");

        fireEvent.change(input, { target: { value: "Israel1" } });

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(screen.getByText("Israel1")).toBeInTheDocument();
        expect(screen.queryByText("Israel2")).not.toBeInTheDocument();
        expect(screen.queryByText("Israel3")).not.toBeInTheDocument();

    });

});
