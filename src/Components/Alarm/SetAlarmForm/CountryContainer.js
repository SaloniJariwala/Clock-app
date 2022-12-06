import React from 'react';

const CountryContainer = ({ options, setCountryName }) => {

    const handleChange = (event) => {
        setCountryName(event.target.value);
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
                {options.map((item, index) => (
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