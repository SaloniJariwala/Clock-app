import { Slider } from 'antd';
import React from 'react'

const VolumeContainer = ({ settingVolume }) => {

    const handleChange = (value) => {
        settingVolume(value);
    }

    return (
        <div style={{ width: '100%' }}>
            <span>Volume</span>
            <Slider defaultValue={50} onChange={handleChange} />
        </div>
    )
}

export default VolumeContainer;