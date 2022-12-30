import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ZoneContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const { t } = useTranslation();

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('ampm', 'selected');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span>{t('ampm')}</span>
            <Controller
                control={control}
                name="ampm"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="ampm"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                    >
                        <option key={'selected'} value={'selected'}>--Select--</option>
                        <option key={'am'} value={'AM'}>AM</option>
                        <option key={'pm'} value={'PM'}>PM</option>
                    </select>
                )}
            />
        </div>
    );
};

export default ZoneContainer;