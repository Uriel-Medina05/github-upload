define(function() {
	var data = {
       	themes:{
		  T1:{
                label:'Obra publica',
                layers:[
                    'c_obra'
                ],
                desc:'Obra Pública',
                img:'obrapublica.png'
            }
           
        },
        baseLayers:{
			        B1:{
                		type:'Wms',
                		label:'Topogr&aacute;fico sin sombreado- INEGI',
                		img:'mapa_sin_sombreado.jpg',		             
                		url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
			 	          layer:'MapaBaseTopograficov61_sinsombreado',
                		rights:'Derechos Reservados &copy; INEGI',
                		tiled:true,
				          legendlayer:['c100','c101','c102'],
                		desc:'REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003',
                		clasification:'VECTORIAL'
                       },
			        B2:{
               			type:'Wms',
                		label:'Topográfico con sombreado- INEGI',
                		img:'mapa_con_sombreado.jpg',		             
                		url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
				            layer:'MapaBaseTopograficov61_consombreado',
                		rights:'Derechos Reservados &copy; INEGI',
                		tiled:true,
				            legendlayer:['c100','c101','c102','c102-r','c102m','c103','c109','c110','c111','c112','c200','c201','c202','c203','c206','c300','c301','c302','c310','c311','c762','c793','c795'],
                		desc:'REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003',
                		clasification:'VECTORIAL'
                       },
                    B3:{
                		type:'Wms',
                		label:'Hipsogr&aacute;fico - INEGI',
                		img:'baseHipsografico.jpg',		             
                		url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
                		layer:'MapaBaseHipsografico',
				            rights:'&copy; INEGI 2013',
                		tiled:true,
                		legendlayer:['img_altimetria.png'],
                		desc:'IMAGEN DE RELIEVE QUE MUESTRA UNA COMBINACION DE ELEVACION A TRAVES DE COLORES HIPSOGRAFICOS, GENERADA POR PROCESAMIENTO DEL CONTINUO DE ELEVACIONES MEXICANOS DE 3.0 DE 15 METROS.',
                		clasification:'VECTORIAL'
                       },
                    B4:{
                        type:'Bing',
                        label:'Bing maps',
                        img:'Bing.jpg',
                        key:'At-Y-dJe-yHOoSMPmSuTJD5rRE_oltqeTmSYpMrLLYv-ni4moE-Fe1y8OWiNwZVT',
                        layer:'Aerial',
                        rights:'&copy; Bing Maps',
                        clasification:'VECTORIAL'
                        },			
                    B5:{
                        type:'Osm',
                        label:'Open Street Map',
                        img:'Osm.jpg',
                        rights:'&copy; OpenStreetMap contributors',
                        clasification:'VECTORIAL'
                       },
                    B6:{
                        type:'Esri',
                        label:'Esri Map Raster',
                        img:'Google.jpg',
                        url:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}',
                        rights:'&copy; ESRI',
				        clasification:'VECTORIAL'
                       }, 
		            B7:{
                        type:'Esri',
                        label:'Esri Map Vectorial',
                        img:'Esri.jpg',
                        url:'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}',
                        rights:'&copy; ESRI',
				        clasification:'VECTORIAL'
                       },
        },
        layers:{
        groups:{                
            G1:{
              label:'Límites del Marco Geoestadístico',
              layers:{
                    c100:{
                        label:'Estatales',
                        synonymous:['estado','estatales'],
                        scale:0,
                        position:54,
                        active:true,
                        texts:{
                            scale:1,
                            active:false
                        }
                    },     
                    c101:{
                        label:'Municipales',
                        synonymous:['municipio','municipales','municipal'],
                         scale:0,
                        position:55,
                         active:true,
                         texts:{
                            scale:1,
                            active:false
                            }
                    },  
                    c_ageb:{
                      label:'Agebs Urbanas',
                      synonymous:['Ageb'],
                      scale:0,
                      position:58,
                      active:false,
                      texts:{
                        scale:1,
                        active:false
                      }
                    },
                    c_agebr:{
                      label:'Agebs rurales',
                      synonymous:['Agebs rurales'],
                      scale:0,
                      position:61,
                      active:false,
                      texts:{
                        scale:1,
                        active:false
                      }
                    },  
                  }
            },
            G2:{
              label:'Localidades',
              layers:{
                c102:{
                  label:'Localidades Urbanas',
                  synonymous:['Localidades Urbanas'],
                  scale:0,
                  position:56,
                  active:false,
                  texts:{
                      scale:1,
                      active:false
                  }
                },
                c_lpr:{
                  label:'Localidades rurales',
                  synonymous:['Localidades rurales'],
                  scale:0,
                  position:62,
                  active:false,
                  texts:{
                    scale:1,
                    active:false
                  }
                },
                c_ah:{
                  label:'Colonias (Asentamientos Humanos)',
                  synonymous:['Colonias'],
                  scale:0,
                  position:57,
                  active:false,
                  texts:{
                          scale:1,
                          active:false
                  }
                },
                c_mza:{
                  label:'Manzanas',
                  synonymous:['Manzanas'],
                  scale:0,
                  position:59,
                  active:false,
                  texts:{
                    scale:1,
                    active:false
                  }
                },
                c_vial:{
                  label:'Vialidades',
                  synonymous:['calles'],
                  scale:0,
                  position:60,
                  active:false,
                  texts:{
                    scale:1,
                    active:false
                  }
                }
              }
            },
            G3:{
              label:'Directorio Estadístico Nacional de Unidades Económicas',
              layers:{
                c_denue:{
                  label:'Directorio Estadístico Nacional de Unidades Económicas',
                  synonymous:['DENUE'],
                  scale:0,
                  position:63,
                  active:false,
                  metadato:'php/metadato.php?dato=identificador_capa',
                  texts:{
                    scale:1,
                    active:false
                  }
                }
              }
            },
            G4:{
                  label:'Obra Pública',
                  layers:{
                    c_obra:{
                      label:'Obra Pública',
                      synonymous:['Obra'],
                      scale:0,
                      position:64,
                      active:false,
                      metadato:'php/metadato.php?dato=identificador_capa',
                      texts:{
                        scale:1,
                        active:false
                      }
                    }
                  }
              }
        }
   	}
 };   	
if(typeof(treeConfig)!='undefined'){
        	data = $.extend(data, treeConfig);
    	}
    	return data;
});
