import { ChangeEvent, useEffect, useState } from "react";
import { Eleve1anneeInfo } from "../Elv1annee";
import { useElevesContext, useGetAllClasses, useRedirectContext } from "./Use_Elv1Hook";
import sort_img from '../../assets_img/sorting2.png'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";










const Saisie_Auto = () => {

    const elevesprovider = useElevesContext();
    const classesprovider = useGetAllClasses();
    const [eleves, set_eleves] = useState<Eleve1anneeInfo[]>([]);
    const [All_elvs_selected, set_all_elvs] = useState(true)
    const [page, set_page] = useState(0);

    const [sorted_column, set_sorted_column] = useState("nom");
    const [asc_desc, set_asc_desc] = useState(true);

    const redirect = useRedirectContext();


    useEffect(() => {

        const NewElvs = elevesprovider.map((each_elve) => {
            return { ...each_elve, chosen: true }
        })
        set_eleves(NewElvs)
    }, [elevesprovider])




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
            else if (sortBy === "المعرف الوحيد") {
                return asc_desc ? a.uid - b.uid : b.uid - a.uid;
            }
            else if (sortBy === "يذهب إلى قسم") {
                const A_next_class = a.next_class ?? 0;
                const B_next_class = b.next_class ?? 0;
                return asc_desc ? A_next_class - B_next_class : B_next_class - A_next_class;
            }
            else {
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
                    " pr-3 align-middle  text-xs text-center pl-4 border border-black "
                }
            >
                <span>
                    {title}
                </span>
                {title !== "ع/ر" && title !== "تاريخ الولادة" &&
                    <button className=' mr-2'
                        onClick={() => sortTableData(title)}>
                        <img
                            alt="..."
                            className="inline-block h-3 w-3 "

                            src={sort_img}
                        />
                    </button>}
            </th>
        )
    }
    const TableRow = ({ eleve, hash }: { eleve: Eleve1anneeInfo, hash: number }) => {
        const handle_click = () => {
            const updatedEleves = [...eleves];
            updatedEleves[hash] = { ...updatedEleves[hash], chosen: !eleve.chosen };
            set_eleves(updatedEleves)
            set_all_elvs(false)

        }


        return (

            <tr className=" bg-slate-50 hover:bg-slate-400 border-b border-black  h-6" onClick={handle_click} >
                <td className="border-x border-black  pr-2 align-middle  text-xs  w-12">
                    <input type="checkbox" checked={eleve.chosen ? eleve.chosen : false} onChange={handle_click} />
                </td>
                <td className="border-x border-black  pr-2 align-middle  text-xs  w-12">
                    {hash + 1}
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
                <td className="border-x border-black  text-center align-middle text-xs  w-32">
                    {String(eleve.date_naissance)}
                </td>


            </tr>
        )
    }
    const handle_select_all = () => {
        if (All_elvs_selected) {
            const NewElvs = eleves.map((each_eleve) => {
                return { ...each_eleve, chosen: false }
            })
            set_eleves(NewElvs)
            set_all_elvs(false)
        }
        else {
            const NewElvs = eleves.map((each_eleve) => {
                return { ...each_eleve, chosen: true }
            })
            set_eleves(NewElvs)
            set_all_elvs(true)
        }
    }

    const Select1 = () => {



        return (
            <>

                <div className="absolute top-0  w-full h-screen    bg-white ">
                    <div className="flex flex-col items-center">
                        <span className="mt-10 mr-12 font-semibold text-4xl text-blueGray-700">: اختر التلاميذ الذين سيتم وضعهم في أقسام</span>


                        <table
                            className="items-center  bg-transparent border h-min mr-11 mt-10" dir="rtl">
                            <thead dir="rtl" className=" h-6 border border-black bg-sky-400">
                                <tr>
                                    <th className="pl-4 align-middle">
                                        <input type="checkbox" onChange={handle_select_all} checked={All_elvs_selected} />
                                    </th>
                                    <Threads title={"ع/ر"} />
                                    <Threads title={"المعرف الوحيد"} />
                                    <Threads title={"الإسم"} />
                                    <Threads title={"اللقب"} />
                                    <Threads title={"تاريخ الولادة"} />

                                </tr>
                            </thead>
                            <tbody>
                                {eleves.map((eleve, index) => {
                                    return (<TableRow key={eleve.id} eleve={eleve} hash={index} />)
                                })}

                            </tbody>

                        </table>
                    </div>

                    <div className='fixed bottom-0 mb-5 ml-6 flex  '>
                        <button className=' items-center justify-center text-white bg-green-800 hover:bg-green-700  font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform '
                            onClick={() => set_page(1)}>
                            التالي
                        </button>
                        <button className='flex items-center justify-center text-white bg-red-700 hover:bg-red-600  font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform '
                            onClick={() => redirect("Saisie_Auto", -1)}>
                            رجوع
                        </button>
                    </div>
                </div>


            </>
        )
    }

    const Select2 = () => {


        const [select_val, set_select_val] = useState(2);
        const [arrays, set_arrays] = useState<Eleve1anneeInfo[][]>([])
        const [new_classes_saisie, set_new_classes_saisie] = useState<number[]>([])


        const handleSelect_number_classes = (event: ChangeEvent<HTMLSelectElement>) => {
            set_select_val(Number(event.target.value))
        };

        const handle_algo = () => {
            const displayError = () => { // raka7
                const message = " لديك فقط" + Object.keys(classesprovider).length + " أقسام للسنة الأولى الرجاء اضافة الأقسام الناقصة أوّلا";
                alert(message);
            }

            if (select_val > Object.keys(classesprovider).length) displayError()
            if (select_val > Object.keys(classesprovider).length) return

            const new_arrays: Eleve1anneeInfo[][] = new Array(select_val).fill(null).map(() => []);
            const chosenElvs = eleves.filter(obj => obj.chosen === true)
            const shuffledObjects = [...chosenElvs].sort(() => Math.random() - 0.5);

            for (let i = 0; i < shuffledObjects.length; i++) {
                const arrayIndex = i % select_val;
                new_arrays[arrayIndex].push(shuffledObjects[i]);
            }

            new_arrays.map((each_class) => {
                sortTableData(each_class, "الإسم")
            })


            set_arrays(new_arrays)

        }


        const Handle_options = () => {

            return (
                <>
                    <option value={0}></option>
                    {Object.keys(classesprovider).map((key) => {
                        return (
                            <option key={key} value={key}>{classesprovider[Number(key)]}</option>
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


        function sortTableData(data: Eleve1anneeInfo[], sortBy: string,) {


            return data.sort((a, b) => {
                if (sortBy === "الإسم") {
                    return true ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom);
                }
                else {
                    // Handle other sorting criteria here if needed
                    return 0;
                }

            });

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

        const TableRow = ({ eleve, hash }: { eleve: Eleve1anneeInfo, hash: number }) => {

            return (
                <Draggable key={eleve.id} draggableId={String(eleve.id)} index={eleve.id}>
                    {(provided) => (

                        <tr className="hover:bg-slate-400 border-b-2 border-neutral-600"
                            key={eleve.id}
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
                                {String(eleve.date_naissance)}
                            </td>
                        </tr>
                    )}
                </Draggable>
            )
        }

        const endrop = (result: any) => {
            if (result.destination.droppableId === null) return;
            const eleve_id: Number = Number(result.draggableId);
            const draggedFromTable = Number(result.source.droppableId);
            const targetTableId = Number(result.destination.droppableId);

            console.log(eleve_id)
            console.log(draggedFromTable)
            console.log(targetTableId)

            if (targetTableId !== draggedFromTable) {
                const updatedClasses = [...arrays];

                const sourceTable = updatedClasses[draggedFromTable];
                const targetTable = updatedClasses[targetTableId];

                const draggedRowIndex = sourceTable.findIndex((eleve) => eleve.id === eleve_id);
                console.log(draggedRowIndex)

                if (draggedRowIndex !== -1) {
                    targetTable.push(sourceTable[draggedRowIndex]);
                    sourceTable.splice(draggedRowIndex, 1)

                    const new_classes2 = arrays.map((each_class, index) => {
                        if (index === draggedFromTable) {
                            return sourceTable;
                        } else if (index === targetTableId) {
                            return targetTable;
                        } else {
                            return each_class;
                        }
                    });
                    set_arrays(new_classes2)


                }
                arrays.map((each_class) => {
                    sortTableData(each_class, "الإسم")
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
                            <button className=" bg-slate-300 rounded-xl  px-4" onClick={handle_algo} >تحضير الأقسام</button>
                        </div>
                        <DragDropContext onDragEnd={endrop}>


                            <div className="flex h-full" dir="rtl">
                                {arrays?.map((each_class, index) => {
                                    return (
                                        <div className="flex flex-col items-center px-5 " key={index}>
                                            <div className="border-2 border-b-0 border-neutral-600 w-full ">
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
                                    )
                                })}
                            </div>
                        </DragDropContext>
                    </div>

                </div>
            </>
        )
    }


    return (
        <>
            {page === 0 && <Select1 />}
            {page === 1 && <Select2 />}
        </>
    )

}




export default Saisie_Auto;


<div></div>
