import React from 'react';
import { countryData } from "../../../Data/countryData";

const CountryContainer = ({ setAlarmDetails }) => {

    const handleChange = (event) => {
        setAlarmDetails(event.target.value, 'country');
    }

    return (
        <div>
            <span>Country</span>
            <select
                className="form-select"
                id="country"
                aria-label="Floating label select example"
                defaultValue="default"
                // value={country}
                onChange={handleChange}
            >
                <option value="default" disabled>--Select Country--</option>
                {countryData?.map((item, index) => (
                    <option
                        key={index}
                        value={item.countryName}
                    >
                        {item.countryName}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountryContainer;