
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">    
    <?php $rootpath="_layout/"; ?>
    <?php $scriptroot="../"; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/pageNews.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>


    
    <div class="kduo-contents">
        <div class="container">
     <h1>News</h1>
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
                    <th data-name="taskname" class="col-center">Created Date</th>
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
                <td><a href="{4}" target="_blank">{2}</a></td>
                <td>{3}</td>
            </tr>
        </tbody>
    </table>
</div>
		<script type="text/javascript">
				$(function(){
					 $pageNews.init();
					  $pageNews.loadData();

				});
		</script>

<?php include $rootpath."footer.php";?>
	</body>
</html>