ko.bindingHandlers.expandVisible = {
    init:function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        // Use "unwrapObservable" so we can handle values that may or may not be observable
        $(element).toggle(ko.utils.unwrapObservable(value));
    },
    update:function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).slideDown() : $(element).slideUp();
    }
};


ko.bindingHandlers["ui-vars"] = {
    init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var observableValues = {};
        _.each(value, function (value, key) {
            observableValues[key] = ko.observable(value);
        });
        var innerBindingContext = bindingContext.extend(observableValues);
        ko.applyBindingsToDescendants(innerBindingContext, element);
        return { controlsDescendantBindings:true};
    },
    update:function () {

    }
};

ko.bindingHandlers["ui-panel"] = {
    /**
     @param {Object} valueAccessor
     @param {Number} valueAccessor.time
     @param {Boolean} valueAccessor.isExpanded
     */
    init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        value.isExpanded = ko.observable(value.isExpanded === false ? false : true);
        var children = $(element).children();
        var firstChild = children.first();
        var secondChild = children.next();
        ko.applyBindingsToNode(secondChild[0], {
            expandVisible:value.isExpanded
        });

        firstChild.click(function () {
            value.isExpanded(!value.isExpanded());
        });

        var innerBindingContext = bindingContext.extend(value);
        ko.applyBindingsToDescendants(innerBindingContext, element);

        // Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
        return { controlsDescendantBindings:true };
    },
    update:function (element, valueAccessor, allBindingsAccessor, viewModel) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
    }
};


ko.bindingHandlers["ui-tabpanel"] = {
    init:function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var $element = $(element);
        var children = $element.children();
        var ul = $element.children("ul");
        var lis = ul.children("li");
        var divs = $element.children("div");
        var lisAndDivs = _.zip(lis, divs);

        _.each(lisAndDivs, function (liAndDiv) {
            var li = liAndDiv[0];
            var div = liAndDiv[1];
            $(div).hide();
            $(li).click(function () {
                if (value.active) {
                    lis.removeClass(value.active);
                    $(li).addClass(value.active);
                }
                // hide all divs
                divs.hide();
                // show this div
                $(div).show();
            });
        });
        // show the first div
        $(lisAndDivs[0][1]).show();
        if (value.active) {
            $(lisAndDivs[0][0]).addClass(value.active);
        }

    },
    update:function (element, valueAccessor, allBindingsAccessor, viewModel) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
    }
};

ko.bindingHandlers["ui-table"] = {
    init:function (element, valueAccessor, binding, viewModel) {
        var config = ko.utils.unwrapObservable(valueAccessor());
        if (config.scroll) {
            var $oldTable = $(element);
            var thead = $oldTable.children('thead');
            var newTable = $('<table aria-hidden="true" class="jedi-grid-table-fixed">' + thead[0].outerHTML + '<tbody></tbody></table>');
            $oldTable.parent().parent().prepend(newTable);
            // sync the width of the old and the new table header
            var oldThs = thead.children('tr').children('th');
            var thWidths = $.map(oldThs, function (th) {
                return $(th).width();
            });
            var newThs = newTable.children('thead').children('tr').children('th');
            $.each(newThs, function (thIndex, newTh) {
                $(newTh).width(thWidths[thIndex]);
            });
            thead.css({
                "display":"block",
                "position":"absolute",
                "top":-10000,
                "right":-10000
            });
            ko.applyBindings(viewModel, newTable[0]);
        }
    },
    update:function (element, valueAccessor) {

    }
};

ko.bindingHandlers["ui-accordion"] = {
    init:function (element, valueAccessor, binding, viewModel) {
        //var config = ko.utils.unwrapObservable(valueAccessor());
        var children = $(element).children();
        var bodies = $.map(children, function (child) {
            return $(child).children()[1];
        });
        $.each(children, function (childIndex, child) {
            var child = $(child);
            var header = $((child).children()[0]);
            var body = $((child).children()[1]);
            header.click(function () {
                // show this body
                body.slideDown();
                // hide all other bodies
                $.each(bodies, function (bodyIndex, otherBody) {
                    if (bodyIndex !== childIndex) {
                        $(otherBody).slideUp();
                    }
                });
            });
        });
        $.each(bodies, function (i, body) {
            if (i !== 0) {
                $(body).hide();
            }
        });
    },
    update:function (element, valueAccessor) {
    }
};

ko.bindingHandlers["ui-dropdown"] = {
    init:function (element, valueAccessor, binding, viewModel) {
        var config = ko.utils.unwrapObservable(valueAccessor());
        var children = $(element).children();
        var first = children.first();
        var active = false;
        var bodyClick = function (e) {
            var fun = function (ev) {
                if (e.timeStamp !== ev.timeStamp) {
                    $(element).removeClass(config.active);
                    active = false;
                    $('body').off('click', fun);
                }
            };
            return fun;
        };
        $(first).click(function (e) {
            if (!active) {
                active = true;
                $(element).addClass(config.active);
                $('body').on('click', bodyClick(e));
            }
        });
    },
    update:function () {
    }
};

$(function () {
    var data = [];
    _(20).times(function () {
        data.push({
            key:Math.random() * 1000,
            value:Math.random() * 10000
        });
    });
    ko.applyBindings({
        data:data
    });
});
