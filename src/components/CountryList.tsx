import { List } from "immutable";
import { Country } from "../types/country";
import CountryListItem from "./CountryListItem";
import { FixedSizeList } from 'react-window';

interface CountryListProps {
    countries: List<Country>;
    onClickItem?: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = (props) => {

    const { countries } = props;

    return (
        <div className="country-list">
            <FixedSizeList
                // react-window list
                className="country-list"
                itemData={countries}
                height={500}
                width={350}
                itemCount={countries.size}
                itemSize={50}
                itemKey={(index, data) => data.get(index)!.cca3}
            >
                {({ data, index, style }) => <div onClick={() => props.onClickItem?.(data.get(index)!)} style={style}>
                    <CountryListItem
                        country={data.get(index)!}
                    />
                </div>}
            </FixedSizeList>
        </div>
    );
}

export default CountryList;