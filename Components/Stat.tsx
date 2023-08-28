import { ReactNode } from "react";





interface ProfsHandlerProps {
    children: ReactNode;
}

const StatHandler: React.FC<ProfsHandlerProps> = ({ children }: { children: ReactNode }) => {







    return (
        <>
            {children}
        </>
    )


}

export default StatHandler;
