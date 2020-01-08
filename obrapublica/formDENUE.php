
<!DOCTYPE html>
<html lang="es">
	<head>
		<title>Formularios</title>
		<meta charset="utf8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/estconsulta.css">
	</head>
	<body>
		<div class="container">
			<form name="registrar-alumnos" id="registrar-alumnos">
				<div class="form-group">
					<div class="row">
						<div class="col-md-2">
							<a href="https://www.inegi.org.mx/app/mapa/denue/"  target="_blank"><img src="./img/dnue_.jpg" alt="..." class="img-thumbnail"></a>
						</div>
						<div class="col-md-8" id="titulo">
							<h4>Directorio Estadístico Nacional de Unidades Económicas</h4>
						</div>
						<div class="col-md-2" id="logo2">
							<a href="https://www.inegi.org.mx/app/areasgeograficas/?ag=18"  target="_blank"><img src="./img/INEGI_b.png" alt="..." class="img-thumbnail"></a>
						</div>
						
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-md-12">
							<label for="nombre" class="control-label">Nombre:</label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<textarea class="md-textarea form-control" rows="2" readonly><?php echo $dato[2];?></textarea>
						</div>
						<div class="col-md-4">
							<textarea  class="md-textarea form-control" rows="2" readonly><?php echo $dato[3];?></textarea>
						</div>
						<div class="col-md-4">
							<textarea  class="md-textarea form-control" rows="2" readonly><?php echo $dato[5];?></textarea>
  						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-md-4">
							<label class="control-label">Domicilio:</label>
							<textarea  class="md-textarea form-control" rows="2" readonly><?php echo $dato[7]." ".$dato[8]." ".$dato[15]." ".$dato[16];?></textarea>
						</div>
						<div class="col-md-4">
							<label for="colonia" class="control-label">Entre:</label>
							<textarea  class="md-textarea form-control" rows="2" readonly><?php echo $dato[9]." ".$dato[10]." y ".$dato[11]." ".$dato[12]?></textarea>
						</div>
						<div class="col-md-2">
							<label for="colonia" class="control-label">Colonia:</label>
							<textarea  class="md-textarea form-control" rows="2" readonly><?php echo $dato[21]." ".$dato[22];?></textarea>
						</div>
						<div class="col-md-2">
							<label for="cp" class="control-label">CP:</label>
							<input type="text" class="form-control" name="cp" value="<?php echo $dato[26];?>" readonly>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-md-2">
							<label for="tel" class="control-label">Telefono:</label>
							<input type="text" class="form-control" name="tel" value="<?php echo $dato[35];?>" readonly>
						</div>
						<div class="col-md-4">
							<label for="correo" class="control-label">Correo:</label>
							<input type="email" class="form-control" name="correo" value="<?php echo $dato[36];?>" readonly>
						</div>
						<div class="col-md-4">
							<label for="ts" class="control-label">Sitio de internet:</label>
							<input type="text" class="form-control" name="www" value="<?php echo $dato[37];?>" readonly>
						</div>
						<div class="col-md-2">
							<label for="correo" class="control-label">Personal oupado:</label>
							<input type="text" class="form-control" name="personal" value="<?php echo $dato[6];?>" readonly>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
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


				
				
				