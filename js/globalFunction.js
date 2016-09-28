
var $fnglobal = {
	  handleFileSelect: function (evt,$imgdiv,ismul,callback) {
     var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      if(!ismul){
      		$imgdiv.empty();
      }
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="kudo-thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          $imgdiv.append(span);
            if(callback){
						                        if(typeof callback == "function"){
						                             callback();
						                        }
						                    }
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  },
  uploadFile:function(formdata,rootfolder,callback){

  		 $.ajax({
                url: $globalKudo.rootpath+"php/upload.php?rootpath="+$globalKudo.rootpath+"&folderpath="+rootfolder, // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: formdata,                         
                type: 'post',
               success: function (obj, textstatus) {
               					try{
               					var	result = JSON.parse(obj);
					                  if(result.success) {
					                     //alert("Insert Success");
					                     if(callback){
						                        if(typeof callback == "function"){
						                             callback(result.filepath);
						                        }
						                    }
					                  }
					                  else {
					                       alert(result.error);
					                  }
					                }catch(e){
					                	alert(e.message);
					                }

					            },
							   error: function (textStatus, errorThrown) {
		               alert(textStatus.responseText);
		            }
     });
  },
  getDegitNumber:function(str,max){
        str = str.toString();
        return str.length < max ? $fnglobal.getDegitNumber("0" + str, max) : str;
  },
	 getParameterByName:function(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
};

var $spinner2 = {
    show: function () {
        $("#loading_modal2").modal('show');
    },
    hide: function () {
        $("#loading_modal2").modal('hide');
    }
};
var $spinnerfile = {
    show: function () {
        $("#loading_modalfile").modal('show');
    },
    hide: function () {
        $("#loading_modalfile").modal('hide');
    }
};

var $dialogFirst = {
    dialogpath: "#dialogFirst",
    show: function () {
        $($dialogFirst.dialogpath).modal('show');
    },
    hide: function () {
        $($dialogFirst.dialogpath).modal('hide');
        $($dialogFirst.dialogpath + " .modal-body").empty();
    },
    init: function (bodyelem, elmTitle, isKeepId) {
        if (elmTitle != null && elmTitle != undefined)
            $($dialogFirst.dialogpath + " .modal-title").text(elmTitle);
        if (bodyelem != null && bodyelem != undefined) {
            $($dialogFirst.dialogpath + " .modal-body").empty();
            var $clone = $(bodyelem).clone();
            if (!isKeepId) $clone.attr('id', null);
            $($dialogFirst.dialogpath + " .modal-body").append($clone.html());
        }
        $($dialogFirst.dialogpath + " .modal-footer .btn-close").click(function (e) {
            e.preventDefault();

            $dialogFirst.hide();
            return false;
        });
        return this;
    },
    set: function (elem, key, value) {
        $($dialogFirst.dialogpath).find(elem).attr(key, value);
    },
    get: function () {
        return $($dialogFirst.dialogpath);
    },
    find: function (elem) {
        return $dialogFirst.get().length > 0 ? $dialogFirst.get().find(elem) : $dialogFirst.get();
    }
};
var $dialogSecond = {
    dialogpath: "#dialogSecond",
    show: function () {
        $($dialogSecond.dialogpath).modal('show');
    },
    hide: function () {
        $($dialogSecond.dialogpath).modal('hide');
        $($dialogSecond.dialogpath + " .modal-body").empty();
    },
    init: function (bodyelem, elmTitle, isKeepId) {
        if (elmTitle != null && elmTitle != undefined)
            $($dialogSecond.dialogpath + " .modal-title").text(elmTitle);
        if (bodyelem != null && bodyelem != undefined) {
            $($dialogSecond.dialogpath + " .modal-body").empty();
            var $clone = $(bodyelem).clone();
            if (!isKeepId) $clone.attr('id', null);
            $($dialogSecond.dialogpath + " .modal-body").append($clone.html());
        }
        $($dialogSecond.dialogpath + " .modal-footer .btn-close").click(function (e) {
            e.preventDefault();

            $dialogSecond.hide();
            return false;
        });

        return this;
    },
    set: function (elem, key, value) {
        $($dialogSecond.dialogpath).find(elem).attr(key, value);
    },
    get: function () {
        return $($dialogSecond.dialogpath);
    },
    find: function (elem) {
        return $dialogSecond.get().length > 0 ? $dialogSecond.get().find(elem) : $dialogSecond.get();
    }
};
var $subalert = {
    show: function (elem, message, is_clickable) {
        $("#subalert_modal .modal-body").empty();

        var html = $(elem).clone().outerHTML();
        if (message != null) html = html.format(message);
        $("#subalert_modal .modal-body").append(html);

        if (is_clickable) {
            $("#subalert_modal .modal-content").bind('click', function () {
                $subalert.hide();
            });
        }
        else {
            $("#subalert_modal .modal-content").unbind('click');
        }

        $("#subalert_modal").modal('show');
    },
    hide: function () {
        $("#subalert_modal").modal('hide');
        $("#subalert_modal .modal-body").empty();
    },
    complete: function (response) {
        //$alert.show(".result-message-complete.result-code-" + response.code, true);
        $subalert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            $subalert.hide();
        }, 5000);
    },
    completeAndRedirect: function (response, url) {
        $alert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            location.replace(url);
        }, 2000);
    },
    completeAndThen: function (response, fnDoingNext) {
        $subalert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            $alert.hide();

            fnDoingNext();
        }, 2000);
    },
    error: function (response) {
        $subalert.show(".result-message-error", response.message, true);
    },
    errorAndRedirect: function (response, url) {
        $alert.show(".result-message-error", response.message, false);

        window.setTimeout(function () {
            location.replace(url);
        }, 2000);
    },
    fail: function () {
        $subalert.show(".result-message-fail", null, true);
    },
    confirm: function (action, callback, params) {
        var elem = ".confirm-message-" + action;
        $alert.show(elem, null, false);
        $(elem).find('.btn-confirm').click(function (e) {
            e.preventDefault();
            $subalert.hide();
            callback(params);
            return false;
        });
        $(elem).find('.btn-cancel').click(function (e) {
            e.preventDefault();
            $subalert.hide();
            return false;
        });
    }
};
var $spinner2 = {
    show: function () {
        $("#loading_modal2").modal('show');
    },
    hide: function () {
        $("#loading_modal2").modal('hide');
    }
};
var $spinnerfile = {
    show: function () {
        $("#loading_modalfile").modal('show');
    },
    hide: function () {
        $("#loading_modalfile").modal('hide');
    }
};

