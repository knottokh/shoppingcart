
<!DOCTYPE html>
<html>
    <head>
       <meta charset="UTF-8">        
    <?php $rootpath="_layout/"; ?>
    <?php $scriptroot="../"; ?>   
    <?php 
        $newsid = 0;
        if(isset($_GET["newsid"])) { 
            $newsid = $_GET["newsid"];
        }
    ?>
    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/pageNews.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    <div class="roy-contents">
    	<div class="container">
    			<h1>acct_no</h1>
             <div class="form-group">
                <label class="col-sm-3 control-label" for="NewsTitle">
                    Title <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="NewsTitle" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="newsBody">
                    Body <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <textarea rows="5" name="newsBody" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="newsRollup">
                    Picture <span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="file" id="files" name="files[]"  />
                    <input type="text" name="newsRollup" class="form-control hidden-zoro" />
                    <output id="list" class="imgpreview" name="newsRollup"></output>

                </div>
            </div>
	</div>

		<script type="text/javascript">
				$(function(){
				    $pageNews.init();
					$pageNews.displayDetails('<?=$newsid?>');

				});
		</script>

<?php include $rootpath."footer.php";?>
	</body>
</html>