var Grid = function (settings) {
    var DEFAULT_GRID_PER_PAGE = 10;

    var DivSelector, DivDataSelector, TableId, TableDataId, SourceUrl, Data, Sorting, Searching, Modal, ModalTitle,
        fnRowDisplayFormat, fnRowElementsAction, fnRowCreated, fnGridCreated,Selector,DataSelector,TempSelector,
        $elem, StartPage, PerPage, _this;

    if (settings) {
        DivSelector = settings.DivSelector;
        DivDataSelector = settings.DivDataSelector;
        TableId = settings.TableId;
        TableDataId = settings.TableDataId;
        SourceUrl = settings.SourceUrl;
        Data = settings.Data;
        Sorting = settings.Sorting;
        Modal = settings.Modal;
        ModalTitle = settings.ModalTitle,
        Searching = settings.Searching;
        StartPage = settings.StartPage;
        PerPage = settings.PerPage;
        Selector  =settings.Selector;
        DataSelector  =settings.DataSelector;
        TempSelector = settings.TempSelector;

        fnRowDisplayFormat = settings.fnRowDisplayFormat;
        fnRowElementsAction = settings.fnRowElementsAction;
        fnRowCreated = settings.fnRowCreated;
        fnGridCreated = settings.fnGridCreated;
    }

    if (StartPage == null) StartPage = 1;
    if (PerPage == null) PerPage = DEFAULT_GRID_PER_PAGE;
    if(Selector == undefined){
         Selector = "table";
     }
     if (DataSelector == undefined) {
         DataSelector = "> tbody";
     }
     if (TempSelector == undefined) {
         TempSelector = "> table > tbody";
     }
    
    this.DivSelector = DivSelector;
    this.DivDataSelector = DivDataSelector;
    this.TableId = TableId;
    this.TableDataId = TableDataId;
    this.SourceUrl = SourceUrl;
    this.Data = (!Data ? {} : Data);
    this.Searching = (!Searching ? false : true);
    this.StartPage = StartPage;
    this.PerPage = PerPage;
    this.Modal = Modal;
    this.ModalTitle = ModalTitle;
    this.Selector = Selector;//maindiv
    this.DataSelector = DataSelector;//Body
    this.TempSelector = TempSelector;

    this.fnRowDisplayFormat = fnRowDisplayFormat;
    this.fnRowElementsAction = fnRowElementsAction;
    this.fnRowCreated = fnRowCreated;
    this.fnGridCreated = fnGridCreated;
    


    // Modal
    if (Modal) {
        if (DivSelector != undefined) {
            $dialog.init(DivSelector, ModalTitle);
        } else {
            $dialog.init('#' + TableId, ModalTitle);
            //$spinner.show();          
        }
        $elem = $dialog.find('table');
    }
    else {
        if (DivSelector != undefined) {
            $elem = $(DivSelector+' '+Selector);
        } else {
            $elem = $('#' + TableId + ' '+Selector);
        }
    }
    this.elem = $elem;

    // Sorting
    if (!Sorting) {
        Sorting = {
            defaults: []
        };
    }
    else if (!Sorting.defaults) {
        Sorting.defaults = [];
    }
    this.Sorting = Sorting;

    _this = this;

    this.Bind = function () {
        if ((!_this.TableId && !_this.DivSelector) || (!_this.TableDataId && !_this.DivDataSelector) || !_this.SourceUrl || !_this.fnRowDisplayFormat ){
            return;
        }
        else {
            _this.GridSearching();
            _this.GridSorting();

            $.extend(_this.Data, {
                "pageIndex": "",
                "pageSize": "",
                "sortColumn": "",
                "sortDirection": ""
            });

            _this.Binding();
        }
    }

    this.Binding = function() {
        //this.StartPage = pageIndex;

        var data = _this.Data;
        data.objdata.pageIndex = _this.StartPage;
        data.objdata.pageSize = _this.PerPage;
        data.objdata.sortColumn = (!_this.Sorting.defaults[0] ? "" : _this.Sorting.defaults[0]);
        data.objdata.sortDirection = (!_this.Sorting.defaults[1] ? "" : _this.Sorting.defaults[1]);

        var url = _this.SourceUrl;


        //$spinner.show();
        $ajaxCall(url, data).success(function (response) {
            if (response == null || !response.success) {
                $alert.error(response);
            }
            else {
                //$spinner.hide();
                if(_this.DataSelector!=""){
                    $elem.find(_this.DataSelector).empty();
                }
                else{
                    $elem.empty();
                }

                if (response.data.length === undefined) {
                    result = new Array(response.data);
                }
                else {
                    result = JSON.parse(response.data);
                }

                $elem.parents('.grid').find('.searching .displaying-num').html(response.total_recs);               



                for (var i = 0; i < result.length ; i++) {
                    var row = "";
                    var d = result[i];
                    var selectordiv = "#" + _this.TableDataId +' '+_this.TempSelector;
                    if (_this.DivDataSelector != undefined) {
                        var selectordiv = _this.DivDataSelector +' ' +_this.TempSelector;
                    }
                    var html = $(selectordiv).clone().html();

                    row += _this.DisplayRows(html, d);

                    row = _this.RowCreated(row, d);
                     if(_this.DataSelector!=""){
                        $elem.find(_this.DataSelector).append(row);
                    }
                    else{
                        $elem.append(row);
                    }
                    //$elem.find(_this.DataSelector).append(row);
                }

                if (result.length > 0) {
                    _this.HideEmptyCols();
                }

                _this.BindPagination(response.total_recs);
            }
        }).fail(function (e) {
            //$spinner.hide();
            $alert.fail();
        }).always(function () {
            _this.BindAction();
            _this.GridCreated();
        });
    }

    this.DisplayRows = function(html, data) {
        if (fnRowDisplayFormat) {
            return fnRowDisplayFormat(html, data);
        }
        else {
            return html;
        }
    }

    this.RowCreated = function(row, data) {
        if (fnRowCreated) {
            var $tmp = $('<div />').append(row);
            $tmp = fnRowCreated($tmp, data);
            row = $tmp.html();
        }

        return row;
    }

    this.GridCreated = function() {
        if (fnGridCreated) {
            fnGridCreated($elem, $dialog);
        }

        if (_this.Modal) {
            $spinner.hide();
            $dialog.show();
        }
    }

    this.GridSearching = function() {
        var searching = _this.Searching;
        var $searchbox = $elem.parents('.grid').find('.searching .search-box');
        if (!searching) {
            $searchbox.addClass('hidden');
        }
        else {
            $searchbox.removeClass('hidden');
        }

        // not implement
    }

    this.GridSorting = function() {
        var sorting = _this.Sorting;

        if (sorting) {
            if (sorting.sort) {
                var defaults = sorting.defaults;
                var excepts = (!sorting.excepts ? [] : sorting.excepts);

                $elem.addClass('table-sortable');

                $elem.find(' > thead th').each(function (i) {
                    if (excepts.indexOf($(this).attr('data-name')) >= 0) {
                        $(this).removeClass('sort');
                    }
                    else {
                        $(this).addClass('sort');
                    }
                });

                $elem.find(' > thead th').off('click');

                $elem.find(' > thead th').click(function (e) {
                    e.preventDefault();

                    if (excepts.indexOf($(this).attr('data-name')) < 0) {
                        var name = $(this).attr('data-name');
                        var dir = "asc";

                        if ($(this).hasClass('sort-desc') == true) {
                            $(this).removeClass('sort-desc');
                            $(this).addClass('sort-asc');
                            dir = "asc";
                        }
                        else if ($(this).hasClass('sort-asc') == true) {
                            $(this).removeClass('sort-asc');
                            $(this).addClass('sort-desc');
                            dir = "desc";
                        }
                        else {
                            $elem.find('th').removeClass('sort-asc sort-desc');
                            $(this).addClass('sort-asc');

                            if (defaults && defaults.length == 2 && defaults[0] == $(this).attr('data-name')) {
                                name = $(this).attr('data-name');
                                dir = defaults[1];
                            }
                        }

                        _this.Sorting.defaults[0] = name;
                        _this.Sorting.defaults[1] = dir;

                        _this.Binding();
                    }

                    return false;
                });
            }
        }
    }

    this.HideEmptyCols = function() {
        var rows = $("tr", $elem).length - 1;
        var numCols = $("th", $elem).length;
        for (var i = 1; i <= numCols; i++) {
            if ($("td:nth-child(" + i + "):empty", $elem).length == rows && i == numCols) {
                $("td:nth-child(" + i + ")", $elem).hide(); //hide <td>'s
                $("th:nth-child(" + i + ")", $elem).hide(); //hide header <th>
            }
        }

        $(' > thead th[data-visible="false"]', $elem).each(function (i) {
            $("td:nth-child(" + (i + 1) + ")", $elem).hide(); //hide <td>'s
            $("th:nth-child(" + (i + 1) + ")", $elem).hide(); //hide header <th>
        });

    }

    this.BindPagination = function (total_recs) {

        var $pagination = $elem.parents('.grid').find('.pagination');
        $pagination.empty();

        var start_page = _this.StartPage;
        var per_page = _this.PerPage;
        var page_count = Math.ceil(total_recs / per_page);

        if ($pagination.length > 0 && page_count > 1) {
            var next_page = 0;

            $elem.parents('.grid').find('.paging .pageLabel').html(start_page + "/" + page_count);

            if ((start_page - 1) > 0) {
                next_page = start_page - 1;
                if (next_page < 1) {
                    next_page = 1;
                }
                $pagination.append('<li class="prev"><a href="#" data-bind="' + next_page + '">&laquo;</a></li>');
            }
            if (page_count <=5) {
                for (var pg = 1; pg <= page_count; pg++) {
                    var current_page_class = "";
                    //alert(y + ',' + start_page);
                    if (pg == start_page) {
                        current_page_class = ' class="active"';
                    }
                    //alert(pg);
                    $pagination.append('<li' + current_page_class + '><a href="#" data-bind="' + pg + '">' + pg + '</a></li>');
                }
            }
            else{

                  
                   var mod = Math.ceil(start_page/3);
                   var plus = 3* mod;
                   var begin = plus  - 3;

                   if(plus > page_count){
                        plus = page_count;
                        begin = page_count -3;
                   }
                    if(begin < 0){
                        begin = 0;
                        plus = 3;
                    }
                    if(start_page > 3){
                       $pagination.append('<li><a href="#" data-bind="' + begin + '">' + "..." + '</a></li>');
                   }
                    for (var pg = begin +1; pg <= plus; pg++) {
                    var current_page_class = "";
                    //alert(y + ',' + start_page);
                    if (pg == start_page) {
                        current_page_class = ' class="active"';
                    }
                    //alert(pg);
                    $pagination.append('<li' + current_page_class + '><a href="#" data-bind="' + pg + '">' + pg + '</a></li>');
                }
                   if(page_count > 3 && plus < page_count){
                       $pagination.append('<li><a href="#" data-bind="' + (plus+1) + '">' + "..." + '</a></li>');
                   }
                   

            }

            if (start_page < page_count) {
                next_page = start_page + 1;
                $pagination.append('<li class="next"><a href="#" data-bind="' + next_page + '">&raquo;</a></li>');
            }

            $pagination.find('li a').click(function (e) {
                e.preventDefault();
                next_page = parseInt($(this).attr('data-bind'), 10);
                //BindingGrid(elem, type, $page, params, keyword, filter_value, next_page, per_page, authorize, selected);
                _this.StartPage = next_page;
                _this.Binding();
                return false;
            });
             if(page_count > 9){
                /****Append Goto Button*****/
                $pagination.append('<li class="prev next gotopage"><a href="#">Go</a></li>');
                $pagination.append('<input type="text" class="form-control txtgotopage"/>');
                $pagination.find('li.gotopage a').click(function (e) {
                        e.preventDefault();
                        var txtval = $pagination.find("input.txtgotopage").val();
                        var intgoto = parseInt(txtval, 10);
                        if(intgoto != undefined && intgoto != NaN &&
                            intgoto >=1 && intgoto <=page_count){
                        // next_page = parseInt($(this).attr('data-bind'), 10);
                        //BindingGrid(elem, type, $page, params, keyword, filter_value, next_page, per_page, authorize, selected);
                        _this.StartPage = intgoto;
                        _this.Binding();
                        }
                        return false;
                });
             }   

            $pagination.removeClass('hidden');
        }
        else {
            $pagination.addClass('hidden');
        }
    }

    this.BindAction = function() {
        var arrElements = _this.fnRowElementsAction;
        //var elem = "#" + TableId;

        for (var i = 0; i < arrElements.length; i++) {
            var el = arrElements[i];
            var name = (!el.name ? "" : el.name);
            var callback = (!el.callback ? null : el.callback);
            var authorize = (!el.authorize ? false : el.authorize);

            var $el = $elem.find(' > tbody tr ' + name);
            if (authorize) {
                $el.removeClass('hidden').attr('data-name', (!name ? name.substr(1) : name));
                $el.click(function (e) {
                    e.preventDefault();

                    //var form = $(this).parents('form');
                    var $tr = $(this).parents('tr');
                    var id = $tr.attr('data-id');
                    var name = $(this).attr('data-name');

                    if (id != null && name != null) {
                        var index = 0;
                        for (var j = 0; j < arrElements.length; j++) {
                            if (arrElements[j].name === name) {
                                index = j;
                                break;
                            }
                        }

                        if (arrElements[index].callback != null) {
                            arrElements[index].callback($tr, id);
                        }
                    }

                    return false;
                });
            }
            else {
                $el.remove();
            }
        }
    }
};

