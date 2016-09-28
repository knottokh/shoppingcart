
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">    
    <?php $rootpath="page/_layout/"; ?>
    <?php $scriptroot=""; ?>   

    <?php include $rootpath."scriptref.php";?>
      <script src="<?=$scriptroot?>js/pageProducts.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    
    <div class="kudo-contents oza-body">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="home-newsSlider col-sm-12">
                            <div id="gridMainProducts" class="grid gridMain gridMainProducts">
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
                                    <div class="productList">
                                        
                                    </div>
                                </div>
                                <div class="paging clearfix">
                                    <ul class="pagination hidden"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="home-gallerySlider col-sm-12">
                            
                        </div>
                        <div class="home-sponsor col-sm-12 text-center">
                            
                        </div>
                        <div class="home-contact col-sm-12 text-center">
                            <p>xxxx</p>
                            <p>xxxxxx</p>
                            <p>xxxxxxxx</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>     
    <div class="sponsortmp hidden">
        <img class="spon-img" title="{0}" src="{1}"/>
    </div> 
    

<div id="gridMainTempProducts" class="hidden">
    <div data-id="{0}" class="col-md-4">
        <div class="row col-xs-12">{1}</div>
         <div class="row col-xs-12">{2}</div>
     <div class="row col-xs-12"><img class="imgpreview"  src="{3}"/></div>
       <div class="row col-xs-12">{4}</div>
    </div>
</div>
<div id="gridMainTempProductsOld" class="hidden">
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
    <script type="text/javascript">
            $(function(){
                        $pageProducts.init();
                        $pageProducts.loadData();
            });
          
    </script>

<?php include $rootpath."footer.php";?>
    </body>
</html>