import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UseParams } from "../App";

export interface EleveInfo {
    id: number;
    eid: number;
    uid: number;
    nom: string;
    prenom: string;
    sexe: string;
    moyen: number | null;
    classe: string;
    is_graduated: boolean | null;
    resultat: string;
    next_class: number | null;
    date_naissance: Date | null;

}

export interface Eleves_par_Class {
    [classe_id: string]: EleveInfo[];
}

export interface ClassInfo {
    id: number;
    cid: number;
    name: string;
    level: string;
    is_active: boolean;
    is_examned?: boolean;
}

export const ClassesContext = React.createContext<ClassInfo[][]>([[{ id: 0, cid: 0, name: '', level: '', is_active: false }]])
export const All_ElevesContext = React.createContext<Eleves_par_Class | null>(null)
export const Display_AllClassesContext = React.createContext<boolean>(true)
export const GoClassContext = React.createContext<Function>(() => { })
export const Set_ClassesContext = React.createContext<Function | null>(null)
export const ElevesSaisie_Context = React.createContext<EleveInfo[]>([{ uid: 0, eid: 0, id: 0, nom: "", prenom: "", sexe: "", moyen: 0, classe: "", is_graduated: null, resultat: "", next_class: 0, date_naissance: null }])
export const Current_ClassContext = React.createContext<ClassInfo>({ id: 0, cid: 0, name: '', level: '', is_active: false })
export const FinalSaveContext = React.createContext<Function>(() => { })

interface ClassesHandlerProps {
    children: ReactNode;
}



const ClassesHandler: React.FC<ClassesHandlerProps> = ({ children }: { children: ReactNode }) => {
    const params = UseParams();
    const [classes, set_classes] = useState<ClassInfo[][]>([[]]);
    const [eleves, set_eleves] = useState<Eleves_par_Class>({});
    const [eleves_class, set_eleves_saisie] = useState<EleveInfo[]>([]);
    const [current_class_info, set_class_saisie] = useState<ClassInfo>({ id: 0, cid: 0, name: '', level: '', is_active: false });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/login_handler/presetup/get_all_classes/" + params.sid);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_classes(jsonData)

            } catch (error: unknown) {
            }
        };
        const fetchData2 = async () => {
            try {
                const response = await fetch("http://localhost:8000/login_handler/presetup/get_eleves_ofClass_array/" + params.sid);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_eleves(jsonData);
            } catch (error: unknown) {
            }
        };
        fetchData();
        fetchData2();

    }, [])



    const handle_redirect = ({ Component, level_index = 0, classe_index = 0, classe_id, modifyed_eleves }: { Component: string, level_index?: number; classe_index?: number, classe_id?: number; modifyed_eleves?: EleveInfo[] }) => {
        if (Component === 'AllClasses') {
            if (classe_index !== -1) {
                const current_class = classes[level_index][classe_index];
                set_eleves_saisie(eleves[current_class.id]);
                set_class_saisie(current_class);
                navigate('/class/Singleclass')
            }
            else {
                let elves_level: EleveInfo[] = [];
                classes[level_index].map((each_class) => {
                    const classe_id = each_class.id
                    eleves[classe_id].map((each_eleve) => {
                        each_eleve.is_graduated === true && elves_level.push(each_eleve)
                    })
                })
                set_eleves_saisie(elves_level);
                set_class_saisie(classes[level_index][0])
                navigate('/class/MixLevel')


            }
        }
        else if (Component === "TableClass") {
            if (classe_id) {
                set_eleves(prevState => {
                    return {
                        ...prevState,
                        [classe_id]: modifyed_eleves
                    };
                });
                const updatedClasses = classes.map(row =>
                    row.map(classe => (classe.id === classe_id ? { ...classe, is_examned: true } : classe))
                );
                set_classes(updatedClasses)
            }
            navigate('/class')
        }
        else if (Component === "MixLevel") {
            if (level_index !== 0) {
                modifyed_eleves?.map((each_eleve) => {
                    const eleve_class = each_eleve.classe
                    const class_ofeleve = eleves[eleve_class]
                    const indexOfeleve = class_ofeleve.findIndex((eleve_) => eleve_.id == each_eleve.id);
                    class_ofeleve.splice(indexOfeleve, 1, each_eleve);
                })
                let update_eleves: Eleves_par_Class = eleves;

                const updated_classes = classes[level_index].map((each_class) => {

                    const class_ofeleve = update_eleves[each_class.id]
                    let bool = true;
                    class_ofeleve.map((each_eleve) => {
                        if (each_eleve.is_graduated == null) {
                            bool = false
                        }
                    })
                    if (bool) {
                        const update_eleves_section = class_ofeleve.map((each_eleve) => {
                            each_eleve.is_graduated === false ? each_eleve.next_class = Number(each_eleve.classe) : null
                            return each_eleve
                        })

                        set_eleves({
                            ...eleves,
                            [each_class.id]: update_eleves_section,
                        })

                        return { ...each_class, is_examned: true }

                    }
                    else {
                        return each_class
                    }


                })

                const updatedClasses = [...classes]; // Clone the original array
                updatedClasses[level_index] = updated_classes; // Update the element at the specified index

                set_classes(updatedClasses);
            }


            navigate('/class')
        }

    }

    const FinalSave = () => {
        const SendData = async (AllEleves: EleveInfo[]) => {
            try {

                const response = await fetch("http://localhost:8000/login_handler/FinalSave/" + params.sid, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(AllEleves)
                });

                if (!response.ok) {
                    // Handle non-successful responses if needed
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();
                if (data) {
                    const message = "وقع التسجيل بنجاح";
                    alert(message);
                }
                else{
                    const message = "وقع خطأ عند تحميل البيانات الرجاء الابلاغ عليه";
                    alert(message);
                }


            } catch (error) {
                const message = "وقع خطأ عند تحميل البيانات الرجاء الابلاغ عليه";
                    alert(message);
            }
        };

        let AllEleves: EleveInfo[] = []
        Object.keys(eleves).map((classe_id) => {
            AllEleves = AllEleves.concat(eleves[classe_id])
        })
        // console.log(JSON.stringify(AllEleves))
        SendData(AllEleves)
        console.log('tb3th')
    }

    return (
        <>
            <ClassesContext.Provider value={classes}>
                <All_ElevesContext.Provider value={eleves}>
                    <GoClassContext.Provider value={handle_redirect}>
                        <Current_ClassContext.Provider value={current_class_info}>
                            <ElevesSaisie_Context.Provider value={eleves_class}>
                                <FinalSaveContext.Provider value={FinalSave}>
                                    {children}
                                </FinalSaveContext.Provider>
                            </ElevesSaisie_Context.Provider>
                        </Current_ClassContext.Provider>
                    </GoClassContext.Provider>
                </All_ElevesContext.Provider>

            </ClassesContext.Provider>
        </>
    )



}

export default ClassesHandler;



