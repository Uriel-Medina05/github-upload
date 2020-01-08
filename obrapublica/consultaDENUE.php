
<!DOCTYPE html>
<html lang="es">
	<head>
		<title>Consulta DENUE</title>
		<meta charset="utf8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  		
		<script src="js/funForm_.js"></script>
		<?php
			$id = $_GET['id'];
			include 'php/modeloObra.php';
			$consulta = 'SELECT * FROM denue.denue_18 where gid='.$id;
			$dato = leerdatos($consulta);
			include 'formDENUE.php';
			
		?>
	</head>
	<body>
	</body>
</html>


				
				
				