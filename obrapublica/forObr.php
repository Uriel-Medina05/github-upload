<link rel="stylesheet" href="obrapublica/css/formulario.css" />
<script src="obrapublica/js/datosObra.js"></script>
<!--CARGA IMAGEN  AJAX-->
<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed|Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<link rel="stylesheet" href="css/estconsulta.css">
		<link rel="stylesheet" href="style.css" />
<!--Declaracion de variables para traer datos -->
<?php
	$lon = $_GET['lon'];
	$lat = $_GET['lat'];
	$id  = $_GET['id'];
	if ($_GET['st']=='add'){
?>
<!--script para traer datos mediante AJAX del archivo datosObra.js -->
	<script type="text/javascript">
		localizarDato();
		$('#sel-dep').removeAttr("readonly");
		$('#sel-ejer').removeAttr("readonly");
		$('#folio').removeAttr("readonly");
		$('#desc').removeAttr("readonly");
		accion='add'
		$('#btn_accion').append('Guardar');
	</script>
<?php
	}elseif ($_GET['st']=='cons') {}
?>

<div clas="flex" id="flex">
	<div class="contenido-form">
		<div class="cabecera-form flex">
			<h3 class="modal-title">Obra Pública</h3>
			<span id="cerrar" class="close">&times;</span>
		</div>
		<div class="cuerpo-form">
			<form name="form-obra" id="form-obra" action="" class="contact_form" role="form" method="POST" enctype="multipart/form-data">
				<input id="lon" name="lon" type="hidden" value="<?php echo $lon;?>">
				<input id="lat" name="lat" type="hidden" value="<?php echo $lat;?>">
				<fieldset>
				<!--REGISTRO OBRA  -->
					<legend>Registro de obra</legend>
					<div class="form-col col-15">
						<label for="depen" class="control-label">Dependencia:</label>
						<select id="sel-dep" name="dep" class="form-control" readonly>
							<option value="SOP">SOP</option>	
							<option value="CEA">CEA</optio>
							<option value="INIFE">INIFE</optio>
						</select>
						
					</div>
					<div class="form-col col-15">
						<label for="ejer" class="control-label">Ejecicio:</label>
						<select id="sel-ejer" name="ejer" class="form-control" readonly>	
							<option value="2019">2019</option>
							<option value="2018">2018</optio>	
						</select>
					</div>
					<div class="form-col col-20">
						<label for="folio" class="control-label">Folio:</label>
						<input type="text" class="form-control" id="folio" name="folio" size="9" readonly>
					</div>
					<div class="form-col col-50">
						<label for="desc" class="control-label">Descripción:</label>
							<textarea id="desc" name="desc" class="md-textarea form-control" rows="2" size="150" readonly></textarea>
					</div>
				</fieldset>
				<fieldset>
				<!--LOCALIZACION -->
					<legend>Localización</legend>
					<div class="form-col col-20">
						<label for="region" class="control-label">Región:</label>
						<input id="region" name="region" type="text" class="form-control" readonly>
					</div>
					<div class="form-col col-25">
						<label for="mun" class="control-label">Municipio:</label>
						<input id="nom-mun" name="mun" type="text" class="form-control" readonly>
						<input id="cve-mun" name="cmun" type="hidden">
					</div>
					<div class="form-col col-25">
						<label for="loc" class="control-label">Localidad:</label>
						<input id="nom-loc" name="loc"  type="text" class="form-control" readonly>
						<input id="cve-loc" name="cloc" type="hidden">
					</div>
					<div class="form-col col-30">
						<label id="tasen" for="asen" class="control-label">Asentamiento:</label>
	    				<input id="asen"  name="asen"  type="text" class="form-control" readonly>
	    				<input id="cve-asen"  name="casen" type="hidden">
	    				<input id="nom-asen"  name="nasen" type="hidden">
	    				<input id="tipo-asen" name="tasen" type="hidden">
					</div>
				</fieldset>
				<!--INVERSION -->
				<fieldset>
					<legend>Inversión</legend>
					<div class="form-col col-25">
						<label for="invfed" class="control-label">Federal:</label>
						<input id="invfed" name="invfed" type="text" value="0.0" class="form-control moneda">
					</div>
					<div class="form-col col-25">
						<label for="invest" class="control-label">Estatal</label>
						<input id="invest" name="invest" type="text" value="0.0" class="form-control moneda">
					</div>
					<div class="form-col col-25">
						<label for="mun" class="control-label">Municipal:</label>
						<input id="invmun" name="invmun" type="text" value="0.0" class="form-control moneda">
					</div>
					
					<div class="form-col col-25">
						<label for="mun" class="control-label">Otras:</label>
						<input id="invotr" name="invotr" type="text" value="0.0" class="form-control moneda">
					</div>
				</fieldset>
				<fieldset>
                    <!--div para previsualizar la imagen  -->
				<div class="form-group">
			        <div class="col-md-4" id="image_preview" >
	                  <img id="previewing" />
	                </div>
					
					<div class="col-md-4" id="message">
					      <h4 id='loading' ></h4> 
                    </div>
		
			          <hr id="line" >
		  		</div>
					 <!--Con esto hace espacio para que lo botones estem abajo de la imagen  -->
					<div class="form-group">
						<div class="row">
							<div class="col-md-2">	     
							</div>
							<div class="col-md-2">
							</div>
						</div>
					</div>
					<!--FILE CARGAR ARCHIVO -->
                    <div class="form-group">
				   <div id="selectImage">
					     <label>Selecciona tu Archivo</label><br/>
					       <input type="file" name="file" id="file" required />
		    	   </div>

				</fieldset>
				<!--BOTON CERRAR -->
				<fieldset>
					<div class="form-col col-20">
						<span id="cerrar2" class="boton">Cerrar</span>
					</div>
					<!--GUARDAR -->
					<div class="form-col col-20">
					<button type="submit" class="btn btn-primary"> <!--Boton para poder subir la imagen tipo submit -->
						<span id="btn_accion" class="boton"></span> <!--Direcciona a la parte baja del documento ala funcion guardar. -->
					</div>

				</fieldset>
			</form>
		</div>
		<div id="msg" class="pie-form"></div>
	</div>
</div>

<!--Scrip para Guardar y cerrar la venatana modal -->
<script type="text/javascript">
	let modalform = document.getElementById('modal-form');
	let cerrar = document.getElementById('cerrar');
    cerrar.addEventListener('click', function(){
         modalform.style.display='none';
    });
    let cerrar2 = document.getElementById('cerrar2');
    cerrar2.addEventListener('click', function(){
         modalform.style.display='none';
    });
//Guardamos y condicionamos que cuando se guarde el boton lo esconda 
    let guardar = document.getElementById('btn_accion');
    guardar.addEventListener('click', function(){
    	insmodObra(accion);
        //modalform.style.display='none';
    });

    $(".moneda").on({"focus": function (event) {
        $(event.target).select();
	    },"keyup": function (event) {
	        $(event.target).val(function (index, value ) {
	            return value.replace(/\D/g, "")
	                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
	                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");

	        });
	    }
	});


</script>
	
				
				
				