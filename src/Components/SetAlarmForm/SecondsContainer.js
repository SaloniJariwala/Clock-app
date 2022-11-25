import { useEffect, useState } from "react";

const SecondsContainer = ({
    options,
    setTime
}) => {

    const [currSec, setCurrSec] = useState();

    const getSec = () => {
        const newDate = new Date();
        setCurrSec(newDate.getSeconds().toString());
    }

    useEffect(() => {
        getSec();
        const newDate = new Date();
        setTime(newDate.getSeconds().toString(), 'second');
    }, []);

    // setInterval(() => {
    //     getSec();
    // }, 1000);

    const handleChange = (event) => {
        setTime(event.target.value, 'second')
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
                {options.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default SecondsContainer;