import { useEffect, useState } from "react";
import { UseParams, UseUrl } from "../App";




const PreSetup = ({ set_Nav }: { set_Nav: Function }) => {
    const ngrok = UseUrl();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const params = UseParams();

    useEffect(() => {
        const fetchData = async () => { //retouche
            try {
                const response = await fetch(ngrok+'/login_handler/initiate_data2/');
                if (!response.ok) {
                    <Error />
                }
                setIsLoading(false);
                set_Nav()
            } catch (error: unknown) {
                setError(error as Error);
                setIsLoading(false);
            }
        };

        const fetchData2 = async () => { //retouche
            try {
                const response = await fetch(ngrok+"/login_handler/initiate_data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(params)
                });

                if (!response.ok) {
                    // Handle non-successful responses if needed
                    <Error />
                }

                const data = await response.json();
                if (data) {
                    setIsLoading(false)
                    set_Nav()
                }
                else {
                    let myCustomError = Error();
                    throw myCustomError;
                }
            } catch (error) {
                setError(error as Error);
                setIsLoading(false);
            }
        };
        fetchData2();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        null
    )



}
export default PreSetup;



const Loading = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="mb-4 w-32 h-32 w border-t-4 border-blue-500 rounded-full animate-spin">
                </div>
                <div>
                    Loading
                </div>
            </div>
        </>
    )
}


const Error = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className=" text-4xl  text-red-500">
                    وجد خطأ عند تحميل البيانات الرجاء الاتصال بـ
                </div>
            </div>
        </>
    )
}