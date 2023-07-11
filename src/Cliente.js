import React,  { useState } from 'react';
import AWS from 'aws-sdk';
import { useAppContext } from './Provider.js';
import {Comboid} from './catalogos.js';
import Vehiculo from './Vehiculo.js';

AWS.config.update ({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  sessiontoken: process.env.REACT_APP_AWS_SESSION_TOKEN
});


 const Cliente = () => {

    const {opcion, dispatch} = useAppContext();

    const [mostrarVehiculo, setMostrarVehiculo] = useState(false);

    const [nombre, setNombres] = useState(opcion.cliente.nombre);
    const [email, setEmail] = useState(opcion.cliente.email);
    const [celular, setCelular] = useState(opcion.cliente.celular);
    const [tipoid, setTipoId] = useState(opcion.cliente.tipoid);
    const [identificacion, setIdentificacion] = useState(opcion.cliente.identificacion);

    const [comboSeleccion, setComboSeleccion] = useState(opcion.cliente.tipoid);

    const handleChange = (e) => {
      setComboSeleccion(e.target.value);
      setTipoId(e.target.value);
    };    



    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(comboSeleccion);

      if (comboSeleccion === '--Seleccione opcion--') {
        alert('Por favor, selecciona una opción');
        return;
      }
       const datos_cliente = { 
         nombre, 
         email, 
         celular, 
         tipoid, 
         identificacion
       };
      dispatch({
          type: 'Pantalla_Cliente',
          value: datos_cliente  
      });

      setMostrarVehiculo(true);
    }    


    if(mostrarVehiculo){
      return (<div> <Vehiculo /> </div>)
    }

     return (
       <div> 
          <form className='formulario' onSubmit ={handleSubmit}>
            <div>
              <h2>Ingreso de Datos del Cliente</h2>
            </div>
            <div>
              <label htmlFor='nombre'>Nombres</label>
              <input type='text' id='nombre' placeholder='Christian Ortiz' 
                      onChange={(event)=> setNombres(event.target.value)} required
                      value={nombre}/>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' placeholder='correo@correo.com'
                      onChange={(event)=> setEmail(event.target.value)} required
                      value={email}/>     
            </div>
            <div>
              <label htmlFor='number'>Celular</label>
              <input type='text' id='number' placeholder='0999999999'
                      onChange={(event)=> setCelular(event.target.value)} required pattern='[0-9]{10}'
                      value={celular}/>
            </div>
            <div>
            <label htmlFor='combo'>Tipo Identificacion</label> 
              <select id='select' onChange={handleChange} value={tipoid}>              
                  <Comboid opcion='id' />                                           
              </select>
            </div>
            <div>
              <label htmlFor='identificacion'>Identificacion</label>
              <input type='text' id='identificacion' placeholder='0999999999'
                      onChange={(event)=> setIdentificacion(event.target.value)} required
                      value={identificacion}/>
            </div>       
            <button type='submit'>Ingresar</button> 
          </form>
       </div>
     );
 }

export default Cliente;