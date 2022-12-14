import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { countryData } from "../../../Data/countryData";
import timezoneData from "../../../Data/timezones.json";

const CountryContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const { t } = useTranslation();

    useEffect(() => {
        if (!isEdit) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const country = timezoneData[timezone];
            countryData.forEach((item) => {
                if (item.countryName === country) {
                    methods.setValue('country', JSON.stringify(item));
                }
            })
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
                        <option value="default">--{t('select_country')}--</option>
                        {countryData?.map((item, index) => (
                            <option
                                key={index}
                                value={JSON.stringify(item)}
                            >
                                {`${item.countryName} (GMT${item.timezoneOffset})`}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    )
}

export default CountryContainer;