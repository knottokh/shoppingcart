var $ = jQuery;

/*****************************************************************/
/* Functions */
/*****************************************************************/
var $ajaxCall = function (url, data) {
    return $.ajax({ url: url, type: 'post', data: data, dataType: 'json' });
};

var $ajaxUpload = function (data) {
    return $.ajax({ url: global_vars.ajax_url, type: 'post', data: data, dataType: 'json', contentType: false, cache: false, processData: false });
};

var $spinner = {
    show: function () {
        $("#loading_modal").modal('show');
    },
    hide: function () {
        $("#loading_modal").modal('hide');
    }
};

var $alert = {
    show: function (elem, message, is_clickable) {
        $("#alert_modal .modal-body").empty();

        var html = $(elem).clone().outerHTML();
        if (message != null) html = html.format(message);
        $("#alert_modal .modal-body").append(html);

        if (is_clickable) {
            $("#alert_modal .modal-content").bind('click', function () {
                $alert.hide();
            });
        }
        else {
            $("#alert_modal .modal-content").unbind('click');
        }

        $("#alert_modal").modal('show');
    },
    hide: function () {
        $("#alert_modal").modal('hide');
        $("#alert_modal .modal-body").empty();
    },
    complete: function (response) {
        //$alert.show(".result-message-complete.result-code-" + response.code, true);
        $alert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            $alert.hide();
        }, 5000);
    },
    completeAndRedirect: function (response, url) {
        $alert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            location.replace(url);
        }, 2000);
    },
    completeAndThen: function (response, fnDoingNext) {
        $alert.show(".result-message-complete", response.message, true);

        window.setTimeout(function () {
            $alert.hide();

            fnDoingNext();
        }, 2000);
    },
    error: function (response) {
        $alert.show(".result-message-error", response.message, true);
    },
    errorAndRedirect: function (response, url) {
        $alert.show(".result-message-error", response.message, false);

        window.setTimeout(function () {
            location.replace(url);
        }, 2000);
    },
    fail: function () {
        $alert.show(".result-message-fail", null, true);
    },
    confirm: function (action, callback, params) {
        var elem = ".confirm-message-" + action;
        $alert.show(elem, null, false);
        $(elem).find('.btn-confirm').click(function (e) {
            e.preventDefault();
            $alert.hide();
            callback(params);
            return false;
        });
        $(elem).find('.btn-cancel').click(function (e) {
            e.preventDefault();
            $alert.hide();
            return false;
        });
    },
    confirmDelete: function (callback, params) {
        $alert.confirm('delete', callback, params);
    }
};

var $dialog = {
    show: function () {
        $("#dialog_modal").modal('show');
    },
    hide: function () {
        $("#dialog_modal").modal('hide');
        $("#dialog_modal .modal-body").empty();
    },
    init: function (elem,elmTitle, isKeepId) {
        $("#dialog_modal .modal-body").empty();
        if (elmTitle != null && elmTitle != undefined) $("#dialog_modal .modal-title").text(elmTitle);
        var $clone = $(elem).clone();
        if (!isKeepId) $clone.attr('id', null);
        
        $("#dialog_modal .modal-body").append($clone);

        $("#dialog_modal .modal-body .btn-close").click(function (e) {
            e.preventDefault();

            $dialog.hide();
            return false;
        });
    },
    set: function (elem, key, value) {
        $("#dialog_modal").find(elem).attr(key, value);
    },
    get: function () {
        return $("#dialog_modal");
    },
    find: function (elem) {
        return $dialog.get().length > 0 ? $dialog.get().find(elem) : $dialog.get();
    }
};

