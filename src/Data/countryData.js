import { getTimezoneDiff } from "../Utils/getTimezoneDiff";

const newyorkTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));

const tokyoTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

const canadaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }));

const australiaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Canberra' }));

const londonTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/London' }));

export const countryData = [
    {
        countryName: 'USA',
        timezone: "America/New_York",
        timezoneDiff: getTimezoneDiff(newyorkTime),
        GMT: 'GMT-5'
    },
    {
        countryName: 'Japan',
        timezone: "Asia/Tokyo",
        timezoneDiff: getTimezoneDiff(tokyoTime),
        GMT: 'GMT+9'
    },
    {
        countryName: 'Canada',
        timezone: "America/Toronto",
        timezoneDiff: getTimezoneDiff(canadaTime),
        GMT: 'GMT-5'
    },
    {
        countryName: 'Australia',
        timezone: "Australia/Canberra",
        timezoneDiff: getTimezoneDiff(australiaTime),
        GMT: 'GMT+11'
    },
    {
        countryName: 'London',
        timezone: "Europe/London",
        timezoneDiff: getTimezoneDiff(londonTime),
        GMT: 'GMT'
    }
];