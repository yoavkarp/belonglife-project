import { memo } from "react";
import { Country } from "../types/country";

interface CountryListItemProps {
    country: Country
}

const CountryListItem: React.FC<CountryListItemProps> = (props) => {

    const { country } = props;

    return (
        <div className="country-list-item">
            <img className="country-list-item-flag" src={country.flags.svg} alt={`${country.name.common} flag`} height={16} width={20} />
            <span>{country.name.common}</span>
        </div>
    );
}

export default memo(CountryListItem);