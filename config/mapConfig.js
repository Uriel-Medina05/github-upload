define(function(){
	var mapConfig = {
		defaultLayers:[],
        layers:[
			{
				type:'Wms',
				label:'Vectorial',
				url:'http://127.0.0.1/cgi-bin/mapserv.exe?map=c:/opt/map/ciegen/ciegen_capas.map&',
				tiled:false,
				format:'png'
			},
            {
                type:'Wms',
                label:'Denue',
                url:'http://127.0.0.1/cgi-bin/mapserv.exe?map=c:/opt/map/ciegen/ciegen_capas.map&',
                tiled:false,
                format:'png'
            },
			{
				type:'Wms',
				label:'Text',
				url:'http://127.0.0.1/cgi-bin/mapserv.exe?map=c:/opt/map/ciegen/ciegen_texto.map&',
				tiled:false,
				format:'png'
            }
		],
		//leyendUrl:'http://127.0.0.1/cgi-bin/mapserv.exe?map=c:/opt/map/ciegen/ciegen_leyenda.map&Request=GetLegendGraphic&format=image/png&Version=1.1.1&Service=WMS&LAYER=',
        projection:"EPSG:4326",
		//initialExtent:{lon:[-120.9103, 10.9999 ],lat:[-83.3810,34.5985]},
		initialExtent:{lon:[-106.5916, 23.33 ],lat:[-103.3237,20.3034]},
		restrictedExtent:{lon:[-120.9103, 10.9999 ],lat:[-83.3810,34.5985]},
		resolutions:[4891.969809375,2445.9849046875,1222.99245234375,611.496226171875,305.7481130859375,152.87405654296876,76.43702827148438,38.21851413574219,19.109257067871095,9.554628533935547,4.777314266967774,2.388657133483887,1.1943285667419434,0.5971642833709717,0.29858214168548586],
		buffers:{
			limit:'1000'
		}
	}

	return mapConfig;

});
