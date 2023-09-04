import { ChangeEvent, useEffect, useState } from "react";
import { useCurrent_ClassesContext, useElevesSaisie_Context, useGetAllClasses, useGoClassContext } from "./Use_ClassHooks";
import { EleveInfo } from "../Classes";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const MixLevel = () => {
    const eleves_provider = useElevesSaisie_Context();
    const classes = useGetAllClasses();
    const current_class = useCurrent_ClassesContext();
    const handle_redirect = useGoClassContext();

    const [eleves, set_eleves] = useState<EleveInfo[]>([])
    const [select_val, set_select_val] = useState(2);
    const [new_classes, set_new_classes] = useState<EleveInfo[][]>([])
    const [new_classes_saisie, set_new_classes_saisie] = useState<number[]>([])

    const moyen_color: { [key: number]: string; } = {
        19: 'text-fuchsia-500',
        18: 'text-red-700',
        17: 'text-green-700',
        16: 'text-blue-700',
        15: 'text-violet-700',

    }

    interface moyen_dic {
        [key: number]: number;

    }
    const [moyen_data_array, set_moyen_data_array] = useState<moyen_dic[]>([])

    sortTableData(eleves, 'moyen', 'desc')
    useEffect(() => {
        set_eleves(eleves_provider)
    }
        , [])

    const handleSelect_number_classes = (event: ChangeEvent<HTMLSelectElement>) => {
        set_select_val(Number(event.target.value))
    };

    function sortTableData(data: EleveInfo[], sortBy: string, sortOrder: "asc" | "desc" = "asc"): EleveInfo[] {
        return data.sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc" ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom);
            } else if (sortBy === "moyen") {
                const aMoyen = a.moyen ?? 0; // Use 0 as the default value when a.moyen is null
                const bMoyen = b.moyen ?? 0; // Use 0 as the default value when b.moyen is null
                return sortOrder === "asc" ? aMoyen - bMoyen : bMoyen - aMoyen;
            } else {
                // Handle other sorting criteria here if needed
                return 0;
            }
        });
    }

    const handle_algo = () => {
        const displayError = () => { // raka7
            const message = " لديك فقط" + classes[next_level].length + " أقسام الرجاء اضافة الأقسام الناقصة أوّلا";
            alert(message);
        }
        const next_level = Number(current_class.level) + 1
        if (select_val > classes[next_level].length) displayError()
        if (select_val > classes[next_level].length) return
        let new_classes: EleveInfo[][] = []
        let new_moyen_data_array: moyen_dic[] = []

        function sortClasses(new_classes: EleveInfo[][]) {
            return new_classes.sort((a, b) => {
                return a.length - b.length
            })
        }

        set_new_classes_saisie([])
        set_moyen_data_array([])

        for (let i = 0; i < select_val; i++) {
            new_classes.push([])
            new_moyen_data_array.push({ 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, })


        }

        for (let i = 19; i >= 0; i--) {
            let eleves_moyen: EleveInfo[] = []
            eleves.map((each_eleves) => {
                const aMoyen = each_eleves.moyen ?? 0;
                (aMoyen >= i) && (aMoyen < (i + 1)) && eleves_moyen.push(each_eleves)
            })
            let new_class_index = 0
            eleves_moyen?.map((each_eleve) => {
                new_classes[new_class_index].push(each_eleve)
                new_class_index + 1 === select_val ? new_class_index = 0 : new_class_index += 1;
            })
            sortClasses(new_classes)

        }

        set_new_classes(new_classes)
        set_moyen_data_array(new_moyen_data_array)

    }
    useEffect(() => {
        new_classes[0]?.length !== 0 && handle_moyen_data()
    }
        , [new_classes])


    const handle_moyen_data = () => {
        new_classes.map((each_class, index) => {
            set_moyen_data_array((prev_array) => {
                const updatedClasses = [...prev_array];
                updatedClasses[index] = { 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, }
                return updatedClasses;
            })
            each_class.map((each_eleve) => {
                const integerMoyen = Math.floor(each_eleve.moyen ?? 0);

                set_moyen_data_array((prev_array) => {
                    const updatedClasses = [...prev_array];
                    updatedClasses[index][integerMoyen] >= 0 ? updatedClasses[index][integerMoyen] += 1 : null;

                    return updatedClasses;
                })
            })
        })


    }

    const Threads = ({ title }: { title: string }) => {
        return (
            <th dir="rtl"
                className={
                    " pr-2 pl-2  border-l-2 border-neutral-600  border-solid py-3 text-sm whitespace-nowrap font-bold text-right "
                }
            >
                {title}
            </th>
        )
    }

    const TableRow = ({ eleve, hash }: { eleve: EleveInfo, hash: number }) => {

        const integerMoyen = Math.floor(eleve.moyen ?? 0);

        return (
            <Draggable key={eleve.eid} draggableId={String(eleve.eid)} index={eleve.eid}>
                {(provided) => (

                    <tr className="hover:bg-slate-400 border-b-2 border-neutral-600"
                        key={eleve.eid}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    >
                        <td className="border-neutral-600 border-l-2  pr-2 align-middle font-semibold  text-base whitespace-nowrap py-1 w-12  ">
                            {hash}
                        </td>
                        <td className="border-neutral-600 border-l-2 px-2 align-middle font-medium text-base whitespace-nowrap py-1 w-36 ">
                            <i className="fas fa-circle text-orange-500 mr-2"></i>
                            {eleve.nom}
                        </td>
                        <td className="border-neutral-600 border-l-2 px-2 align-middle font-medium  text-base whitespace-nowrap py-1 w-36 ">
                            {eleve.prenom}
                        </td>

                        <td className=" px-3 align-middle  text-base whitespace-nowrap py-1 flex w-12">
                            <span className={"font-bold   " + (integerMoyen > 14 && moyen_color[integerMoyen])}>
                                {eleve.moyen}
                            </span>
                        </td>
                    </tr>
                )}
            </Draggable>
        )
    }

    const Handle_options = () => {
        const next_level = Number(current_class.level) + 1

        return (
            <>
                <option value={0}></option>
                {classes[next_level].map((each_class) => {
                    return (
                        <option value={each_class.id}>{each_class.name}</option>
                    )
                })}
            </>
        )
    }

    const handle_select_next_class = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
        set_new_classes_saisie((prevClasses) => {
            const updatedClasses = [...prevClasses];
            updatedClasses[index] = Number(event.target.value);
            return updatedClasses;
        });


    }

    const apply_saisie_class = () => {
        new_classes.map((each_class, index) => {
            const class_saisie = new_classes_saisie[index]
            each_class.map((each_eleve) => {
                each_eleve.next_class = class_saisie
            })
        })
        set_new_classes(new_classes)
    }


    const verify = (save: boolean) => {
        const displayError = (erreur: "distinct_elements" | "no_empty_index") => { // raka7
            const message = erreur === "distinct_elements" ? "لا يمكن إسناد جدولين لنفس القسم ! " : "الرجاء إسناد جميع الجداول إلى القسم المعين";
            alert(message);
        }

        if (save) {
            const no_empty_index = () => {
                if (new_classes_saisie.length === 0) return false;

                for (const item of new_classes_saisie) {
                    if (item === undefined || item === null || item === 0) {
                        return false;
                    }
                }
                return true;
            }
            const distinct_elements = new Set(new_classes_saisie).size === new_classes_saisie.length
            if (distinct_elements && no_empty_index()) {
                apply_saisie_class()
                let all_eleves: EleveInfo[] = [];
                new_classes.map((each_class) => {
                    all_eleves = all_eleves.concat(each_class)
                })
                const level_index = Number(current_class.level)
                alert("الرجاء العودة إلى كلّ قسم و  تسجيل التغييرات");
                handle_redirect({ Component: "MixLevel", level_index: level_index, modifyed_eleves: all_eleves })
            }
            else {
                !distinct_elements ? displayError("distinct_elements") : displayError("no_empty_index")
            }
        }
        else {
            handle_redirect({ Component: "MixLevel", level_index: 0 })
        }
    }

    const endrop = (result: any) => {
        if (result.destination.droppableId === null) return;
        const eleve_eid: Number = Number(result.draggableId);
        const draggedFromTable = Number(result.source.droppableId);
        const targetTableId = Number(result.destination.droppableId);

        if (targetTableId !== draggedFromTable) {
            const updatedClasses = [...new_classes];

            const sourceTable = updatedClasses[draggedFromTable];
            const targetTable = updatedClasses[targetTableId];

            const draggedRowIndex = sourceTable.findIndex((eleve) => eleve.eid === eleve_eid);
            if (draggedRowIndex !== -1) {
                targetTable.push(sourceTable[draggedRowIndex]);
                sourceTable.splice(draggedRowIndex, 1)

                const new_classes2 = new_classes.map((each_class, index) => {
                    if (index === draggedFromTable) {
                        return sourceTable;
                    } else if (index === targetTableId) {
                        return targetTable;
                    } else {
                        return each_class;
                    }
                });
                set_new_classes(new_classes2)


            }
            new_classes.map((each_class) => {
                sortTableData(each_class, 'moyen', 'desc')
            })

        }


    }

    return (
        <>
            <div className="absolute top-0  w-full h-screen    bg-white ">
                <div className="flex flex-col items-center">

                    <div dir="rtl" className=" my-5">
                        <span className=" text-xl ml-3">حدد عدد الأقسام التي سيتم توزيع التلاميذ فيها</span>
                        <select className="  bg-slate-300 rounded-lg ml-3 px-3"
                            value={select_val} onChange={handleSelect_number_classes}
                        >
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button className=" bg-slate-300 rounded-xl  px-4" onClick={handle_algo}>تحضير الأقسام</button>
                    </div>

                    <DragDropContext onDragEnd={endrop}>


                        <div className="flex h-full" dir="rtl">
                            {new_classes.map((each_class, index) => {
                                return (
                                    <>
                                        <div className="flex flex-col items-center px-5 "
                                        >
                                            <div className="border-2 border-b-0 border-neutral-600 w-full "
                                            >
                                                <span className="  font-semibold pr-2 ">
                                                    إسناد التلاميذ إلى قسم
                                                </span>
                                                <select
                                                    key={new_classes_saisie[index]}
                                                    value={new_classes_saisie[index]}
                                                    onChange={(event) => handle_select_next_class(event, index)}
                                                    className=" bg-zinc-300 rounded-lg mr-4"
                                                >
                                                    <Handle_options />
                                                </select>
                                            </div>
                                            <div className="border-2 border-b-0 border-neutral-600 w-full ">
                                                {
                                                    moyen_data_array[index] ?
                                                        (Object.keys(moyen_data_array[index]).sort((a, b) => { return Number(b) - Number(a) }).map((key) => {
                                                            return (
                                                                <div className=" pr-1.5" key={key}>
                                                                    {"  عدد التلاميذ المتحصلين على معدل "}
                                                                    <span className={"font-semibold " + moyen_color[Number(key)]}>{key}</span>
                                                                    {" : " + moyen_data_array[index][Number(key)]}
                                                                </div>
                                                            )
                                                        })) : <></>
                                                }
                                            </div>
                                            <table className="  border-2 border-neutral-600 mx-0 bg-gray-100"

                                                id={String(index)}
                                            >
                                                <thead dir="rtl">
                                                    <Threads title={"ع/ر"} />
                                                    <Threads title={"الإسم"} />
                                                    <Threads title={"اللقب"} />
                                                    <Threads title={"المعدّل السنوي "} />
                                                </thead>
                                                <Droppable droppableId={String(index)}>
                                                    {(provided) => (
                                                        <tbody className="  border-2 border-neutral-600  h-full"
                                                            {...provided.droppableProps} ref={provided.innerRef}
                                                        >

                                                            {
                                                                each_class.map((each_eleve, index) => {
                                                                    return (
                                                                        <TableRow key={index} eleve={each_eleve} hash={index + 1} />
                                                                    )
                                                                })
                                                            }

                                                            {provided.placeholder}
                                                        </tbody>
                                                    )}
                                                </Droppable>
                                            </table>
                                        </div >
                                    </>
                                )
                            })}
                        </div>
                    </DragDropContext>
                </div >
                <div className='flex  fixed bottom-0 my-5 ml-5 mr-4 px-1'>
                    <div className="">
                        <button className="text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => verify(true)} > موافقة </button>
                    </div>
                    <div className="">
                        <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={() => verify(false)}>إلغاء</button>
                    </div>
                </div>
            </div >
        </>
    )

}






export default MixLevel;