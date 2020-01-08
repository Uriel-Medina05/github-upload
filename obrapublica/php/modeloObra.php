<?php
	//error_reporting(0);
	$params = $_REQUEST;
	$action = isset($params['action']) && $params['action'] !='' ? $params['action'] : 'list'; 
	switch($action) {
		case 'add':
			isertObra();
 			break;
			default:
			return;
		case 'mod':
			modObra();
			break;
		case 'borra':
			borraObra();
			break;
		case 'leer':
			leerDatos($params['id']);
 			break;
 		case 'localiza':
			localizaDatos();
 			break;
 		case 'archivo':
			cargaArchivo();
 			break;
	}
	 
	function conectDB(){
		$dbcon = pg_connect("host=127.0.0.1 port=5433 dbname=ciegendata user=postgres password=postgres")or die('connection failed');
		return $dbcon;
	}

	function localizaDatos(){
		alert("no se localiza");
		$resp['status'] = 'localiza';
		$coor = "POINT(".$_POST['lon']." ".$_POST['lat'].")";
		$sql_mun = "select cve_mun, nombre as nom_mun, region from signay.mun where ST_Intersects(the_geom, ST_GeomFromText('".$coor."',900913));";
		$sql_loc = "select cve_loc, nombre as nom_loc from signay.loc_mza where ST_Intersects(the_geom, ST_GeomFromText('".$coor."',900913));";
		$sql_ah = "select cve_asen, tipo_asen, nom_asen from signay.ah where ST_Intersects(the_geom, ST_GeomFromText('".$coor."',900913));";
		$dbcon 	= conectDB();
		$result = pg_query($dbcon, $sql_mun);
		if ($result){
			$data = pg_fetch_all($result);
			$resp['mun'] = $data;
		}else{
			$resp['mun'] = false;
		}
		$result = pg_query($dbcon, $sql_loc);
		if ($result){
			$data = pg_fetch_all($result);
			$resp['loc'] = $data;
		}else{
			$resp['loc'] = false;
		}
		$result = pg_query($dbcon, $sql_ah);
		if($result){
			$data = pg_fetch_all($result);
			$resp['asen'] = $data;
		}else{
			$resp['asen'] = false;
		}
		echo json_encode($resp);
	}


	function leerDatos($id){
		$sql = 'select * from obrapublica.obp where gid='.$id;
		$resp['status'] = false;
		$dbcon 	= conectDB();
		$result = pg_query($dbcon, $sql);
		if ($result){
			$resp['status'] = true;
			$data = pg_fetch_all($result);
		}
		$resp['record'] = $data;
		echo json_encode($resp);
	}

	function borraObra(){
		$data = $resp 	= array();
		$folio 	= $_POST["folio"];
		$dbcon 	= conectDB();
		$sql = "delete from obrapublica.obp where folio='".$folio."' ;";
		$result = pg_query($dbcon, $sql);
  		if ($result) {
  			$resp['status'] = true;
     		$resp['record'] = $sql;
  		} else {
      		$resp['status'] = false;
  		}
		echo json_encode($resp);
	}

	function modObra(){
		$data = $resp 	= array();

		$folio 	= $_POST["folio"];
		$descr 	= $_POST["desc"];
		$ejer	= $_POST["ejer"];
		$dep	= $_POST["dep"];

		$dbcon 	= conectDB();
		$sql = "update obrapublica.obp set folio='".$folio."', descr='".$descr."', ejercicio ='".$ejer."', dep_ejec='".$dep."' where folio='".$folio."' ;";
		$result = pg_query($dbcon, $sql);
  		if ($result) {
  			$resp['status'] = true;
     		$resp['record'] = $sql;
  		} else {
      		$resp['status'] = false;
  		}
		echo json_encode($resp);
	}

	function cargaArchivo(){
		
	}
	function isertObra() {
		$data = $resp 	= array();
		$resp['status'] = false;
		$data['folio'] 	= $_POST["folio"];
		$coor 	= "ST_GeomFromText('POINT(".$_POST['lon']." ".$_POST['lat'].")',900913)";
		$folio 	= $_POST["folio"];
		$descr 	= $_POST["desc"];
		$ejer	= $_POST["ejer"];
		$reg	= $_POST["region"];
		$dep	= $_POST["dep"];
		$cmun	= $_POST["cmun"];	
		$mun	= $_POST["mun"];
		$cloc	= $_POST["cloc"];
		$loc	= $_POST["loc"];
		$casen	= $_POST["casen"];
		$nasen	= $_POST["nasen"];
		$tasen	= $_POST["tasen"];
		$tabla 	= 'obrapublica.obp';
		$sql	= "INSERT INTO $tabla (folio, descr, ejercicio,region,dep_ejec, cve_ent,entidad,cve_mun,nom_mun,cve_loc,nom_loc,cve_asen,tipo_asen,nom_asen,the_geom) VALUES('$folio','$descr','$ejer','$reg','$dep','18','Nayarit','$cmun','$mun','$cloc','$loc','$casen','$tasen','$nasen', $coor)RETURNING gid;";
		//echo $sql;
		$dbcon 	= conectDB();
		$result = pg_query($sql);

		$id_insert =pg_last_oid($result);
		$GLOBALS['RF']=$folio;
		$GLOBALS['resultado']=$result;
		//global $resulatado = $result;
		//echo $result;
		if ($result){
			$resp['status'] = true;
		}
		echo json_encode($resp);
	}	
?>
