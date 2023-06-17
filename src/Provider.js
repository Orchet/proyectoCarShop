import { createContext, useReducer, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext (AppContext);
}

const objetosBase = {
    cliente:{
        nombre: '', 
        email: '', 
        celular: '', 
        tipoid: '--Seleccione opcion--', 
        identificacion: ''        
    },
    vehiculo:{
        marca: '', 
        modelo: '', 
        placa: '', 
        nivel: '', 
        observacion: ''   
    },
    servicio:{
        lavado: '',
        frenos: '',
        aceite: '',
        amortiguadores: '',
        electrico: ''
    }   
}

const reducer = (objeto, pantalla) => {
    switch (pantalla.type) {
        case 'Pantalla_Cliente': {
            return {...objeto, cliente: pantalla.value}}
            
        case 'Pantalla_Vehiculo': {
            return {...objeto, vehiculo: pantalla.value}}

        case 'Pantalla_Servicio': {
            return {...objeto, servicio: pantalla.value}}

        case 'Carga_Inicial':
            return {...objetosBase,}

        default:
            return objeto
    }    
}

export default function AppProvider ({children}) {
    const [opcion, dispatch] = useReducer(reducer, objetosBase);

    return (
        <AppContext.Provider value={{opcion, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}