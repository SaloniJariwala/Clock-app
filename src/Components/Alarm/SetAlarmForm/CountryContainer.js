import React from 'react';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { countryData } from "../../../Data/countryData";

const CountryContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const { t } = useTranslation();

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('country', 'India');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span>{t('country')}</span>
            <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="country"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                    >
                        {/* <option value="default" disabled>--{t('select_country')}--</option> */}
                        {countryData?.map((item, index) => (
                            <option
                                key={index}
                                value={item.countryName}
                            >
                                {item.countryName}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    )
}

export default CountryContainer;