import { useState } from "react";

const HourContainer = ({
    options,
    setTime
}) => {

    const newDate = new Date();

    const [currHour, setCurrHour] = useState(newDate.getHours());

    // const getHour = () => {
    //     setCurrHour(newDate.getHours().toString());
    // }

    const handleChange = (event) => {
        setTime(event.target.value, 'hour');
        setCurrHour(event.target.value);
    }

    // useEffect(() => {
    //     getHour();
    //     const newDate = new Date();
    //     setTime(newDate.getHours().toString(), 'hour');
    // }, []);

    // setInterval(() => {
    //     getHour();
    // }, 3600 * 1000);

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