var $dialogFirst = {
    dialogpath: "#dialogFirst",
    show: function () {
        $($dialogFirst.dialogpath).modal('show');
    },
    hide: function () {
        $($dialogFirst.dialogpath).modal('hide');
        $($dialogFirst.dialogpath + " .modal-body").empty();
    },
    init: function (bodyelem, elmTitle, isKeepId) {
        if (elmTitle != null && elmTitle != undefined)
            $($dialogFirst.dialogpath + " .modal-title").text(elmTitle);
        if (bodyelem != null && bodyelem != undefined) {
            $($dialogFirst.dialogpath + " .modal-body").empty();
            var $clone = $(bodyelem).clone();
            if (!isKeepId) $clone.attr('id', null);
            $($dialogFirst.dialogpath + " .modal-body").append($clone.html());
        }
        $($dialogFirst.dialogpath + " .modal-footer .btn-close").click(function (e) {
            e.preventDefault();

            $dialogFirst.hide();
            return false;
        });
        return this;
    },
    set: function (elem, key, value) {
        $($dialogFirst.dialogpath).find(elem).attr(key, value);
    },
    get: function () {
        return $($dialogFirst.dialogpath);
    },
    find: function (elem) {
        return $dialogFirst.get().length > 0 ? $dialogFirst.get().find(elem) : $dialogFirst.get();
    }
};
var $dialogSecond = {
    dialogpath: "#dialogSecond",
    show: function () {
        $($dialogSecond.dialogpath).modal('show');
    },
    hide: function () {
        $($dialogSecond.dialogpath).modal('hide');
        $($dialogSecond.dialogpath + " .modal-body").empty();
    },
    init: function (bodyelem, elmTitle, isKeepId) {
        if (elmTitle != null && elmTitle != undefined)
            $($dialogSecond.dialogpath + " .modal-title").text(elmTitle);
        if (bodyelem != null && bodyelem != undefined) {
            $($dialogSecond.dialogpath + " .modal-body").empty();
            var $clone = $(bodyelem).clone();
            if (!isKeepId) $clone.attr('id', null);
            $($dialogSecond.dialogpath + " .modal-body").append($clone.html());
        }
        $($dialogSecond.dialogpath + " .modal-footer .btn-close").click(function (e) {
            e.preventDefault();

            $dialogSecond.hide();
            return false;
        });

        return this;
    },
    set: function (elem, key, value) {
        $($dialogSecond.dialogpath).find(elem).attr(key, value);
    },
    get: function () {
        return $($dialogSecond.dialogpath);
    },
    find: function (elem) {
        return $dialogSecond.get().length > 0 ? $dialogSecond.get().find(elem) : $dialogSecond.get();
    }
};
var $subalert = {
    show: function (elem, message, is_clickable) {
        $("#subalert_modal .modal-body").empty();

        var html = $(elem).clone().outerHTML();
        if (message != null) html = html.format(message);
        $("#subalert_modal .modal-body").append(html);

        if (is_clickable) {
            $("#subalert_modal .modal-content").bind('click', function () {
                $subalert.hide();
            });
        }
        else {
            $("#subalert_modal .modal-content").unbind('click');
        }

        $("#subalert_modal").modal('show');
    },
    hide: function () {
        $("#subalert_modal").modal('hide');
        $("#subalert_modal .modal-body").empty();
    },
    complete: function (response) {
        //$alert.show(".result-message-complete.result-code-" + response.code, true);
        $subalert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            $subalert.hide();
        }, 5000);
    },
    completeAndRedirect: function (response, url) {
        $alert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            location.replace(url);
        }, 2000);
    },
    completeAndThen: function (response, fnDoingNext) {
        $subalert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            $alert.hide();

            fnDoingNext();
        }, 2000);
    },
    error: function (response) {
        $subalert.show(".result-message-error", response.message, true);
    },
    errorAndRedirect: function (response, url) {
        $alert.show(".result-message-error", response.message, false);

        window.setTimeout(function () {
            location.replace(url);
        }, 2000);
    },
    fail: function () {
        $subalert.show(".result-message-fail", null, true);
    },
    confirm: function (action, callback, params) {
        var elem = ".confirm-message-" + action;
        $alert.show(elem, null, false);
        $(elem).find('.btn-confirm').click(function (e) {
            e.preventDefault();
            $subalert.hide();
            callback(params);
            return false;
        });
        $(elem).find('.btn-cancel').click(function (e) {
            e.preventDefault();
            $subalert.hide();
            return false;
        });
    }
};
var $globalFunc = {
    SortByName:function (a, b) {
    var aName = a.label.toLowerCase();
    var bName = b.label.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    },
    getParameterByName:function(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};
var cloneObject =function collect() {
    var ret = {};
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        for (p in arguments[i]) {
            if (arguments[i].hasOwnProperty(p)) {
                ret[p] = arguments[i][p];
            }
        }
    }
    return ret;
}
//Overide Date Formate
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join('/'); // padding
};
Date.prototype.THddmmyyyyShort = function () {
    var mm = this.getMonth(); // getMonth() is zero-based
    var dd = this.getDate();
    var thmonth = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

    return [dd, thmonth[mm], this.getFullYear() + 543].join(' '); // padding
};
Date.prototype.THddmmyyyyFull = function () {
    var mm = this.getMonth(); // getMonth() is zero-based
    var dd = this.getDate();
    var thmonth = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    return [dd, thmonth[mm], this.getFullYear() + 543].join(' '); // padding
};

