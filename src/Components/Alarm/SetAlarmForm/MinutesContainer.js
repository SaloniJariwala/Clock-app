import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const MinutesContainer = ({ methods, isEdit }) => {

    const { t } = useTranslation();
    const { control } = methods;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getMinutes = () => {
            let mArr = [];
            for (let j = 0; j <= 59; j++) {
                if (j < 10) {
                    mArr = [...mArr, { display: `0${j.toString()}`, value: j.toString() }];
                } else {
                    mArr = [...mArr, { display: `${j.toString()}`, value: j.toString() }];
                }
            }
            setOptions(mArr);
        };
        getMinutes();
    }, []);

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('minute', '0');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span>{t('minute')}</span>
            <Controller
                control={control}
                name="minute"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="minute"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                    >
                        {options?.map((item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.display}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    );
};

export default MinutesContainer;