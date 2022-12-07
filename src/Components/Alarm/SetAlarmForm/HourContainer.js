import { useState } from "react";

const HourContainer = ({
    options,
    setTime
}) => {

    const newDate = new Date();

    const [currHour, setCurrHour] = useState(newDate.getHours());

    const handleChange = (event) => {
        setTime(event.target.value, 'hour');
        setCurrHour(event.target.value);
    }

    return (
        <div>
            <span>Hour</span>
            <select
                className="form-select"
                id="hour"
                aria-label="Floating label select example"
                value={currHour}
                onChange={handleChange}
            >
                {options.map((item, index) => (
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

export default HourContainer;