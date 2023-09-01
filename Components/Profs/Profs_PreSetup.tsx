import { useEffect, useState } from "react";
import { useProfsContext, useSaisiePageContext, useSave_active_profsContext } from "./Use_ProfsHooks";
import { ProfsDic, ProfsInfo } from "../Profs";




const Profs_PreSetup = () => {
    const profProvider = useProfsContext();
    const save_profs = useSave_active_profsContext();
    const Displaypage = useSaisiePageContext();
    const [profs, set_profs] = useState<ProfsDic>({});

    useEffect(() => {
        // Fetch the data from profs and set the state only once, when the component mounts.
        set_profs(profProvider);
    }, [profProvider]);

    const handle_prof_click = (prof: ProfsInfo) => {
        set_profs((prevProfs) => ({
            ...prevProfs,
            [prof.id.toString()]: {
                ...prevProfs[prof.id.toString()],
                is_active: !prevProfs[prof.id.toString()].is_active,
            },
        }));
    }

    const ProfCard = ({ prof }: { prof: ProfsInfo }) => {
        return (
            <>

                <button className={"flex items-center justify-center border-2 border-slate-500 rounded-lg hover:bg-slate-400 px-5 mx-5 h-14  w-60 bg-slate-200"} dir="rtl" onClick={() => handle_prof_click(prof)} >
                    <p>{prof.nom + " " + prof.prenom}</p>

                    <input className=" mr-2 " type="checkbox" checked={prof.is_active} />
                </button>

            </>
        )
    }

    const save = () => {
        save_profs(profs)
        Displaypage(2)
    }

    return (
        <>
            <div className="absolute top-0 w-full h-screen " dir="rtl">
                <div >
                    <div className="pt-10 px-5 text-3xl" dir="rtl">
                        حدد المعلمين المشتغلين بالسنة الجديدة :
                    </div>
                    <div className="pb-5 px-5 text-xl" dir="rtl">
                        (إذا كان هناك معلمون جدد الرجاء الخروج من التطبيقة  و اضافتهم من موقع مدرستي ثم العودة)
                    </div>
                    <div className="flex flex-col items-center justify-center  ">
                        <div className="text-indigo-600 text-2xl pt-7 pb-10" >المعلمين المشتغلين بالسنة الجديدة</div>
                        <div className="button-stack grid grid-cols-3 gap-4 w-8/12 " dir="rtl">
                            {Object.keys(profs).map((profKey) => {
                                const prof = profs[profKey];
                                return prof.is_active ? <ProfCard prof={prof} /> : null;
                            })}


                        </div>
                        <div className="text-indigo-600 text-2xl pt-7 pb-10">المعلمون اللذين لا يشتغلون بعد الان</div>
                        <div className="button-stack grid grid-cols-3 gap-4 w-8/12 " dir="rtl">
                            {Object.keys(profs).map((profKey) => {
                                const prof = profs[profKey];
                                return !prof.is_active ? <ProfCard prof={prof} /> : null;
                            })}

                        </div>

                    </div>
                </div>

            </div>
            <div className='fixed bottom-0 rounded-md my-5 ml-5 mr-4 bg-yellow-300 px-1'>
                <button onClick={save}>التسجيل</button >
            </div>

        </>
    )

}




export default Profs_PreSetup;