import { useEffect, useState } from "react";
import { UseUrl } from "../App";

interface Props {
    Onsubmit: Function;
}


const Insert_ecole_id = ({ Onsubmit }: Props) => {
    const ngrok = UseUrl()

    const [ecole_id, set_ecole_id] = useState("");
    const [error_IsNaN, set_error_IsNaN] = useState(false)
    const [error_sid, set_error_sid] = useState(false)

    useEffect(() => {
        if (ecole_id.length === 6 && !isNaN(Number(ecole_id))) {
            fetch_ecole_id();
        }
    }, [ecole_id])

    const fetch_ecole_id = () => {

        fetch(ngrok+'/login_handler/verify_school_id/' + ecole_id)
            .then(response => response.json())
            .then(data => {
                if (data.bool) {
                    Onsubmit(data.sid, data.school_name, data.pr_nom, data.pr_prenom, data.url)
                }
                else if (!data.bool) {
                    set_error_sid(true)
                }
            }
            )
    }


    const handle_input_id = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        if (!isNaN(Number(value))) {
            set_error_IsNaN(false)
            set_error_sid(false)
            set_ecole_id(value)

        }
        else {
            set_error_IsNaN(true)
        }
    }



    return (
        <div className="flex justify-center items-center h-screen w-screen bg-blueGray-800">
            <div className="flex-col items-end shadow-lg w-3/12">
                <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                            <div className="text-blueGray-500 text-2xl font-bold">
                                أدخل رمز المدرسة
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0  h-28">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                            </label>
                            <input
                                type="text"
                                className="text-center autofocus border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="84 - - - -"
                                maxLength={6}
                                // value={842920}
                                onKeyUp={handle_input_id}
                                autoFocus
                            />
                            {error_IsNaN && <div dir="rtl" className=" text-center text-red-500 pt-3">رمز المدرسة يحتوي على أرقام فقط</div>}
                            {error_sid && <div dir="rtl" className=" text-center text-red-500 pt-3">رمز المدرسة خاطأ الرجاء التثبت</div>}
                        </div>




                    </div>
                </div>



            </div>
        </div>
    )
}

export default Insert_ecole_id;