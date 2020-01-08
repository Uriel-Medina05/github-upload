<?php
    // include 'obrapublica/php/modeloObra.php?result=pg_query($sql)';
    
     require 'obrapublica/php/modeloObra.php';
     isertObra();
     echo $resultado; 

    // $result = pg_query($sql);
        //consulta id
        

    echo ($_FILES["file"]["type"]); //tomo lo proveniente del forObr
    
    if(isset($_FILES["file"]["type"])){ //Condiciono el file de la imagen

        $validextensions = array("image/jpg","image/jpeg","image/png","application/pdf"); //declaro variable para validar las extenciones del tipo de archivo que aceptara
        $limite_kb = 20000000;
      
        for($x=0; $x<count($_FILES["file"]["name"]); $x++)
        {
        $file = $_FILES["file"];
        //Condiciono la cadena para los tipos de archivo que aceptara
        if(in_array($file["type"][$x], $validextensions) /*&& $_FILES["file"]["size"] <= $limite_kb * 20000024*/){
                    if ($file["error"][$x] > 0){ //si es error retorna mensaje
                         echo "</br> Return Code: " . $file["error"][$x] . "<br/><br/>";
                     }
                  else { //si guardas archivo existente lo valida y nos manda mensaje de que el archivo ya existe 
                    if (file_exists("fotos/" . $file["name"][$x].$RF.'/')) {
                          echo $file["name"][$x] . " <span id='invalid'><b>Archivo ya existe.</b></span> ";
                     } else //caso contrario declaro variable para el nombre de archivo asi como una variable con la ruta donde depositare el archivo.
                     {
                      $sourcePath = $file['tmp_name'][$x]; // Storing source path of the file in a variable
                      $targetPath = "fotos/".$RF.'/'; // Target path where file is to be stored
                      $archivo = $targetPath.$file["name"][$x];
                      
                      if(!file_exists($targetPath)){
                         mkdir($targetPath);
                      }
                      if(!file_exists($archivo)){
                        $resultado = @move_uploaded_file($sourcePath,$archivo); // Moving Uploaded file muevo nombre de archivo y el archivo ala carpeta ya declarada 
                        
                      }
                       //declara mensajes de Subida de Archivos con exito asi como sus caracteristicas correspondientes.
                       echo "<span id='success'>Archivo subida satisfactoriamente...!!</span><br/>";
                        

                     }
                  }
              } else {
                  echo "<span id='invalid'>***Invalid file Size or Type***<span>";
         }
}
}
?>