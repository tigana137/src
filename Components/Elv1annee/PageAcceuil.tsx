import { useEffect, useState } from "react";
import { Eleve1anneeInfo, Classes1anneeInfo } from "../Elv1annee";
import sort_img from '../../assets_img/sorting2.png'
import { useElevesContext, useFinalSaveContext, useGetAllClasses, useRedirectContext } from "./Use_Elv1Hook";







const PageAcceuil = () => {
    const classesprovider = useGetAllClasses();
    const elevesprovider = useElevesContext();
    const handle_redirect = useRedirectContext();
    const FinalSave = useFinalSaveContext()


    const [Enable_buttons, set_buttons] = useState(true);
    const [loading_anim, set_loading_anim] = useState(0);


    const [eleves, set_eleves] = useState<Eleve1anneeInfo[]>([]);
    const [classes, set_classes] = useState<Classes1anneeInfo>({});

    const [sorted_column, set_sorted_column] = useState("nom");
    const [asc_desc, set_asc_desc] = useState(true);


    useEffect(() => {
        set_classes(classesprovider)
        set_eleves(elevesprovider)

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
                <td className="border-x border-black  text-center align-middle text-xs  w-32">
                    {String(eleve.date_naissance)}
                </td>
                <td className="border-x border-black  text-center align-middle  text-xs  w-32 ">
                    {eleve.next_class ? classes[eleve.next_class] : "لم يتم اسناد قسم"}
                </td>


            </tr>
        )
    }




    const handle_click = async (choice: number) => {
        set_buttons(false);
        set_loading_anim(choice);
        await FinalSave(choice);
        set_buttons(true);
        set_loading_anim(0);

    };



    return (
        <>
            <div className="absolute top-0 w-full h-screen bg-white " dir="rtl">

                <div className="relative w-full px-1 max-w-full flex-grow flex-1 mt-12 mr-11">
                    <h1 className="font-semibold text-4xl text-blueGray-700">
                        قائمة تلاميذ السنة الأولى المسجلين عن بعد :
                    </h1>

                </div>

                <table
                    className="items-center  bg-transparent border h-min mr-11 mt-10" dir="rtl">
                    <thead dir="rtl" className=" h-6 border border-black bg-sky-400">
                        <tr>
                            <Threads title={"ع/ر"} />
                            <Threads title={"المعرف الوحيد"} />
                            <Threads title={"الإسم"} />
                            <Threads title={"اللقب"} />
                            <Threads title={"تاريخ الولادة"} />
                            <Threads title={"يذهب إلى قسم"} />

                        </tr>
                    </thead>
                    <tbody>
                        {eleves.map((eleve, index) => {
                            return (<TableRow key={eleve.id} eleve={eleve} hash={index + 1} />)
                        })}

                    </tbody>

                </table>

            </div>
            <div className='fixed bottom-0 mb-5 ml-6 flex  '>
                <button className={'flex items-center justify-center text-white bg-blue-300 cursor-not-allowed font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform '}
                    disabled={!Enable_buttons} onClick={() => { }}>
                    {loading_anim === 2 ?
                        <div className='ml-2 '>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </div>
                        : "التسجيل النهائي"}

                </button>
                <button className={"flex items-center justify-center text-white bg-green-800  font-medium rounded-lg text-sm  mr-2 mb-2 w-32 h-11 transition-transform " + (Enable_buttons && 'hover:bg-green-700 outline-none focus:ring-4 shadow-lg transform active:scale-75 ') + (!Enable_buttons && ' ')}
                    disabled={!Enable_buttons} onClick={() => handle_redirect("PageAcceuil")}>
                    {loading_anim === 1 ?
                        <div className='ml-2 '>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </div>
                        : "اسناد التلاميذ"}
                </button>
                <button className={'flex items-center justify-center text-white bg-red-700  font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform ' + (Enable_buttons && 'hover:bg-red-500 outline-none focus:ring-4 shadow-lg transform active:scale-75 ') + (!Enable_buttons && '  ')}
                    disabled={!Enable_buttons} onClick={() => handle_click(-1)}>
                    {loading_anim === -1 ?
                        <div className='ml-2 '>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </div>
                        : "إعادة الإعدادات"
                    }
                </button>
            </div>
        </>
    )
}







export default PageAcceuil;