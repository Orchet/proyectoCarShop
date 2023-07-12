import React, { useState } from 'react';
import { useAppContext } from './Provider.js';
import Vehiculo from './Vehiculo.js';
import OrdenProceso from './OrdenProceso.js'

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  sessionToken: process.env.AWS_SESSION_TOKEN
  });


 const Servicios = () => {

    let orientacion = '';  

    const {opcion, dispatch} = useAppContext();

    const [lavado, setLavado] = useState(opcion.servicio.lavado);
    const [frenos, setFrenos] = useState(opcion.servicio.frenos);
    const [aceite, setAceite] = useState(opcion.servicio.aceite);
    const [amortiguadores, setAmortig] = useState(opcion.servicio.amortiguadores);
    const [electrico, setElectrico] = useState(opcion.servicio.electrico);

    const [navPantallas, setNavPantallas] =  useState({
      atras: false,
      adelante: false
    });

    const handleClick = (event) => {
      orientacion = event.target.id;    
    };


    const handleSubmit = (e) => {
      e.preventDefault();

      const datos_servicio = { 
         lavado, 
         frenos, 
         aceite, 
         amortiguadores, 
         electrico
       };
      dispatch({
          type: 'Pantalla_Servicio',
          value: datos_servicio  
      });  

      if(orientacion === 'adelante') {
           setNavPantallas({...navPantallas, ['atras']:false, ['adelante']:true})
      } else if(orientacion === 'atras') {
           setNavPantallas({...navPantallas, ['atras']:true, ['adelante']:false})
      };  
    };    


    if(navPantallas.atras === false  &&  navPantallas.adelante === true){
      return (<div> <OrdenProceso /> </div>)
    } else if(navPantallas.atras === true  && navPantallas.adelante === false) {
      return (<div> <Vehiculo /> </div>)
    };


    return (      
       <div>
          <form className='formulario' onSubmit ={handleSubmit}>
              <div>
                <h2>Catalogo de Servicios</h2>
              </div>          
              <div className='texto-izquierda' >
                  <div className='contenedor_check'>                  
                      <input name="lavado" id="lavado" type="checkbox" className='mycheck' 
                                  onChange={(e)=> setLavado( (e.target.checked) ? 'Lavado y Aspirado' : '')} 
                                  checked={lavado.length > 0}  />   
                      <label className='label2'>Lavado y Aspirado</label>               
                  </div>    
                  <div className='contenedor_check'>                          
                      <input name="frenos" id="frenos" type="checkbox" className='mycheck' 
                              onChange={(e)=> setFrenos( (e.target.checked) ? 'Revision/Cambio de Frenos' : '')} 
                              checked={frenos.length > 0} />   
                      <label>Revision/Cambio de Frenos</label>
                  </div>
                  <div className='contenedor_check'>                  
                      <input name="aceite" id="aceite" type="checkbox" className='mycheck' 
                              onChange={(e)=> setAceite( (e.target.checked) ? 'Cambio de Aceite' : '')} 
                              checked={aceite.length > 0} />   
                      <label>Cambio de Aceite</label> 
                  </div>
                  <div className='contenedor_check'>                  
                      <input name="amort" id="amort" type="checkbox" className='mycheck' 
                              onChange={(e)=> setAmortig( (e.target.checked) ? 'Cambio de Amortiguadores' : '')} 
                              checked={amortiguadores.length > 0} />    
                      <label>Cambio de Amortiguadores</label>
                  </div>
                  <div className='contenedor_check'>                  
                      <input name="electrico" id="electrico" type="checkbox" className='mycheck' 
                              onChange={(e)=> setElectrico( (e.target.checked) ? 'Chequeo Sistema Electrico' : '')} 
                              checked={electrico.length > 0} />  
                      <label>Chequeo Sistema Electrico</label>
                  </div> 
              </div>    
              <div className='button-container'>
                <button id='atras'    type='submit' onClick={handleClick}>Regresar</button>                              
                <button id='adelante' type='submit' onClick={handleClick}>Orden de Trabajo</button>                 
              </div>                            
          </form>
       </div>
    );
 }

export default Servicios;
