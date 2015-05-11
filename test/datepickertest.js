'use strict';

var utils = require('./testUtils');

describe('Date picker tests', function () {

  var currentDate;
  // inject the HTML input for the tests
  beforeEach(function () {
    currentDate = new Date();
    var datepickerInput = '<input type="text" class="datepicker">';
    document.body.insertAdjacentHTML('afterbegin', datepickerInput);
  });

  // remove the html input and the date picker div from the DOM
  afterEach(function () {
    $('.datepicker').remove();
    $('.date-selector').remove();
  });

  it('Call date picker with default parameters', function () {
    require('../src/js/jdpicker')();

    //verify today
    var formattedToday = utils.formatDate(currentDate);
    var dpToday = $('div.date-selector .today').attr('date');
    expect(dpToday).toBe(formattedToday);

    //verify month name is in english
    var currentMonth = currentDate.getMonth();
    var currentMonthName = utils.getMonthName(currentMonth);
    var dpCurrentMonth = $('.date-selector .month-name')[0].textContent;
    expect(dpCurrentMonth).toBe(currentMonthName);

    //verify that previous date is unselected
    var previousParentId = $('div.date-selector .today').parent().prev().attr('id');
    var lastElement = $('#' + previousParentId + ' td:last-child');
    expect(lastElement.attr('class')).toBe('unselected_month');
  });

  it('Display date picker for fr language', function () {
    var lang = 'fr';
    require('../src/js/jdpicker')(lang);

    var currentMonth = currentDate.getMonth();
    var currentMonthName = utils.getMonthName(currentMonth, lang);
    var dpCurrentMonth = $('.date-selector .month-name')[0].textContent;
    expect(dpCurrentMonth).toBe(currentMonthName);
  });

  it('Display date picker for es language', function () {
    var lang = 'es';
    require('../src/js/jdpicker')(lang);

    var currentMonth = currentDate.getMonth();
    var currentMonthName = utils.getMonthName(currentMonth, lang);
    var dpCurrentMonth = $('.date-selector .month-name')[0].textContent;
    expect(dpCurrentMonth).toBe(currentMonthName);
  });

  it('Display date picker with back and next dates parameters', function () {
    var lang = 'fr';
    var THREE_DAYS = (1000 * 60 * 60 * 24) * 3;

    var backDate = new Date(currentDate.getTime() - THREE_DAYS);
    var backDateFormatted = utils.formatDate(backDate);
    var nextDate = new Date(currentDate.getTime() + THREE_DAYS);
    var nextDateFormatted = utils.formatDate(nextDate);
    require('../src/js/jdpicker')(lang, backDateFormatted, nextDateFormatted);

    //verify that previous date is unselected
    var backDateElement = $('.table-month-wrapper').find("[date='" + backDateFormatted + "']");
    var previousElement = backDateElement.prev();
    expect(backDateElement.attr('class')).toBe('selectable_day');
    expect(previousElement.attr('class')).toBe('unselected_month');

    //verify that next date is unselected
    var nextDateElement = $('.table-month-wrapper').find("[date='" + nextDateFormatted + "']");
    var nextElement = nextDateElement.next();
    expect(nextDateElement.attr('class')).toBe('selectable_day');
    expect(nextElement.attr('class')).toBe('unselected_month');
  });
});