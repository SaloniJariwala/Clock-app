export const getTimezoneDiff = (timezone) => {
    const current = new Date();
    const difference = current - timezone;
    return difference;
}