var $validate = {
    show: function (elem, type) {
        elem.parent().find('.warning-block' + type).removeClass('hidden');
    },
    hide: function (elem, type) {
        elem.parent().find('.warning-block' + type).addClass('hidden');
    },
    required: function (elem) {
        var ok = true;

        if (elem.val() == null || elem.val() == "") {
            elem.focus();
            $validate.showRequired(elem);
            ok = false;
        }
        else {
            $validate.hideRequired(elem);
        }

        return ok;
    },
    requiredRadio: function (elem, additional) {
        var ok = true;

        if (!elem.is(":checked")) {
            elem.eq(0).focus();
            $validate.showRequired(elem.parents('.radios'));
            ok = false;
        }
        else {
            $validate.hideRequired(elem.parents('.radios'));

            if (additional != null || typeof (additional) != "undefined") {
                if (!additional.is(":disabled") && additional.val() == "") {
                    additional.focus();
                    $validate.showRequired(elem.parents('.radios'));
                    ok = false;
                }
                else {
                    $validate.hideRequired(elem.parents('.radios'));
                }
            }
        }

        return ok;
    },
    requiredCheckbox: function (elem, additional) {
        var ok = true;

        if (!elem.is(":checked")) {
            elem.eq(0).focus();
            $validate.showRequired(elem.parents('.checkboxes'));
            ok = false;
        }
        else {
            $validate.hideRequired(elem.parents('.checkboxes'));

            if (additional != null || typeof (additional) != "undefined") {
                if (!additional.is(":disabled") && additional.val() == "") {
                    additional.focus();
                    $validate.showRequired(elem.parents('.checkboxes'));
                    ok = false;
                }
                else {
                    $validate.hideRequired(elem.parents('.checkboxes'));
                }
            }
        }

        return ok;
    },
    requiredDropdown: function (elem, parent_elem) {
        var ok = true;
        if (parent_elem == null || parent_elem === undefined) {
            parent_elem = 'ul[class*="-dropdown"]';
        }

        if (elem.val() == "") {
            elem.focus();
            $validate.showRequired(elem.parents(parent_elem));
            ok = false;
        }
        else {
            $validate.hideRequired(elem.parents(parent_elem));
        }

        return ok;
    },
    requiredCalendar: function (elem, parent_elem) {
        var ok = true;
        if (parent_elem == null || parent_elem === undefined) {
            parent_elem = 'div[class*="-calendar"]';
        }

        if (elem.val() == "") {
            elem.focus();
            $validate.showRequired(elem.parents(parent_elem));
            ok = false;
        }
        else {
            $validate.hideRequired(elem.parents(parent_elem));
        }

        return ok;
    },
    requiredWithValue: function (elem, val) {
        var ok = true;

        if (val == "") {
            elem.focus();
            $validate.showRequired(elem);
            ok = false;
        }
        else {
            $validate.hideRequired(elem);
        }

        return ok;
    },
    formatEmail: function (required, elem) {
        var ok = true;

        if (elem.val() == "" && required) {
            elem.focus();
            $validate.showRequired(elem);
            ok = false;
        }
        else {
            $validate.hideRequired(elem);

            if (elem.val() != "") {
                if (!isValidEmailAddress(elem.val())) {
                    elem.focus();
                    $validate.showFormat(elem);
                    ok = false;
                }
                else {
                    $validate.hideFormat(elem);
                }
            }
        }

        return ok;
    },
    formatDate: function (required, elem_year, elem_month, elem_day) {
        var ok = true;

        if ((elem_year.val() == "" || elem_month.val() == "" || elem_day.val() == "") && required) {
            elem_year.focus();
            $validate.showRequired(elem_year);
            ok = false;
        }
        else {
            $validate.hideRequired(elem_year);

            if (elem_year.val() != "" || elem_month.val() != "" || elem_day.val() != "") {
                var date = elem_month.val() + "/" + elem_day.val() + "/" + elem_year.val();
                if (!isValidDate(date)) {
                    elem_year.focus();
                    $validate.showFormat(elem_year);
                    ok = false;
                }
                else {
                    $validate.hideFormat(elem_year);
                }
            }
        }

        return ok;
    },
    formatDateWithValue: function (required, val_year, val_month, val_day, elem) {
        var ok = true;

        if ((val_year == "" || val_month == "" || val_day == "") && required) {
            elem.focus();
            $validate.showRequired(elem);
            ok = false;
        }
        else {
            $validate.hideRequired(elem);

            if (val_year != "" || val_month != "" || val_day != "") {
                var date = val_month + "/" + val_day + "/" + val_year;
                if (!isValidDate(date)) {
                    elem.focus();
                    $validate.showFormat(elem);
                    ok = false;
                }
                else {
                    $validate.hideFormat(elem);
                }
            }
        }

        return ok;
    },
    requiredAndBetweenLength: function (elem, low, high) {
        var ok = true;

        if (elem.val() == "") {
            elem.focus();
            $validate.showRequired(elem);
            ok = false;
        }
        else {
            $validate.hideRequired(elem);

            if (elem.val().length < low || elem.val().length > high) {
                elem.focus();
                $validate.showLength(elem);
                ok = false;
            }
            else {
                $validate.hideLength(elem);
            }
        }

        return ok;
    },
    matched: function (elem, elem_source) {
        var ok = true;

        if (elem.val() != elem_source.val()) {
            elem.focus();
            $validate.showMatch(elem);
            ok = false;
        }
        else {
            $validate.hideMatch(elem);
        }

        return ok;
    },
    duplicate: function (elem, is_duplicate) {
        var ok = true;

        if (is_duplicate) {
            elem.focus();
            $validate.showDuplicate(elem);
            ok = false;
        }
        else {
            $validate.hideDuplicate(elem);
        }

        return ok;
    },
    showRequired: function (elem) {
        $validate.show(elem, '-required');
    },
    hideRequired: function (elem) {
        $validate.hide(elem, '-required');
    },
    showFormat: function (elem) {
        $validate.show(elem, '-format');
    },
    hideFormat: function (elem) {
        $validate.hide(elem, '-format');
    },
    showLength: function (elem) {
        $validate.show(elem, '-length');
    },
    hideLength: function (elem) {
        $validate.hide(elem, '-length');
    },
    showMatch: function (elem) {
        $validate.show(elem, '-match');
    },
    hideMatch: function (elem) {
        $validate.hide(elem, '-match');
    },
    showDuplicate: function (elem) {
        $validate.show(elem, '-duplicate');
    },
    hideDuplicate: function (elem) {
        $validate.hide(elem, '-duplicate');
    },
};

