import React,  { useState } from 'react';
import moment from 'moment';
import { useAppContext } from './Provider.js';
import Servicios from './Servicios.js';
import Cliente from './Cliente.js';



const OrdenProceso = () => {

    let orientacion = '';  
    const fechaActual = new Date();
    const fechaFormateada = moment(fechaActual).format('YYYY-MM-DD');
    const fechaEntrega = fechaActual.setDate(fechaActual.getDate() + 2);
    const fechaEntregaFormat = moment(fechaEntrega).format('YYYY-MM-DD HH:mm');

    const {opcion, dispatch} = useAppContext();

    const {nombre, email, celular, tipoid, identificacion} = opcion.cliente;
    const {marca, modelo,  placa, nivel, observacion} = opcion.vehiculo;
    const {lavado, frenos, aceite, amortiguadores, electrico} = opcion.servicio;       

    const [navPantallas, setNavPantallas] =  useState({
        atras: false,
        inicio: false
      });


    const handleClick = (event) => {
        orientacion = event.target.id;     
      };


    const handleSubmit = (e) => {
      e.preventDefault();
      if(orientacion === 'inicio') {
            dispatch({
                type: 'Carga_Inicial' });
                   
            setNavPantallas({...navPantallas, ['atras']:false, ['inicio']:true})
       } else if(orientacion === 'atras') {
            setNavPantallas({...navPantallas, ['atras']:true, ['inicio']:false})
       };  
      };
      
      
      if(navPantallas.atras === false  &&  navPantallas.inicio === true){
        return (<div> <Cliente /> </div>)
      } else if(navPantallas.atras === true  && navPantallas.inicio === false) {
        return (<div> <Servicios /> </div>)
      };      

    

     return (
       <div> 
          <form className='formulario' onSubmit ={handleSubmit}> 
            <div>
              <h2>Confirmacion Orden de Trabajo</h2>
              <h4>Fecha de Ingreso: {fechaFormateada} </h4>
              <h4>Fecha de Entrega: {fechaEntregaFormat}</h4>
              
                <div>
                    <table>                    
                        <tr>
                            <th>Datos de Cliente</th>
                            <th></th>
                        </tr>                                      
                        <tr>                        
                            <td>Nombres</td>                    
                            <td>{nombre}</td>                                                        
                        </tr>  
                        <tr>                        
                            <td>Email</td>                    
                            <td>{email}</td>                                                        
                        </tr> 
                        <tr>                        
                            <td>Celular</td>                    
                            <td>{celular}</td>                                                        
                        </tr> 
                        <tr>                        
                            <td>Tipo Identificacion</td>                    
                            <td>{tipoid}</td>                                                        
                        </tr>  
                        <tr>                        
                            <td>Identificacion</td>                    
                            <td>{identificacion}</td>                                                        
                        </tr>                                                                                           
                    </table>
                </div>        
                <div>
                    <table>                    
                        <tr>
                            <th>Datos del Vehiculo</th>
                            <th></th>
                        </tr>                                      
                        <tr>                        
                            <td>Marca</td>                    
                            <td>{marca}</td>                                                        
                        </tr>  
                        <tr>                        
                            <td>Modelo</td>                    
                            <td>{modelo}</td>                                                        
                        </tr> 
                        <tr>                        
                            <td>Placa</td>                    
                            <td>{placa}</td>                                                        
                        </tr> 
                        <tr>                        
                            <td>Nivel de Gasolina</td>                    
                            <td>{nivel}</td>                                                        
                        </tr>  
                        <tr>                        
                            <td>Obervaciones</td>                    
                            <td>{observacion}</td>                                                        
                        </tr>                                                                                           
                    </table>
                </div>
                <div>
                    <table>                    
                        <tr>
                            <th>Servicios Seleccionados</th>
                            <th></th>
                        </tr>                                      
                         <ol>               
                            <tr>{lavado}</tr>    
                            <tr>{frenos}</tr>  
                            <tr>{aceite}</tr>  
                            <tr>{amortiguadores}</tr>  
                            <tr>{electrico}</tr>                                                      
                        </ol>                                                                                
                    </table>
                </div>
            </div>
            <div className='button-container'>
                <button id='atras'   type='submit' onClick={handleClick}>Regresar</button>                              
                <button id='inicio'  type='submit' onClick={handleClick}>Nuevo Registro</button>                 
              </div> 
          </form>
       </div>
     );
 }

export default OrdenProceso;

