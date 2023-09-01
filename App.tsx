import { useContext, useState } from 'react';
import InsertSid from './Layouts/InsertSid'
import './index.css'
import Logins from './Layouts/Logins';
import Dashboard from './Layouts/Dashboard';
import React from 'react';

export interface ParamsProp {
  sid: number,
  school_name: string,
  saisieprenom: string,
  saisienom: string,
  saisiepasswd: string,
  login: string,
  mp: string,
  ecole_url: string,

}

const ParamsContext = React.createContext<ParamsProp>({ sid: 0, school_name: "", saisieprenom: "", saisienom: "", login: "", saisiepasswd: "", mp: '', ecole_url: "" })
const UrlContext = React.createContext<string>('http://localhost:80/')

export const UseParams = () => {
  return useContext(ParamsContext)
}

export const UseUrl = () => {
  return useContext(UrlContext)
}


function App() {
  const [params, set_params] = useState<ParamsProp>({ sid: 842920, school_name: "", saisieprenom: "", saisienom: "", saisiepasswd: "", login: "", mp: '', ecole_url: "" });
  const [InsertSid_isVisible, set_InsertSid] = useState(false);
  const [Logins_isVisible, set_Logins] = useState(false);
  const [Dashborad_isVisible, set_Dashborad] = useState(true);

  const handle_sid = (sid: number, school_name: string, saisieprenom: string, saisienom: string, ecole_url: string) => {
    set_params(prevParams => ({
      ...prevParams,
      sid: sid,
      school_name: school_name,
      saisieprenom: saisieprenom,
      saisienom: saisienom,
      ecole_url: ecole_url + '/',
    }));
    set_InsertSid(false)
    set_Logins(true)
  }
  const handle_logins = (new_params: ParamsProp) => {
    set_params(new_params)
    set_Logins(false)
    set_Dashborad(true)

  }



  return (
    <>
      <ParamsContext.Provider value={params}>
        {InsertSid_isVisible && <InsertSid Onsubmit={handle_sid} />}
        {Logins_isVisible && <Logins Onsubmit={handle_logins} />}
        {Dashborad_isVisible && <Dashboard />}
      </ParamsContext.Provider>
    </>
  )

}



export default App
