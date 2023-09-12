import { useEffect, useRef, useState } from "react";
import { UseUrl, UseParams } from "../../App";
import { useReactToPrint } from "react-to-print";
import { useCurrent_ClassesContext, useGoClassContext } from "./Use_ClassHooks";


export interface ClassInfo2 {
    id: number;
    name: string;
    level: string;
}


export interface EleveInfo2 {
    uid: number;
    nom: string;
    prenom: string;
    sexe: string;
    date_naissance: Date | null;

}


const Threads = ({ title }: { title: string }) => {

    return (
        <th dir="rtl"
            className={
                " pr-3 align-middle  text-xs text-center pl-4 border border-black "
            }
        >
            <span>
                {title}
            </span>

        </th>
    )
}

const TableRow = ({ eleve, hash }: { eleve: EleveInfo2, hash: number }) => {

    return (

        <tr className=" bg-slate-50 hover:bg-slate-400 border-b border-black  h-6" >
            <td className="border-x border-black  pr-2 align-middle  text-xs  w-12">
                {hash}
            </td>
            <td className="border-x border-black  text-center align-middle text-xs  w-32">
                {eleve.uid}
            </td>
            <td className="border-x border-black  text-center align-middle text-xs  w-32">
                {eleve.nom}
            </td>
            <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                {eleve.prenom}
            </td>
            <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                {eleve.sexe}
            </td>
            <td className="border-x border-black  text-center align-middle text-xs  w-32">
                {String(eleve.date_naissance)}
            </td>

        </tr>
    )
}


const PrintNewClass = () => {
    const ngrok = UseUrl();
    const params = UseParams();
    const current_class = useCurrent_ClassesContext();
    const handle_redirect = useGoClassContext();
    const [isLoading, setIsLoading] = useState(true);

    const [eleves, set_eleves] = useState<EleveInfo2[]>([])

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/presetup/get_next_classe/" + String(params.sid) + "/" + current_class.id + "?format=json");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData:EleveInfo2[] = await response.json();
                if (current_class.level === "1") {
                    console.log(jsonData)
                    const new_elvs = jsonData.sort((a, b) => { return a.nom.localeCompare(b.nom) })
                    console.log(new_elvs)
                    set_eleves(new_elvs)
                }
                set_eleves(jsonData)
            } catch (error: unknown) {
            }

        };

        const orginizer = async () => {

            await fetchData()
        
            setIsLoading(false)
        }

        orginizer()
    


    }, [])



    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="absolute top-0 w-full h-screen " >
                <div>
                    <button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm  mr-2 mb-2 w-32 h-11" onClick={handlePrint}>طباعة</button>
                    <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11" onClick={() => { handle_redirect({ Component: "PrintNewClass" }) }}>رجوع</button>
                </div>
                <div ref={componentRef} className="flex flex-col items-center justify-center" >
                    <div className="mt-5 mb-5"> قائمة التلاميذ للقسم {current_class.name}</div>
                    <table
                        className="items-center table-auto  h-96 mx-11" dir="rtl">
                        <thead dir="rtl" className=" border border-black bg-sky-400">
                            <tr>
                                <Threads title={"ع/ر"} />
                                <Threads title={"المعرف الوحيد"} />
                                <Threads title={"الإسم"} />
                                <Threads title={"اللقب"} />
                                <Threads title={"الجنس"} />
                                <Threads title={"تاريخ الولادة"} />

                            </tr>
                        </thead>
                        <tbody>
                            {eleves?.map((eleve, index) => {
                                return (<TableRow key={index} eleve={eleve} hash={index + 1} />)
                            })}

                        </tbody>

                    </table>


                </div>

            </div>
        </>
    )
}


export default PrintNewClass;



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