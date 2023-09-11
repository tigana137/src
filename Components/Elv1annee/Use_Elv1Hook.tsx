import { useContext } from 'react';
import { All_ElevesContext, ClassesContext, FinalSaveContext, RedirectContext } from '../Elv1annee';




export const useGetAllClasses = () => {
    return useContext(ClassesContext);
};


export const useElevesContext = () => {
    return useContext(All_ElevesContext)
}

export const useFinalSaveContext = () => {
    return useContext(FinalSaveContext)
}


export const useRedirectContext = () => {
    return useContext(RedirectContext)
}