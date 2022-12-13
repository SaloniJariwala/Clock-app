import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MinutesContainer = ({ setAlarmDetails }) => {

    const newDate = new Date();
    const [currMin, setCurrMin] = useState(newDate.getMinutes());
    const [options, setOptions] = useState([]);
    const {t}=useTranslation();

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
            debugger
        };
        getMinutes();
    }, []);

    const handleChange = (event) => {
        setAlarmDetails(event.target.value, 'minute');
        setCurrMin(event.target.value);
    }

    return (
        <div>
            <span>{t('minute')}</span>
            <select
                className="form-select"
                id="minute"
                aria-label="Floating label select example"
                value={currMin}
                onChange={handleChange}
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
        </div>
    );
};

export default MinutesContainer;