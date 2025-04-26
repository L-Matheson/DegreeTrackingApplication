// filepath: /c:/Users/kingo/OneDrive/Desktop/DegreeTrackingAPI/frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
export default function CalendarPage() {
  const [date, setDate] = useState(null);

  return (
    <div style={{ padding: 0 }}>
      <div style={{ textAlign: "left", backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 10 }}>
          Calendar
            <div className="flex" style={{ right: 0, position: "absolute"}}>
              <div className="p-inputgroup flex-1 gap-3" style={{ paddingTop: 1 }}>
              
    

            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText placeholder="Search..." style={{width: 300, height: 25}}/>
            </IconField>
            
           
              </div>
              <div className="flex px-4" style={{ gap: 12 }}>
                <Button
                  icon="pi pi-bell"
                  rounded
                  text
                  style={{ height: 27, width: 27 }}
                />
                <Button
                  icon="pi pi-cog"
                  rounded
                  text
                  style={{ height: 27, width: 27 }}
                />
                <Button
                  icon="pi pi-calendar"
                  rounded
                  text
                  style={{ height: 27, width: 27 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="solid" style={{ padding: 0, marginTop: 0 }} />
   


      <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>



    </div>
  
  );
}
