
import { ChangeEvent, useEffect, useState } from 'react';
import { EleveInfo } from '../Classes'
import { useCurrent_ClassesContext, useElevesSaisie_Context, useGetAllClasses, useGoClassContext } from './Use_ClassHooks';
import sort_img from '../../assets_img/sort_img.png'



const TableClass_Eleves = () => {
    const [eleves, set_eleves] = useState<EleveInfo[]>([])
    const classes = useGetAllClasses();
    const current_class = useCurrent_ClassesContext();
    const eleves_provider = useElevesSaisie_Context();
    const handle_redirect = useGoClassContext();
    const [one_table, set_one_table] = useState(true);
    const [sorted_column, set_sorted_column] = useState("nom");
    const [asc_desc, set_asc_desc] = useState(true);

    useEffect(() => {
        set_eleves(eleves_provider)
    }
        , [])

    const color = "light";

    const fill_next_class = ({ class_id }: { class_id: number }) => {
        const updatedEleves = eleves.map((eleve) => {
            if (eleve.is_graduated == true) {
                return { ...eleve, next_class: class_id };
            }
            else if (eleve.is_graduated == false) {
                return { ...eleve, next_class: current_class.id };
            }
            else if (eleve.moyen !== null && eleve.moyen < 9) {
                return { ...eleve, next_class: current_class.id };
            }
            else {
                return { ...eleve, }
            }
        });
        set_eleves(updatedEleves)
    }


    const Display_class_sug = () => {

        const next_level = Number(current_class.level) < 6 ? Number(current_class.level) + 1 : 6;
        return (<>
            {classes[next_level].map((classe, index) => {
                return (<button className=' border-2 border-slate-400 text-center text-2xl text-orange-600 rounded-lg bg-slate-300 hover:bg-slate-400 p-1 mx-2' key={index} onClick={() => fill_next_class({ class_id: classe.id })}>{classe.name}</button>)
            })}
        </>)

    }




    const verify = (save: boolean) => {
        const displayError = () => { // raka7
            const message = "عليك اكمال جميع التلاميذ قبل التسجيل";
            alert(message);
        }

        if (save) {
            let exit = true;
            eleves.forEach((eleve) => {
                if (eleve.next_class === null) {
                    exit = false
                    return null
                };
            })
            if (exit) {
                handle_redirect({ Component: "TableClass", classe_id: current_class.id, modifyed_eleves: eleves })

            } else {
                displayError()
            }
        }
        else {
            handle_redirect({ Component: "TableClass" })

        }



    }


    const Handle_options = ({ current_eleve }: { current_eleve: EleveInfo }) => {

        const HandleOption = ({ level }: { level: number }) => {
            return (<>
                {classes[level].map((classe, index) => {
                    return (<option key={index} value={String(classe.id)} >{classe.name}</option>)
                })}</>)
        }

        const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
            const updatedEleves = eleves.map((eleve) => {

                return eleve.eid === current_eleve.eid ? { ...current_eleve, next_class: Number(event.target.value) } : { ...eleve, };
            }
            );
            set_eleves(updatedEleves)

        };

        return (
            <select className=' bg-blueGray-300  rounded-xl' value={current_eleve.next_class ? current_eleve.next_class : ""} onChange={handleSelect}>
                <option value=""></option>
                {current_eleve.is_graduated ? (
                    <>
                        {Number(current_class.level) < 6 && <HandleOption level={Number(current_class.level) + 1} />}
                        <hr className=' py-1'></hr>
                        <HandleOption level={Number(current_class.level)} />
                    </>
                ) : (
                    <>
                        <HandleOption level={Number(current_class.level)} />
                        <hr className=' py-1'></hr>
                        {Number(current_class.level) < 6 && <HandleOption level={Number(current_class.level) + 1} />}
                    </>
                )}
            </select>)
    }

    const handle_tables = () => {
        set_one_table((one_table) => !one_table)
    }

    function sortTableData(sortBy: string,) {
        sorted_column === sortBy ? set_asc_desc(!asc_desc) : set_asc_desc(true)
        sorted_column !== sortBy && set_sorted_column(sortBy)

        eleves.sort((a, b) => {
            if (sortBy === "الإسم") {
                return asc_desc ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom);
            }
            else if (sortBy === "اللقب") {
                return asc_desc ? a.prenom.localeCompare(b.prenom) : b.prenom.localeCompare(a.prenom);
            }
            else if (sortBy === "المعدّل السنوي") {
                const aMoyen = a.moyen ?? 0; // Use 0 as the default value when a.moyen is null
                const bMoyen = b.moyen ?? 0; // Use 0 as the default value when b.moyen is null
                return asc_desc ? aMoyen - bMoyen : bMoyen - aMoyen;
            } else {
                // Handle other sorting criteria here if needed
                return 0;
            }

        });
        const updatedEleves = eleves.map((eleve) => { return eleve; }
        );
        set_eleves(updatedEleves)
    }

    const Threads = ({ title }: { title: string }) => {

        return (
            <th dir="rtl"
                className={
                    " pr-3 align-middle border border-solid py-3 text-s text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-right " +
                    (true
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
            >
                <div>

                    <span> {title}
                    </span>
                    {title !== "ع/ر" && title !== "يذهب إلى قسم" &&
                        <button className=' mx-2'
                            onClick={() => sortTableData(title)}>
                            <img
                                alt="..."
                                className="inline-block h-4 w-3 "

                                src={sort_img}
                            />
                        </button>}
                </div>
            </th>
        )
    }

    const TableRow = ({ eleve, hash }: { eleve: EleveInfo, hash: number }) => {

        return (

            <tr className=" bg-slate-50 hover:bg-slate-400 border-b-4 " key={eleve.eid} id={String(eleve.eid)}>
                <td className="border-l-2  pr-2 align-middle font-semibold  text-base whitespace-nowrap py-1 w-12">
                    {hash}
                </td>
                <td className="border-l-2 px-2 align-middle font-medium text-base whitespace-nowrap py-1 w-40">
                    <i className="fas fa-circle text-orange-500 mr-2"></i>
                    {eleve.nom}
                </td>
                <td className="border-l-2 px-2 align-middle font-medium  text-base whitespace-nowrap py-1 w-40 ">
                    {eleve.prenom}
                </td>

                <td className="border-l-2 px-3 align-middle  text-base whitespace-nowrap py-1 flex ">
                    <span className=' w-12'>{eleve.moyen}</span>

                    <span className=''>
                        {eleve.is_graduated === true
                            ? <span className=' text-green-600 text-sm font-semibold'>{eleve.resultat ? eleve.resultat : 'يرتقي'}</span>
                            : eleve.is_graduated === false
                                ? <span className=' text-red-600 text-sm font-semibold'>: يرسب</span>
                                : <span className='  text-yellow-600 text-sm font-semibold'>: ?????</span>}
                    </span>

                </td>
                <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-1   pl-8 ">
                    <>{<Handle_options current_eleve={eleve} />}</>
                </td>
            </tr>
        )
    }

    return (
        <>
            <div className="absolute top-0 w-full min-h-screen flex flex-col ">
                <div
                    dir="rtl"
                    className={
                        "relative  flex flex-col min-w-0 break-words w-full min-h-screen pb-10 shadow-lg rounded " +
                        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                    }
                >

                    <div className="rounded-t mb-5 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-1 max-w-full flex-grow flex-1 mt-12 mr-11">
                                <h1
                                    className={
                                        "font-semibold text-4xl " +
                                        (color === "light" ? "text-blueGray-700" : "text-white")
                                    }
                                >
                                    <span className=' pl-3 '>قسم السنة</span>
                                    <span className=' text-blue-700'>{current_class.name}</span>
                                    <span>   يرتقون إلى قسم :</span>
                                    <span>{Display_class_sug()}</span>
                                </h1>
                                <div><span className=' text-xl ml-2'>فصل التلاميذ الى جدول مرتقون و جدول راسبون</span>
                                <span className={'h-12 px-1 '+ (!one_table && 'border-black border-2')}>

                                    <input type='checkbox' className=' ' onChange={handle_tables} />
                                </span>
                                     </div>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}

                    <div className='flex'>
                        {one_table ?
                            <table
                                className="items-center  bg-transparent border h-min mr-11" dir="rtl">
                                <thead dir="rtl">
                                    <tr>
                                        <Threads title={"ع/ر"} />
                                        <Threads title={"الإسم"} />
                                        <Threads title={"اللقب"} />
                                        <Threads title={"المعدّل السنوي"} />
                                        <Threads title={"يذهب إلى قسم"} />

                                    </tr>
                                </thead>
                                <tbody>
                                    {eleves.map((eleve, index) => {
                                        return (<TableRow key={eleve.eid} eleve={eleve} hash={index + 1} />)
                                    })}

                                </tbody>

                            </table>
                            : <>
                                <table className="items-center  bg-transparent border h-min mr-11" dir="rtl">
                                    <thead dir="rtl">
                                        <tr>
                                            <Threads title={"ع/ر"} />
                                            <Threads title={"الإسم"} />
                                            <Threads title={"اللقب"} />
                                            <Threads title={"المعدّل السنوي "} />
                                            <Threads title={"يذهب إلى قسم"} />

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {eleves.map((eleve, index) =>
                                            eleve.is_graduated ? <TableRow key={eleve.eid} eleve={eleve} hash={index + 1} /> : null
                                        )
                                        }

                                    </tbody>

                                </table>
                                <div className=' w-1/12'></div>
                                <table className="items-center  bg-transparent border h-min mx-5" dir="rtl">
                                    <thead dir="rtl">
                                        <tr>
                                            <Threads title={"ع/ر"} />
                                            <Threads title={"الإسم"} />
                                            <Threads title={"اللقب"} />
                                            <Threads title={"المعدّل السنوي "} />
                                            <Threads title={"يذهب إلى قسم"} />

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eleves.map((eleve, index) =>
                                            !eleve.is_graduated ? <TableRow key={eleve.eid} eleve={eleve} hash={index + 1} /> : null
                                        )
                                        }
                                    </tbody>

                                </table>
                            </>
                        }
                    </div>
                </div>


                <div className='flex  fixed bottom-0 my-5 ml-5 mr-4 px-1'>
                    <div className="">
                        <button className="text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => verify(true)}> تسجيل </button>
                    </div>
                    <div className="">
                    <button className='text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3' onClick={() => verify(false)}>إلغاء</button>
                    </div>
                </div>
            </div>

        </>

    )


}


export default TableClass_Eleves;