function loadCustomDropdown(dropdownId) {
    $("#" + dropdownId).parent(".custom-select").find(".custom-select-inner").html($("#" + dropdownId + " option").eq(0).text());
}

function onChangeCustomDropdown(e) {
    $(e.target).parent(".custom-select").find(".custom-select-inner").html($(e.target).find("option:selected").text());
}

function msie() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var isIE = false;

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        isIE = true;
    }

    return isIE;
}

function isMobile() {
    var isMobile = false;

    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }

    return isMobile;
}

function scrollToElement(elem) {
    var pos = 0;
    if (elem != "" && $(elem).length > 0) {
        pos = $(elem).offset().top;
    }

    scrollToPosition(pos);
}

function scrollToPosition(pos) {
    $('html, body').animate({ scrollTop: pos }, 500);
}

function BindingDropdown(elem, type, selected, params) {
    var BindDropdown = function (response) {
        if (response == "0" || response == "-1" || !response.success) {
            $(elem).empty();
        }
        else {
            result = response.data;

            var opt = "";
            for (var i = 0; i < result.length ; i++) {
                opt += "<option value=\"" + result[i].value + "\">" + result[i].text + "</option>";
            }

            $(elem).append(opt);
        }
    };

    var SelectDropDown = function () {
        if (selected == null || typeof (selected) == "undefined") {
        }
        else {
            if (selected === true) {
                $(elem).val($(elem + " option:first").val());
            }
            else {
                for (var i = 0; i < selected.length; i++) {
                    $(selected[i].name).val(selected[i].value);
                }
            }
        }
    };

    var ShowFail = function (e) {
        alert(e.responseText);
    };

    switch (type) {
        case "booking_time":
            GetDataBookingTime().success(BindDropdown).always(SelectDropDown);
            break;
        case "language_ability_recruit":
            GetDataLanguageAbilityRecruit().success(BindDropdown).always(SelectDropDown);
            break;
        case "language_ability_resume":
            GetDataLanguageAbilityResume().success(BindDropdown).always(SelectDropDown);
            break;
        case "education_status":
            GetDataEducationStatus().success(BindDropdown).always(SelectDropDown);
            break;
        case "jobs_category":
            GetDataJobsCategory(params).success(BindDropdown).fail(ShowFail).always(SelectDropDown);
            break;
    }
}

