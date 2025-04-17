import React, { useState, useEffect } from "react";
import { Timeline } from "primereact/timeline";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import "./Settings.css";
import { Dialog } from 'primereact/dialog';
export default function Settings() {
  
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: 0 }}>
      <div style={{ textAlign: "left", backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 10 }}>
          Settings
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

      <div className = "settings-background">
        <div className="card flex flex-column align-items-center gap-5 ">
            <InputText placeholder="username" style={{width: "100%"}}/>

            <InputText placeholder="password" style={{width: "100%"}}/>

          </div>

          <div className="card flex justify-content-center mt-5">
            <Button label="Change Username" icon="pi pi-user" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="Nuser" className="text-primary-50 font-semibold">
                                New Username
                            </label>
                            <InputText id="Epassword" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="EPassword" className="text-primary-50 font-semibold">
                                Enter Password
                            </label>
                            <InputText id="password" label="Enter Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Confirm" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
          </div>

          <div className="card flex justify-content-center mt-5">
            <Button label="Change Password" icon="pi pi-user" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="NPassword" className="text-primary-50 font-semibold">
                                New Password
                            </label>
                            <InputText id="new password" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="CPassword" className="text-primary-50 font-semibold">
                                Confirm Password
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Confirm" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
      </div>

      
    </div>

    

  );
}
