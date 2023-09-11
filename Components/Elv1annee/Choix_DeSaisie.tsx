import { useRedirectContext } from "./Use_Elv1Hook";








const Choix_DeSaisie_Elv1 = () => {
    const redirect = useRedirectContext();

    return (
        <>
            <div className=" absolute top-0 w-full h-screen flex flex-col justify-center items-center bg-transparent">

                <div className=" text-4xl mb-20  "> إختر طريقة الإسناد</div>
                <div className="flex w-max">
                    <div className="flex flex-col">
                        <button className="border-2 border-slate-800  rounded-lg hover:bg-slate-400 h-12 text-2xl m-4 p-2 w-64 px-10" onClick={() => redirect("Choix_DeSaisie", 2)} >إسناد يدوي </button>
                        <span className=" pr-5 text-gray-400 text-lg italic">اسناد كلّ تلميذ الى قسم معيّن يدويّا*</span>

                    </div>
                    <div className="border-l border-black h-20"></div>
                    <div className="flex flex-col">
                        <button className="border-2 border-slate-800  rounded-lg hover:bg-slate-400 h-12 text-2xl w-64  m-4 p-2" onClick={() => redirect("Choix_DeSaisie", 1)}>  اسناد تلقائي </button>
                        <span className=" pr-5 text-gray-400 text-lg italic" dir="rtl">* اسناد التلاميذ المختارة الى</span>
                        <span className=" pr-10 text-gray-400 text-lg italic" dir="rtl"> الأقسام المعيّنة أليّا </span>
                    </div>

                </div>
            </div>

            <div className='fixed bottom-0 mb-5 ml-6 flex  '>
             
                <button className=' items-center justify-center text-white bg-red-700  font-medium rounded-lg text-sm  text-center mr-3 w-32 h-11 transition-transform '
                    onClick={() => redirect("Choix_DeSaisie", -1)}>
                    رجوع
                </button>
            </div>
        </>
    )

}







export default Choix_DeSaisie_Elv1;