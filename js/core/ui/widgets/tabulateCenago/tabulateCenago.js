define(["dataSource","printControl","toolsConfig","tree"], function(dataSource,printControl,toolsConfig,tree){
$.widget( "custom.tabulateCenago", {
		  id:'custom_tabulateCenago',
          created:false,
          idForm:'custom_tabulateCenago_form',
          dataDownload:{
                    formats:{
                              'csv':{label:'CSV',title:'Tabla de atributos'},
                              'xls':{label:'XLSX',title:'Tabla de atributos'}/*,
                              'shp':{label:'Shape',title:'shp'}*/
                    },
                    data:null
          },
          dataToDownload:null,
          animate:true,
          collapsed:false,
          maxHeight:550,
          minHeight:200,
          root:'body',
          extents:[],
          ids:[],
          visible:false,
          startPage:1,
          pagesPerView:7,
          params:{
                    page:1,
                    limit:20,
                    project:"mdm6",
                    table:""  
          },
		  options:{
                    table:null
		  },
		  _init:function(){
					
		  },
          getValueSection:function(value){
                    var obj = this;
                    var response = value;
                    if (obj.indicador[value]) {
                        response = obj.indicador[value];
                    }
                    return response;
          },
		  getValue:function(value){
				    var response = value;
					var obj = this;
					var i = obj.interpreter;
					for(var x in i){
						  if (i[x].value==(value+'')){
							  response=i[x].label;
							  break;
                          }
					}
					return response;
		  },
          getTools:function(){
                    var obj = this;
                    var chain = '';
                    for (var x in obj.dataDownload.formats){
                              var i = obj.dataDownload.formats[x];
                              chain+='<div class="'+x+' itemTool">'+
                                                '<div class="template_tabulateCenago tt_'+x+'"></div>'+
                                                '<div class="labelItem">'+i.label+'</div>'+
                                     '</div>';
                    }
                    return '<div class="tools">'+chain+'</div>';
          },
		  buildStructure:function(){
                         var obj = this;
						var chain = '<div id="'+this.id+'" class="'+this.id+' no-print">'+
                                            '<div class="toolBar">'+
                                                  '<div class="iconTabulate"><div class="template_tabulateCenago tableIcon"></div></div>'+
                                                  obj.getTools()+
                                            '</div>'+
                                            '<div class="content">'+
                                                  '<div class="header">'+
                                                            '<div class="title">Tabla de atributos</div>'+
                                                            '<div class="table">'+obj.getTitle(obj.options.table)+'</div>'+
                                                            '<div class="close">'+
                                                                      '<div class="dinamicPanel-sprite dinamicPanel-close"></div>'+
                                                            '</div>'+
                                                            '<div class="plegTable">'+
                                                                      '<div class="template_tabulateCenago rowdown"></div>'+
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="container"></div>'+
                                            '</div>'+
											//'<div class="container"></div>'+
                                            '<div class="blocker"><center class="containerBlocker"><div class="etiquetaBlock">Cargando</div><div><img src="js/core/ui/widgets/tabulateCenago/spinner.gif"></div></center></div>'+
                                            //obj.getTools()+
								   '<div>';
						$('body').append(chain);
                        this.created=true;
                        this.visible=true;
		  },
          hide:function(id){
                    var obj = this;
                    if (!id) {
                         $("."+obj.id).fadeOut();
                    }else{
                              if (id==obj.options.table) {
                                $("."+obj.id).fadeOut();
                              }
                    }
                   
                    obj.visible=false;
          },
          show:function(){
                    var obj = this;
                    $("."+obj.id).fadeIn();
                    obj.visible=true;
          },
          getFormatNumber : function(nStr){
                    nStr += '';
                    x = nStr.split('.');
                    x1 = x[0];
                    //alert('antes');
                    x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
          },
          drawFeature:function(features){
                    var obj = this;
                    MDM6('deletePolygons');
                    for(var x in features){
                              var g = features[x].the_geom;
                              var params = {fColor:"blue",lSize:2,lColor:"blue",lType:"line"};
                              MDM6('customPolygon',{action:'add',wkt:g,params:params});
                    }
          },
          request : function(params,action){
                  obj=this;
                  var msg = 'Servicio no disponible intente m&aacute;s tarde';
                  var r= {
                            success:function(json,estatus){
                                var valid=false;
                                if (json){
                                            if(json.response.success){
                                                  valid = true;
                                                  switch (action) {
                                                            case 'tabulate':
                                                                      if (!obj.created) {
                                                                                obj.buildStructure();
                                                                                obj.events();
                                                                      }
                                                                      var center = (!obj.visible)?true:false;
                                                                      obj.show();
                                                                      if (center) {
                                                                          //obj.centerWindow();
                                                                      }
                                                                      obj.displayInformation(json.data);
                                                                      obj.dataDownload.data = json.data;
                                                            break;
                                                            case 'geometry':
                                                                      obj.drawFeature(json.data.element);
                                                            break;
                                                  }
                                                  
                                            }
                                }
                                if (!valid) {
                                         //alert(msg);
                                }
                                
                            },
                            beforeSend: function(xhr) {
                                obj.showSpinner();
                               
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //alert('Error')
                            },
                            complete: function(solicitudAJAX,estatus) {
                                obj.hideSpinner();
                            }
                  };
                  var source = toolsConfig.cenago.dataSources[action];
                  r = $.extend(r, source);
                  r.data = (source.stringify)? JSON.stringify(params):params;
                  $.ajax(r);
          },
          centerWindow:function(){
                    var obj = this;
                    $("."+obj.id).position({
                              of: $( obj.root ),
                              my: "center center",
                              at: "center center"
                    });
          },
          hideSpinner:function(){
                    $("."+obj.id +" .blocker").fadeOut();
          },
          showSpinner:function(){
                    var obj = this;
                    $("."+obj.id +" .blocker").fadeIn();
          },
          findVariable:function(source,variable){
                    var response = {exist:false,value:0};
                    for(var x in source){
                              var i = source[x];
                              if (i.label==variable) {
                                response.exist=true;
                                response.value=i.value;
                                break;
                              }
                    }
                    return response;
          },
          getPages:function(currentPage,totalPages){
                    var obj = this;
                    var chain = '';
                    var lastPageDisplayed = 0;
                    
                    chain+=(obj.params.page > obj.pagesPerView)?'<div class="rowPag left"><div class="template_tabulateCenago rowLeft"></div></div>':'';
                    for (var x=obj.startPage;x<(obj.startPage+(obj.pagesPerView));x++) {
                              if (x<=totalPages) {
                                        chain+='<div page="'+x+'" class="itemPage '+((x==currentPage)?'active':'')+'">'+x+'</div>';
                                        lastPageDisplayed =x;
                              }
                    }
                    chain+=(lastPageDisplayed < totalPages)?'<div class="rowPag right"><div class="template_tabulateCenago rowRight"></div></div>':'';
                    return chain;
          },
          getTitle:function(table){
                    var obj = this;
                    var title = '';
                    for (var x in tree.layers.groups) {
                        var group = tree.layers.groups[x];
                        for (var y in group.layers) {
                              var layer = group.layers[y];
                              if (y==table) {
                                        title = 'Tabla: '+layer.label;    
                                        break;
                              }
                        }
                    }
                    return title;
          },
          displayInformation:function(data){
                    var obj = this;
                    obj.extents=[];
                    obj.ids=[];
                    $("."+obj.id + " .header .table").html(obj.getTitle(obj.options.table));
                    var header = '';
                    var rows='';
                    for(var x in data.elements){
                              var item = data.elements[x];
                              rows+='<tr class="trCenago" pos="'+x+'">';
                              for (var y in item) {
                                        if (x==0) {
                                            if(y!='extent'){      
                                                  header+='<th>'+y+'</th>';
                                            }
                                        }
                                        var e = item[y];
                                        if (y=='extent') {
                                                  obj.extents[x]=e;
                                        }else{
                                                  if (y=='ID') {
                                                    obj.ids[x]=e;
                                                  }
                                                  rows+='<td class="rowCenago" item="">'+e+'</td>'; 
                                        }
                              }
                              rows+='</tr>';
                    }        
                                        
                    
                    var chain = '<div class="searcher"><input type="text" placeholder="Buscar"/></div>'+
                                '<div class="pagination">'+obj.getPages(data.currentPage,data.pages)+'</div>'+
                                '<div class="info">'+
                                   '<table class="tabulate">'+
                                        '<tbody>'+
                                                  '<tr>'+header+'</tr>'+
                                                  rows+
                                        '</tbody>'+
                                  '</table>'+
                                '</div>'+
                                '<div class="recordCount">'+
                                        '<div class="labelCounter">Registros '+obj.getFormatNumber(data.recordCount)+'</div>'+
                                '</div>';
                    $("."+obj.id +" .container").html(chain);
                    
                    $("."+obj.id+" .itemPage").click(function(){
                              var page = parseInt($(this).attr('page'));
                              if (page!=obj.params.page) {
                                        obj.params.page = page;
                                        obj.update();
                              }
                               MDM6('deletePolygons');
                              
                    });
                    $("."+obj.id+" .rowPag.left").click(function(){
                              obj.startPage = obj.startPage-obj.pagesPerView;
                              obj.params.page = obj.startPage+0;
                              obj.update();
                              MDM6('deletePolygons');
                    });
                    $("."+obj.id+" .rowPag.right").click(function(){
                              obj.startPage = obj.startPage+obj.pagesPerView;
                              obj.params.page = obj.startPage+0;
                              obj.update();
                              MDM6('deletePolygons');
                    });
                    
                    $("."+obj.id+" .trCenago").click(function(){
                              
                              $("."+obj.id +" .trCenago.selected").removeClass('selected');
                              $(this).addClass('selected');

                              var pos = parseInt($(this).attr('pos'));
                              MDM6('goCoords',obj.extents[pos]);
                              var id = obj.ids[pos];
                              var params = {project:obj.params.project,id:id,table:obj.options.table}
                              obj.request(params,'geometry');
                    });
                    
          },
          
          resetDataToDownload:function(){
                    var obj = this;
                    obj.dataToDownload = null;
                    obj.dataToDownload = {title:'',columns:[], values:[]};
          },
          convertToHtml : function(texto){
		
                    var ta=document.createElement("textarea");
                    ta.innerHTML=texto.replace(/</g,"&lt;").replace(/>/g,"&gt;");
                    return ta.value;
          },
          replaceSpetialCharacters:function(text){
                    return text.replace(/[^\w\s]/gi, '_');
          },
          removeAcent : function(a){
                    var chain = a;
                    chain = chain.replace(/[\u00E1]/gi,'a');
                    chain = chain.replace(/[\u00E9]/gi,'e');
                    chain = chain.replace(/[\u00ED]/gi,'i');
                    chain = chain.replace(/[\u00F3]/gi,'o');
                    chain = chain.replace(/[\u00FA]/gi,'u');
                    chain = chain.replace(/[\u00F1]/gi,'n');
                    
                    chain = chain.replace(/[\u00C1]/gi,'A');
                    chain = chain.replace(/[\u00C9]/gi,'E');
                    chain = chain.replace(/[\u00CD]/gi,'I');
                    chain = chain.replace(/[\u00D3]/gi,'O');
                    chain = chain.replace(/[\u00DA]/gi,'U');
                    chain = chain.replace(/[\u00D1]/gi,'N');
                    
                    return chain;
          },
          setDataToDownload:function(format){
                    var obj=this;
                    var title =obj.convertToHtml(obj.getTitle(obj.options.table));
                    title = obj.removeAcent(title);
                    obj.resetDataToDownload();
                    obj.dataToDownload.title=obj.replaceSpetialCharacters(title);
                    obj.dataToDownload.values.push(['Tabla de atributos']);
                    obj.dataToDownload.values.push([title]);
                    obj.dataToDownload.values.push(['']);
                    var arrayHeaders = [];
                   for(var x in obj.dataDownload.data.elements){
                              var row = obj.dataDownload.data.elements[x];
                              var array=[];
                              for(var y in row){
                                        var i = row[y];
                                        var valid = (y!='extent')?true:false;
                                        if ((x==0)&&(valid)) {
                                                 arrayHeaders.push(y);
                                        }
                                        if (valid) {
                                            array.push(row[y])
                                        }
                                        
                                        
                              }
                              if (x==0) {
                                obj.dataToDownload.values.push(arrayHeaders); 
                              }
                              obj.dataToDownload.values.push(array); 
                   }
          },
          download:function(format){
                    var obj= this;
                    var params = obj.dataToDownload;
                    var c = toolsConfig.cenago.dataSources;
                    var o=c.exportData;
                    var a=c.exportData;
                    var request = {
                        type: o.type,
                        dataType: o.dataType,
                        url: o.url,
                        data:((o.stringify)?JSON.stringify(params):params),
                        contentType:o.contentType,
                        success:function(json,estatus){
                          var error=false;
                          if(json.response.success){
                                  $('#'+obj.idForm).remove();
                                  var cadena = '<form id="'+obj.idForm+'" action="'+a.urlGet+'/'+format+'/'+json.data.id+'" method="GET" enctype="multipart/form-data" style="display:none">'+
                                                      '<input type="submit" value="Submit">'+
                                              '</form>';
                                  $("body").append(cadena);
                                  $('#'+obj.idForm).submit();
                                  
                          }else{
                              error=true
                          }
                          if(error){
                              alert("no valido")
                          }
                        },
                        beforeSend: function(solicitudAJAX) {
                          
                        },
                        error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                          
                        },
                        complete: function(solicitudAJAX,estatus) {
                        }
                     };
                     
                     $.ajax(request);
          },
		  events:function(){
						var obj = this;
                        $("."+obj.id +" .close").click(function(){
                             obj.hide();
                             MDM6('deletePolygons');
                        });
                        $("."+obj.id +" .print").click(function(){
                             obj.print();
                        });
                        $("."+obj.id +" .xls").click(function(){
                             obj.setDataToDownload('xls'); 
                             obj.download('xls');
                        });
                        $("."+obj.id +" .csv").click(function(){
                             obj.setDataToDownload('csv'); 
                             obj.download('csv');
                        });
                        $("."+obj.id +" .plegTable").click(function(){
                             obj.pleg();
                        });
                        //obj.centerWindow();
                        //$("."+obj.id).draggable({ cancel: ".info,.pagination,.searcher" });
                        $( window ).resize(function() {
                                        if (!obj.collapsed) {
                                                  var height = ($(window).height() < (550+230))?$(window).height()-230:550;
                                                  obj.maxHeight = height;
                                                  $("."+obj.id).css('height',height+'px');
                                        }
                        });
		  },
          print:function(){
                    var title='prueba';
                    var html ='<div style="position:absolute;left:0%;width:100%;">'+
                                        '<center>'+
                                                  '<img src="js/core/ui/widgets/cardCenago/img/logo.png">'+
                                        '</center>'+
                                        '<div class="PopupElementItem none custom_cardCenago">'+
                                                           $('.'+obj.id+' .info').html()+
                                        '</div>'+
                              '</div>';
                              
                    printControl.printHtml(html);
          },
          pleg:function(){
                    var obj = this;
                    var element = $("."+obj.id);
                    var height = obj.minHeight;
                    var side = 'down';
                    var width = 300;
                    $("."+obj.id+' .tools').hide();
                    if (obj.collapsed) {
                        height = ($(window).height() < (550+230))?$(window).height()-230:550;
                        obj.maxHeight = height;
                        side='up';
                        width=387;
                    }
                    if(obj.animate){
                        obj.animate = false;
                        $('.'+obj.id+' .info').css('overflow','hidden');
                        element.animate({height:height+'px',width:width+'px'},function(){
                            obj.animate = true;
                            var newSide = 'down';
                            obj.collapsed = !obj.collapsed;
                            if (side=='down') {
                               var h = $('.'+obj.id+' .header').height()+10;
                               element.animate({height:h+'px'},function(){
                                        $('.'+obj.id+' .info').css('overflow','auto');
                              });
                               obj.collapsed = true;
                               newSide='up';
                            }else{
                              $("."+obj.id+' .tools').show();
                              $('.'+obj.id+' .info').css('overflow','auto');
                            }
                            $('.'+obj.id+' .plegTable').children('div').removeClass('rowdown').removeClass('rowup');
                            $('.'+obj.id+' .plegTable').children('div').addClass('row'+newSide);
                            
                        });
                    }
          },
		  update:function(){
                    var obj = this;
                    var params = $.extend({table:obj.options.table}, obj.params,obj.options);
                    this.request(params,'tabulate');
		  },
		  _create: function() {
                       this.update();
		  },
		  
		  _refresh: function(){
				// trigger a callback/event
				this._trigger( "change" );
		  },
			 
		  _destroy: function() {
				  this.element.remove();
		  },
		
		  setOptions: function() {
				// _super and _superApply handle keeping the right this-context
				this._superApply( arguments );
				this._refresh();
		  },
		  _setOption: function(key, value){
						this.options[key] = value;
						switch(key){
								case 'table':
											this.options.table=value;
                                            this.params.page=1;
                                            this.startPage = 1;
											this.update();
								break;
						}
		  }
});
});