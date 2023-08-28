import { useState } from "react";
import { Link } from "react-router-dom";




interface Props {
    school_name: string,
    Nav_Enabled: boolean,
    Links: string[],
}

const NavBar = ({ school_name, Nav_Enabled, Links }: Props) => {
    const [clicked_element, set_clicked_element] = useState(-1);

    interface HeaderProps {
        titre: string;
    }

    const HeaderComponent = ({ titre }: HeaderProps) => {
        return (
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                {titre}
            </h6>
        );
    };


    interface NavigationProps {
        titre: string;
        index: number;
    }

    const NavigationComponent = ({ titre, index }: NavigationProps) => {
        return (
            <li className={"items-center  rounded-lg " + (Nav_Enabled && "hover:bg-cyan-100 ") + (index === clicked_element && 'bg-cyan-300 hover:bg-cyan-300')}
                onClick={() => clicked_element !== index ? set_clicked_element(index) : set_clicked_element(-1)}
            >
                <div
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (window.location.href.indexOf("/admin/dashboard") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                    }
                >
                    <i
                        className={
                            "fas fa-tv mr-2 text-sm " +
                            (window.location.href.indexOf("/admin/dashboard") !== -1
                                ? "opacity-75"
                                : "text-blueGray-300")
                        }
                    ></i>{" "}
                    {titre}
                </div>
            </li>
        );
    };


    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    <div
                        className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "}
                    >
                        {/* header */}
                        <div className="md:min-w-full  block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div
                                className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                                {"المدرسة الإبتدائيّة" + (" " + school_name)}
                            </div>
                        </div>

                        {/* Divider */}
                        {/* Heading */}
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <Link to={Nav_Enabled ? Links[0] : '/none'}>
                                <NavigationComponent titre="الصفحة الرئيسية" index={-1} />
                            </Link>
                        </ul>
                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <HeaderComponent titre="تحضير السنة الدراسية" />
                        {/* Navigation */}
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <Link to={Nav_Enabled ? Links[1] : '/none'}>
                                <NavigationComponent titre="إرتقاء التلاميذ للمستوى التالي" index={0} />
                            </Link>
                            <Link to={Nav_Enabled ? Links[2] : '/none'}>
                                <NavigationComponent titre="إسناد مواد المعلمين" index={1} />
                            </Link>
                            <NavigationComponent titre=" تلاميذ السنة الأولى المسجلين " index={2} />
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <HeaderComponent titre="منظومة الإحصاء المدرسي" />
                        {/* Navigation */}
                        <ul>
                            <Link to={Nav_Enabled ? Links[3] : '/none'}>
                                <NavigationComponent titre=" الإحصاء المدرسي 1 نوفمبر " index={3} />
                            </Link>
                            <NavigationComponent titre="نتائج اخر السنة 30 جوان" index={4} />
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <HeaderComponent titre="نتاج أخر السنة" />
                        {/* Navigation */}
                        <ul>
                            <NavigationComponent titre="محضر مجلس الأقسام" index={5} />
                        </ul>


                    </div>
                </div>
            </nav >

        </>
    )



}


export default NavBar;