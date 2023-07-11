import React,  { useState, useEffect } from 'react';
import { useAppContext } from './Provider.js';
import { useParams } from "react-router-dom";
import axios from "axios";
import AWS from 'aws-sdk';
import {Comboid} from './Catalogos.js';
import Vehiculo from './Vehiculo.js';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  sessionToken: process.env.AWS_SESSION_TOKEN
  });


const Cliente = ({ id_user}) => {
  let { id_orden } = useParams();
  let tmpId = '';
  let tmpAccion = 'I';

  if (typeof id_orden !== "undefined") {
    tmpId = id_orden;
    tmpAccion = 'A';
  } else {
    tmpId = id_user;
  };

  //console.log('id_orden: ', id_orden);
  //console.log('id_user: ', id_user);

  const { opcion, dispatch } = useAppContext();
  const [mostrarVehiculo, setMostrarVehiculo] = useState(false);
  const [nombre, setNombres] = useState(opcion.cliente.nombre);
  const [email, setEmail] = useState(opcion.cliente.email);
  const [celular, setCelular] = useState(opcion.cliente.celular);
  const [tipoid, setTipoId] = useState(opcion.cliente.tipoid);
  const [identificacion, setIdentificacion] = useState(opcion.cliente.identificacion);
  const [comboSeleccion, setComboSeleccion] = useState(opcion.cliente.tipoid);
  const [id, setId] = useState(tmpId);
  const [accion, setAccion] = useState(tmpAccion);

  const [idSchemaCliente, setIdSchemaCliente] = useState(null);
  const [idSchemaVehiculo, setIdSchemaVehiculo] = useState(null);

  const [datosVehiculo, setDatosVehiculo] = useState({
    marca: '',
    modelo: '',
    placa: '',
    nivel: '',
    observacion: '',
  });

  const [datosServicio, setDatosServicio] = useState({
    lavado: 'NA',
    frenos: 'NA',
    aceite: 'NA',
    amortiguadores: 'NA',
    electrico: 'NA',
  });


//console.log ('limpiar: ', limpiar);

// useEffect(() => {
//   if (limpiar === 'S') {
//     setNombres('');
//     setEmail('');
//     setCelular(''); 
//     setTipoId('--Seleccione opcion--');
//     setIdentificacion('');
//     setComboSeleccion('--Seleccione opcion--');
//   }
// }, [limpiar]);

  useEffect(() => {
    if (typeof id_orden !== "undefined") {
      obtenerDatosOrden();    
    }
    // else {
    //   setNombres('');
    //   setEmail('');
    //   setCelular(''); 
    //   setTipoId('--Seleccione opcion--');
    //   setIdentificacion('');
    //   setComboSeleccion('--Seleccione opcion--');      
    // }
  }, [tmpId]);


  const obtenerDatosOrden = async () => {
    const res = await axios.get(  
      "http://localhost:4000/api/workorders/" + tmpId
    );
    console.log("orden:", res);
    setIdSchemaCliente(res.data.client._id);
    setIdSchemaVehiculo(res.data.vehicle._id)
    setNombres(res.data.client.nombres);
    setEmail (res.data.client.email);
    setCelular (res.data.client.celular);
    setIdentificacion (res.data.client.identificacionfiscal);
    setTipoId (res.data.client.tipoid);
    setComboSeleccion(res.data.client.tipoid);

    setDatosVehiculo({...datosVehiculo, ['marca']:res.data.vehicle.marca, 
                               ['modelo']:res.data.vehicle.modelo,
                               ['placa']:res.data.vehicle.placa,
                               ['nivel']:res.data.vehicle.gasolina,
                               ['observacion']:res.data.vehicle.defectos
    });

    setDatosServicio({...datosServicio, ['lavado']:res.data.services[0], 
                               ['frenos']:res.data.services[1],
                               ['aceite']:res.data.services[2],
                               ['amortiguadores']:res.data.services[3],
                               ['electrico']:res.data.services[4]
    });
  };

  const handleChange = (e) => {
    setComboSeleccion(e.target.value);
    setTipoId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comboSeleccion === '--Seleccione opcion--') {
      alert('Por favor, selecciona una opción');
      return;
    }
    const datos_cliente = {
      nombre,
      email,
      celular,
      tipoid,
      identificacion,
      id,
      accion,
      idSchemaCliente,
      idSchemaVehiculo
    };
    dispatch({
      type: 'Pantalla_Cliente',
      value: datos_cliente
    });
    dispatch({
      type: 'Pantalla_Vehiculo',
      value: datosVehiculo
    });
    dispatch({
      type: 'Pantalla_Servicio',
      value: datosServicio
    });

    setMostrarVehiculo(true);
  }

  if (mostrarVehiculo) {
    return (<Vehiculo id_user={tmpId}/>)
  }

  return (
    <div className='fondo contenedor'>
      <form className='formulario' onSubmit={handleSubmit}>
        <div>
          <h2>Ingreso Datos del Cliente Prueba</h2>
        </div>
        <div>
          <label htmlFor='nombre'>Nombres</label>
          <input type='text' id='nombre' placeholder='Nombre del Cliente'
            onChange={(event) => setNombres(event.target.value)} required
            value={nombre} />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' placeholder='correo@correo.com'
            onChange={(event) => setEmail(event.target.value)} required
            value={email} />
        </div>
        <div>
          <label htmlFor='number'>Celular</label>
          <input type='text' id='number' placeholder='0999999999'
            onChange={(event) => setCelular(event.target.value)} required pattern='[0-9]{10}'
            value={celular} />
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
            onChange={(event) => setIdentificacion(event.target.value)} required
            value={identificacion} />
        </div>
        <button className='btn btn-secondary' type='submit'>Ingresar</button>
      </form>
    </div>
  );
}

export default Cliente;