function BindingRadio(elem, type, selected, params) {
    var BindRadio = function (response) {
        if (response == "0" || response == "-1" || !response.success) {
            $(elem).empty();
        }
        else {
            result = response.data;

            var rdo = "";
            for (var i = 0; i < result.length ; i++) {
                rdo += "<label class=\"radio-inline\" for=\"" + type + result[i].id + "\">";
                rdo += "    <input type=\"radio\" id=\"" + type + result[i].id + "\" name=\"" + type + "\" value=\"" + result[i].value + "\"> " + result[i].text;

                if (typeof (result[i].additional) != "undefined" && result[i].additional != "") {
                    rdo += " ( <input type=\"text\" id=\"" + result[i].additional + "\" name=\"" + result[i].additional + "\" class=\"radio-inline-textbox\" /> )";
                }

                rdo += "</label>";
            }

            $(elem).append(rdo);

            $(".radio-inline-textbox").attr("disabled", "disabled");
            $('.radio-inline input[type="radio"]').click(function () {
                $(this).parents('.radios').find('.radio-inline-textbox').attr('disabled', true);
                $(this).next(".radio-inline-textbox").attr('disabled', !this.checked).focus();
            });
        }
    };

    var SelectRadio = function () {
        if (selected == null || typeof (selected) == "undefined") {
        }
        else {
            $('.radio-inline input[type="radio"][name="' + type + '"][value="' + selected.value + '"]').prop('checked', true);
            if (selected.additional != null) {
                $(selected.additional.name).val(selected.additional.value);
                $(selected.additional.name).attr('disabled', null);
            }
        }
    };

    switch (type) {
        case "rdoSex":
            GetDataSex().success(BindRadio).always(SelectRadio);
            break;
        case "rdoSocialInsurance":
            GetDataSocialInsurance().success(BindRadio).always(SelectRadio);
            break;
        case "rdoVisa":
            GetDataVisa().success(BindRadio).always(SelectRadio);
            break;
        case "rdoWorkPermit":
            GetDataWorkPermit().success(BindRadio).always(SelectRadio);
            break;
        case "rdoNationality":
            GetDataNationality(params).success(BindRadio).always(SelectRadio);
            break;
        case "rdoOS":
            GetDataOS().success(BindRadio).always(SelectRadio);
            break;
        case "rdoOffice":
            GetDataOffice().success(BindRadio).always(SelectRadio);
            break;
    }
}

function BindingCheckbox(elem, type, selected, params) {
    var BindCheckbox = function (response) {
        if (response == "0" || response == "-1" || !response.success) {
            $(elem).empty();
        }
        else {
            result = response.data;

            var chb = "";
            for (var i = 0; i < result.length ; i++) {
                chb += "<label class=\"checkbox-inline\" for=\"" + type + result[i].id + "\">";
                chb += "    <input type=\"checkbox\" id=\"" + type + result[i].id + "\" name=\"" + type + "\" value=\"" + result[i].value + "\"";

                var additional = "";
                if (typeof (result[i].additional) != "undefined" && result[i].additional != "") {
                    chb += " class=\"checkbox-inline-additional\" ";
                    additional = " ( <input type=\"text\" id=\"" + result[i].additional + "\" name=\"" + result[i].additional + "\" class=\"checkbox-inline-textbox\" /> )";
                }

                chb += "> " + result[i].text + additional;

                chb += "</label>";
            }

            $(elem).append(chb);

            $(".checkbox-inline-textbox").attr("disabled", "disabled");
            $('.checkbox-inline input[type="checkbox"].checkbox-inline-additional').click(function () {
                $(this).next(".checkbox-inline-textbox").attr('disabled', !this.checked).focus();
            });
        }
    };

    var SelectCheckbox = function () {
        if (selected == null || typeof (selected) == "undefined") {
        }
        else {
            for (var i = 0; i < selected.length; i++) {
                var $obj = $('.checkbox-inline input[type="checkbox"][name="' + type + '"][value="' + selected[i].value + '"]');
                $obj.prop('checked', true);

                if (selected[i].additional != null) {
                    var $objAdditional = $obj.next('.checkbox-inline-textbox');
                    if ($objAdditional.length > 0) {
                        $objAdditional.val(selected[i].additional);
                        $objAdditional.attr('disabled', null);
                    }
                }
            }
        }
    };

    switch (type) {
        case "chbNationality":
            GetDataNationality(params).success(BindCheckbox).always(SelectCheckbox);
            break;
        case "chbSex":
            GetDataSex(params).success(BindCheckbox).always(SelectCheckbox);
            break;
        case "chbOS":
            GetDataOS().success(BindCheckbox).always(SelectCheckbox);
            break;
        case "chbOffice":
            GetDataOffice().success(BindCheckbox).always(SelectCheckbox);
            break;
    }
}

