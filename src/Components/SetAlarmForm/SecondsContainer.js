import { useState } from "react";

const SecondsContainer = ({
    options,
    setTime
}) => {

    const newDate = new Date();

    const [currSec, setCurrSec] = useState(newDate.getSeconds());

    // const getSec = () => {
    //     setCurrSec(newDate.getSeconds().toString());
    // }

    // useEffect(() => {
    //     getSec();
    //     const newDate = new Date();
    //     setTime(newDate.getSeconds().toString(), 'second');
    // }, []);

    // setInterval(() => {
    //     getSec();
    // }, 1000);

    const handleChange = (event) => {
        setTime(event.target.value, 'second');
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
                {options.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default SecondsContainer;