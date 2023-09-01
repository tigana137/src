import { ParamsProp, UseParams, UseUrl } from '../App';
import madrasati from '../assets_img/madrasati.png'
import stat from '../assets_img/stat.png'

import { useState } from "react";




const Logins = ({Onsubmit}:{Onsubmit: Function}) => {
    const ngrok = UseUrl()

    const params = UseParams();
    const [formData, setFormData] = useState<ParamsProp>(params);
    const [Onsubmit_Loding, set_submit_loding] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handle_submit = async () => {
        set_submit_loding(true)
        const displayError = () => { // raka7
            const message = "الرجاء التثبت من المعلومات";
            alert(message);
        }
        try {
            const response = await fetch(ngrok+"/login_handler/verify_logins/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                // Handle non-successful responses if needed
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            data ? Onsubmit(formData) : displayError()

        } catch (error) {
            console.error(error);
        }

        set_submit_loding(false)
    }


    return (
        <div className="absolute top-0 w-full h-full bg-blueGray-800">
            <div className="flex flex-col justify-center w-screen h-screen items-center ">
                <div className="flex justify-center w-full h-4/5 items-center  space-x-48">
                    <div className=" flex flex-col  shadow-lg   w-2/6  ">
                        <div className=" flex flex-col  w-full  shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div dir='rtl' className="rounded-t mb-0 px-6 py-6 flex items-center justify-center">

                                <div className="btn-wrapper text-center  h-16 w-16 ml-10">
                                    <img
                                        alt="..."
                                        className="mr-1 h-full w-full"
                                        src={madrasati}
                                    />
                                </div>
                                <div className="text-center mb-3">
                                    <h1 className="text-blueGray-500  text-xl ">
                                        {params.school_name}
                                    </h1>
                                </div>

                            </div>
                            <hr className=" border-b-0 borb border-blueGray-300 mx-8 mb-2" />
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <div className=" text-sm">وضع  بيانات  موقع  مدرستي</div>
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        <div dir="rtl" className="text-lg">الإسم</div>
                                    </label>
                                    <input
                                        type="text"
                                        className="text-right border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="الإسم"
                                        name="saisieprenom" value={formData.saisieprenom} onChange={handleChange}
                                    />
                                </div>

                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        <div dir="rtl" className="text-lg">اللقب</div>
                                    </label>
                                    <input
                                        type="text"
                                        className="text-right border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="اللقب"
                                        name="saisienom" value={formData.saisienom} onChange={handleChange}
                                    />
                                </div>

                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        <div className=" text-right text-lg" >كلمة السر</div>

                                    </label>
                                    <input
                                        type="password"
                                        className="text-right border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="كلمة السر"
                                        name="saisiepasswd" value={formData.saisiepasswd} onChange={handleChange}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-col  shadow-lg   w-2/6  ">
                        <div className=" flex flex-col  w-full  shadow-lg rounded-lg pb-16 bg-blueGray-200 border-0">
                            <div dir='rtl' className="rounded-t mb-0 px-6 py-6 flex items-center justify-center">

                                <div className="btn-wrapper text-center  h-16 w-16 ml-10">
                                    <img
                                        alt="..."
                                        className="mr-1 h-full w-full"
                                        src={stat}
                                    />
                                </div>
                                <div className="text-center ">
                                    <h1 className="text-blueGray-500  text-xl ">
                                        منظومة الإحصاء المدرسي
                                    </h1>
                                </div>

                            </div>
                            <hr className=" border-b-0 borb border-blueGray-300 mx-8 mb-2" />
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small> وضع معطيات الدخول </small>
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        <div dir="rtl" className="text-lg ">إسم المستخدم</div>
                                    </label>
                                    <input
                                        type="text"
                                        className="text-right border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="إسم المستخدم"
                                        name="login" value={formData.login} onChange={handleChange}
                                    />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        <div className=" text-right text-lg" >كلمة العبور</div>

                                    </label>
                                    <input
                                        type="password"
                                        className="text-right border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="كلمة العبور"
                                        name="mp" value={formData.mp} onChange={handleChange}
                                    />
                                </div>
                                <div dir="rtl">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                            <div>العبور بدون الإحصاء</div>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex-1 h-1/5">
                    <button className="  bg-slate-200  h-14 w-24 rounded-xl" onClick={handle_submit} disabled={Onsubmit_Loding}>
                        {!Onsubmit_Loding && <div> دخول </div>}
                        {Onsubmit_Loding && <div className=" mb-4 w-9 h-9 w border-t-4 border-blue-500 rounded-full animate-spin  content-center ml-7 mt-2"></div>}
                    </button>
                </div>
            </div>
        </div>
    );
}




export default Logins;        