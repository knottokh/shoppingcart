
<!DOCTYPE html>
<html>
    <head>
    <?php $rootpath="_layout/"; ?>
    <?php $scriptroot=""; ?>   

    <?php include $rootpath."scriptref.php";?>

     <script src="<?=$scriptroot?>js/table_acct-no.js"></script>
    </head>
<body>
<?php include $rootpath."header.php";?>

    <div class="roy-contents">
    	<div class="container">
    			<h1>acct_no</h1>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="ACCTNAME">
                    acct-name<span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="ACCTNAME" class="form-control" />
                    <label for="ACCTNAME" class="error"></label>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="ACCTLEVEL">
                    acct-label<span class="required">*</span>:
                </label>
                <div class="col-sm-9">
                    <input type="text" name="ACCTLEVEL" class="form-control" />
                    <label for="ACCTLEVEL" class="error"></label>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary form-save" type="submit" >Save</button>
                <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal">Cancel</button>
            </div>
	</div>

		<script type="text/javascript">
				$(function(){
					$pageEntity.init();
					$pageAcctNo.init();

				});
		</script>

<?php include $rootpath."footer.php";?>
	</body>
</html>