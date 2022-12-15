import {
    useState,
    createContext,
    useContext
} from "react";

const FormatContext = createContext();

const FormatProvider = ({ children }) => {

    const [format, setFormat] = useState(24);

    return (
        <FormatContext.Provider
            value={{
                format,
                setFormat
            }}
        >
            {children}
        </FormatContext.Provider>
    )
};

export const FormatState = () => {
    return useContext(FormatContext);
}

export default FormatProvider;