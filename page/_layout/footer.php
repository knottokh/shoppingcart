<!--<footer class="kudo-footer navbar-default"> 
  <div class="container"> 
        			footer
  </div> 
</footer>-->

<script type="text/javascript">
				$globalKudo= {
					rootpath : '<?=$scriptroot;?>',
					apipath : '<?=$scriptroot;?>php/api.php',
					upload : '<?=$scriptroot;?>php/upload.php',
					authorize : true
				}

</script>
<div id="loading_modal" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div class="loading-wrapper">
                    <div class="loading-indicator"></div>
                    <div class="loading-content">
                        Processing...
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="alert_modal" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body"></div>
            <div class="modal-body hidden"></div>
        </div>
    </div>
</div>

<div id="dialog_modal" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
           

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div id="dialogFirst" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">

    <div class="modal-dialog" role="document">

        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
             
            </div>
        </div>
    </div>
</div>
<div class="result-message">
    <div class="message-code result-message-complete">
        <i class="fa fa-check-circle"></i> {0}
    </div>
    <div class="result-message-error">
        <i class="fa fa-exclamation-circle"></i> {0}
    </div>
    <div class="result-message-fail">
        <i class="fa fa-times-circle"></i> @Labels.Fail
    </div>
</div>

<div class="confirm-message">
    <div class="message-code confirm-message-delete">
        <div class="title-section">
            <span class="title">
                ต้องการลบข้อมูล?
            </span>
        </div>
        <div class="clearfix">
            <div class="col-xs-6">
                <button type="button" class="btn btn-block btn-danger btn-confirm">
                    ตกลง
                </button>
            </div>
            <div class="col-xs-6">
                <button type="button" class="btn btn-block btn-default btn-cancel">
                    ยกเลิก
                </button>
            </div>
        </div>
    </div>

