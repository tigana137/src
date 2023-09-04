
import { useState, useEffect, useRef } from "react";
import { UseUrl, UseParams } from "../../App";
import { useGoClassContext } from "./Use_ClassHooks";
import { useReactToPrint } from "react-to-print";

export interface ClassInfo2 {
    id: number;
    name: string;
    level: string;
}

interface MyDictionary {
    id: number;
    name: string;
    level: string;
}


const AllNextClasses = () => {
    const ngrok = UseUrl();
    const params = UseParams();


    const handle_redirect = useGoClassContext();
    const [classes, set_classes] = useState<MyDictionary[][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ngrok + "/login_handler/presetup/get_all_classes2/" + String(params.sid) + "?format=json");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                set_classes(jsonData)
                // console.log(jsonData)
            } catch (error: unknown) {
            }
        };


        fetchData()

    }, [])


    const Class_Card = ({ level_index, classes_level }: { level_index: number; classes_level: MyDictionary[] }) => {
        const levels_name = ["التحضيري", "الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"]

        return (
            <div className=" flex  p-5 ">
                <div className='flex  pr-10'>
                    <div className=" text-indigo-600 pb-3 text-2xl   w-60">{"أقسام السنة " + levels_name[level_index]}</div>
                    <div className='text-indigo-600 text-2xl '>:</div>
                </div>
                <div className="flex justify-end px-5 ">
                    {classes_level.map((class_, index) => {
                        return (
                            <button className={"flex items-center justify-center  border-2 border-slate-400  rounded-lg hover:bg-indigo-400 px-5 mx-5 bg-slate-200"} dir="rtl" key={index} onClick={() => handle_redirect({ Component: "AllNextClasses", level_index: level_index, classe_index: index })}>
                                <p>{class_.name}</p>
                            </button>
                        )

                    })}


                </div>
            </div>
        );
    };






    return (
        <>
            <div className="absolute top-0 w-full h-screen ">
                <div >
                    <div className="p-5 text-3xl" dir="rtl">
                        الأقسام حسب المستوى :
                    </div>
                    <div className=" flex flex-col" dir="rtl">

                        {classes?.map((level_classes, index) => {
                            return (<Class_Card key={index} level_index={index} classes_level={level_classes} />)
                        })}
                    </div>

                </div>
            </div>
            <div className='flex  fixed bottom-0  my-5 ml-5 mr-4 px-1'>
                <div className=" ">

                    <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={() => handle_redirect({ Component: "AllNextClasses", })}> رجوع </button>
                </div>
            </div>
        </>
    )

}

export default AllNextClasses;




