'use strict';

var __chunk_1 = require('./chunk-42b181d7.js');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pikaday = createCommonjsModule(function (module, exports) {
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/Pikaday/Pikaday
 */

(function (root, factory)
{

    var moment;
    {
        // CommonJS module
        // Load moment.js as an optional dependency
        // try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    }
}(commonjsGlobal, function (moment)
{

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

    hasEventListeners = !!window.addEventListener,

    document = window.document,

    sto = window.setTimeout,

    addEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },

    removeEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },

    trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    },

    hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },

    addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    },

    removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },

    isArray = function(obj)
    {
        return (/Array/).test(Object.prototype.toString.call(obj));
    },

    isDate = function(obj)
    {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isWeekend = function(date)
    {
        var day = date.getDay();
        return day === 0 || day === 6;
    },

    isLeapYear = function(year)
    {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    getDaysInMonth = function(year, month)
    {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    setToStartOfDay = function(date)
    {
        if (isDate(date)) date.setHours(0,0,0,0);
    },

    compareDates = function(a,b)
    {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },

    extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },

    fireEvent = function(el, eventName, data)
    {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },

    adjustCalendar = function(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month)/12);
            calendar.month -= 12;
        }
        return calendar;
    },

    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // data-attribute on the input field with an aria assistance tekst (only applied when `bound` is set)
        ariaLabel: 'Use the arrow keys to pick a date',

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // automatically fit in the viewport even if it means repositioning from the position option
        reposition: true,

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the toString function which gets passed a current date object and format
        // and returns a string
        toString: null,

        // used to create date object from current input string
        parse: null,

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the default flag for moment's strict date parsing
        formatStrict: false,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // show week numbers at head of row
        showWeekNumber: false,

        // Week picker mode
        pickWholeWeek: false,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        startRange: null,
        endRange: null,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // Render days of the calendar grid that fall in the next or previous month
        showDaysInNextAndPreviousMonths: false,

        // Allows user to select days that fall in the next or previous month
        enableSelectionDaysInNextAndPreviousMonths: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // Specify a DOM element to render the calendar in
        container: undefined,

        // Blur field when date is selected
        blurFieldOnSelect : true,

        // internationalization
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },

        // Theme Classname
        theme: null,

        // events array
        events: [],

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null,

        // Enable keyboard input
        keyboardInput: true
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function(opts, day, abbr)
    {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },

    renderDay = function(opts)
    {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
            if (opts.showDaysInNextAndPreviousMonths) {
                arr.push('is-outside-current-month');

                if(!opts.enableSelectionDaysInNextAndPreviousMonths) {
                    arr.push('is-selection-disabled');
                }

            } else {
                return '<td class="is-empty"></td>';
            }
        }
        if (opts.isDisabled) {
            arr.push('is-disabled');
        }
        if (opts.isToday) {
            arr.push('is-today');
        }
        if (opts.isSelected) {
            arr.push('is-selected');
            ariaSelected = 'true';
        }
        if (opts.hasEvent) {
            arr.push('has-event');
        }
        if (opts.isInRange) {
            arr.push('is-inrange');
        }
        if (opts.isStartRange) {
            arr.push('is-startrange');
        }
        if (opts.isEndRange) {
            arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
                 '<button class="pika-button pika-day" type="button" ' +
                    'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
                        opts.day +
                 '</button>' +
               '</td>';
    },

    renderWeek = function (d, m, y) {
        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
        var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
        return '<td class="pika-week">' + weekNum + '</td>';
    },

    renderRow = function(days, isRTL, pickWholeWeek, isRowSelected)
    {
        return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },

    renderBody = function(rows)
    {
        return '<tbody>' + rows.join('') + '</tbody>';
    },

    renderHead = function(opts)
    {
        var i, arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    },

    renderTitle = function(instance, c, year, month, refYear, randId)
    {
        var i, j, arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected="selected"': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }

        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === (instance._o.numberOfMonths - 1) ) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }

        return html += '</div>';
    },

    renderTable = function(opts, data, randId)
    {
        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function(options)
    {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function(e)
        {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                            if (opts.blurFieldOnSelect && opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                // if this is touch event prevent mouse events emulation
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onKeyChange = function(e)
        {
            e = e || window.event;

            if (self.isVisible()) {

                switch(e.keyCode){
                    case 13:
                    case 27:
                        if (opts.field) {
                            opts.field.blur();
                        }
                        break;
                    case 37:
                        e.preventDefault();
                        self.adjustDate('subtract', 1);
                        break;
                    case 38:
                        self.adjustDate('subtract', 7);
                        break;
                    case 39:
                        self.adjustDate('add', 1);
                        break;
                    case 40:
                        self.adjustDate('add', 7);
                        break;
                }
            }
        };

        self._onInputChange = function(e)
        {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (opts.parse) {
                date = opts.parse(opts.field.value, opts.format);
            } else if (hasMoment) {
                date = moment(opts.field.value, opts.format, opts.formatStrict);
                date = (date && date.isValid()) ? date.toDate() : null;
            }
            else {
                date = new Date(Date.parse(opts.field.value));
            }
            if (isDate(date)) {
              self.setDate(date);
            }
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function()
        {
            self.show();
        };

        self._onInputClick = function()
        {
            self.show();
        };

        self._onInputBlur = function()
        {
            // IE allows pika div to gain focus; catch blur the input field
            var pEl = document.activeElement;
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));

            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'touchend', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.keyboardInput) {
            addEvent(document, 'keydown', self._onKeyChange);
        }

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            } else if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            format = format || this._o.format;
            if (!isDate(this._d)) {
                return '';
            }
            if (this._o.toString) {
              return this._o.toString(this._d, format);
            }
            if (hasMoment) {
              return moment(this._d).format(format);
            }
            return this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function(sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days)*24*60*60*1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            this.setDate(newDay);
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear  = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear  = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function(value)
        {
            this._o.startRange = value;
        },

        setEndRange: function(value)
        {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '',
                randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', opts.ariaLabel);
            }
        },

        adjustPosition: function()
        {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect, leftAligned, bottomAligned;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            leftAligned = true;
            bottomAligned = true;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
                leftAligned = false;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
                bottomAligned = false;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';

            addClass(this.el, leftAligned ? 'left-aligned' : 'right-aligned');
            addClass(this.el, bottomAligned ? 'bottom-aligned' : 'top-aligned');
            removeClass(this.el, !leftAligned ? 'left-aligned' : 'right-aligned');
            removeClass(this.el, !bottomAligned ? 'bottom-aligned' : 'top-aligned');
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month, randId)
        {
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
                nextMonth = month === 11 ? 0 : month + 1,
                yearOfPreviousMonth = month === 0 ? year - 1 : year,
                yearOfNextMonth = month === 11 ? year + 1 : year,
                daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            var isWeekSelected = false;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                    isEmpty = i < before || i >= (days + before),
                    dayNumber = 1 + (i - before),
                    monthNumber = month,
                    yearNumber = year,
                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                    isDisabled = (opts.minDate && day < opts.minDate) ||
                                 (opts.maxDate && day > opts.maxDate) ||
                                 (opts.disableWeekends && isWeekend(day)) ||
                                 (opts.disableDayFn && opts.disableDayFn(day));

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                        day: dayNumber,
                        month: monthNumber,
                        year: yearNumber,
                        hasEvent: hasEvent,
                        isSelected: isSelected,
                        isToday: isToday,
                        isDisabled: isDisabled,
                        isEmpty: isEmpty,
                        isStartRange: isStartRange,
                        isEndRange: isEndRange,
                        isInRange: isInRange,
                        showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
                        enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
                    };

                if (opts.pickWholeWeek && isSelected) {
                    isWeekSelected = true;
                }

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
                    row = [];
                    r = 0;
                    isWeekSelected = false;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                removeClass(this.el, 'is-hidden');
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            var opts = this._o;

            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (opts.keyboardInput) {
                removeEvent(document, 'keydown', this._onKeyChange);
            }
            if (opts.field) {
                removeEvent(opts.field, 'change', this._onInputChange);
                if (opts.bound) {
                    removeEvent(opts.trigger, 'click', this._onInputClick);
                    removeEvent(opts.trigger, 'focus', this._onInputFocus);
                    removeEvent(opts.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;
}));
});

