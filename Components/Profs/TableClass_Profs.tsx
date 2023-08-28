import { ChangeEvent, useEffect, useState } from "react";
import { MatiereProf } from "../Profs";
import { useCurrent_ClassDataContext, useGoClassContext, useProfsContext } from "./Use_ProfsHooks";


const TableClass_Profs = () => {
    const class_data = useCurrent_ClassDataContext();
    const profProvider = useProfsContext();
    const Redirect = useGoClassContext();

    const [profs_class, set_profs_class] = useState<MatiereProf[]>([])
    const [insert_toanother_class, set_insert_toanother_class] = useState(0)

    useEffect(() => {
        set_profs_class(class_data["profs_class"])
    }, [class_data])

    const getClassname = () => {
        const matchingClass = class_data["classes_ofcurrent_level"].find((classe) => classe.id === class_data["class_id"]);
        return matchingClass ? matchingClass.name : null;
    };

    const HandlePremierOption = () => {
        const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
            const updatedprofs_class = profs_class.map((matiere, index) => {
                return index !== 7 ? { ...matiere, saisie_prof: Number(event.target.value) } : { ...matiere };
            }
            );
            set_profs_class(updatedprofs_class)

        };
        return (
            <>
                <select className=" bg-slate-300 rounded-xl" value={profs_class[0]?.prof} onChange={handleSelect} >
                    <option value="0"></option>
                    {Object.keys(profProvider).map((key, index) => {
                        const prof = profProvider[key];
                        return true ? <option key={index} value={prof.id}>{prof.nom + "  " + prof.prenom}</option> : null
                    })
                    }

                </select>
            </>
        )

    }
    const Display_class_sug = () => {
        return (
            <>
                {
                    class_data["classes_ofcurrent_level"].map((classe, index) => {
                        return classe.id !== class_data["class_id"] ? <button key={index}
                            className={`border-2 border-slate-400 text-center text-2xl font-semibold text-orange-600 rounded-lg p-1 mx-2 ${classe.id === insert_toanother_class ? 'bg-slate-400 hover:bg-slate-200' : 'bg-slate-200 hover:bg-slate-400'}`}
                            onClick={() => { insert_toanother_class !== classe.id ? set_insert_toanother_class(classe.id) : set_insert_toanother_class(0) }}
                        >
                            {classe.name}
                        </button> : null;
                    })
                }
            </>
        )

    }


    const Display_Matieres = ({ current_matiere }: { current_matiere: MatiereProf }) => {

        const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
            const updatedprofs_class = profs_class.map((matiere) => {
                return matiere.id === current_matiere.id ? { ...current_matiere, saisie_prof: Number(event.target.value) } : { ...matiere, };
            }
            );
            set_profs_class(updatedprofs_class)

        };

        const Handle_options = () => {
            return (
                <td className="border-2 border-neutral-600 pr-2 align-middle font-semibold  text-base whitespace-nowrap py-1 w-12">
                    <select className="rounded-xl" value={current_matiere.prof} onChange={handleSelect} >
                        <option value="0"></option>
                        {Object.keys(profProvider).map((key, index) => {
                            const prof = profProvider[key];
                            return true ? <option key={index} value={prof.id}>{prof.nom + "  " + prof.prenom}</option> : null
                        })
                        }

                    </select>
                </td>
            )
        }
        const matiere_name: { [key: string]: string; } = {
            "arab": "مجال اللغة العربية", "math": "الرياضيات",
            "science": "الايقاظ العلمي", "technique": "التربية التكنولوجية",
            "islam": "الاسلامية", "histoiregeo": "مجال التنشئة : التاريخ ,الجغرافيا,المدنية",
            "draw": "التشكيلية", "music": "الموسيقية", "sport": "البدنية",
            "francais": "مجال اللغة الفرنسية", "anglais": "مجال اللغة الانجليزية",
        }
        const name = matiere_name[current_matiere.field]
        return (
            <>
                <td className="border-2 border-neutral-600  pr-2 align-middle font-semibold whitespace-nowrap py-1 w-12 text-xl">{name}</td>
                <Handle_options />
            </ >
        )
    }

    const exit = (save: boolean) => {
        const displayError = () => { // raka7
            const message = "عليك اكمال جميع التلاميذ قبل التسجيل";
            alert(message);
        }
        if (save) {
            let exit = true;
            profs_class.map((matiere) => {
                matiere.prof === 0 ? exit = false : null
            })
            if (exit) {
                if (insert_toanother_class) {
                    Redirect({ Component: "TableClass_Profs", class_id: class_data["class_id"], additional_class: insert_toanother_class, profs_class: profs_class })
                }
                else {
                    Redirect({ Component: "TableClass_Profs", class_id: class_data["class_id"], profs_class: profs_class })
                }

            }
            else {
                displayError()
            }
        }
        else {
            Redirect({ Component: "TableClass_Profs" })
        }


    }

    const Threads = ({ title }: { title: string }) => {
        return (
            <th dir="rtl"
                className={
                    " pr-3 align-middle border-2 border-neutral-600 py-3 text-xl uppercase  whitespace-nowrap font-semibold text-right " +
                    (true
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
            >
                {title}
            </th>
        )
    }

    return (
        <>
            <div className=" w-full min-h-screen" dir="rtl">
                <div
                    className={
                        "relative flex flex-col min-w-0 break-words w-full min-h-screen pb-10 shadow-lg rounded bg-white"
                    }
                >

                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-1 max-w-full flex-grow flex-1">
                                <h1
                                    className={
                                        "font-semibold text-4xl text-blueGray-700 m-5"
                                    }
                                ><span className=''> إسناد مجالات قسم  : </span>
                                    <span className=' text-blue-700'> {getClassname()}</span>
                                </h1>
                                <div>{
                                    class_data["classes_ofcurrent_level"][0].level != "1" ? (
                                        <div className="mb-5">
                                            <span className=' text-xl font-semibold mr-5'>إسناد نفس المجالات إلى القسم : </span>
                                            <span><Display_class_sug /></span>
                                        </div>
                                    ) : (
                                        <div className="mb-5">
                                            <span className="text-xl font-semibold mr-5 ">اسناد جميع المجالات لـالمعلم : </span>
                                            <span><HandlePremierOption /></span>
                                        </div>

                                    )
                                }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <table className="items-center  bg-transparent border-2 border-neutral-600 h-min mr-5 w-2/5 " dir="rtl">
                            <thead dir="rtl">
                                <tr>
                                    <Threads title={"المجالات"} />
                                    <Threads title={"المعلمون"} />
                                </tr>
                            </thead>
                            <tbody>

                                {profs_class.map((matiere, index) => {
                                    return <tr className="hover:bg-slate-400 border-2 border-neutral-600  h-16"><Display_Matieres key={index} current_matiere={matiere} /></tr>
                                })}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            <div className='flex absolute bottom-0  my-5 ml-5 mr-4 px-1 '>
                <div className=" ">
                    <button className="text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => exit(true)} > تسجيل </button>
                </div>
                <div className=" ">
                    <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={() => exit(false)} >إلغاء</button>
                </div>
            </div>
        </>
    )
}

export default TableClass_Profs;