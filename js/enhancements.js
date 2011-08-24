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
      removeNotes($(this).attr('id'))
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

  function removeNotes(id) {
    $('.matchable').removeClass('matchable')

    var tmp
    var blocks = {c0:[1,2],c1:[0,2],c2:[0,1],c3:[4,5],c4:[3,5],c5:[3,4],c6:[7,8],c7:[6,8],c8:[6,7]}
    var scopes = [0,1,2,3,4,5,6,7,8]
    var col = id.split('')[1]
    var row = id.split('')[2]
    var rowBlock = blocks['c'+row]
    var colBlock = blocks['c'+col]
    var val = $('#'+id).val()
    var ids = []

    for (var i in scopes) {
      tmp = 'c'+i+row
      ids.push(tmp)
      tmp = 'c'+col+i
      if (ids.indexOf(tmp) < 0) ids.push(tmp)
    }
    for (var ci in colBlock) {
      for (var ri in rowBlock) {
        tmp = 'c'+colBlock[ci]+rowBlock[ri]
        if (ids.indexOf(tmp) < 0) ids.push(tmp)
      }
    }

    $.each(ids, function(i,v){
      $('#'+v).addClass('matchable')
    })
    $('.matchable.multi').each(function(){
      updateMultiVal(this, val)
    })


  }


  function updateMultiVal(el, num) {
    var val = $(el).val()
    newVal = newVal.replace(num, '')
    $(el).val(newVal)
  }

})
