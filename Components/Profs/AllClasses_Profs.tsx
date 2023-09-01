import { ClassInfo } from "../Profs";
import { useGetAllClasses, useGoClassContext, useSaisiePageContext } from "./Use_ProfsHooks";





const AllClasses_Profs = () => {
    const classes = useGetAllClasses();
    const Displaypage = useSaisiePageContext();
    const Redirect = useGoClassContext();
    

    const levels_name = ["التحضيري", "الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"]

    const Class_Card = ({ level_index, classes_level }: { level_index: number; classes_level: ClassInfo[] }) => {
        return (
            <div className=" flex  p-5 ">
                <div className='flex  pr-10'>
                    <div className=" text-indigo-600 pb-3 text-2xl   w-60">{"أقسام السنة " + levels_name[level_index]}</div>
                    <div className='text-indigo-600 text-2xl '>:</div>
                </div>
                <div className="flex justify-end px-5 ">
                    {classes_level.map((class_, index) => {
                        return (
                            <button className={"flex items-center justify-center  border-2 border-slate-400  rounded-lg hover:bg-indigo-400 px-5 mx-5 bg-slate-200"} dir="rtl" key={index} onClick={() => Redirect({ Component: "AllClasses_Profs", level_index: level_index, class_id: class_.id })}>
                                <p>{class_.name}</p>

                                <input className=" mr-2 " type="checkbox" checked={class_.is_examned} readOnly={true} />
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
                            return (<Class_Card level_index={index} classes_level={level_classes} />)
                        })}
                    </div>
                   
                </div>
            </div>
            <div className='flex  fixed bottom-0  my-5 ml-5 mr-4 px-1'>
                <div className=" ">

                    <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={() => Displaypage(2)}> رجوع </button>
                </div>
            </div>
        </>
    )
}


export default AllClasses_Profs;