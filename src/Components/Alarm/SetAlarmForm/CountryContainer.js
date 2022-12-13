import React from 'react';
import { useTranslation } from 'react-i18next';
import { countryData } from "../../../Data/countryData";

const CountryContainer = ({ setAlarmDetails }) => {

    const handleChange = (event) => {
        setAlarmDetails(event.target.value, 'country');
    }

    const {t}=useTranslation();

    return (
        <div>
            <span>{t('country')}</span>
            <select
                className="form-select"
                id="country"
                aria-label="Floating label select example"
                defaultValue="default"
                // value={country}
                onChange={handleChange}
            >
                <option value="default" disabled>--{t('select_country')}--</option>
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