<div align="center">
    <img src="src/taller.jpeg">
</div>

<div align="center">
    <H1>PROYECTO - CARSHOP</H1>
    <table>
        <tbody>
            <tr>
                <td>1</td>
                <td>Descripción del Proyecto</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Desarrollo y Despliegue</td>
            </tr>
        </tbody>
    </table>
</div>

<div STYLE="margin:30px 180px">
    <H3>Descripción</H3>
    <p>
        Este proyecto está construído en React y NodeJs. Tiene la finalidad de automatizar el proceso de ingreso de vehículos al taller para la ejecución
        de los diferentres servicios que tenemos a disposición.
    </p>
    <p>
        Permite al usuario la consulta y edición de sus órdenes ingresadas.
    </p>
    <p>
    	Facilita al administrador y operador del taller el manejo del flujo de los diferentes estados que puede tener una orden hasta llegar a su finalización.
	</p>
    <p>
    	El proyecto está dividido en los siguientes componentes:
    </p>
    <ul>
	<li>Landing de la aplicación</li>
	<li>Registro de cliente</li>
	<li>Página de login (user/admin/operator)</li>
	<li>Consulta de órdenes (user/admin/operator)</li>
	<li>Agendamiento de fecha para órdenes</li>
	<li>Cancelación de órdenes</li>
	<li>Eliminación de órdenes</li>
        <li>Ingreso de datos del cliente</li>
        <li>Ingreso de datos del vehículo a recibir</li>
        <li>Selección de los servicios a aplicar al vehículo</li>
        <li>Orden de proceso donde se detalla los datos ingresados en los componentes anteriores</li>
    </ul>
</div>

<div STYLE="margin:30px 180px">
    <H3>Desarrollo y Despliegue</H3>
    <H5>Ejecutar las siguientes instrucciones para poder levantar el proyecto</H5>
    <p>1. Copiar carpeta del proyecto en ruta donde tenga instalada las dependencias de React y NodeJs</p>
    <p>2. Instalar los siguientes paquetes:</p>
	<ul>
		<li>npm install --save moment</li>
		<li>npm install bootstrap</li>
		<li>npm install react-bootstrap bootstrap</li>
		<li>npm install react-router-dom</li>
		<li>npm install react-router-bootstrap</li>
		<li>npm install axios</li>
		<li>npm install react-modal</li>
		<li>npm install --save react-toastify</li>
	</ul>
    <p>3. Levantar Backend NodeJS: APIS de funcionalidad del sistema (lo hace en puerto 4000)</p>  
	<ul>
		<li>cd backend</li>
		<li>npm run dev (internamente ejecuta script node ./adminsite.js)</li>
	</ul>	
    <p>4. Levantar FrontEnd React: Componentes</p>  
	<ul>
		<li>cd frontend</li>
		<li>pm start</li>
	</ul>	
    <H5>Ingreso al sistema y prueba de APIs</H5>
    <p>1. Usuarios Admin y Operator (para fines educativos se indica el password)</p>
	<ul>
		<li>Admin: vera_lucio@hotmail.com  -   Pass: 1234 </li>
		<li>Operator: vera_lucio@hotmail.com  -   Pass: 1234 </li>
	</ul> 	
    <p>2. API de cambio de estado de la orden usando BASIC AUTH</p>
	<ul>
		<li>Puerto: 3002</li>
		<li>Levantar: node apiorderjwt.js</li>
		<li>Get: http://localhost:3002/api/apiorders</li>
		<li>Put: http://localhost:3002/api/apiorders/{id de orden}</li>
	</ul>	    
    <p>2.1 Validación con el usuario y password que esta en un esquema de mongo</p>	
	<ul>
		<li>Puerto: 3002</li>
		<li>_id: {id de orden}</li>
		<li>esquema: basic-auth</li>
		<li>login: yourlogin</li>
		<li>password: yourpassword</li>
	</ul>		
    <p>3. API JWT</p>	
	<ul>
		<li>Puerto: 3003</li>	
		<li>Levantar: node apiorderjwt.js</li>	
		<li>Get: http://localhost:3003/apijwt/login</li>	
		<li>Put: http://localhost:3003/apijwt/apiorders/{id de orden}</li>		
	</ul>
</div>