/* src/components/dataComponents/DATEPICKER.svelte generated by Svelte v3.6.7 */

const css = {
	code: "html{@charset \"UTF-8\";}html .pika-single{z-index:9999;display:block;position:relative;color:#333;background:#fff;border:1px solid #ccc;border-bottom-color:#bbb;font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif}html .pika-single:before,html .pika-single:after{content:\" \";display:table}html .pika-single:after{clear:both}html .pika-single{*zoom:1}html .pika-single.is-hidden{display:none}html .pika-single.is-bound{position:absolute;box-shadow:0 5px 15px -5px rgba(0, 0, 0, 0.5)}html .pika-lendar{float:left;width:240px;margin:8px}html .pika-title{position:relative;text-align:center}html .pika-label{display:inline-block;*display:inline;position:relative;z-index:9999;overflow:hidden;margin:0;padding:5px 3px;font-size:14px;line-height:20px;font-weight:bold;background-color:#fff}html .pika-title select{cursor:pointer;position:absolute;z-index:9998;margin:0;left:0;top:5px;filter:alpha(opacity=0);opacity:0}html .pika-prev,html .pika-next{display:block;cursor:pointer;position:relative;outline:none;border:0;padding:0;width:20px;height:30px;text-indent:20px;white-space:nowrap;overflow:hidden;background-color:transparent;background-position:center center;background-repeat:no-repeat;background-size:75% 75%;opacity:0.5;*position:absolute;*top:0}html .pika-prev:hover,html .pika-next:hover{opacity:1}html .pika-prev,html .is-rtl .pika-next{float:left;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');*left:0}html .pika-next,html .is-rtl .pika-prev{float:right;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');*right:0}html .pika-prev.is-disabled,html .pika-next.is-disabled{cursor:default;opacity:0.2}html .pika-select{display:inline-block;*display:inline}html .pika-table{width:100%;border-collapse:collapse;border-spacing:0;border:0}html .pika-table th,html .pika-table td{width:14.28571429%;padding:0}html .pika-table th{color:#999;font-size:12px;line-height:25px;font-weight:bold;text-align:center}html .pika-button{cursor:pointer;display:block;box-sizing:border-box;-moz-box-sizing:border-box;outline:none;border:0;margin:0;width:100%;padding:5px;color:#666;font-size:12px;line-height:15px;text-align:right;background:#f5f5f5}html .pika-week{font-size:11px;color:#999}html .is-today .pika-button{color:#33aaff;font-weight:bold}html .is-selected .pika-button,html .has-event .pika-button{color:#fff;font-weight:bold;background:#33aaff;box-shadow:inset 0 1px 3px #178fe5;border-radius:3px}html .has-event .pika-button{background:#005da9;box-shadow:inset 0 1px 3px #0076c9}html .is-disabled .pika-button,html .is-inrange .pika-button{background:#D5E9F7}html .is-startrange .pika-button{color:#fff;background:#6CB31D;box-shadow:none;border-radius:3px}html .is-endrange .pika-button{color:#fff;background:#33aaff;box-shadow:none;border-radius:3px}html .is-disabled .pika-button{pointer-events:none;cursor:default;color:#999;opacity:0.3}html .is-outside-current-month .pika-button{color:#999;opacity:0.3}html .is-selection-disabled{pointer-events:none;cursor:default}html .pika-button:hover,html .pika-row.pick-whole-week:hover .pika-button{color:#fff;background:#ff8000;box-shadow:none;border-radius:3px}html .pika-table abbr{border-bottom:none;cursor:help}",
	map: "{\"version\":3,\"file\":\"DATEPICKER.svelte\",\"sources\":[\"DATEPICKER.svelte\"],\"sourcesContent\":[\"<script>\\n\\t// HACK: I had to manually remove references to moment in the pikaday library to get it to work!\\n\\timport Pikaday from './libs/pikaday/pikaday.js';\\n\\timport { onMount } from 'svelte';\\n\\n\\t// could not use Pikaday due to a weird moment dependency https://github.com/Pikaday/Pikaday/issues/852\\n\\n\\t//import Datepicker from 'svelte-calendar';\\n\\n\\n\\texport let DisplayTypeShortCode;\\n\\texport let ShortCode;\\n\\texport let Label;\\n\\texport let HelpDescription;\\n\\n\\n\\t// let start = new Date()\\n\\t// let dateFormat = \\\"#{l}, #{F} #{j}, #{Y}\\\"\\n\\t// let noWeekendsSelectableCallback = function (date) {\\n\\t// \\treturn date.getDay() != 0 && date.getDay() != 6\\n\\t// }\\n\\t// let formattedSelected = undefined\\n\\t// let dateChosen = false\\n\\t// let exampleFormatted = false\\n\\t// let exampleChosen = false\\n\\n\\tonMount( () => {\\n\\t    var picker = new Pikaday({ field: document.getElementById(ShortCode) });\\n\\t});\\n\\n</script>\\n\\n<div class=\\\"data-component-container\\\" data-short-code=\\\"{ShortCode}\\\">\\n\\t<label for=\\\"{ShortCode}\\\">{Label}</label>\\n\\n\\t<div class=\\\"input-container\\\">\\n\\t\\t<input id=\\\"{ShortCode}\\\" type=\\\"text\\\" autocomplete=\\\"off\\\"  />\\n\\n\\t\\t{#if HelpDescription}\\n\\t\\t\\t<div class=\\\"help-description\\\">{HelpDescription}</div>\\n\\t\\t{/if}\\n\\n\\t</div>\\n</div>\\n\\n\\n<style lang=\\\"less\\\">/* in order to preserve the styles i have had to make them global */\\n:global(html) {\\n  @charset \\\"UTF-8\\\";\\n  /*!\\n\\t * Pikaday\\n\\t * Copyright © 2014 David Bushell | BSD & MIT license | https://dbushell.com/\\n\\t */\\n  /*\\n\\tclear child float (pika-lendar), using the famous micro clearfix hack\\n\\thttp://nicolasgallagher.com/micro-clearfix-hack/\\n\\t*/\\n  /* styling for abbr */\\n}\\n:global(html) .pika-single {\\n  z-index: 9999;\\n  display: block;\\n  position: relative;\\n  color: #333;\\n  background: #fff;\\n  border: 1px solid #ccc;\\n  border-bottom-color: #bbb;\\n  font-family: \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n}\\n:global(html) .pika-single:before,\\n:global(html) .pika-single:after {\\n  content: \\\" \\\";\\n  display: table;\\n}\\n:global(html) .pika-single:after {\\n  clear: both;\\n}\\n:global(html) .pika-single {\\n  *zoom: 1;\\n}\\n:global(html) .pika-single.is-hidden {\\n  display: none;\\n}\\n:global(html) .pika-single.is-bound {\\n  position: absolute;\\n  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);\\n}\\n:global(html) .pika-lendar {\\n  float: left;\\n  width: 240px;\\n  margin: 8px;\\n}\\n:global(html) .pika-title {\\n  position: relative;\\n  text-align: center;\\n}\\n:global(html) .pika-label {\\n  display: inline-block;\\n  *display: inline;\\n  position: relative;\\n  z-index: 9999;\\n  overflow: hidden;\\n  margin: 0;\\n  padding: 5px 3px;\\n  font-size: 14px;\\n  line-height: 20px;\\n  font-weight: bold;\\n  background-color: #fff;\\n}\\n:global(html) .pika-title select {\\n  cursor: pointer;\\n  position: absolute;\\n  z-index: 9998;\\n  margin: 0;\\n  left: 0;\\n  top: 5px;\\n  filter: alpha(opacity=0);\\n  opacity: 0;\\n}\\n:global(html) .pika-prev,\\n:global(html) .pika-next {\\n  display: block;\\n  cursor: pointer;\\n  position: relative;\\n  outline: none;\\n  border: 0;\\n  padding: 0;\\n  width: 20px;\\n  height: 30px;\\n  /* hide text using text-indent trick, using width value (it's enough) */\\n  text-indent: 20px;\\n  white-space: nowrap;\\n  overflow: hidden;\\n  background-color: transparent;\\n  background-position: center center;\\n  background-repeat: no-repeat;\\n  background-size: 75% 75%;\\n  opacity: 0.5;\\n  *position: absolute;\\n  *top: 0;\\n}\\n:global(html) .pika-prev:hover,\\n:global(html) .pika-next:hover {\\n  opacity: 1;\\n}\\n:global(html) .pika-prev,\\n:global(html) .is-rtl .pika-next {\\n  float: left;\\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');\\n  *left: 0;\\n}\\n:global(html) .pika-next,\\n:global(html) .is-rtl .pika-prev {\\n  float: right;\\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');\\n  *right: 0;\\n}\\n:global(html) .pika-prev.is-disabled,\\n:global(html) .pika-next.is-disabled {\\n  cursor: default;\\n  opacity: 0.2;\\n}\\n:global(html) .pika-select {\\n  display: inline-block;\\n  *display: inline;\\n}\\n:global(html) .pika-table {\\n  width: 100%;\\n  border-collapse: collapse;\\n  border-spacing: 0;\\n  border: 0;\\n}\\n:global(html) .pika-table th,\\n:global(html) .pika-table td {\\n  width: 14.28571429%;\\n  padding: 0;\\n}\\n:global(html) .pika-table th {\\n  color: #999;\\n  font-size: 12px;\\n  line-height: 25px;\\n  font-weight: bold;\\n  text-align: center;\\n}\\n:global(html) .pika-button {\\n  cursor: pointer;\\n  display: block;\\n  box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  outline: none;\\n  border: 0;\\n  margin: 0;\\n  width: 100%;\\n  padding: 5px;\\n  color: #666;\\n  font-size: 12px;\\n  line-height: 15px;\\n  text-align: right;\\n  background: #f5f5f5;\\n}\\n:global(html) .pika-week {\\n  font-size: 11px;\\n  color: #999;\\n}\\n:global(html) .is-today .pika-button {\\n  color: #33aaff;\\n  font-weight: bold;\\n}\\n:global(html) .is-selected .pika-button,\\n:global(html) .has-event .pika-button {\\n  color: #fff;\\n  font-weight: bold;\\n  background: #33aaff;\\n  box-shadow: inset 0 1px 3px #178fe5;\\n  border-radius: 3px;\\n}\\n:global(html) .has-event .pika-button {\\n  background: #005da9;\\n  box-shadow: inset 0 1px 3px #0076c9;\\n}\\n:global(html) .is-disabled .pika-button,\\n:global(html) .is-inrange .pika-button {\\n  background: #D5E9F7;\\n}\\n:global(html) .is-startrange .pika-button {\\n  color: #fff;\\n  background: #6CB31D;\\n  box-shadow: none;\\n  border-radius: 3px;\\n}\\n:global(html) .is-endrange .pika-button {\\n  color: #fff;\\n  background: #33aaff;\\n  box-shadow: none;\\n  border-radius: 3px;\\n}\\n:global(html) .is-disabled .pika-button {\\n  pointer-events: none;\\n  cursor: default;\\n  color: #999;\\n  opacity: 0.3;\\n}\\n:global(html) .is-outside-current-month .pika-button {\\n  color: #999;\\n  opacity: 0.3;\\n}\\n:global(html) .is-selection-disabled {\\n  pointer-events: none;\\n  cursor: default;\\n}\\n:global(html) .pika-button:hover,\\n:global(html) .pika-row.pick-whole-week:hover .pika-button {\\n  color: #fff;\\n  background: #ff8000;\\n  box-shadow: none;\\n  border-radius: 3px;\\n}\\n:global(html) .pika-table abbr {\\n  border-bottom: none;\\n  cursor: help;\\n}\\n</style>\"],\"names\":[],\"mappings\":\"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\"}"
};

