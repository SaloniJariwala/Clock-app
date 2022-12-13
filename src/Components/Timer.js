import {t} from "i18next";

const Timer = () => {
    document.title=t('timer');
    return (
        <>
            <h1>{t('timer')}</h1>
        </>
    );
};

export default Timer;