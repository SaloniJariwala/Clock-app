import { useEffect, useState } from "react";

const SecondsContainer = ({ setAlarmDetails }) => {

    const newDate = new Date();

    const [currSec, setCurrSec] = useState(newDate.getSeconds());
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getSeconds = () => {
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
        getSeconds();
    }, []);

    const handleChange = (event) => {
        setAlarmDetails(event.target.value, 'second');
        setCurrSec(event.target.value);
    }

    return (
        <div>
            <span>Second</span>
            <select
                className="form-select"
                id="second"
                aria-label="Floating label select example"
                value={currSec}
                onChange={handleChange}
            >
                {options?.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default SecondsContainer;