var UserAutoComplate = function(settings,callback) {
    var Parent, Input, Div, FormatDiv, ArraySorce, Multiple, Sortfunc, _this;
    if (settings) {
        Parent = settings.Parent;
        Input = settings.Input;
        Div = settings.Div;
        FormatDiv = settings.FormatDiv;
        ArraySorce = settings.ArraySorce;
        Multiple = settings.Multiple;
        Sortfunc = settings.Sortfunc;
        FuncShow = settings.FuncShow;
        FuncHide = settings.FuncHide;
    }
    this.Parent = Parent;
    this.Input = Input;
    this.Div = Div;
    this.FormatDiv = FormatDiv;
    this.ArraySorce = ArraySorce;
    this.Multiple = Multiple;
    this.Sortfunc = Sortfunc;
    this.FuncShow = FuncShow;
    this.FuncHide = FuncHide;
    this.StaticSorce = ArraySorce;

    _this = this;
    this.AutoComplate = function () {
        if (_this.FuncHide != null) {
            _this.FuncHide();
        }
        if (_this.Sortfunc != null) {
            _this.ArraySorce.sort(_this.Sortfunc);
        }
        _this.Parent.find(_this.Input)
               .autocomplete({
                   minLength: 0,
                   source: _this.ArraySorce,
                   focus: function () {
                       // prevent value inserted on focus
                       return false;
                   },
                   select: function (event, ui) {

                       _this.SetValue(ui.item);

                       this.value = "";

                       if (_this.FuncShow != null) {
                           _this.FuncShow();
                       }
                       if (callback != null) {
                           callback(ui.item.value);
                       }
                       return false;
                   }
               });
    }
    this.SetValue = function (item) {
        var _arrayItem = _this.GetSource();
        if (_this.Sortfunc != null) {
            _arrayItem.sort(_this.Sortfunc);
        }

        _arrayItem = $.grep(_arrayItem, function (element) {
            return element.value != item.value;
        });

        _this.ArraySorce = _arrayItem;
        _this.SetSource();

        var filluser = $(_this.FormatDiv).clone().html().format(
                      item.label,
                      item.value,
                      (item.class) ? item.class : ""
                  );
        _this.Parent.find(_this.Div).append(filluser);

        //Set Delete Event
        _this.Parent.find(_this.Div).find(".del-user-" + item.value).click(function (e) {
            e.preventDefault();
            var text = $(this).prev().prev().text();
            var value = $(this).prev().val();

            var txtjob = {
                label: text,
                value: value
            };
            var _delarrayItem = _this.GetSource();
            _delarrayItem.push(txtjob);
            if (_this.Sortfunc != null) {
                _arrayItem.sort(_this.Sortfunc);
            }

            _this.ArraySorce = _delarrayItem;
            _this.SetSource();

            $(this).parent().remove();

            if (_this.FuncHide != null) {
                _this.FuncHide();
            }

            _this.Parent.find(_this.Input).hide();
            if (_this.Multiple || _this.Parent.find(_this.Div).children().length == 0) {
                _this.Parent.find(_this.Input).show();
            }
        });
        _this.Parent.find(_this.Input).hide();
        if (_this.Multiple || _this.Parent.find(_this.Div).children().length == 0) {
            _this.Parent.find(_this.Input).show();
        }
    }
    this.GetStaticSource = function () {
        return _this.StaticSorce;
    }
    this.GetSource = function () {
        return _this.Parent.find(_this.Input).autocomplete('option', 'source');
    }
    this.SetSource = function () {
        _this.Parent.find(_this.Input).autocomplete('option', 'source', _this.ArraySorce);
    }
};
