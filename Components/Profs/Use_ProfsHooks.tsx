import { useContext } from 'react';
import { All_MatiereContext, DisplayClassesContext as ClassesContext, Current_ClassDataContext, GoClassContext, ProfsContext, SaisiePageContext, Save_active_profsContext } from '../Profs';



export const useProfsContext = () => {
    return useContext(ProfsContext)
}

export const useSaisiePageContext = () => {
    return useContext(SaisiePageContext)
}

export const useGetAllClasses = () => {
    return useContext(ClassesContext)
}

export const useSave_active_profsContext = () => {
    return useContext(Save_active_profsContext)
}

export const useGoClassContext = () => {
    return useContext(GoClassContext)
}

export const useCurrent_ClassDataContext = () => {
    return useContext(Current_ClassDataContext)
}

export const useAll_MatiereContext = () => {
    return useContext(All_MatiereContext)
}