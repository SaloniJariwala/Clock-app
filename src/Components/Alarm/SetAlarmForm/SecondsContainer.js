import { useEffect, useState } from "react";
import { t } from "i18next";
import { Controller } from "react-hook-form";

const SecondsContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getSeconds = () => {
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
        getSeconds();
    }, []);

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('second', '0');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span>{t('seconds')}</span>
            <Controller
                control={control}
                name="second"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="second"
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

export default SecondsContainer;