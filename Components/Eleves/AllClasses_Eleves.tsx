import { useState } from 'react';
import { ClassInfo, } from '../Classes'
import { useFinalSaveContext, useGetAllClasses, useGoClassContext } from "./Use_ClassHooks";






//--!
const AllClasses_Eleves = () => {
    const classes = useGetAllClasses();
    const handle_redirect = useGoClassContext();
    const [Enable_buttons, set_buttons] = useState(true);
    const [loading_anim, set_loading_anim] = useState(0);
    const FinalSave = useFinalSaveContext()

    const Threads = ({ title }: { title: string }) => {
        return (
            <th dir="rtl"
                className={
                    " pr-3 align-middle border border-solid border-slate-800 py-3 text-s text-sm uppercase  whitespace-nowrap font-bold text-right " +
                    (true
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
            >
                {title}
            </th>
        )
    }

    const TableRow = ({ level_index, classes_level }: { level_index: number; classes_level: ClassInfo[] }) => {
        const levels_name = ["التحضيري", "الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"]
        return (
            <tr className=' border border-slate-800 h-24 '>
                <td className='  pr-10 border border-slate-800 '>
                    <div className=" text-indigo-600 pb-3 text-2xl   w-60">{"أقسام السنة " + levels_name[level_index]}</div>
                </td>
                <td className="  px-5 border border-slate-800">
                    <div className=''>
                        {classes_level.map((classe, index) => {
                            return (
                                <span className=' h-16' key={index}>

                                    <button className={"h-12 items-center justify-center border-2 border-slate-500  rounded-lg hover:bg-slate-400 px-5 mx-5 bg-neutral-200"} dir="rtl"
                                        key={index} onClick={() => handle_redirect({ Component: "AllClasses", level_index: level_index, classe_index: index })}
                                    >
                                        <span className='text-lg'>{classe.name}</span>
                                        <span>
                                            <input className=" mr-2 " type="checkbox" checked={classe.is_examned} readOnly={true} />
                                        </span>

                                    </button>

                                </span>
                            )

                        })}
                    </div>

                </td>
                <td className='flex  justify-center items-center mt-7  '>
                    {level_index < 6 && level_index > 0 && <button className=' h-10 px-1 border-2 border-slate-500 bg-neutral-200 rounded-lg hover:bg-slate-400' onClick={() => handle_redirect({ Component: "AllClasses", level_index: level_index, classe_index: -1 })}>خلط جميع التلاميذ</button>}
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
            <div className="absolute top-0 w-full h-screen bg-white ">
                <div >
                    <div className="p-5 text-3xl" dir="rtl">
                        الأقسام حسب المستوى :
                    </div>

                    <div className='flex items-center justify-center w-5/6'>
                        <table className="  bg-transparent border  " dir="rtl">
                            <thead dir="rtl">
                                <tr>
                                    <Threads title={"المستوى"} />
                                    <Threads title={"أقسام المستوى"} />
                                    <Threads title={"غلط جميع تلاميذ المستوى"} />
                                </tr>
                            </thead>
                            <tbody className=''>
                                {classes?.map((level_classes, index) => {
                                    return (<TableRow key={index} level_index={index} classes_level={level_classes} />)
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='fixed bottom-0 mb-5 ml-6 flex  '>

                    <button className={'flex items-center justify-center text-white bg-blue-300 cursor-not-allowed font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform '}
                        disabled={!Enable_buttons} onClick={() => handle_click(2)}>
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
                        disabled={!Enable_buttons} onClick={() => handle_click(1)}>
                        {loading_anim === 1 ?
                            <div className='ml-2 '>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                            </div>
                            : "تسجيل التغييرات"}
                    </button>
                    <button className={'flex items-center justify-center text-white bg-red-700  font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform ' + (Enable_buttons && 'hover:bg-red-500 outline-none focus:ring-4 shadow-lg transform active:scale-75 ') + (!Enable_buttons && '  ')}
                        disabled={!Enable_buttons} onClick={() => { handle_click(-1) }}>
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
                    <button
                        className={'flex items-center justify-center text-white  bg-amber-700   rounded-lg  text-xs  text-center mr-3  h-11 w-32 transition-transform ' + (Enable_buttons && 'hover:bg-amber-600')}
                        disabled={!Enable_buttons} onClick={() => handle_redirect({ Component: "AllClasses", })}>
                        <div className="flex flex-col items-center justify-center h-11 w-32">
                            <span className=' block h-2 top-0'> قائمات التلاميذ</span>
                            <span className=' block w-32 h-2'>  لـالسنة الجديدة</span>
                        </div>
                    </button>
                </div>

            </div>
        </>
    )






}
//<button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>

export default AllClasses_Eleves;



