
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">    
    <?php $rootpath="../_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/admin/adminProducts.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="kduo-contents">
        <div class="container">
     <h1>Products</h1>
     <div class="form-group">
          <button class="btn btn-primary btn-dlg-products" type="button" >New Data</button>
    </div>

<div id="gridMainNews" class="grid gridMain gridMainNews">
    <div class="searching clearfix">
        <div class="search-box hidden">
            <div class="search-box-textbox">
                <input type="search" name="txtGridSearch" class="form-control" />
            </div>
            <div class="search-box-button">
                <input type="button" name="btnGridSearch" class="btn btn-default btn-search" value="Search" />
            </div>
        </div>
        <div class="tablenav bottom">
            <div class="tablenav-totals">
                Total : <span class="displaying-num"></span> Items
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                   <th data-name="records_no" class="col-center" style="width: 50px">No.</th>
                    <th data-name="name" class="col-center">Title</th>
                    <th class="col-center">Picture</th>
                    <th class="col-center">Price</th>
                    <th data-name="action" style="width: 110px"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div class="paging clearfix">
        <ul class="pagination hidden"></ul>
    </div>
</div>

</div>
                
     </div>       


<div id="gridMainTempNews" class="hidden">
    <table>
        <tbody>
            <tr data-id="{0}">
                <td class="col-center">{1}</td>
                <td>{2}</td>
                <td class="col-center"> <img class="imgpreview"  src="{3}"/></td>
                <td class="col-right">{4}</td>
                <td>
                    <span tracking="V" class="glyphicon glyphicon-eye-open kduo-pointer kudo-button btn-view hidden" title="View" aria-hidden="true"></span>
                    <span tracking="E" class="glyphicon glyphicon-pencil kduo-pointer kudo-button btn-assign hidden" title="Edit" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-trash kduo-pointer kudo-button btn-delete hidden" title="Delete" aria-hidden="true"></span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div id="newNewsTmp" class="hidden">
     <form id="newNewsForms" name="newNewsForms" class="form-horizontal" role="form" method="get" action="">
               <div class="form-group">
            <label class="col-sm-3 control-label" for="ProductTitle">
                    Title <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="ProductTitle" class="form-control" />
                </div>
            </div>
             <div class="form-group">
            <label class="col-sm-3 control-label" for="ProductPrice">
                    Price <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="ProductPrice" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="ProductImage">
                    Picture <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="file" id="files" name="files[]"  />
                    <input type="text" name="ProductImage" class="form-control hidden-zoro" />
                    <output id="list" class="imgpreview" name="ProductImage"></output>

                </div>
            </div>
             <div class="modal-footer">
                <button class="btn btn-primary btn-save" type="button" >Save</button>
                <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
            </div>
     </form>
</div>
        <script type="text/javascript">

                $(function(){
                        $adminProducts.init();
                        $adminProducts.loadData();
                       // $adminTeams.newdata();
                });
        </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>