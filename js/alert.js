+function ($) {
  'use strict';
  var data;
  var dismiss = '[data-dismiss="alert"]';
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close);
  };

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }

  function Plugin(option) {

      data = new Alert(this);

  }

  $.fn.alert = function () {
    console.log("i'm a old alert");
  };

  var old = $.fn.alert;

  $.fn.alert = Plugin;

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };

  $.fn.alert.Constructor = Alert;

  //$('.alert').alert();
  //$('.alert').on('click', dismiss, data.close);
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
  //$(document).off('click.bs.alert.data-api');
  //$(document).off('.data-api'); // will remove event and its callback
  //data.close.call($('.alert'));
}(jQuery);
