
function eliminarDatos(){
	respuesta = confirm('Estas seguro de eliminar el rgistro con folio');
	if (respuesta){
		insmodObra('borra')
		window.close();
	}
}

function modificarDatos() {
	accion='mod'
	$('#sel-dep').removeAttr('readonly');
	$('#sel-ejer').removeAttr('readonly');
	$('#desc').removeAttr('readonly');
	$('#folio').removeAttr('readonly');
	$('#mon-federal').removeAttr('readonly');
	$('#mon-estatal').removeAttr('readonly');
	$('#mon-mun').removeAttr('readonly');
	$('#mon-otros').removeAttr('readonly');
	$('#btn_accion').append('Guardar');
}

function leerDatos(id) {
	$.ajax({
	  	type: "GET",    
	  	dataType: "json",
	  	url: "php/modeloObra.php?action=leer&id="+id,
		success: function(response) {
		  	if(response.status) {
		  		$("#sel-dep").val(response.record[0]['dep_ejec']).change();
		  		$("#sel-ejer").val(response.record[0]['ejercicio']).change();
		  		$("#folio").val(response.record[0]['folio']);
		  		$("#desc").val(response.record[0]['descr']);
		  		$("#region").val(response.record[0]['region']);
		  		$("#nom-mun").val(response.record[0]['nom_loc']);
		  		$("#nom-loc").val(response.record[0]['nom_loc']);
		  		nasen = response.record[0]['tipo_asen']+' '+response.record[0]['nom_asen']
		  		$("#asen").val(nasen);
		  	}
		},
	  	error: function(jqXHR, textStatus, errorThrown) {
		 	$('#msg').html('<div class="alert alert-danger ">Error: '+textStatus+'! '+errorThrown);
		} 
	});
}


function localizarDato() {
	data = $("#form-obra").serializeArray();
	$.ajax({
	  type: "POST",  
	  url: "obrapublica/php/modeloObra.php?action=localiza",  
	  data: data,
	  dataType: "json",       
	  success: function(response)
	  { 
	  	if (response.mun[0]!=false){
	  		$("#nom-mun").val(response.mun[0]['nom_mun']);
	  		$("#cve-mun").val(response.mun[0]['cve_mun']);
	  		$("#region").val(response.mun[0]['region']);
	  	}
	  	if (response.loc!=false){
	  		$("#nom-loc").val(response.loc[0]['nom_loc']);
	  		$("#cve-loc").val(response.loc[0]['cve_loc']);	
	  	}
	  	if (response.asen!=false){
	  		$("#tasen").empty();
	  		$("#tasen").append(response.asen[0]['tipo_asen']+':');
	  		$("#asen").val(response.asen[0]['nom_asen']);
	  		$("#nom-asen").val(response.asen[0]['nom_asen']);
	  		$("#cve-asen").val(response.asen[0]['cve_asen']);
	  		$("#tipo-asen").val(response.asen[0]['tipo_asen']);
	  	}
	  	
	  },
	  error: function(jqXHR, textStatus, errorThrown) {
		  alert('Error en la Consulta')
		}  
	});
}


function insmodObra(accion) {
	data = $("#form-obra").serializeArray();
	if (accion == 'add'){
		url = "obrapublica/php/modeloObra.php?action="+accion;
	} else {
		url = "obrapublica/php/modeloObra.php?action="+accion;
	}
	$.ajax({
	  type: "POST",  
	  url: url,  
	  data: data,
	  dataType: "json",       
	  success: function(response)  
	  {
		$('#msg').html('');
	  	if(response.status) {
			$('#msg').html('<div class="alert alert-success">Registro exitoso</div>');
		 	$("#btn_accion").remove();
	  	} else {
	  		$('#msg').html('<div class="alert alert-danger ">Error! fallo el registro</div>');	
	  	}
	  },
	  error: function(jqXHR, textStatus, errorThrown) {
		  $('#msg').html('<div class="alert alert-danger ">Error: '+textStatus+'! '+errorThrown);
		}  
	});
//	cargaArchivo();
}
$(document).ready(function (e) {
	$("#form-obra").on('submit',(function(e) {
		e.preventDefault();
		$("#message").empty(); 
		$('#loading').show();
		$.ajax({
        	url: "cargaArchivo.php",   	// URL a la que se envía la solicitud
			type: "POST",      				// Tipo de solicitud que se enviará, llamado como método 
			data:  new FormData(this), 		// Datos enviados al servidor 
			contentType: false,       		// El tipo de contenido utilizado al enviar datos al servidor. El valor predeterminado es: "application / x-www-form-urlencoded"
    	    cache: false,					// Para no poder solicitar que las páginas se almacenen en caché
			processData:false,  			// Para enviar DOMDocument o archivo de datos no procesados, se establece en falso (es decir, los datos no deben estar en forma de cadena)
			success: function(data)  		// Una función a ser llamada si la solicitud tiene éxito
		    {
			$('#loading').hide();
			$("#message").html(data);			
		    }	        
	   });
	}));

// Función para previsualizar la imagen
	$(function() {
        $("#file").change(function() {
			$("#message").empty();         // Para eliminar el mensaje de error anterior
			var file = this.files[0];
			var imagefile = file.type;
			var match= ["image/png","image/jpg","application/pdf"];	
			if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
			{
			$('#previewing').attr('src','noimage.png');
			$("#message").html("<p id='error'>Selecciona un archivo válido</p>"+"<h4>Nota</h4>"+"<span id='error_message'>Solo jpg,png y PDF Tipo de Archivo permitidas</span>");
			return false;
			}
            else
			{
                var reader = new FileReader();	
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }		
        });
	});
	//tamaño de imagen pra previsualizar imagen
	function imageIsLoaded(e) { 
		$("#file").css("color","green");
        $('#image_preview').css("display", "block");
        $('#previewing').attr('src', e.target.result);
		$('#previewing').attr('width', '150px');
		$('#previewing').attr('height', '130px');
	};
});
