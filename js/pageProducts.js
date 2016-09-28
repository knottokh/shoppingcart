var $pageProducts = {
	 tablename:'products',
	 $giid :null,
	 $taskDialog:null,
	 $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($pageProducts.tablename);
	},
	init : function(){

			$pageProducts.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";
	 },
	 loadData:function(){
	 		    var data = {	table: $pageProducts.tablename, 
								    	objdata : $pageProducts.objdata(),
								    	where :"where Active = 'Y' order by Created desc"
					    			};
				  data.method = "get";	    			

 			var authorize = true;
			 $pageProducts.$grid = new Grid({
           // TableId: "tblRoleListTask",
            // TableDataId: "tblRoleListDataTask",
            DivSelector: "#gridMainProducts",
            DivDataSelector: "#gridMainTempProducts",
            Selector:".productList",
            DataSelector:"",
            TempSelector:"",
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
                    	(data.Picture !=null)?$globalKudo.rootpath+data.Picture:$pageProducts.defaultimg,
                    	data.Price
                    );
            },
            fnRowElementsAction: [],
        });
				$pageProducts.$grid.Bind();
	 }
};
