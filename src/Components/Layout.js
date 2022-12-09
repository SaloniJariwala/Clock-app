import { NavbarWrapper, SidebarWrapper, SideBox } from "./style";
import { ReactComponent as ClockLogo } from "../Assets/svg/clock-logo.svg";
import React, { useState } from "react";
import { ReactComponent as Clock } from "../Assets/svg/clock.svg";
import { ReactComponent as Alarm } from "../Assets/svg/alarm.svg";
import { ReactComponent as Stopwatch } from "../Assets/svg/stopwatch.svg";
import { ReactComponent as Timer } from "../Assets/svg/timer.svg";
import { useNavigate } from "react-router-dom";

const items = [
    {
        label: "Clock",
        icon: <Clock />,
        img: "/images/clock.png",
        key: '1',
    },
    {
        label: "Alarm Clock",
        icon: <Alarm />,
        img: "/images/alarm.png",
        key: '2',
    },
    {
        label: "Stopwatch",
        icon: <Stopwatch />,
        img: "/images/stopwatch.png",
        key: '3',
    },
    {
        label: "Timer",
        icon: <Timer />,
        img: "/images/timer.png",
        key: '4',
    }
];

const Layout = ({ Component }) => {

    const navigate = useNavigate();
    const [currentSide, setCurrentSide] = useState('');

    const handleSideMouseOver = (event, name) => {
        setCurrentSide(name);
    };

    const handleSideMouseOut = () => {
        setCurrentSide(null);
    };

    const openTool = (event, name) => {
        if (name === 'Clock') {
            navigate('/');
        } else if (name === 'Alarm Clock') {
            navigate('/alarm');
        } else if (name === 'Stopwatch') {
            navigate('/stopwatch');
        } else {
            navigate('/timer');
        }
    };

    return (
        <>
            <NavbarWrapper>
                <a href="/" className="logo">
                    <ClockLogo height={80} width={80} />
                    <span>Clockify</span>
                </a>
                {/* <div className="menu">
                    <a href="" className="menu-links">Holidays</a>
                    <div className="tools-menu">
                        <a href="" className="menu-links" onClick={handleToolsClick}>
                            Tools {toolsClicked ? <BsChevronUp /> : <BsChevronDown />}
                        </a>
                        {toolsClicked && (
                            <div className="dropdown">
                                {items.map((item) => (
                                    <Link
                                        key={item.key}
                                        className={currentTool === item.label ? 'is-active' : ''}
                                        onMouseOver={(event) => handleToolsMouseOver(event, item.label)}
                                        onMouseOut={handleToolsMouseOut}
                                        onClick={(event) => openTool(event, item.label)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <a href="" className="menu-links"><VscColorMode /></a>
                    <a href="" className="menu-links"><FiSettings /></a>
                </div> */}
            </NavbarWrapper>
            <div style={{ display: "flex", height: '91.5vh' }}>
                <SidebarWrapper>
                    {items.map((item) => (
                        <SideBox
                            key={item.key}
                            className={currentSide === item.label ? "is-active-sides" : ''}
                            onMouseOver={(event) => handleSideMouseOver(event, item.label)}
                            onMouseOut={handleSideMouseOut}
                            onClick={(event) => openTool(event, item.label)}
                        >
                            {/*<img src={item.img} alt={'logo'} />*/}
                            {item.icon}
                            <span>{item.label}</span>
                        </SideBox>
                    ))}
                </SidebarWrapper>
                <div style={{ width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Component />
                </div>
            </div>
        </>
    );
};

export default Layout;