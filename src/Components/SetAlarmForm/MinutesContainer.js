import { useEffect, useState } from "react";

const MinutesContainer = ({
    options,
    setTime
}) => {

    const [currMin, setCurrMin] = useState();

    const getMin = () => {
        const newDate = new Date();
        setCurrMin(newDate.getMinutes().toString());
    }

    useEffect(() => {
        getMin();
        const newDate = new Date();
        setTime(newDate.getMinutes().toString(), 'minute');
    }, []);

    // setInterval(() => {
    //     getMin();
    // }, 60 * 1000);

    const handleChange = (event) => {
        setTime(event.target.value, 'minute');
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

export default MinutesContainer;