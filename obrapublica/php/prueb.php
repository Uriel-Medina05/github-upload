<?php
 require 'obrapublica/php/modeloObra.php';
 //$folio 	= $_POST["folio"];
 
    $folio =$_GET['folio'];
    $consulta = 'SELECT * FROM obrapublica.obp WHERE folio='.$folio;
    echo $consulta;


    echo ($_FILES["file"]["type"]); //tomo lo proveniente del forObr
    
    if(isset($_FILES["file"]["type"])){ //Condiciono el file de la imagen

        $validextensions = array( "jpg", "png","pdf"); //declaro variable para validar las extenciones del tipo de archivo que aceptara
        $temporary = explode(".", $_FILES["file"]["name"]); //declaro variable para el nombre de archivo
        $file_extension = end($temporary); //declaro e igualo el tipo de archivo con el nombre.
     
        //Condiciono la cadena para los tipos de archivo que aceptara
         if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "application/pdf")
              ) && ($_FILES["file"]["size"] < 1000000000000)//Approx. 100kb files can be uploaded. Tamaño del size
                 && in_array($file_extension, $validextensions)) { //arreglo parea validar la extension de la imagen
                    $ruta = 'fotos/'.$folio.'/';
                    $archivo = $ruta.$_FILES["file"]["name"];
			
			if(!file_exists($ruta)){
				mkdir($ruta);
			}
			
			if(!file_exists($archivo)){
				
				$resultado = @move_uploaded_file($_FILES["file"]["tmp_name"], $archivo);
				
				if($resultado){
					echo "Archivo Guardado";
					} else {
					echo "Error al guardar archivo";
				}
				
				} else {
				echo "Archivo ya existe";
			}
			
			} else {
			echo "Archivo no permitido o excede el tamaño";
		}