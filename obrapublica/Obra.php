<!DOCTYPE html>
<html>
<head>
	<title></title>
	<title>Obra pública</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
	<script src="js/datosObra.js"></script>
	
	<?php
		$lon = $_GET['lon'];
		$lat = $_GET['lat'];
		$id  = $_GET['id'];
		include 'prueba.php'; //formObra
		if ($_GET['st']=='add'){
	?>
	<script type="text/javascript">
		localizarDato()	
		$('#sel-dep').removeAttr("readonly");
		$('#sel-ejer').removeAttr("readonly");
		$('#folio').removeAttr("readonly");
		$('#desc').removeAttr("readonly");
		accion='add'
		$('#btn_accion').html('<button class="btn btn-info" type="button"  onclick="insmodObra(accion);" >Guardar</button>');
	</script>
	<?php
		}elseif ($_GET['st']=='cons') {
	?>
	<script type="text/javascript">
		leerDatos(<?php echo $id ?>);
		$('#btn_accion').html('<button class="btn btn-info" type="button" onclick="modificarDatos();">Modificar</button>');
		$('#btn-elimina').html('<button class="btn btn-danger" type="button" onclick="eliminarDatos();">Eliminar</button>');
	</script>
	<?php	
		}
	?>
</head>
<body>

</body>
</html>