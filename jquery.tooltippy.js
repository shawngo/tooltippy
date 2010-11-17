/**
 *
 * ToolTippy: v1.0 - 11/15/2010
 *
 * ToolTippy is a tooltip plugin for jQuery.
 *
 * CSS-Only Tooltips:
 * http://www.filamentgroup.com/lab/image_free_css_tooltip_pointers_a_use_for_polygonal_css/
 *
 * jQuery Plugin Authoring: http://docs.jquery.com/Plugins/Authoring
 *
 * Copyright (c) 2010 Shawn McFarlane
 * Dual licensed under the MIT and GPL licenses.
 *
 */
(function($) {
  // the tooltippy plugin
  $.fn.tooltippy = function(settings) {
    var config = {
      'preventDefault': true,
         'tooltipText': 'title',
            'noborder': true,
              'doFade': false };

    // combine user settings with default
    if (settings) $.extend(config, settings);

    // iterate through collection and binding hover listener
    this.each(function() {
      $(this).hover(
        function(e) {
          // when mouse enters, build the tooltip
          $this = $(this);
          $this.tooltippy.mouseenter($this, config.tooltipText, config.noborder);
          if (config.preventDefault) {
            e.preventDefault();
          }
        },
        function(e) {
          // when mouse leaves, destroy the tooltip
          $(this).tooltippy.mouseleave(config.doFade);
        }
      )
    });

    return this;
  };


  // helper methods for the tooltip
  var tooltippyMethods = {
    // build the tooltip html
    buildTip: function($el, attribute, noborder) {
      var tiptitle = $el.attr(attribute),
          pos = $el.position(),
          ow = $el.outerWidth(false),
          ot = pos.top - 55,
          ol = pos.left - 75 + (ow * .6),
          borderClass = noborder ? ' fg-tooltip-noborder ' : '',
          styles = ' style="position: absolute; top: '+ ot +'px; left: '+ ol +'px;"';

      return $('<div class="fg-tooltip ui-widget-header ui-corner-all '+ borderClass +'" '+ styles +'>'+ tiptitle +'<div class="fg-tooltip-pointer-down ui-widget-header"><div class="fg-tooltip-pointer-down-inner"></div></div></div>');
    },

    // insert tooltip html into the ol dom-o-rino
    mouseenter: function($el, attribute, noborder) {
      $($el.tooltippy.buildTip($el, attribute, noborder)).insertAfter($el);
    },

    // remove tooltip from the dom deluise. is he on twitter?
    mouseleave: function(doFade) {
      if (doFade) {
        $('.fg-tooltip').fadeOut('fast', function(){$(this).remove()});
      }
      else {
        $('.fg-tooltip').remove();
      }
    }

  };

  jQuery.each(tooltippyMethods, function(i) {
    jQuery.fn.tooltippy[i] = this;
  });

})(jQuery);
