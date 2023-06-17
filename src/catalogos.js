const opcionesId = [
   { value: '', label: '--Seleccione opcion--' },
   { value: '1', label: 'Cedula' },
   { value: '2', label: 'RUC' },
   { value: '3', label: 'Pasaporte' }
 ]

 const marcasVehiculo = [
  { value: '', label: '--Seleccione opcion--' },
  { value: '1', label: 'Honda' },
  { value: '2', label: 'KIA' },
  { value: '4', label: 'Chevrolet' },
  { value: '5', label: 'Skoda' },
  { value: '6', label: 'Audi' },
  { value: '7', label: 'Mazda' },
  { value: '8', label: 'Hyundai' }
]

const nivelGasolina = [
  { value: '', label: '--Seleccione opcion--' },
  { value: '1', label: '25  %' },
  { value: '2', label: '50  %' },
  { value: '4', label: '75  %' },
  { value: '5', label: '100 %' }
]


export function Comboid({opcion}) {
  let opciones =[]
  if( opcion === 'id'){
    opciones = opcionesId
  } else if( opcion === 'car'){
    opciones = marcasVehiculo
  } else if( opcion === 'gas'){
    opciones = nivelGasolina
  }
  return (  
    opciones.map(option => (  
      <option value={option.label}>{option.label}</option>
      ))
  );
}



