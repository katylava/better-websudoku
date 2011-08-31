Better WebSudoku
================

Better WebSudoku is a Google Chrome extension to enhance the UI of WebSudoku.com.

Enhancements include:

  - Larger board and font
  - Highlight background of selected row, column, and block
  - Highlight value of cells matching value of current cell
  - Auto-clear notes
  - Highlight background of selected cell even if it's readonly
  - Move around with h-j-k-l (left, down, up, right)

.. image:: https://github.com/katylava/better-websudoku/raw/master/BetterWebSudoku-screenshot.png


Installation
------------

Click `here <https://github.com/downloads/katylava/better-websudoku/BetterWebSudoku.crx>`_
to install.  The font used is "Inconsolata", which you can download `here`__.

__ http://www.levien.com/type/myfonts/inconsolata.html


Stuff You Should Know
---------------------

If you click "Pause", "Print", or "Options" some of the cells
will lose their style when you return to the game.  You can click "How am I doing?"
to refresh.

This extension does not yet auto-update.

To Do
-----

Add Options Page
  Make styles configurable; Disable auto-clearing of notes

Alternate Keyboard Input
  Add option to map keys to digits so one could, for example,
  use a-l on the home row instead 1-9 to input values.

Add Information Bar
  Include information about how many times each digit is used.


Provide Update URL
  `Create auto-update manifest`__ and add update_url to manifest.json.

__ http://code.google.com/chrome/extensions/autoupdate.html









