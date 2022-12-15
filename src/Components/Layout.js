import { NavbarWrapper, SidebarWrapper, SideBox } from "./style";
import { ReactComponent as ClockLogo } from "../Assets/svg/clock-logo.svg";
import React, { useState, useEffect } from "react";
import { ReactComponent as Clock } from "../Assets/svg/clock.svg";
import { ReactComponent as Alarm } from "../Assets/svg/alarm.svg";
import { ReactComponent as Stopwatch } from "../Assets/svg/stopwatch.svg";
import { ReactComponent as Timer } from "../Assets/svg/timer.svg";
import Indiaflag from "../Assets/svg/india.png";
import Japanflag from "../Assets/svg/japan.png";
import Frenchflag from "../Assets/svg/france.png";
import EnglandFlag from "../Assets/svg/england.png";
import ChinaFlag from "../Assets/svg/china.png";
import SpainFlag from "../Assets/svg/spain.png";
import { Link, useNavigate } from "react-router-dom";
import { TfiWorld } from "react-icons/tfi";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Switch } from "antd";


const Layout = ({ Component }) => {
    const navigate = useNavigate();
    const [currentSide, setCurrentSide] = useState("");
    const { t } = useTranslation();

    const items = [
        {
            label: t("clock"),
            icon: <Clock />,
            img: "/images/clock.png",
            key: "1",
        },
        {
            label: t("alarm_clock"),
            icon: <Alarm />,
            img: "/images/alarm.png",
            key: "2",
        },
        {
            label: t("stopwatch"),
            icon: <Stopwatch />,
            img: "/images/stopwatch.png",
            key: "3",
        },
        {
            label: t("timer"),
            icon: <Timer />,
            img: "/images/timer.png",
            key: "4",
        },
    ];

    const languages = [
        {
            code: 'hi',
            name: 'Hindi',
            country_code: 'in',
            icon: <img src={Indiaflag} alt="notfound" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
        },
        {
            code: 'jp',
            name: 'Japan',
            country_code: 'jp',
            icon: <img src={Japanflag} alt="notfound" style={{ width: "20px", height: "20px", marginRight: "10px" }} />,
        },
        {
            code: 'en',
            name: 'English',
            country_code: 'gb',
            icon: <img src={EnglandFlag} alt="notfound" style={{ width: "20px", height: "20px", marginRight: "10px" }} />,
        },
        {
            code: 'fr',
            name: 'French',
            country_code: 'fr',
            icon: <img src={Frenchflag} alt="notfound" style={{ width: "20px", height: "20px", marginRight: "10px" }} />,
        },
        {
            code: 'cn',
            name: 'Chinese',
            country_code: 'cn',
            icon: <img src={ChinaFlag} alt="notfound" style={{ width: "20px", height: "20px", marginRight: "10px" }} />,
        },
        {
            code: 'sp',
            name: 'Spanish',
            country_code: 'sp',
            icon: <img src={SpainFlag} alt="notfound" style={{ width: "20px", height: "20px", marginRight: "10px" }} />,
        },
    ]

    const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);




    useEffect(() => {
        document.body.dir = currentLanguage.dir || "ltr";
        // document.title = t("app_title");
    }, [currentLanguage, t]);

    const handleSideMouseOver = (event, name) => {
        setCurrentSide(name);
    };

    const handleSideMouseOut = () => {
        setCurrentSide(null);
    };

    const openTool = (event, name) => {
        if (name === t("clock")) {
            navigate("/");
        } else if (name === t("alarm_clock")) {
            navigate("/alarm");
        } else if (name === t("stopwatch")) {
            navigate("/stopwatch");
        } else {
            navigate("/timer");
        }
    };

    const handleSwitchChange = () => {

    }

    return (
        <>
            <NavbarWrapper>
                <a href="/" className="logo">
                    <ClockLogo height={80} width={80} />
                    <span>Clockify</span>
                </a>
                <div className="d-flex justify-content-end align-items-center language-select-root">
                    <div style={{ marginRight: 20 }}>
                        <Switch
                            size="default"
                            checkedChildren="12Hrs"
                            unCheckedChildren="24Hrs"
                            onChange={handleSwitchChange}
                        />
                    </div>
                    <div className="language-select">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <TfiWorld />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <span className="dropdown-item-text">{t('language')}</span>
                            </li>
                            {
                                languages?.map((item) => (
                                    <li key={item.country_code}>
                                        <Link
                                            href="#"
                                            className={classNames('dropdown-item', {
                                                disabled: currentLanguageCode === item.code,
                                            })}
                                            onClick={() => {
                                                i18next.changeLanguage(item.code)
                                            }}

                                        >
                                            <span
                                                className={`${item.country_code} mx-2`}
                                                style={{
                                                    opacity: currentLanguageCode === item.code ? 0.5 : 1,
                                                    margin: "5px"
                                                }}
                                            ></span>
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
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
            <div style={{ display: "flex", height: "91.5vh" }}>
                <SidebarWrapper>
                    {items.map((item) => (
                        <SideBox
                            key={item.key}
                            className={currentSide === item.label ? "is-active-sides" : ""}
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
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Component />
                </div>
            </div>
        </>
    );
};

export default Layout;
