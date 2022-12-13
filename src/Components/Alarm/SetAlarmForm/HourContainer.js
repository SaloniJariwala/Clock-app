import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const HourContainer = ({
    setAlarmDetails
}) => {

    const newDate = new Date();
    const {t}=useTranslation();
    const [currHour, setCurrHour] = useState(newDate.getHours());
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getHours = () => {
            let arr = [];
            for (let i = 0; i <= 23; i++) {
                if (i < 10) {
                    arr = [...arr, { display: `0${i.toString()}`, value: i.toString() }];
                } else {
                    arr = [...arr, { display: `${i.toString()}`, value: i.toString() }];
                }
            }
            setOptions(arr);
        };
        getHours();
    }, []);

    const handleChange = (event) => {
        setAlarmDetails(event.target.value, 'hour');
        setCurrHour(event.target.value);
    }

    return (
        <div>
            <span>{t('hour')}</span>
            <select
                className="form-select"
                id="hour"
                aria-label="Floating label select example"
                value={currHour}
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

export default HourContainer;