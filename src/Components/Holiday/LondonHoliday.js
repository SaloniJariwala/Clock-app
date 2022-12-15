import { Table } from "react-bootstrap";
import { HolidayWrapper } from "../style";
import { London } from "../../Data/Holidays/London"


const LondonHolidays = () => {

    const countDate = (timestamp) => {
        const newTimeStamp = new Date(timestamp).getTime();
        const currentDate = Date.now();
        const dateDiffrence = newTimeStamp - currentDate;
        const daysMilisecond = 24 * 60 * 60 * 1000;
        const dayCount = ((dateDiffrence) / daysMilisecond + 1);
        const day = Math.floor(dayCount)
        const days = `${day > 0 ? (day < 10 ? `0${day}` : `${day}`) : "00"}`;
        return days;
    }
    return (
        <HolidayWrapper>
            <div style={{ border: "1px solid rgb(128 128 128 / 10%)", margin: "5%", borderRadius: "10px", boxShadow: "10px", background: "rgb(128 128 128 / 10%)" }}>
                <div style={{ width: "50%", marginLeft: "31%", marginTop: "6%", fontSize: "25px" }}>Holidays in the United Kingdom</div>
                <div style={{
                    display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", height: "100%", marginLeft:
                        "5%",
                }}>
                    <Table className="mt-4">
                        <tbody>
                            {
                                London.map((item, index) => (
                                    <tr style={{ display: "flex", marginLeft: "15%" }} key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.day}</td>
                                        <td>{item.name}</td>
                                        <td>{countDate(item.date)} Days</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </HolidayWrapper>
    )
}
export default LondonHolidays;