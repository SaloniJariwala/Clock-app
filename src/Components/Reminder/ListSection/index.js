import React from 'react';
import { Collapse } from 'antd';
import { categoriesData } from '../../../Data/categoriesData';
import { CaretRightOutlined } from '@ant-design/icons';
import { ReactComponent as ReminderList } from "../../../Assets/svg/reminderList.svg";
import { t } from 'i18next';

const { Panel } = Collapse;

const ListSection = () => {
    return (
        <>
            <div
                style={{
                    margin: '20px 0',
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif'
                }}
            >
                <>
                    <ReminderList />{' '}{t('reminder')} :
                </>
            </div>
            <Collapse
                bordered={true}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {categoriesData?.map((item) => (
                    <Panel header={item.name} key={item.id} className="site-collapse-custom-panel">
                        <p>gdhhbdgh</p>
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}

export default ListSection;