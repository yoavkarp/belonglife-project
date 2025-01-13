import { render, screen } from "@testing-library/react";
import CountryList from "./CountryList";
import { List } from "immutable";
import { Country } from "../types/country";

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

describe("CountryList", () => {
    it("showing items from list", () => {
        render(<CountryList countries={List(countriesMock)} />);
        expect(screen.getByText("Israel1")).toBeInTheDocument();
        expect(screen.getByText("Israel2")).toBeInTheDocument();
        expect(screen.getByText("Israel3")).toBeInTheDocument();
    });

    it("clicking on item", () => {
        const mockOnClick = jest.fn();
        render(<CountryList countries={List(countriesMock)} onClickItem={mockOnClick} />);
        screen.getByText("Israel1").click();
        expect(mockOnClick).toBeCalled();
    })
});
