// Cuando ya tengas tu token reemplaza el texto 'AQUÍ_VA_TU_TOKEN' de la siguiente variable con él.
var token = '232023ff-979a-429b-a2cc-345c66ba2d4e';

var urlApiFicha = "http://www3.inegi.org.mx/sistemas/api/denue/v1/consulta/ficha/#idesta/#token";
var vecNombres = [
'Id de establecimiento',
'Nombre de la unidad económica:',
'Razón social:',
'Nombre de la clase de actividad:',
'Personal ocupado (estrato):',
'Tipo de vialidad:',
'Nombre de la vialidad:',
'Número exterior o km:',
'Número o letra interior:',
'Nombre del asentamiento humano:',
'Código postal:',
'Entidad,Municipio,Localidad:',
'Número de teléfono:',
'Correo electrónico:',
'Sitio en Internet:',
'Tipo de unidad económica:',
'Latitud:',
'Longitud:'];

var map;

function initialize() {
  var myLatlng = new google.maps.LatLng(23.84,-102.18);
  var mapOptions = {
	zoom: 4,
	center: myLatlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
   
function llamarApiDenue(){
	var idEstablecimiento = $('#idUE').val();;
	var urlApiFichatemp = urlApiFicha.replace('#idesta',idEstablecimiento);
	urlApiFichatemp = urlApiFichatemp.replace('#token',token);
	if(token.includes('AQUÍ')){
		alert("Debes ingresar tu token en el archivo apiDenue.js");
	} else {
		$.getJSON( urlApiFichatemp, function( json ) {  
			var codHtml = '<table style="width:100%;">';
				codHtml += '<tr><th colspan="2">Establecimiento</th></tr>';
					
					codHtml += '<tr ><td style="width:50%;" >' + vecNombres[0] + '</td><td style="width:50%;">' + json[0].Id + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[1] + '</td><td style="width:50%;">' + json[0].Nombre + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[2] + '</td><td style="width:50%;">' + json[0].Razon_social + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[3] + '</td><td style="width:50%;">' + json[0].Clase_actividad + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[4] + '</td><td style="width:50%;">' + json[0].Estrato + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[5] + '</td><td style="width:50%;">' + json[0].Tipo_vialidad + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[6] + '</td><td style="width:50%;">' + json[0].Calle + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[7] + '</td><td style="width:50%;">' + json[0].Num_Exterior + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[8] + '</td><td style="width:50%;">' + json[0].Num_Interior + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[9] + '</td><td style="width:50%;">' + json[0].Colonia + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[10] + '</td><td style="width:50%;">' + json[0].CP + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[11] + '</td><td style="width:50%;">' + json[0].Ubicacion + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[12] + '</td><td style="width:50%;">' + json[0].Telefono + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[13] + '</td><td style="width:50%;">' + json[0].Correo_e + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[14] + '</td><td style="width:50%;">' + json[0].Sitio_internet + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[15] + '</td><td style="width:50%;">' + json[0].Tipo + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[16] + '</td><td style="width:50%;">' + json[0].Longitud + '</td></tr>'+
					'<tr ><td style="width:50%;" >' + vecNombres[17] + '</td><td style="width:50%;">' + json[0].Latitud + '</td></tr>'
					
			
			codHtml += '</table><br>';
			crearMarcador(json[0].Nombre,codHtml,json[0].Latitud,json[0].Longitud);
		});	
	}
}

function crearMarcador(vtitulo, contenido, lat, lon){
				var myLatlng = new google.maps.LatLng(lat,lon);
				var contentString = contenido;
				var titulo = vtitulo;
				
				  var infowindow = new google.maps.InfoWindow({
					  content: contentString
				  });

				  var marker = new google.maps.Marker({
					  position: myLatlng,
					  map: map,
					  title: titulo
				  });
				  google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				  });
			}