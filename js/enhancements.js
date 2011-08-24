$(document).ready(function(){

  var lastFocus = false
  $("td > input")
    .focus(function(ev){
      highlightSame($(this).val())
      $(this).select()
      if (lastFocus) {
        lastFocus.attr('value', lastFocus.val()) // inline blur event removes value
      }
      lastFocus = $(this)
    })
    .keyup(function(ev){
      highlightSame($(this).val())
      if ($(this).val().length > 1) {
        $(this).addClass('multi')
      }
      else if ($(this).hasClass('multi')) {
        $(this).removeClass('multi')
      }
    })

  $('form > p > input[type="submit"]').click(function(ev){
    refreshStyles()
  })

  function highlightSame(number, multisOnly) {
    if (!multisOnly) $('td > input.highlighted').removeClass('highlighted')
    if (number.length == 1) {
      els = $('td > input[value*="'+number+'"]')
      if (multisOnly) els = els.filter('.multi')
      els.addClass('highlighted')
    } else {
      $.each(number.split(''), function(i,v){ highlightSame(v, true) })
    }
  }

  function refreshStyles() {
    $('td > input:not([readonly])').trigger('keyup')
  }

})
