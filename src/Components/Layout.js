import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "antd";
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { TfiWorld } from "react-icons/tfi";
import { NavbarWrapper, SidebarWrapper, SideBox } from "./style";
import { ReactComponent as ClockLogo } from "../Assets/svg/clock-logo.svg";
import { ReactComponent as Clock } from "../Assets/svg/clock.svg";
import { ReactComponent as Alarm } from "../Assets/svg/alarm.svg";
import { ReactComponent as Stopwatch } from "../Assets/svg/stopwatch.svg";
import { ReactComponent as Timer } from "../Assets/svg/timer.svg";
import { ReactComponent as Reminder } from "../Assets/svg/reminder.svg";
import { ReactComponent as Holiday } from "../Assets/svg/holiday.svg";
import Frenchflag from "../Assets/svg/france.png";
import EnglandFlag from "../Assets/svg/england.png";
import ChinaFlag from "../Assets/svg/china.png";
import SpainFlag from "../Assets/svg/spain.png";
import Indiaflag from "../Assets/svg/india.png";
import Japanflag from "../Assets/svg/japan.png";

const Layout = ({ Component }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currentSide, setCurrentSide] = useState("");
    const [format, setFormat] = useState('24');

    const items = [
        {
            label: t("clock"),
            icon: <Clock />,
            key: "1",
        },
        {
            label: t("alarm_clock"),
            icon: <Alarm />,
            key: "2",
        },
        {
            label: t("stopwatch"),
            icon: <Stopwatch />,
            key: "3",
        },
        {
            label: t("timer"),
            icon: <Timer />,
            key: "4",
        },
        {
            label: t("reminder"),
            icon: <Reminder />,
            key: "5"
        },
        {
            label: t("holidays"),
            icon: <Holiday />,
            key: "6",
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
        localStorage.setItem('format', '24');
    }, []);

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
        } else if (name === t("timer")) {
            navigate("/timer");
        } else if (name === t("reminder")) {
            navigate("/reminder");
        } else {
            navigate("/holidays");
        }
    };

    const handleSwitchChange = (value) => {
        if (value) {
            localStorage.setItem('format', '12');
            setFormat('12');
        } else {
            localStorage.setItem('format', '24');
            setFormat('24');
        }
    }

    return (
        <>
            <NavbarWrapper>
                <a href="/" className="logo">
                    <ClockLogo height={80} width={80} />
                    <span>{t('clockify')}</span>
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
            </NavbarWrapper>
            <div style={{ display: "flex", height: "100%" }}>
                <SidebarWrapper>
                    {items.map((item) => (
                        <SideBox
                            key={item.key}
                            className={currentSide === item.label ? "is-active-sides" : ""}
                            onMouseOver={(event) => handleSideMouseOver(event, item.label)}
                            onMouseOut={handleSideMouseOut}
                            onClick={(event) => openTool(event, item.label)}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {item.icon}
                                <span style={{ textAlign: 'center' }}>{item.label}</span>
                            </div>
                        </SideBox>
                    ))}
                </SidebarWrapper>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: '100%'
                    }}
                >
                    {Component === 'AlarmPage' ? (
                        <Component format={format} />
                    ) : (
                        <Component />
                    )}
                </div>
            </div>
        </>
    );
};

export default Layout;
