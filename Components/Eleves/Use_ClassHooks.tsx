import { useContext } from 'react';
import { ClassesContext, All_ElevesContext, Display_AllClassesContext, GoClassContext, ElevesSaisie_Context, Set_ClassesContext, Current_ClassContext, FinalSaveContext } from '../Classes';



export const useGetAllClasses = () => {
    return useContext(ClassesContext);
};


export const useElevesContext = () => {
    return useContext(All_ElevesContext)
}


export const useAllClasses_Displayed = () => {
    return useContext(Display_AllClassesContext)
}

export const useGoClassContext = () => {
    return useContext(GoClassContext)
}

export const useSet_ClassesContext = () => {
    return useContext(Set_ClassesContext)
}

export const useCurrent_ClassesContext = () => {
    return useContext(Current_ClassContext)
}

export const useElevesSaisie_Context = () => {
    return useContext(ElevesSaisie_Context)
}

export const useFinalSaveContext = () => {
    return useContext(FinalSaveContext)
}






