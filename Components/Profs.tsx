import React, { ReactNode } from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UseParams, UseUrl } from "../App";



export interface ProfsInfo {
    id: number;
    eid: number;
    nom: string;
    prenom: string;
    is_active: boolean
}

export interface ProfsDic {
    [id: string]: ProfsInfo;
}

export interface ClassInfo {
    id: number;
    cid: number;
    name: string;
    level: string;
    is_active: boolean;
    is_examned?: boolean;
}

export interface MatiereProf {
    id: number;
    field: string;
    classe: number;
    prof: number;
}

export interface Profs_par_Class {
    [classe: string]: MatiereProf[];
}


export const ProfsContext = React.createContext<ProfsDic>({})
export const Save_active_profsContext = React.createContext<Function>(() => { })

type SaisieClasseContextType = (page_number: number) => void;
export const SaisiePageContext = React.createContext<SaisieClasseContextType>(() => { })

export const DisplayClassesContext = React.createContext<ClassInfo[][]>([[{ id: 0, cid: 0, name: '', level: '', is_active: false }]])
export const GoClassContext = React.createContext<Function>(() => { })

export const Current_ClassDataContext = React.createContext<{ class_id: number; classes_ofcurrent_level: ClassInfo[]; profs_class: MatiereProf[] }>({ class_id: 0, classes_ofcurrent_level: [], profs_class: [] })

export const All_MatiereContext = React.createContext<Profs_par_Class>({})

interface ProfsHandlerProps {
    children: ReactNode;
}

const ProfsHandler: React.FC<ProfsHandlerProps> = ({ children }: { children: ReactNode }) => {
    const ngrok = UseUrl();

    const params = UseParams();
    const [profs, set_profs] = useState<ProfsDic>({});
    const [classes_arrays, set_classes_arrays] = useState<ClassInfo[][]>([[]]);
    const [profs_par_class, set_profs_par_class] = useState<Profs_par_Class>({})
    const [class_data, set_class_data] = useState<{ class_id: number; classes_ofcurrent_level: ClassInfo[]; profs_class: MatiereProf[] }>({ class_id: 0, classes_ofcurrent_level: [], profs_class: [] })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/presetup/get_working_profs/" + params.sid);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_profs(jsonData)
            } catch (error: unknown) {
                console.log('fama mochkla nyk')
            }
        };
        const fetchData2 = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/presetup/get_all_classes/" + params.sid);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_classes_arrays(jsonData)

            } catch (error: unknown) {
                console.log('fama mochkla nyk')
            }
        };
        const fetchData3 = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/presetup/get_profs_ofClass_array/" + params.sid);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_profs_par_class(jsonData)

            } catch (error: unknown) {
                console.log('fama mochkla nyk')
            }
        };

        fetchData();
        fetchData2();
        fetchData3();
    }, [])


    const handle_Display = (page_number: number) => {
        switch (page_number) {
            case 1:
                navigate("Profs_PreSetup")
                break;
            case 2:
                navigate("/profs")
                break;
            case 3:
                navigate("AllClasses_Profs")
                break;
            case 4:
                navigate("TableClass_Profs")
                break;
            case 5:
                navigate("ChangeProfMatiere")
                break;

        }

    }

    const save_active_profs = (profs: ProfsDic) => {
        set_profs(profs);
    }

    const handle_class_click = ({ Component, level_index = 0, class_id = 0, additional_class = 0, profs_class, AllProfsMatieres }: { Component: string, level_index?: number; class_id: number; additional_class?: number, profs_class: MatiereProf[], AllProfsMatieres?: Profs_par_Class }) => {

        if (Component === "AllClasses_Profs") {
            set_class_data({
                class_id: class_id,
                classes_ofcurrent_level: classes_arrays[level_index],
                profs_class: profs_par_class[String(class_id)],
            });
            handle_Display(4);



        }
        else if (Component === "TableClass_Profs") {
            if (class_id && !additional_class) {
                set_profs_par_class((prev_dic) => ({
                    ...prev_dic,
                    [class_id]: profs_class,
                }));
                const updatedClasses = classes_arrays.map(row =>
                    row.map(classe => (classe.id === class_id ? { ...classe, is_examned: true } : classe))
                );
                set_classes_arrays(updatedClasses)
            }
            else if (class_id && additional_class) {
                set_profs_par_class((prev_dic) => ({
                    ...prev_dic,
                    [class_id]: profs_class,
                    [additional_class]: profs_class,
                }));
                const updatedClasses = classes_arrays.map(row =>
                    row.map(classe => {
                        if (classe.id === class_id || classe.id === additional_class) {
                            return { ...classe, is_examned: true };
                        } else {
                            return { ...classe };
                        }
                    }
                    )
                );
                set_classes_arrays(updatedClasses)
            }

            handle_Display(3);
        }

        else if (Component === "ChangeProfMatiere") {
            // zid w7da bch twalli l option disabled fil choxdesaisie
            AllProfsMatieres && set_profs_par_class(AllProfsMatieres)
            handle_Display(2);
        }
    }
    return (
        <>
            <ProfsContext.Provider value={profs}>
                <Save_active_profsContext.Provider value={save_active_profs}>
                    <SaisiePageContext.Provider value={handle_Display}>
                        <DisplayClassesContext.Provider value={classes_arrays}>
                            <GoClassContext.Provider value={handle_class_click}>
                                <Current_ClassDataContext.Provider value={class_data}>
                                    <All_MatiereContext.Provider value={profs_par_class}>
                                        {children}
                                    </All_MatiereContext.Provider>
                                </Current_ClassDataContext.Provider>
                            </GoClassContext.Provider>
                        </DisplayClassesContext.Provider>
                    </SaisiePageContext.Provider>
                </Save_active_profsContext.Provider>
            </ProfsContext.Provider>

        </>
    )

}

export default ProfsHandler;



