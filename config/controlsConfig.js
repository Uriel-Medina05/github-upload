// JavaScript Document
define(function(){
	var ui = {
			ui:{	denueTurista:true, //herramienta ¿Que hay aqui?
					miniBaseMap:false,
					startupTotorial:true,
					layersBar:true, //barra de temas
					autoOpenThemeBar:false,
					toolBar:true, //barra de descarga compartir, imprimir y ayuda
					tool_gps:true //boton GPS en control de vista
				},
			map:{
					geolocation:true,
					identify:{
						enable:true,
						createMarker:true,
						custom:null,
						fixedLayer:null
					},
					elevation:false,
					onOver:{
						showPolygon:false,//true
						color:{
							filled:"none",
							size:2,
							line:"#01FCEF"
						}
					},
					level:true
				},
			system:{
					activeCookie:true
				}
		}
	return ui;
})

