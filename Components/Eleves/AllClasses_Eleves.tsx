import { useEffect, useState } from 'react';
import { ClassInfo, } from '../Classes'
import { useFinalSaveContext, useGetAllClasses, useGoClassContext } from "./Use_ClassHooks";






//--!
const AllClasses_Eleves = () => {
    const classes = useGetAllClasses();
    const handle_redirect = useGoClassContext();

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
                    {level_index < 6 && level_index > 0 && <button className=' h-10 px-1 border-2 border-slate-500 bg-neutral-200 rounded-lg hover:bg-slate-400' onClick={() => handle_redirect({ Component: "AllClasses", level_index: level_index, classe_index: -1 })}>غلط جميع التلاميذ</button>}
                </td>
            </tr>
        )
    }



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
                <div className='fixed bottom-0 mb-5 ml-6  '>
                    <button className='text-white bg-blue-300 cursor-not-allowed font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11' onClick={() => FinalSave(2)}>التسجيل النهائي</button>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm  mr-2 mb-2 w-32 h-11" onClick={() => FinalSave(1)}>تسجيل التغييرات</button>
                    <button className='text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11' onClick={() => {FinalSave(-1)}}>إعادة الإعدادات</button>
                    <button
                        className='text-white  bg-amber-600 hover:bg-amber-700  rounded-lg  text-xs  text-center mr-3  h-11 w-32 '
                        onClick={() => handle_redirect({ Component: "AllClasses", })}>
                        <div className="flex flex-col items-center justify-center h-11 w-32">

                            <span className=' block  h-2 top-0'> قائمات التلاميذ</span>
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



