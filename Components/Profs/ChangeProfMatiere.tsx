import { useState, useEffect, ChangeEvent } from "react";
import { ProfsDic, Profs_par_Class } from "../Profs";
import { useAll_MatiereContext, useGoClassContext, useProfsContext, useSaisiePageContext } from "./Use_ProfsHooks";




const ChangeProfMatiere = () => {
    const profProvider = useProfsContext();
    const Displaypage = useSaisiePageContext();
    const Classes_MatieresProvider = useAll_MatiereContext();
    const Redirect = useGoClassContext();

    const [profs, set_profs] = useState<ProfsDic>({});
    const [Classes_Matieres, set_Classes_Matieres] = useState<Profs_par_Class>({});

    const [exclude_prof1, set_exclude_prof1] = useState<number[]>([]);
    const exclude_prof2: number[] = [];

    let oldprofs_matier: { [id: number]: number } = {}

    useEffect(() => {
        set_Classes_Matieres(Classes_MatieresProvider)
    }, [Classes_MatieresProvider]);

    useEffect(() => {
        set_profs(profProvider);

    }, [profProvider]);

    useEffect(() => {
        let new_exlude_profs1: number[] = []

        Object.keys(profs).map((each_prof) => {
            const prof = profs[each_prof]
            !prof.is_active && prof.id !== 0 && new_exlude_profs1.push(prof.id)

        })
        set_exclude_prof1(() => new_exlude_profs1)
    }, [profs]);

    useEffect(() => {

    }, [Classes_Matieres]);


    const Block_Changmnt = ({ prof11, prof22, old_exclude_prof1, old_exclude_prof2, oldprof_newvalue }: { prof11: number; prof22: number, old_exclude_prof1: number[], old_exclude_prof2: number[], oldprof_newvalue: number }) => {
        const [nextBlock, set_nextBlock] = useState(false)
        const [exclude_prof1, set_exclude_prof1] = useState<number[]>([]);
        const [exclude_prof2, set_exclude_prof2] = useState<number[]>([]);
        const [prof1, set_prof1] = useState(0)
        const [prof2, set_prof2] = useState(0)

        useEffect(() => {
            prof11 !== 0 && old_exclude_prof1.push(prof11)
            set_exclude_prof1(old_exclude_prof1)
            prof22 !== 0 && old_exclude_prof2.push(prof22)
            set_exclude_prof2(old_exclude_prof2)
        }, [])

        useEffect(() => {
            if (!exclude_prof1.includes(prof22) && exclude_prof1.length != 0) {
                // console.log(prof22 + '   5dhe prof 1')
                set_prof1(prof22)

            }
        }, [exclude_prof1])

        //   useEffect(() => { console.log(prof1, 'change') }, [prof1])

        const CheckIcon = () => {
            return (
                <>
                    <div className="inline-flex items-center ">
                        <div className="w-6 h-6 bg-transparent border-2 border-black rounded-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L21 7" />
                            </svg>
                        </div>
                    </div>
                </>
            )
        }

        const handleSelect1 = (event: ChangeEvent<HTMLSelectElement>) => {
            const new_prof1 = Number(event.target.value)
            set_prof1(new_prof1);
        };

        const handleSelect2 = (event: ChangeEvent<HTMLSelectElement>) => {
            const new_prof2 = Number(event.target.value)
            set_prof2(new_prof2);
        };


        const handle_nextBlock = () => {
            if (prof1 !== 0 && prof2 !== 0 && prof1 !== prof2) {
                saveProf(prof1, prof2, oldprof_newvalue)
                set_nextBlock(true)
            }
        }
        return (
            <>
                <div className=" mb-2" >
                    {nextBlock ? <CheckIcon /> : <span className="inline-flex w-6 h-6 "></span>}
                    <span className=" pr-5"></span>
                    <span className=" text-xl">
                        اسناد المجالات القديمة لـالمعلم
                    </span>

                    <select className=" bg-slate-300 rounded-xl mx-4" disabled={nextBlock} onChange={handleSelect1} value={prof1}>
                        <option value={0}></option>
                        {Object.keys(profs).map((key, index) => {
                            const prof = profs[key];
                            return exclude_prof1.indexOf(prof.id) === -1 ? <option key={index} value={prof.id}>{prof.nom + "  " + prof.prenom}</option> : null
                        })
                        }
                    </select>

                    <span className=" text-xl">
                        إلى المعلم:
                    </span>
                    <select className=" bg-slate-300 rounded-xl mx-4" disabled={nextBlock} onChange={handleSelect2}>
                        <option value="0"></option>
                        {Object.keys(profs).map((key, index) => {
                            const prof = profs[key];
                            return exclude_prof2.indexOf(prof.id) === -1 && prof1 !== prof.id ? <option key={index} value={prof.id}>{prof.nom + "  " + prof.prenom}</option> : null
                        })
                        }
                    </select>
                    <button className={" rounded-xl border  p-2 " + (nextBlock ? " bg-gray-400" : "bg-amber-300 ")} onClick={handle_nextBlock} disabled={nextBlock}>تسجيل</button>
                </div>
                {nextBlock && <Block_Changmnt prof11={prof1} prof22={prof2} old_exclude_prof1={exclude_prof1} old_exclude_prof2={exclude_prof2} oldprof_newvalue={oldprof_newvalue - 1} />}

            </>
        )
    }

    const saveProf = (prof1: number, prof2: number, oldprof_newvalue: number) => {
        let prof11 = prof1

        if (oldprofs_matier.hasOwnProperty(prof1)) {
            console.log('t5al oldprofs_matier.hasOwnProperty(prof1)')
            prof11 = oldprofs_matier[prof1]
            delete oldprofs_matier[prof1]
        }


        let new_class_array: Profs_par_Class = Classes_Matieres;
        Object.keys(new_class_array).map((class_id) => {

            return new_class_array[class_id].map((each_matiere) => {
                if (each_matiere.prof === prof11) {
                    each_matiere.prof = prof2;
                }
                else if (each_matiere.prof === prof2) {
                    each_matiere.prof = oldprof_newvalue;
                }
                return each_matiere;
            })

        })

        set_Classes_Matieres(new_class_array)
        oldprofs_matier[prof2] = oldprof_newvalue

        //  
    }

    const exit = () => {
        let new_class_array: Profs_par_Class = Classes_Matieres;
        Object.keys(new_class_array).map((class_id) => {
            return new_class_array[class_id].map((each_matiere) => {
                if (each_matiere.prof < 0) {
                    each_matiere.prof = 0;
                }

                return each_matiere;
            })

        })

        set_Classes_Matieres(new_class_array)


        Redirect({ Component: "ChangeProfMatiere", Classes_Matieres })

    }


    return (
        <>
            <div dir="rtl" className=" flex flex-col items-center mt-52">
                {exclude_prof1?.length !== 0 && <Block_Changmnt prof11={0} prof22={0} old_exclude_prof1={exclude_prof1} old_exclude_prof2={exclude_prof2} oldprof_newvalue={-1} />}


                <div className='flex fixed bottom-0  '>
                    <div className="">
                        <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={() => Displaypage(2)}> الغاء </button>
                    </div>
                    <div className="">
                        <button className="text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={exit}> التسجيل </button>
                    </div>


                </div>
            </div>
        </>
    )

}

export default ChangeProfMatiere;