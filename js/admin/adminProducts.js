var $adminProducts = {
	 tablename:'products',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($adminProducts.tablename);
	},
	init : function(){
				  $(document).on('click.bs.modal.data-api', '.btn-dlg-products', function (event) {
				  		$adminProducts.dialogShow();
            return false;
        });
			$adminProducts.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		        var data = {	table: $adminProducts.tablename, 
								    	objdata : $adminProducts.objdata(),
								    	where :"where Active = 'Y' order by Created desc"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $adminProducts.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainNews",
            DivDataSelector: "#gridMainTempNews",
            SourceUrl: $globalKudo.apipath,
            Data : data,
            Sorting: { sort: false, excepts: ["records_no", "action"] },
            Searching: false,
            PerPage:5,
            fnRowDisplayFormat: function (html, data) {
                return html.format(
                		data.Id,
                		data.RecordNo,
                    	data.Name,
                    	(data.Picture !=null)?$globalKudo.rootpath+data.Picture:$adminProducts.defaultimg,
                    	data.Price
                    );
            },
            fnRowElementsAction: [{
                name: ".btn-delete",
                callback: $adminProducts.deleteTeams,
                authorize:authorize
            },
            {
                name: ".btn-assign",
                callback: $adminProducts.dialogShow,
                authorize: authorize
            },
            {
                name: ".btn-view",
                callback: $adminProducts.dialogShow,
                authorize: authorize
            }],
            fnRowCreated: function ($html, data) {
               /* if (data.Id == 1) {
                    $html.find('.btn').remove();
                }*/

                return $html;
            },
        });
				$adminProducts.$grid.Bind();
	 },
	 dialogShow:function ($row, id){

	 			   	
            $adminProducts.$taskDialog = $dialogFirst.init('#newNewsTmp');
            $adminProducts.$formValid = $adminProducts.$taskDialog.find("#newNewsForms");
            $adminProducts.$formValid.validate({
		            rules: {
		                ProductTitle: {
		                    required: true
		                },
		                ProductPrice:{
		                	required:true,
		                	number:true
		                },
		                ProductImage:{
		                	required:true	
		                },
		            },
		            messages: {
		                ProductTitle: {
		                    required: "required",
		                },
		                ProductPrice: {
		                    required: "required",
		                    number:"numberOnly",
		                },
		                ProductImage: {
		                    required: "required",
		                },
		            }
		        });
            $adminProducts.$taskDialog.find('#files').on('change',function(evt){

			 								$fnglobal.handleFileSelect(evt,$adminProducts.$taskDialog.find('#list'),false,function(){
			 									$adminProducts.$taskDialog.find('input[name=ProductImage]').val("have");
			 									$adminProducts.$taskDialog.find('.error[for=ProductImage]').hide();
			 									// $adminProducts.$taskDialog.find(".btn-save").click();
			 								});
			 					return false;
			 					});
            $adminProducts.$taskDialog.find(".btn-close").hide();
              $spinner.show();	
            if(id){


            	var tracking = $(this.name).attr("tracking");
            	if(tracking == "V"){
            			$adminProducts.$taskDialog.find("#files").hide(); 
            			$adminProducts.$taskDialog.find(".btn-save").hide();
            			$adminProducts.$taskDialog.find(".btn-cancel").hide();
            			$adminProducts.$taskDialog.find(".btn-close").show();
            			$adminProducts.$taskDialog.find('input[name=ProductTitle]').prop('readonly', true);	
				 		 $adminProducts.$taskDialog.find('input[name=ProductPrice]').prop('readonly', true);
            	}else{
            		 $adminProducts.$taskDialog.find(".btn-save").click(function(){
            		 				$adminProducts.onSubmitUpdateTeams(id);
            		 });
            	}
            		var attno = $adminProducts.objdata();
	 									attno.value = id;
				 					var objgetdata = {	table: $adminProducts.tablename, 
											    					objdata: attno
											    				};
				 					$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 									
				 												var jsonobj = JSON.parse(data.data);
				 												//alert(jsonobj[0].Name);
				 												 $adminProducts.$taskDialog.find('input[name=ProductTitle]').val(jsonobj[0].Name);	
				 												 $adminProducts.$taskDialog.find('input[name=ProductPrice]').val(jsonobj[0].Price);	
           			 								var span = document.createElement('span');
           			 								if(jsonobj[0].Picture){
												          span.innerHTML = ['<img class="kudo-thumb" src="',$globalKudo.rootpath+jsonobj[0].Picture,
												                            '"', '"/>'].join('');
												          $adminProducts.$taskDialog.find('#list').append(span);
												          $adminProducts.$taskDialog.find('input[name=ProductImage]').val("have");
												        }
				 												//$("input[name = ACCTNAME]").val(jsonobj[0].acct_name);
				 											  // $("input[name = ACCTLEVEL]").val(jsonobj[0].acct_level);	

				 											  $spinner.hide();		
           			 								$adminProducts.$taskDialog.show();
				 					});
            }	else{


	             	$adminProducts.$taskDialog.find(".btn-save").click($adminProducts.onSubmitNewTeams);
            		 $spinner.hide();		
           			 $adminProducts.$taskDialog.show();
            }



	 },
	deleteTeams: function ($row, id) {
        var params = { id: id };
        $alert.confirmDelete($adminProducts.onSubmitDeleteTeams, params);
   },
   onSubmitDeleteTeams:function(params){
   		if(params.id){
   			 			var attno = $adminProducts.objdata();
	 								attno.value = params.id;
		 						var savedata = {	table: $adminProducts.tablename, 
									    						objdata: attno
						    					};

								    //Logic to delete the item
							$pageEntity.DeleteData($globalKudo.apipath,savedata,function(){
										$adminProducts.$grid.Bind();	

							});

	 				}		
   		return false;
   },
   onSubmitNewTeams:function(){
   		$adminProducts.addToDatabase();
   		return false;
   },
   onSubmitUpdateTeams:function(id){
   		$adminProducts.addToDatabase(id);
   		return false;
   },
   addToDatabase:function(itemid){
   			 
   		//	$adminProducts.$taskDialog.find('.error[for=ProductImage]').hide().text('');
   		if( $adminProducts.$formValid.valid()){
   						var file_data = $adminProducts.$taskDialog.find('#files').prop('files')[0];  
   							var ProductTitle = 	$adminProducts.$taskDialog.find('input[name=ProductTitle]').val();
					    var proPrice = $adminProducts.$taskDialog.find('input[name=ProductPrice]').val();
   					 	var attno = $adminProducts.objdata();
	 								attno.Name = ProductTitle;
	 								attno.Price = parseFloat(proPrice);

	 						if(itemid){
	 										attno.value = itemid;
	 								}	

	 						 	var savedata = {	table: $adminProducts.tablename, 
												    					objdata: attno
									    					};				

   					 	if(file_data){
					    var form_data = new FormData();                  
					    		form_data.append('file', file_data);
	

	 						$fnglobal.uploadFile(form_data,"products/",function(path){

	 								savedata.objdata.Picture = path;	
									
									$adminProducts.InserUpdate(itemid,savedata);		

	 						});
						}
						else{
								$adminProducts.InserUpdate(itemid,savedata);
	 								
						}
		   	
		   	}
   },
   InserUpdate:function(id,data){
   			if(id){
	 										$pageEntity.EditData($globalKudo.apipath,data,function(msg){
									 				$adminProducts.$grid.Bind();	
									 				$adminProducts.$taskDialog.hide();
									 });  
	 								}
	 								else{
					 		
									 $pageEntity.InsertData($globalKudo.apipath,data,function(msg){
									 				$adminProducts.$grid.Bind();	
									 				$adminProducts.$taskDialog.hide();
									 });  
			 }
   }
	
};
