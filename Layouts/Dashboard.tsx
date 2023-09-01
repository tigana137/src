import NavBar from "../Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import PreSetup from "../Components/PreSetup";
import ClassesHandler from "../Components/Classes";
import ProfsHandler from "../Components/Profs";
import AllClasses_Eleves from "../Components/Eleves/AllClasses_Eleves";
import TableClass_Eleves from "../Components/Eleves/TableClass_Eleves";
import MixLevel from "../Components/Eleves/MixLevel";
import AllClasses_Profs from "../Components/Profs/AllClasses_Profs";
import TableClass_Profs from "../Components/Profs/TableClass_Profs";
import Choix_DeSaisie from "../Components/Profs/Choix_DeSaisie";
import ChangeProfMatiere from "../Components/Profs/ChangeProfMatiere";
import ElevesArrivee from "../Components/Stat/ElevesArrivee";
import { UseParams } from "../App";





const Dashboard = () => {
    const [Nav_Enabled, set_Nav] = useState(false)
    const params = UseParams();

    const handle_nav = () => {
        set_Nav(true)
    }



    return (
        <>

            <div className="relative md:ml-64 bg-blueGray-100">
                <PreSetup set_Nav={handle_nav} />

                <Router>

                    <NavBar school_name={params.school_name} Nav_Enabled={Nav_Enabled} Links={['/', '/class', '/profs', '/Stat/']} />
                    {Nav_Enabled &&
                        <Routes>
                            <Route path="/" element={<div className="relative md:ml-64 bg-blueGray-100"><div className="flex h-screen items-center justify-center text-5xl">الصفحة الرئيسية</div></div>} />
                            <Route path="/class//*" element={
                                <ClassesHandler>
                                    <Routes>
                                        <Route index element={<AllClasses_Eleves />} />
                                        <Route path="Singleclass" element={<TableClass_Eleves />} />
                                        <Route path="MixLevel" element={<MixLevel />} />

                                        <Route path="*" element={<div className="relative md:ml-64 bg-blueGray-100"> hedhi Component t3 class specificly</div>} />
                                    </Routes>
                                </ClassesHandler>}
                            />

                            <Route path="/profs//*" element={
                                <ProfsHandler>
                                    <Routes>
                                        <Route index element={<Choix_DeSaisie />} />
                                        {// <Route path="Choix_DeSaisie" element={<Choix_DeSaisie />} />
                                        }
                                        <Route path="AllClasses_Profs" element={<AllClasses_Profs />} />
                                        <Route path="TableClass_Profs" element={<TableClass_Profs />} />
                                        <Route path="ChangeProfMatiere" element={<ChangeProfMatiere />} />
                                    </Routes>
                                </ProfsHandler>}
                            />

                            <Route path="/Stat//*" element={
                                <ProfsHandler>
                                    <Routes>
                                        <Route index element={<ElevesArrivee />} />
                                    </Routes>
                                </ProfsHandler>}
                            />

                            <Route path="/none" element={<></>} />
                            <Route path="*" element={<div className="relative md:ml-64 bg-blueGray-100"> hedhi Component t3 *</div>} />
                        </Routes>
                    }
                </Router>
            </div>


        </>
    )


}

export default Dashboard;



