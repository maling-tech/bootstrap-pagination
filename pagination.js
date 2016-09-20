(function ($) {
    $.fn.pagination = function (options) {
        var defaults = {
            url: '',
            data: '',
            showPage: 10,
            pageSize: 10,
            callback: function () {
                return false;
            }
        };
        $.extend(defaults, options || {});

        var _this = $(this);
        if (defaults.url == '') {
            alert('URL不能为空!');
            _this.empty();
            return false;
        }

        var showPage = defaults.showPage == '' || Number(defaults.showPage) <= 0 ? 10 : defaults.showPage,
            pageSize = defaults.pageSize == '' || Number(defaults.pageSize) <= 0 ? 10 : defaults.pageSize,
            totalCount = 0,
            totalPage = 0,
            currentPage = 1,
            tableDatas,
            formData = defaults.data;

        ajaxGetData();

        function ajaxGetData() {
            var ajaxUrl = defaults.url + '?pageSize=' + pageSize + '&currentPage=' + currentPage;
            $.ajax({
                url: ajaxUrl,
                data: formData,
                dataType: 'json',
                type: 'post',
                success: function (result) {
                    totalCount = Number(result.totalCount);
                    totalPage = Math.ceil(totalCount / pageSize);
                    currentPage = Number(result.currentPage);
                    tableDatas = result.data;
                    createPageTag();
                    defaults.callback(tableDatas);
                }
            });
        }

        function createPageTag() {
            if (totalPage <= 0 || totalPage <= 0)
                return false;
            var html = [];
            html.push('<ul class="pagination">');
            html.push('<li class="previous"><a href="#">&laquo;</a></li>');
            html.push('<li class="disabled hidden"><a href="#">...</a></li>');

            if (totalPage <= showPage) {
                for (var i = 1; i <= totalPage; i++) {
                    if (i == currentPage)
                        html.push('<li class="active"><a href="#">' + i + '</a></li>');
                    else
                        html.push('<li><a href="#">' + i + '</a></li>');
                }
            } else {
                for (var j = 1; j <= showPage; j++) {
                    if (j == currentPage)
                        html.push('<li class="active"><a href="#">' + j + '</a></li>');
                    else
                        html.push('<li><a href="#">' + j + '</a></li>');
                }
            }
            html.push('<li class="disabled hidden"><a href="#">...</a></li>');
            html.push('<li class="next"><a href="#">&raquo;</a></li></ul>');
            _this.html(html.join(''));
            if (totalPage > showPage)
                _this.find('ul.pagination li.next').prev().removeClass('hidden');

            var pageObj = _this.find('ul.pagination'),
                preObj = pageObj.find('li.previous'),
                currentObj = pageObj.find('li').not('.previous,.disabled,.next'),
                nextObj = pageObj.find('li.next');

            currentObj.click(function (event) {
                event.preventDefault();
                var currPage = Number($(this).find('a').html()),
                    activeObj = pageObj.find('li[class="active"]'),
                    activePage = Number(activeObj.find('a').html());
                if (currPage == activePage)
                    return false;
                if (totalPage > showPage) {
                    var maxPage = currPage, minPage = 1;
                    if (($(this).prev().attr('class'))
                        && (_this.prev().attr('class').indexOf('disabled')) >= 0) {
                        minPage = currPage - 1;
                        maxPage = minPage + showPage - 1;
                        loopPageElement(minPage, maxPage);
                    } else if (($(this).next().attr('class'))
                        && ($(this).next().attr('class').indexOf('disabled')) >= 0) {
                        if (totalPage - currPage >= 1) maxPage = currPage + 1;
                        else  maxPage = totalPage;
                        if (maxPage - showPage > 0) minPage = (maxPage - showPage) + 1;
                        loopPageElement(minPage, maxPage)
                    }
                }
                activeObj.removeClass('active');
                $.each(currentObj, function (index, thiz) {
                    if ($(thiz).find('a').html() == currPage) {
                        $(thiz).addClass('active');

                        currentPage = currPage;

                        ajaxGetData();
                    }
                });
            });

            preObj.click(function (event) {
                event.preventDefault();
                var activeObj = pageObj.find('li[class="active"]'), activePage = Number(activeObj.find('a').html());
                if (activePage <= 1) return false;
                if (totalPage > showPage) {
                    var maxPage = activePage, minPage = 1;
                    if ((activeObj.prev().prev().attr('class'))
                        && (activeObj.prev().prev().attr('class').indexOf('disabled')) >= 0) {
                        minPage = activePage - 1;
                        if (minPage > 1) minPage = minPage - 1;
                        maxPage = minPage + showPage - 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                $.each(currentObj, function (index, thiz) {
                    if ($(thiz).find('a').html() == (activePage - 1)) {
                        activeObj.removeClass('active');
                        $(thiz).addClass('active');

                        currentPage = activePage - 1;

                        ajaxGetData();
                    }
                });
            });

            nextObj.click(function (event) {
                event.preventDefault();
                var activeObj = pageObj.find('li[class="active"]'), activePage = Number(activeObj.find('a').html());
                if (activePage >= totalPage) return false;
                if (totalPage > showPage) {
                    var maxPage = activePage, minPage = 1;
                    if ((activeObj.next().next().attr('class'))
                        && (activeObj.next().next().attr('class').indexOf('disabled')) >= 0) {
                        maxPage = activePage + 2;
                        if (maxPage > totalPage) maxPage = totalPage;
                        minPage = maxPage - showPage + 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                $.each(currentObj, function (index, thiz) {
                    if ($(thiz).find('a').html() == (activePage + 1)) {
                        activeObj.removeClass('active');
                        $(thiz).addClass('active');

                        currentPage = activePage + 1;

                        ajaxGetData();
                    }
                });
            });

            function loopPageElement(minPage, maxPage) {
                var tempObj = preObj.next();
                for (var i = minPage; i <= maxPage; i++) {
                    if (minPage == 1 && (preObj.next().attr('class').indexOf('hidden')) < 0)
                        preObj.next().addClass('hidden');
                    else if (minPage > 1 && (preObj.next().attr('class').indexOf('hidden')) > 0)
                        preObj.next().removeClass('hidden');
                    if (maxPage == totalPage && (nextObj.prev().attr('class').indexOf('hidden')) < 0)
                        nextObj.prev().addClass('hidden');
                    else if (maxPage < totalPage && (nextObj.prev().attr('class').indexOf('hidden')) > 0)
                        nextObj.prev().removeClass('hidden');
                    var obj = tempObj.next().find('a');
                    if (!isNaN(obj.html()))obj.html(i);
                    tempObj = tempObj.next();
                }
            }
        }

    };
})(jQuery);
