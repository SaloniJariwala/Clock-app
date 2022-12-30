import React from 'react';
import { HolidayWrapper } from '../style';
import AustraliaHoliday from './AustraliaHoliday';
import IndiaHoliday from './IndiaHoliday';
import LondonHolidays from './LondonHoliday';
import UsaHolidays from './UsaHolidays';

function Holiday() {
  return (
   <HolidayWrapper>
          <div className='d-flex w-100'>
            <div className='w-50 d-flex justify-content-center align-item-center vh-50'>
            <IndiaHoliday/>
            </div>
            <div className='w-50 d-flex justify-content-center align-item-center'>
              <UsaHolidays/>
            </div>
          </div>
          <div className='d-flex w-100 mt-5'>
            <div className='w-50 d-flex justify-content-center align-item-center' style={{marginTop:"51%"}}>
              <LondonHolidays/>
            </div>
            <div className='w-50 d-flex justify-content-center align-item-center'>
              <AustraliaHoliday/>
            </div>
          </div>
         
   </HolidayWrapper>
  )
}

export default Holiday