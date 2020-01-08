<?php
echo ($_FILES["file"]["type"]); //tomo lo proveniente del forObr

if(isset($_FILES["file"]["type"])){ //Condiciono el file de la imagen
    $validextensions = array( "jpg", "png","pdf"); //declaro variable para validar las extenciones del tipo de archivo que aceptara
    $temporary = explode(".", $_FILES["file"]["name"]); //declaro variable para el nombre de archivo
    $file_extension = end($temporary); //declaro e igualo el tipo de archivo con el nombre.

 //Condiciono la cadena para los tipos de archivo que aceptara
     if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "application/pdf")
            ) && ($_FILES["file"]["size"] < 1000000000000)//Approx. 100kb files can be uploaded. Tamaño del size
              && in_array($file_extension, $validextensions)) { //arreglo parea validar la extension de la imagen
        
                if ($_FILES["file"]["error"] > 0){ //si es error retorna mensaje
                 echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
     } else {//si guardas archivo existente lo valida y nos manda mensaje de que el archivo ya existe 
        
        if (file_exists("fotos/" . $_FILES["file"]["name"])) {
           echo $_FILES["file"]["name"] . " <span id='invalid'><b>Archivo ya existe.</b></span> ";
     
        }else {   //caso contrario declaro variable para el nombre de archivo asi como una variable con la ruta donde depositare el archivo.
         
            $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
            $targetPath = "fotos/".$_FILES['file']['name']; // Target path where file is to be stored
             move_uploaded_file($sourcePath,$targetPath); // Moving Uploaded file muevo nombre de archivo y el archivo ala carpeta ya declarada 

             //declara mensajes de Subida de Archivos al moemnto de dar click al boton y muestra mensaje con exito asi como sus caracteristicas correspondientes.
            echo "<span id='success'>Archivo subida satisfactoriamente...!!</span><br/>";
            echo "<br/><b>Arhivo:</b> " . $_FILES["file"]["name"] . "<br>";
            echo "<b>Tipo:</b> " . $_FILES["file"]["type"] . "<br>";
            echo "<b>Tamaño:</b> " . ($_FILES["file"]["size"] / 100000024) . " kB<br>";
            echo "<b>Archivo temporal:</b> " . $_FILES["file"]["tmp_name"] . "<br>";
      }
   }
  }
   else
   {
    echo "<span id='invalid'>***Invalid file Size or Type***<span>";
   }  
}
?>