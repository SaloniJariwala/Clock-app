import { Slider } from 'antd';
import React from 'react'

const VolumeContainer = ({ settingVolume, setAlarmDetails }) => {

    const handleChange = (value) => {
        settingVolume(value);
        setAlarmDetails(value, 'volume');
    }

    return (
        <div style={{ width: '100%' }}>
            <span>Volume</span>
            <Slider defaultValue={50} onChange={handleChange} />
        </div>
    )
}

export default VolumeContainer;