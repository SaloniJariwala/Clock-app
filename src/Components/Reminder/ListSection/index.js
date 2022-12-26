import React from 'react';
import { Collapse, Empty } from 'antd';
import { CaretRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ReactComponent as ReminderIcon } from "../../../Assets/svg/reminderList.svg";
import { t } from 'i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const { Panel } = Collapse;

const ListSection = ({
    activePanel,
    allReminder,
    handleDeleteReminder
}) => {

    const [activeKey, setActiveKey] = useState();

    useEffect(() => {
        setActiveKey(activePanel);
    }, [activePanel]);

    const handlePanelChange = (key) => {
        setActiveKey(key);
    }

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
                    <ReminderIcon />{' '}{t('reminder')} :
                </>
            </div>
            <Collapse
                bordered={true}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                onChange={handlePanelChange}
                activeKey={activeKey}
            >
                <Panel header="Work" key={'1'} className="site-collapse-custom-panel">
                    <ul>
                        {allReminder?.workReminders?.length > 0 ?
                            allReminder?.workReminders?.map((item) => (
                                <li key={item.reminderId} style={{ marginBottom: '1em', marginRight: 50 }}>
                                    <h5 style={{ marginBottom: 'unset' }}>{item.title}</h5>
                                    <span>{item.note}</span>
                                    <div style={{ display: 'flex', marginTop: '0.5em' }}>
                                        <Button
                                            variant='outline-warning'
                                            size='sm'
                                            style={{
                                                marginRight: 10,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() => handleDeleteReminder(item.reminderId)}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </li>
                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    </ul>
                </Panel>
                <Panel header="Personal" key={'2'} className="site-collapse-custom-panel">
                    <ul>
                        {allReminder?.personalReminders?.length > 0 ?
                            allReminder?.personalReminders?.map((item) => (
                                <li key={item.reminderId} style={{ marginBottom: '1em', marginRight: 50 }}>
                                    <h5 style={{ marginBottom: 'unset' }}>{item.title}</h5>
                                    <span>{item.note}</span>
                                    <div style={{ display: 'flex', marginTop: '0.5em' }}>
                                        <Button
                                            variant='outline-warning'
                                            size='sm'
                                            style={{
                                                marginRight: 10,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() => handleDeleteReminder(item.reminderId)}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </li>
                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    </ul>
                </Panel>
                <Panel header="Birthday" key={'3'} className="site-collapse-custom-panel">
                    <ul>
                        {allReminder?.birthdayReminders?.length > 0 ?
                            allReminder?.birthdayReminders?.map((item) => (
                                <li key={item.reminderId} style={{ marginBottom: '1em', marginRight: 50 }}>
                                    <h5 style={{ marginBottom: 'unset' }}>{item.title}</h5>
                                    <span>{item.note}</span>
                                    <div style={{ display: 'flex', marginTop: '0.5em' }}>
                                        <Button
                                            variant='outline-warning'
                                            size='sm'
                                            style={{
                                                marginRight: 10,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() => handleDeleteReminder(item.reminderId)}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </li>
                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    </ul>
                </Panel>
                <Panel header="Festival" key={'4'} className="site-collapse-custom-panel">
                    <ul>
                        {allReminder?.festivalReminders?.length > 0 ?
                            allReminder?.festivalReminders?.map((item) => (
                                <li key={item.reminderId} style={{ marginBottom: '1em', marginRight: 50 }}>
                                    <h5 style={{ marginBottom: 'unset' }}>{item.title}</h5>
                                    <span>{item.note}</span>
                                    <div style={{ display: 'flex', marginTop: '0.5em' }}>
                                        <Button
                                            variant='outline-warning'
                                            size='sm'
                                            style={{
                                                marginRight: 10,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() => handleDeleteReminder(item.reminderId)}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </li>
                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    </ul>
                </Panel>
                <Panel header="Other" key={'5'} className="site-collapse-custom-panel">
                    <ul>
                        {allReminder?.otherReminders?.length > 0 ?
                            allReminder?.otherReminders?.map((item) => (
                                <li key={item.reminderId} style={{ marginBottom: '1em', marginRight: 50 }}>
                                    <h5 style={{ marginBottom: 'unset' }}>{item.title}</h5>
                                    <span>{item.note}</span>
                                    <div style={{ display: 'flex', marginTop: '0.5em' }}>
                                        <Button
                                            variant='outline-warning'
                                            size='sm'
                                            style={{
                                                marginRight: 10,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() => handleDeleteReminder(item.reminderId)}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </li>
                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    </ul>
                </Panel>
            </Collapse>
        </>
    )
}

export default ListSection;