const DATEPICKER = __chunk_1.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

	// could not use Pikaday due to a weird moment dependency https://github.com/Pikaday/Pikaday/issues/852

	//import Datepicker from 'svelte-calendar';


	let { DisplayTypeShortCode, ShortCode, Label, HelpDescription } = $$props;


	// let start = new Date()
	// let dateFormat = "#{l}, #{F} #{j}, #{Y}"
	// let noWeekendsSelectableCallback = function (date) {
	// 	return date.getDay() != 0 && date.getDay() != 6
	// }
	// let formattedSelected = undefined
	// let dateChosen = false
	// let exampleFormatted = false
	// let exampleChosen = false

	__chunk_1.onMount( () => {
	    var picker = new pikaday({ field: document.getElementById(ShortCode) });
	});

	if ($$props.DisplayTypeShortCode === void 0 && $$bindings.DisplayTypeShortCode && DisplayTypeShortCode !== void 0) $$bindings.DisplayTypeShortCode(DisplayTypeShortCode);
	if ($$props.ShortCode === void 0 && $$bindings.ShortCode && ShortCode !== void 0) $$bindings.ShortCode(ShortCode);
	if ($$props.Label === void 0 && $$bindings.Label && Label !== void 0) $$bindings.Label(Label);
	if ($$props.HelpDescription === void 0 && $$bindings.HelpDescription && HelpDescription !== void 0) $$bindings.HelpDescription(HelpDescription);

	$$result.css.add(css);

	return `<div class="data-component-container"${(v => v == null ? "" : ` data-short-code="${__chunk_1.escape(ShortCode)}"`)(ShortCode)}>
		<label${(v => v == null ? "" : ` for="${__chunk_1.escape(ShortCode)}"`)(ShortCode)}>${__chunk_1.escape(Label)}</label>

		<div class="input-container">
			<input${(v => v == null ? "" : ` id="${__chunk_1.escape(ShortCode)}"`)(ShortCode)} type="text" autocomplete="off">

			${ HelpDescription ? `<div class="help-description">${__chunk_1.escape(HelpDescription)}</div>` : `` }

		</div>
	</div>`;
});

exports.default = DATEPICKER;
