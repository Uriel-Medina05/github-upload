<!DOCTYPE html>
<link rel="stylesheet" href="obrapublica/css/formulario.css" />
<script src="obrapublica/js/script.js"></script>
<!--AJAX  -->
<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed|Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<html lang="es">
	<head>
		<meta charset="utf8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/estconsulta.css">
	</head>
	<?php
	    include 'php/modeloObra.php';
		if(isset($_GET['id'])){
			$id =$_GET['id'];
			$consulta = 'select * from obrapublica.obp where gid='.$id;
			$dato = leerdatos($consulta);
			$fila=pg_fetch_assoc($dato);
	  
	   }
     ?>
	<body>
		<div class="container">
		    <form name="form-obra" id="form-obra" action="" class="contact_form" role="form" method="POST" enctype="multipart/form-data">
			    <input id="lon" name="lon" type="hidden" value="<?php echo $lon;?>">
				<input id="lat" name="lat" type="hidden" value="<?php echo $lat;?>">

				<div class="form-group">
					<div class="row">
						<div class="col-md-2">
							<a href="https://www.inegi.org.mx/app/mapa/denue/"  target="_blank"><img src="./img/sopnay.png" alt="..." class="img-thumbnail"></a>
						</div>
						<div class="col-md-8" id="titulo">
							<h4>Obra Publica </h4>
						</div>
						<div class="col-md-2" id="logo2">
							<a href="https://www.inegi.org.mx/app/areasgeograficas/?ag=18"  target="_blank"><img src="./img/INEGI_b.png" alt="..." class="img-thumbnail"></a>
						</div>
						
					</div>
				</div>
			
				<div class="form-group">
				<legend>Registro de obra</legend>
					<div class="row">
						<div class="col-md-4">
						<label for="depen" class="control-label">Dependencia:</label>
						<select id="sel-dep" name="dep" class="form-control" readonly>
							<option value="SOP">SOP</option>	
							<option value="CEA">CEA</optio>
							<option value="INIFE">INIFE</optio>
						</select>
						</div>
						<div class="col-md-4">
							<label for="ejer" class="control-label">Ejecicio:</label>
							<select id="sel-ejer" name="ejer" class="form-control" readonly>	
								<option value="2019">2019</option>
								<option value="2018">2018</optio>	
							</select>
						</div>
						<div class="col-md-2">
							<label for="folio" class="control-label">Folio:</label>
							<input type="text" class="form-control" id="folio" name="folio" size="9" readonly>
						</div>
						<div class="col-md-2">
						  <label for="desc" class="control-label">Descripción:</label>
							<textarea id="desc" name="desc" class="md-textarea form-control" rows="2" size="150" readonly></textarea>
						</div>
					</div>
				</div>
				<div class="form-group">
				<legend>Localización</legend>
					<div class="row">
						<div class="col-md-4">
						  <label for="region" class="control-label">Región:</label>
						     <input id="region" name="region" type="text" class="form-control" value="<?php echo $fila['region']; ?>" readonly>
						</div>
						<div class="col-md-4">
						  <label for="mun" class="control-label">Municipio:</label>
						    <input id="nom-mun" name="mun" type="text" class="form-control" readonly>
						    <input id="cve-mun" name="cmun" type="hidden">
						</div>
						<div class="col-md-2">
						   <label for="loc" class="control-label">Localidad:</label>
						     <input id="nom-loc" name="loc"  type="text" class="form-control" readonly>
						     <input id="cve-loc" name="cloc" type="hidden">
						</div>
						<div class="col-md-2">
						   <label id="tasen" for="asen" class="control-label">Asentamiento:</label>
	    				     <input id="asen"  name="asen"  type="text" class="form-control" readonly>
	    				     <input id="cve-asen"  name="casen" type="hidden">
	    			         <input id="nom-asen"  name="nasen" type="hidden">
	    				     <input id="tipo-asen" name="tasen" type="hidden">
						</div>
					</div>
				</div>
				<div class="form-group">
				<legend>Inversión</legend>
					<div class="row">
						<div class="col-md-2">
						    <label for="invfed" class="control-label">Federal:</label>
						    <input id="invfed" name="invfed" type="text" value="0.0" class="form-control moneda">
						</div>
						<div class="col-md-4">
						    <label for="invest" class="control-label">Estatal</label>
						    <input id="invest" name="invest" type="text" value="0.0" class="form-control moneda">
						</div>
						<div class="col-md-4">
						   <label for="mun" class="control-label">Municipal:</label>
						   <input id="invmun" name="invmun" type="text" value="0.0" class="form-control moneda">
						</div>
						<div class="col-md-2">
						   <label for="mun" class="control-label">Otras:</label>
						   <input id="invotr" name="invotr" type="text" value="0.0" class="form-control moneda">
						</div>
					</div>
				</div>
				
				<div class="form-group">
				 <legend>Evidencias</legend>
					<div class="row">
					      <div id="image_preview" >
							    <img id="previewing" src="./img/sopnay.png" />
						  </div>
                          <hr id="line" >
                           <div id="selectImage">
                              <label>Selecciona tu Archivo</label><br/>
                                <input type="file" name="file" id="file" required />
                          </div>
					</div>
				</div>

				<div class="form-group">
					<div class="row">
						<div class="col-md-2">
						    <button type="submit" class="btn btn-primary">
                               <span id="btn_accion" class="glyphicon glyphicon-ok"></span> Guardar Registro
                            </button> 
						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-warning" onclick="window.close()">Cerrar</button>
						</div>
						 
						<div class="col-md-5">
						</div>
						<div class="col-md-5">
							
						</div>
					</div>
				</div>

			</form>
		</div>
	</body>
</html>

<script type="text/javascript">
	let modalform = document.getElementById('modal-form');

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

