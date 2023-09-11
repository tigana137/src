import { useSaisiePageContext } from "./Use_ProfsHooks";







const Choix_DeSaisie_Prof = () => {
    const Displaypage = useSaisiePageContext();
    return (
        <>
            <div className=" absolute top-0 w-full h-screen flex flex-col justify-center items-center bg-transparent">

                <div className=" text-4xl mb-20  "> إختر طريقة الإسناد</div>
                <div className="flex w-max">
                    <button className="border-2 border-slate-800  rounded-lg hover:bg-slate-400 h-12 text-2xl m-4 p-2 px-10" onClick={() => Displaypage(3)} >إسناد حسب القسم</button>
                    <div className="border-l border-black h-20"></div>
                    <button className="border-2 border-slate-800  rounded-lg hover:bg-slate-400 h-12 text-2xl  m-4 p-2" onClick={() => Displaypage(5)}>تغيير اسناد معلم بمعلم اخر</button>

                </div>

                <div className='flex  fixed bottom-0 my-5 ml-5 mr-4 px-1'>

                    <button className='text-white bg-blue-300 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3' onClick={() => { }}>التسجيل النهائي</button>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-3  " onClick={() => { }}>تسجيل التغييرات</button>
                    <button className='text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3' onClick={() => { }}>إعادة الإعدادات</button>


                </div>
            </div>
        </>
    )
}


export default Choix_DeSaisie_Prof;