function BindingTable(elem, type, params) {
    var BindTable = function (response) {
        $(elem + ' > tbody:last').empty();
        if (response == "0" || response == "-1" || !response.success) {
        }
        else {
            result = response.data;

            for (var i = 0; i < result.length ; i++) {
                var rows = "";
                if (type == "booking_time_available") {
                    rows += $('.div-time-booking table > tbody').clone().html().format(
                        result[i].Value
                        , result[i].Text
                        );

                    var removeClassAvailable = "avaiable_no";
                    if (result[i].IsAvailable == 'N') {
                        removeClassAvailable = "avaiable_yes";
                    }

                    var $tmp = $('<div />').append(rows);
                    $tmp.find('.' + removeClassAvailable).remove();
                    rows = $tmp.html();
                }

                $(elem + ' > tbody:last').append(rows);
            }
        }
    };

    var ShowFail = function (e) {
        alert(e.responseText);
    };

    switch (type) {
        case "booking_time_available":
            GetDataBookingTimeAvailable(params).success(BindTable).fail(ShowFail);
            break;
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function isValidDate(date) {
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    var d = matches[2];
    var m = matches[1] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d &&
            composedDate.getMonth() == m &&
            composedDate.getFullYear() == y;
}

function requiredLocalStorage() {
    if (!!window.localStorage) {
        return true;
    }
    else {
        document.querySelector('body').innerHTML = "<h2>Local storage is not supported by this browser.</h2><p>To use this application, upgrade your browser to the latest version.</p>";
        return false;
    }
}

function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function maskedData(val, masked) {
    var tmp = '' + val + '';
    var mask_data = "";

    for (var i = 0; i < tmp.length; i++) {
        mask_data += masked;
    }

    return mask_data
}

function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}

function Right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function previewImage(input, dest, is_append) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (dest != null) {
                if (!is_append) {
                    $(dest).attr('src', e.target.result);
                }
                else {
                    $(dest).empty();
                    $(dest).append('<img src="' + e.target.result + '" border="0" />');
                }
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase();
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function replceUndefinedValue(val) {
    var str = val;
    if (val === undefined || val == null) {
        str = "";
    }

    return str;
}

/*****************************************************************/
/* Document Ready */
/*****************************************************************/
$(document).ready(function () {
    $(function () {
        if (msie()) {
            $('html').addClass("ie");
        }
    });

    function showModal() {
        $('html').css('overflow', 'hidden');

        // Center modal vertically in window
        $(this).css('display', 'block');
        var $dialog = $(this).find(".modal-dialog");
        var offset = ($(window).height() - $dialog.height()) / 2;
        $dialog.css("margin-top", offset);
    }

    function hideModal() {
        $('html').css('overflow', 'auto');
    }

    $('.modal').on('show.bs.modal', showModal);
    $('.modal').on('hide.bs.modal', hideModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(showModal);
    });
});

jQuery.fn.outerHTML = function (s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};