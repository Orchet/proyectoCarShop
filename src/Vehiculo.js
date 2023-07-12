import React,  { useState } from 'react';
import AWS from 'aws-sdk';
import { useAppContext } from './Provider.js';
import {Comboid} from './catalogos.js';
import Servicios from './Servicios.js';
import Cliente from './Cliente.js';

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  sessionToken: process.env.AWS_SESSION_TOKEN
  });


AWS.config.update ({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  sessiontoken: process.env.REACT_APP_AWS_SESSION_TOKEN
});

 const Vehiculo = () => {
    
    let orientacion = '';  

    const {opcion, dispatch} = useAppContext();

    const [marca, setMarca] = useState(opcion.vehiculo.marca);
    const [modelo, setModelo] = useState(opcion.vehiculo.modelo);
    const [placa, setPlaca] = useState(opcion.vehiculo.placa);
    const [nivel, setNivel] = useState(opcion.vehiculo.nivel);
    const [observacion, setObservacion] = useState(opcion.vehiculo.observacion);


    const [navPantallas, setNavPantallas] =  useState({
      atras: false,
      adelante: false
    });


     const handleClick = (event) => {
        orientacion = event.target.id;    
      };

    const handleSubmit = (e) => {
      e.preventDefault();

      const datos_vehiculo = { 
         marca, 
         modelo, 
         placa, 
         nivel, 
         observacion
       };
      
       dispatch({
         type: 'Pantalla_Vehiculo',
         value: datos_vehiculo });  

      if(orientacion === 'adelante') {
           setNavPantallas({...navPantallas, ['atras']:false, ['adelante']:true})
      } else if(orientacion === 'atras') {
           setNavPantallas({...navPantallas, ['atras']:true, ['adelante']:false})
      };    
    };


    if(navPantallas.atras === false  &&  navPantallas.adelante === true){
      return (<div> <Servicios /> </div>)
    } else if(navPantallas.atras === true  && navPantallas.adelante === false) {
      return (<div> <Cliente /> </div>)
    };

     return (
       <div>       
          <form className='formulario' onSubmit ={handleSubmit}>
            <div>
              <h2>Ingreso de Datos del Vehiculo</h2>
            </div>       
            <div>
            <label htmlFor='combo'>Marca</label> 
              <select id='select' onChange={(event)=> setMarca(event.target.value)} value={marca}>              
                  <Comboid opcion='car' />                                           
              </select>
            </div>               
            <div>
              <label htmlFor='modelo'>Modelo</label>
              <input type='text' id='modelo' placeholder='Kia' onChange={(event)=> setModelo(event.target.value)} 
              value={modelo}/>
            </div>
            <div>
              <label htmlFor='placa'>Placa</label>
              <input type='text' id='placa' placeholder='GHR-1234' onChange={(event)=> setPlaca(event.target.value)} 
              value={placa}/>
            </div>
            <div>
            <label htmlFor='combo'>Gasolina</label> 
              <select id='select' onChange={(event)=> setNivel(event.target.value)} value={nivel}>              
                  <Comboid opcion='gas' />                                           
              </select>
            </div>     
            <div>
              <label htmlFor='Obervaciones'>Obervaciones</label>
              <textarea placeholder='Condiciones exteriores vehiculo' onChange={(event)=> setObservacion(event.target.value)}
              value={observacion}/>
            </div>   
            <div className='button-container'>                    
              <button id='atras'    type='submit' onClick={handleClick}>Regresar</button>    
              <button id='adelante' type='submit' onClick={handleClick}>Ingresar</button>                           
            </div>
          </form>
       </div>
     );
 }

export default Vehiculo;
