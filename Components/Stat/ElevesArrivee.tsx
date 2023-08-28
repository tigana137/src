





const ElevesArrivee = () => {


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
                {title}
            </th>
        )
    }

    return (
        <div dir="rtl" style={{ backgroundColor: '#2e5e79', color: '#1B548D' }}
            className="bg-sky-700 pb-5 pt-5 mt-5">
            <div className="flex flex-col mx-10 mt-7 rounded-md border ">

                <div style={{ backgroundColor: '#E6F0F3', color: '#1B548D' }}
                    className=" w-full rounded-t-md  border-b font-medium border-gray-500"
                >التلاميذ القادمون من مدارس أخرى
                </div>

                <div style={{ minHeight: '20rem' }}
                    className="flex flex-col bg-white  items-center  pt-5">

                    <button style={{ backgroundColor: '#00172F' }}
                        className="  text-white text-xs font-medium rounded-md px-1 py-1 w-20 h-8">إضافة تلميذ </button>
                    <table>
                        <thead dir="rtl">
                            <tr>
                                <Threads title={"ع/ر"} />
                                <Threads title={"المعرف الوحيد"} />
                                <Threads title={"الاسم و اللقب"} />
                                <Threads title={"الجنس"} />
                                <Threads title={"المستوى التعليمي"} />
                                <Threads title={"الحالة"} />
                                <Threads title={"تاريخ القدوم"} />
                                <Threads title={"اسم المدرسة التي قدم منها"} />
                                <Threads title={"المندوبية"} />
                                <Threads title={"المعتمدية"} />

                            </tr>
                        </thead>
                    </table>
                </div>

            </div>

        </div>
    )


}






export default ElevesArrivee;