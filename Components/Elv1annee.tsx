import { ReactNode, useEffect, useState } from "react";
import { UseParams, UseUrl } from "../App";
import React from "react";
import { useNavigate } from "react-router-dom";



export interface Eleve1anneeInfo {
    id: number;
    uid: number;
    nom: string;
    prenom: string;
    date_naissance: Date | null;
    next_class: number | null;
    chosen: boolean | null | undefined;
}

export interface Classes1anneeInfo {
    [id: number]: string;


}

interface Elv1anneeProps {
    children: ReactNode;
}


export const All_ElevesContext = React.createContext<Eleve1anneeInfo[]>([])
export const ClassesContext = React.createContext<Classes1anneeInfo>({})
export const RedirectContext = React.createContext<Function>(() => { })


export const FinalSaveContext = React.createContext<Function>(() => { })


const Elv1annee: React.FC<Elv1anneeProps> = ({ children }: { children: ReactNode }) => {

    const ngrok = UseUrl();
    const params = UseParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);



    const [eleves, set_eleves] = useState<Eleve1anneeInfo[]>([]);
    const [classes, set_classes] = useState<Classes1anneeInfo>({ 0: '' });



    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/get_new_elv1/" + String(params.sid) + "?format=json");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_eleves(jsonData)
            } catch (error: unknown) {
            }
        };

        const fetchData2 = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/get_1annee_classes/" + params.sid + '?format=json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                // console.log(jsonData)
                set_classes(jsonData);

            } catch (error: unknown) {
            }
        };

        const orginizer = async () => {
            await fetchData2();
            await fetchData();
            setIsLoading(false)
            // console.log('cllases:')
            // console.log(classes)
            //  console.log(isLoading)
        }

        orginizer()


    }, [])


    const handle_redirect = (Component: string, choix = 0,) => {

        if (Component === "PageAcceuil") {

            navigate('/Elv1annee/Choix_DeSaisie')

        }
        else if (Component === "Choix_DeSaisie") {
            if (choix === 1) {
                navigate('/Elv1annee/Saisie_Auto')
            }
            else if (choix === 2) {
                navigate('/Elv1annee/Saisie_Manuel')
            }
            else if (choix === -1) {
                navigate('/Elv1annee')
            }
        }
        else if (Component === "Saisie_Auto") {
            if (choix === 1) {
                navigate('/Elv1annee')
            }

            if (choix === -1) {
                navigate('/Elv1annee/Choix_DeSaisie')
            }
        }

    }


    const FinalSave = async (choice: number, Elv1classes?: Eleve1anneeInfo[]) => {

        if (choice === 1) {
            const SaveData = async (AllEleves: Eleve1anneeInfo[]) => {
                try {

                    const response = await fetch(ngrok + "/login_handler/SaveElvs1Data/" + params.sid, {
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
                    else {
                        const message = "وقع خطأ عند تحميل البيانات الرجاء الابلاغ عليه";
                        alert(message);
                    }


                } catch (error) {
                    const message = "وقع خطأ عند تحميل البيانات الرجاء الابلاغ عليه";
                    alert(message);
                }
            };

            Elv1classes && await SaveData(Elv1classes);
            const fetchData = async () => {
                try {
                    const response = await fetch(ngrok + "/login_handler/get_new_elv1/" + String(params.sid) + "?format=json");
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const jsonData = await response.json();
                    set_eleves(jsonData)
                } catch (error: unknown) {
                }
            };

            await fetchData();
            handle_redirect("Saisie_Auto", 1)
        }


        if (choice === -1) {
            const ResetData = async () => {
                try {

                    const response = await fetch(ngrok + "/login_handler/Reset_new_elv1_Data/" + params.sid);
                    if (!response.ok) {
                        // Handle non-successful responses if needed
                        throw new Error('Network response was not ok.');
                    }

                    const data = await response.json();
                    if (data) {

                        const Alleleves = eleves.map((each_elv) => {
                            return { ...each_elv, next_class: null };
                        })

                        set_eleves(Alleleves)
                        const message = "وقع التسجيل بنجاح";
                        alert(message);
                    }
                    else {
                        const message = "وقع خطأ عند تحميل البيانات الرجاء الابلاغ عليه";
                        alert(message);
                    }


                } catch (error) {
                    const message = "وقع خطأ عند تحميل البيانات الرجاء الابلاغ عليه";
                    alert(message);
                }
            };

            await ResetData();
        }



    }


    if (isLoading) {
        return <Loading />
    }

    return (
        <>

            <ClassesContext.Provider value={classes}>
                <All_ElevesContext.Provider value={eleves}>
                    <RedirectContext.Provider value={handle_redirect}>
                        <FinalSaveContext.Provider value={FinalSave}>
                            {children}
                        </FinalSaveContext.Provider>
                    </RedirectContext.Provider>

                </All_ElevesContext.Provider>
            </ClassesContext.Provider>

        </>
    )

}

export default Elv1annee;


const Loading = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="mb-4 w-32 h-32 w border-t-4 border-blue-500 rounded-full animate-spin">
                </div>
                <div>
                    Loading
                </div>
            </div>
        </>
    )
}