import { useEffect } from "react";
import { useState } from "react";

const MinutesContainer = ({ setAlarmDetails }) => {

    const newDate = new Date();

    const [currMin, setCurrMin] = useState(newDate.getMinutes());
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getMinutes = () => {
            let mArr = [];
            for (let j = 0; j <= 59; j++) {
                if (j < 10) {
                    mArr = [...mArr, `0${j.toString()}`];
                } else {
                    mArr = [...mArr, j.toString()];
                }
            }
            setOptions(mArr);
        };
        getMinutes();
    }, []);

    const handleChange = (event) => {
        setAlarmDetails(event.target.value, 'minute');
        setCurrMin(event.target.value);
    }

    return (
        <div>
            <span>Minutes</span>
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
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MinutesContainer;