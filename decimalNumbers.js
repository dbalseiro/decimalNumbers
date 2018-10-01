/*jslint browser: true*/
/*global jQuery, alert*/

(function($) {
  function DecimalNumbersHelper(text, settings) {
    var self = this;
    var DOT = 46;

    self.displayMessage = "";

    self.insertchar = function(ch) {
      return (
        self.justDigits(ch)
        && self.validateDot(ch)
        && self.validateDigit(ch)
      );
    };

    self.validateDot = function(ch) {
      var result = true;
      if (ch === DOT) {
        if (self.settings.decimals > 0) {
          if (text.indexOf('.') !== -1) {
            // ya hay un punto y metio otro
            result = false;
          }
        }
        else {
          result = false;
        }
      }
      if (!result) {
        self.displayMessage = 'Invalido';
      }
      return result;
    };

    self.validateDigit = function(ch) {
      var result = true;
      if (ch >= 48 && ch <= 57) {
        var a = text.split('.');
        if (text.indexOf('.') === -1) {
          if (a[0].length + 1 > settings.integers) {
            result = false;
          }
        }
        else {
          if (a[1].length + 1 > settings.decimals) {
            result = false;
          }
        }
      }
      if (!result) {
        self.displayMessage = 'Fuera de rango';
      }
      return result;
    };

    self.justDigits = function(ch) {
      if (ch !== 8 
        && ch !== 0 
        && (ch < 48 || ch > 57)
        && ch !== DOT
      ) {
        self.displayMessage = 'Solo digitos';
        return false;
      }
      return true;
    };
  }

  $.fn.mbfDecimalNumbers = function(options) { 
    var settings = $.extend({
      decimals: 2,
      integers: 2,
      errcolor: "red"
    }, options);

    var messageContainer = $("<span />")
      .css("color", settings.errcolor)
      .insertAfter(this);

    this.keypress(function(e) {
      var helper = new DecimalNumbersHelper($(this).val(), settings);
      if (!helper.insertchar(e.which)) {
        messageContainer
          .html(helper.displayMessage)
          .show()
          .fadeOut('slow');
        return false;
      }
    });

    return this;
  };
}(jQuery));
