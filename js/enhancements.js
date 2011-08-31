$(document).ready(function(){

  $('#f44').focus()

  $("td > input")
    .focus(function(ev){
      $(this).attr('maxlength', 7)
      highlightSame($(this).val())
      highlightRelated(this)
      $(this).select()
    })
    .keypress(function(ev){
      var chr = String.fromCharCode(ev.which)
      if ($.inArray(chr, ['h','j','k','l']) != -1) {
        move(this, chr)
      } 
    })
    .keyup(function(ev){
      var chr = String.fromCharCode(ev.which)
      var val = $(this).val()
      highlightSame(val)
      if (val.length > 1) {
        $(this).addClass('multi')
      } else {
        $(this).removeClass('multi')
      }
      if (val.indexOf(chr) != val.lastIndexOf(chr)){
        $(this).val(strReplaceAll(val, chr, ''))
      }
    })
    .change(function(ev){
      if ($(this).val().length == 1) removeNotes(this)
      if ($(this).hasClass('multi')) $(this).attr('value', $(this).val())
    })
    .blur(function(ev){
      var val = strReplaceAll($(this).val(), '[hjkl]', '')
      $(this).attr('value', val)
    })

  $('form > p > input[type="submit"]').click(function(ev){
    refreshStyles()
  })

  function move(el, direction) {
    var moves = getNearbyIds(el), val = $(el).val()
    moves.j = moves.down
    moves.k = moves.up
    moves.h = moves.left
    moves.l = moves.right
    $(this).blur()
    $('#'+moves[direction]).focus()
  }

  function getNearbyIds(el) {
    var id = $(el).attr('id')
    var upVal = id[2]=='0' ? '8' : parseInt(id[2])-1
    var dnVal = id[2]=='8' ? '0' : parseInt(id[2])+1
    var lfVal = id[1]=='0' ? '8' : parseInt(id[1])-1
    var rtVal = id[1]=='8' ? '0' : parseInt(id[1])+1
    return {
      up: id[0]+id[1]+upVal,
      down: id[0]+id[1]+dnVal,
      left: id[0]+lfVal+id[2],
      right: id[0]+rtVal+id[2]
    }
  }

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

  function getRelatedIds(el) {
    var tmp
    var id = $(el).attr('id')
    var blocks = {c0:[1,2],c1:[0,2],c2:[0,1],c3:[4,5],c4:[3,5],c5:[3,4],c6:[7,8],c7:[6,8],c8:[6,7]}
    var scopes = [0,1,2,3,4,5,6,7,8]
    var col = id.split('')[1]
    var row = id.split('')[2]
    var rowBlock = blocks['c'+row]
    var colBlock = blocks['c'+col]
    var val = $('#'+id).val()
    var cid = id.replace('f','c')
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
    ids.splice(ids.indexOf(cid), 1)
    return ids.map(function(s){ return '#'+s }).join(',')
  }

  function highlightRelated(el) {
    $('.related').removeClass('related')
    var ids = getRelatedIds(el)
    $(ids).addClass('related')
  }

  function refreshStyles() {
    $('td > input:not([readonly])').trigger('keyup')
  }

  function removeNotes(basedOnEl) {
    var ids = getRelatedIds(basedOnEl)
    var rep = $(basedOnEl).val()
    $(ids).children('.multi').each(function(i){
      var newVal = $(this).val().replace(rep, '')
      $(this).attr('value', newVal)
      if (newVal.length == 1) $(this).removeClass('multi').trigger('change')
    })
    highlightSame(rep)
  }

  function strReplaceAll(str, find, repl) {
    var reg = new RegExp(find, 'g')
    return str.replace(reg, repl)
  }

})
