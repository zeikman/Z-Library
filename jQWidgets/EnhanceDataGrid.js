// jsdoc theme - https://cancerberosgx.github.io/jsdoc-templates-demo/demo/
// minami JSDoc theme for LOKE - https://yarnpkg.com/package/loke-jsdoc-theme
// v2.1.0 - https://www.jsdelivr.com/package/npm/loke-jsdoc-theme

// NOTE: expand jQuery functions ========== ========== ========== ========== ========== ========== ========== ==========
// clear hidden input value
/*
 * Clear hidden input value
 *
 * @returns None
 *
 * @example
 * $('#form_id').clearHiddenFields();
 */
jQuery.fn.clearHiddenFields = function() {
  this.find('*').filter(':input[type=hidden]').each(function() { this.value = null; });

  // return this.each(() => {
  //   console.log(this);
  //   $("input[type='hidden']", this).each(() => this.value = '');
  // });
};

// TODO: need specified which jqxLib.js need to include
/** An enhanced version of jqxGrid with various useful functionalities. */
class EnhanceDataGrid {
  // NOTE: Static Methods ========== ========== ========== ========== ========== ========== ========== ==========
  static checkDuplicateIds() { // Warning Duplicate IDs
    var self = this;
    $('[id]').each(function(){
      var ids = $(`[id="${this.id}"]`);
      if (ids.length > 1 && ids[0] == this)
        console.warn(`Multiple IDs #${this.id}|Count@ ${ids.length}`);
    });
  }

  /**
   * Check input is null.
   *
   * @param {*}       input       - Input to be check.
   * @param {Boolean} [identical] - Enable strict equality comparison.
   *
   * @returns {Boolean} Returns True if input is null.
   *
   * @example
   * EnhanceDataGrid.isNull(null);          // true
   * EnhanceDataGrid.isNull('null');        // true
   * EnhanceDataGrid.isNull('null', true);  // false
   */
  static isNull(input, identical) {
    if (typeof identical === 'boolean' && identical)
      return input === null;
    else {
      if (typeof input === 'string')
        input = input.toLowerCase();

      if (input == null || input == 'null')
        return true;
      else
        return false;
    }
  } // end of isNull

  /**
   * Check input is undefined.
   *
   * @param {*}       input       - Input to be check.
   * @param {Boolean} [identical] - Enable strict equality comparison.
   *
   * @returns {Boolean} Returns True if input is undefined.
   *
   * @example
   * EnhanceDataGrid.isUndefined(undefined);          // true
   * EnhanceDataGrid.isUndefined('undefined');        // true
   * EnhanceDataGrid.isUndefined('undefined', true);  // false
   */
  static isUndefined(input, identical) {
    if (typeof identical === 'boolean' && identical)
      return input === undefined;
    else {
      if (typeof input === 'string')
        input = input.toLowerCase();

      if (input == undefined || input == 'undefined')
        return true;
      else
        return false;
    }
  } // end of isUndefined

  /**
   * Check input is an empty string.
   *
   * @param {*} input - Input to be check.
   *
   * @returns {Boolean} Returns True if input is an empty string.
   *
   * @example
   * EnhanceDataGrid.isEmptyString('');       // true
   * EnhanceDataGrid.isEmptyString('empty');  // false
   * EnhanceDataGrid.isEmptyString(null);     // false
   */
  static isEmptyString(input) {
    return input === '';
  } // end of isEmptyString

  /**
   * Check input is unset.
   *
   * @param {*}       input   - Input to be check.
   * @param {Boolean} [trim]  - True to trim input.
   *
   * @returns {Boolean} Returns True if input is unset.
   *
   * @example
   * EnhanceDataGrid.isUnset('');         // true
   * EnhanceDataGrid.isUnset(null);       // true
   * EnhanceDataGrid.isUnset(undefined);  // true
   * EnhanceDataGrid.isUnset('set');      // false
   * EnhanceDataGrid.isUnset(1);          // false
   */
  static isUnset(input, trim) {
    if (typeof trim === 'boolean' && trim && typeof input === 'string')
      input = input.trim();

    if (EnhanceDataGrid.isNull(input)
      || EnhanceDataGrid.isUndefined(input)
      || EnhanceDataGrid.isEmptyString(input)
    )
      return true;
    else
      return false;
  } // end of isUnset

  /**
   * Transform String to Object.
   *
   * @param {String} prmstr           - Parameters in String.
   * @param {String} [equalto='=']    - Equal-to character of { key-to-value } pairs.
   * @param {String} [combinator='&'] - Combinator of each { key-to-value } pairs.
   *
   * @returns {Object} - Parameters in Object form.
   *
   * @example
   * EnhanceDataGrid.transformStringToObject('parameter1=value1&parameter2=value2');
   * // Returns {parameter1: 'value1', parameter2: 'value2'}
   */
  static transformStringToObject(prmstr, equalto = '=', combinator = '&') {
    if (prmstr[0] === '?') prmstr = prmstr.slice(1);

    const params = {};
    const prmArr = prmstr.split(combinator);

    for (let i = 0; i < prmArr.length; i++) {
      const tmparr = prmArr[i].split(equalto);

      params[tmparr[0]] = window.decodeURIComponent(tmparr[1]);
    }

    return params;
  }

  /**
   * Transform Object to String.
   *
   * @param {Object} prmobj           - Parameters in Object.
   * @param {String} [equalto='=']    - Equal-to character of { key-to-value } pairs.
   * @param {String} [combinator='&'] - Combinator of each { key-to-value } pairs.
   *
   * @returns {String} - Parameters in String form.
   *
   * @example
   * EnhanceDataGrid.transformObjectToString({parameter1: 'value1', parameter2: 'value2'});
   * // Returns 'parameter1=value1&parameter2=value2'
   */
  static transformObjectToString(prmobj, equalto = '=', combinator = '&') {
    let transformString = '';

    $.each(prmobj, (key, value) => transformString += `${key}${equalto}${window.encodeURIComponent(value)}${combinator}`);

    return transformString.substring(0, transformString.length - 1);
  }

  /**
   * Get query string of an URL.
   *
   * @param {String} [url] - URL (Uniform Resource Locator) which the query string will be extracted.
   * If URL not provided, browser URL will be used instead.
   *
   * @returns {Object} - Query string of URL in Object form.
   *
   * @example
   * EnhanceDataGrid.getSearchParameters();
   */
  static getSearchParameters(url) {
    const prmstr = (typeof url === 'string' && url)
      ? url.split('?')[1]
      : window.location.search.slice(1);

    return prmstr !== null && prmstr !== '' ? EnhanceDataGrid.transformStringToObject(prmstr) : {};
  }

  /**
   * Append query string to an URL.
   *
   * @param {String} url    - URL (Uniform Resource Locator).
   * @param {Object} params - query string in Object form, { key:value } pairs.
   *
   * @returns {String} - URL with query string append.
   *
   * @example
   * EnhanceDataGrid.insertQueryString('url.php', {
   *   parameter1: 'value1',
   *   parameter2: 'value2'
   * });
   * // Returns 'url.php?parameter1=value1&parameter2=value2'
   *
   * EnhanceDataGrid.insertQueryString('url.php?origin=master', {
   *   parameter1: 'value1',
   *   parameter2: 'value2'
   * });
   * // Returns 'url.php?origin=master&parameter1=value1&parameter2=value2'
   */
  static insertQueryString(url, params) {
    if (url.indexOf('?') > -1) {
      const qs = EnhanceDataGrid.getSearchParameters(url);

      Object.assign(qs, params);
      params = qs;

      url = url.split('?')[0];
    }
    return url + '?' + EnhanceDataGrid.transformObjectToString(params);
  }

  /**
   * Debounce function.
   *
   * @param {Function}  fn    - Callback function.
   * @param {Number}    delay - Delay timing.
   *
   * @returns Debounce function.
   *
   * @example
   * const debounce = EnhanceDataGrid.debounce(() => { console.log('hello world') }, 1000);
   * debounce(); // Function runs for 1 second without it being called again, 'hello world' will be print out at console
   *
   * @see [Reference]{@link https://remysharp.com/2010/07/21/throttling-function-calls} - https://remysharp.com/2010/07/21/throttling-function-calls
   */
  static debounce(fn, delay) {
    let timer = null;

    return function() {
      const context = this;
      const args = arguments;

      window.clearTimeout(timer);

      timer = window.setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  /**
   * Throttle function.
   *
   * @param {Function}  fn    - Callback function.
   * @param {Number}    delay - Delay timing.
   * @param {}          scope - Function scope.
   *
   * @returns Throttle function.
   *
   * @example
   * const throttle = EnhanceDataGrid.throttle(function() { console.log('hello world'); }, 2000);
   * throttle(); // console will print out 'hello world' at most one times two seconds.
   *
   * @see [Reference]{@link https://remysharp.com/2010/07/21/throttling-function-calls} - https://remysharp.com/2010/07/21/throttling-function-calls
   */
  static throttle(fn, threshhold, scope) {
    threshhold = threshhold || (threshhold = 250);

    let last        = null;
    let deferTimer  = null;

    return function() {
      const context = scope || this;
      const now = + (new Date());
      const args = arguments;

      if (last && now < last + threshhold) {
        // hold on to it
        window.clearTimeout(deferTimer);

        deferTimer = window.setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  /**
   * Check whether is a valid keyboard input.
   *
   * @param {Object} keyDownEvent - Key event object.
   *
   * @returns {Boolean} Returns True if valid.
   *
   * @example
   * EnhanceDataGrid.isValidKeyboardInput(<keyDownEvent>('A' => 65)); // true
   * EnhanceDataGrid.isValidKeyboardInput(<keyDownEvent>('Enter' => 13)); // false
   */
  static isValidKeyboardInput(keyDownEvent) {
    const keys = {
      // summary:
      //    Definitions for common key values.
      //    Client code should test keyCode against these named constants, as the actual codes can vary by browser.
      BACKSPACE       : 8,
      TAB             : 9,
      CLEAR           : 12,
      ENTER           : 13,
      SHIFT           : 16,
      CTRL            : 17,
      ALT             : 18,
      // META: has('webkit') ? 91 : 224, // the apple key on macs
      PAUSE           : 19,
      CAPS_LOCK       : 20,
      ESCAPE          : 27,
      SPACE           : 32,
      PAGE_UP         : 33,
      PAGE_DOWN       : 34,
      END             : 35,
      HOME            : 36,
      LEFT_ARROW      : 37,
      UP_ARROW        : 38,
      RIGHT_ARROW     : 39,
      DOWN_ARROW      : 40,
      INSERT          : 45,
      DELETE          : 46,
      HELP            : 47,
      LEFT_WINDOW     : 91,
      RIGHT_WINDOW    : 92,
      SELECT          : 93,
      NUMPAD_0        : 96,
      NUMPAD_1        : 97,
      NUMPAD_2        : 98,
      NUMPAD_3        : 99,
      NUMPAD_4        : 100,
      NUMPAD_5        : 101,
      NUMPAD_6        : 102,
      NUMPAD_7        : 103,
      NUMPAD_8        : 104,
      NUMPAD_9        : 105,
      NUMPAD_MULTIPLY : 106,
      NUMPAD_PLUS     : 107,
      NUMPAD_ENTER    : 108,
      NUMPAD_MINUS    : 109,
      NUMPAD_PERIOD   : 110,
      NUMPAD_DIVIDE   : 111,
      F1              : 112,
      F2              : 113,
      F3              : 114,
      F4              : 115,
      F5              : 116,
      F6              : 117,
      F7              : 118,
      F8              : 119,
      F9              : 120,
      F10             : 121,
      F11             : 122,
      F12             : 123,
      F13             : 124,
      F14             : 125,
      F15             : 126,
      NUM_LOCK        : 144,
      SCROLL_LOCK     : 145,
      UP_DPAD         : 175,
      DOWN_DPAD       : 176,
      LEFT_DPAD       : 177,
      RIGHT_DPAD      : 178,
      // virtual key mapping
      // copyKey         : has("mac") && !has("air") ? (has("safari") ? 91 : 224 ) : 17
    };

    switch (keyDownEvent.keyCode) {
      // case keys.BACKSPACE:
      case keys.TAB:
      case keys.CLEAR:
      case keys.ENTER:
      case keys.SHIFT:
      case keys.CTRL:
      case keys.ALT:
      // case keys.META: // the CMD key on Macs
      case keys.PAUSE:
      case keys.CAPS_LOCK:
      case keys.ESCAPE:
      // case keys.SPACE:
      case keys.PAGE_UP:
      case keys.PAGE_DOWN:
      case keys.END:
      case keys.HOME:
      case keys.LEFT_ARROW:
      case keys.UP_ARROW:
      case keys.RIGHT_ARROW:
      case keys.DOWN_ARROW:
      case keys.INSERT:
      case keys.DELETE:
      case keys.HELP:
      case keys.LEFT_WINDOW:
      case keys.RIGHT_WINDOW:
      case keys.SELECT:
      // case keys.NUMPAD_0: case keys.NUMPAD_1: case keys.NUMPAD_2: case keys.NUMPAD_3: case keys.NUMPAD_4:
      // case keys.NUMPAD_5: case keys.NUMPAD_6: case keys.NUMPAD_7: case keys.NUMPAD_8: case keys.NUMPAD_9:
      case keys.NUMPAD_MULTIPLY:
      case keys.NUMPAD_PLUS:
      case keys.NUMPAD_ENTER:
      case keys.NUMPAD_MINUS:
      case keys.NUMPAD_PERIOD:
      case keys.NUMPAD_DIVIDE:
      case keys.F1: case keys.F2: case keys.F3: case keys.F4: case keys.F5:
      case keys.F6: case keys.F7: case keys.F8: case keys.F9: case keys.F10:
      case keys.F11: case keys.F12: case keys.F13: case keys.F14: case keys.F15:
      case keys.NUM_LOCK:
      case keys.SCROLL_LOCK:
      case keys.copyKey: return false;
      default: return true;
    }
  }

  // NOTE: Private Properties ========== ========== ========== ========== ========== ========== ========== ==========
  /** @private */
  #_syntax;

  /** @private */
  #_grid;

  /** @private */
  #_id;

  /** @private */
  #_zproplist = [
    'autoSearch',
    'bootstrap',
    'buttonTheme',
    'centeredColumns',
    'checkedDatafield',
    'custBar',
    'enterFilter',
    'enterSearch',
    'rowIndexWidth',
    'searchBar',
    'showAdvFilterButton',
    'showFilterButton',
    'showFindButton',
    'showRowIndex',
    'statusBar',
    'tbElement',
    'useBootstrap',
  ];

  /** @private */
  #_zprops = {};

  /** @private */
  #_props = {
    // same with jqxGrid properties
    theme               : '',
    width               : '100%',
    height              : '100%',
    sortable            : true,
    filterable          : true,
    filtermode          : 'excel',
    enabletooltips      : true,
    showaggregates      : true,
    showstatusbar       : true,
    // EnhanceDataGrid properties
    autoSearch          : false,
    bootstrap           : false,
    buttonTheme         : 'material',
    centeredColumns     : false,
    checkedDatafield    : 'selected',
    custBar             : false,
    enterFilter         : true,
    enterSearch         : false,
    rowIndexWidth       : 50,
    searchBar           : false,
    showAdvFilterButton : true,
    showFilterButton    : true,
    showFindButton      : false,
    showRowIndex        : true,
    statusBar           : false,
    tbElement           : [],
    useBootstrap        : false, // TODO: think about the controlling of this flag, use Bootstrap theme ? function ?
  };

  /** @private */
  #_dirty = {};

  /** @private */
  #_allDirty = {};

  /** @private */
  #_checkedItems = [];

  /** @private */
  #_dataSource;

  /** @private */
  #_dataAdapter;

  /** @private */
  #_clearSelection = false;

  /** @private */
  #_alert(opt) {
    const option_type = typeof opt;
    let jquery_confirm_options = {
      useBootstrap      : this.#_zprops.useBootstrap,
      animation         : 'zoom',
      closeAnimation    : 'zoom',
      animateFromElement: false,
      backgroundDismiss : true,
      escapeKey         : true,
    };

    if (option_type === 'string') {
      jquery_confirm_options = {
        ...jquery_confirm_options,
        ...{
          title: '',
          content: opt
        }
      };
    }

    if (option_type === 'object') {
      jquery_confirm_options = {
        ...jquery_confirm_options,
        ...opt
      };
    }

    if ($.alert)
      $.alert(jquery_confirm_options);
    else {
      if (option_type === 'string')
        window.alert(opt);

      if (option_type === 'object' && opt.content)
        window.alert(opt.content);
    }
  }

  /** @private */
  #_initJqxgrid(syntax) {
    this.#_syntax = syntax;

    this.#_extractZProps();
    this.#_processColumns();
    this.#_renderToolbar();

    const self          = this;
    const gridId        = this.#_id;
    const props         = this.#_props;
    const zProps        = this.#_zprops;
    const tbElement     = zProps.tbElement;
    const hasTbElement  = tbElement.length > 0;
    const showSearchBar = typeof zProps.searchBar === 'boolean' && zProps.searchBar;

    if (hasTbElement || showSearchBar) props.showtoolbar = true;

    $(gridId).on('bindingcomplete', event => {
      // NOTE: initialize checkeditems array, in case there are pre-selected items
      const rows              = $(self.#_id).jqxGrid('getrows');
      const checkedDatafield  = self.#_zprops.checkedDatafield;
      self.#_checkedItems     = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row[checkedDatafield] == 1)
          self.#_checkedItems.push(row.id);
      }

      if (self.#_clearSelection)
        self.clearSelection();

      self.#_clearSelection = false; // reset clear selection flag
    });

    if ($(gridId).length > 0) {
      if (syntax === 'old') {
        this.#_grid = $(gridId).jqxGrid(props);
        this.#_initDirtyFlagEvent();
      }

      // TODO: public methods not applicable to new syntax
      if (syntax === 'new') this.#_grid = new jqxGrid(gridId, props);
    } else {
      return console.error(`[EnhanceDataGrid] Error: DOM element '${gridId}' not found !`);
    }
  } // end of #_initJqxgrid

  /** @private */
  #_initDirtyFlagEvent() {
    const self = this;

    this.jqxGrid.on('cellvaluechanged', event => {
      const args = event.args;
      const rowindex = args.rowindex;
      const datafield = args.datafield;
      const oldvalue = args.oldvalue;
      const newvalue = args.newvalue;
      const data = self.getRowData(rowindex);

      // record ID selection changes
      if (datafield === self.#_zprops.checkedDatafield) {
        self.#_dirty[data.id] = newvalue;

        const itemindex = self.#_checkedItems.indexOf(data.id);

        if (newvalue) {
          if (itemindex == -1)
            self.#_checkedItems.push(data.id);
        } else {
          if (itemindex > -1)
            self.#_checkedItems.splice(itemindex, 1);
        }
      }

      // record any data changes
      // NOTE: this should be the correct way of dirty flag implementation
      if (self.#_allDirty[data.id])
        self.#_allDirty[data.id][datafield] = newvalue;
      else {
        const dirtyObject = new Object({});

        dirtyObject.rowindex = rowindex;
        dirtyObject[datafield] = newvalue;
        self.#_allDirty[data.id] = dirtyObject;
      }
    });
  } // end of #_initDirtyFlagEvent

  /** @private */
  #_clearDirtyFlag() {
    this.#_dirty    = {};
    this.#_allDirty = {};
  };

  /** @private */
  #_extractZProps() {
    const object = this.#_props;

    for (const prop in object) {
      if (Object.hasOwnProperty.call(object, prop)) {
        if (this.#_zproplist.indexOf(prop) > -1) {
          this.#_zprops[prop] = object[prop];
          delete this.#_props[prop];
        }
      }
    }
  } // end of #_extractZProps

  /** @private */
  #_processColumns() {
    if (this.#_zprops.centeredColumns === true) {
      this.#_props.columns.forEach(c => {
        if (!c.hidden && !c.align)
          c.align = 'center';
      });
    }

    this.#_displayRowIndex();
  } // end of #_processColumns

  /** @private */
  #_displayRowIndex() {
    if (this.#_zprops.showRowIndex) {
      this.#_props.columns.unshift({
        text          : 'No',
        datafield     : 'numb',
        columntype    : 'number',
        align         : 'center',
        cellsalign    : 'center',
        pinned        : true,
        menu          : false,
        sortable      : false,
        editable      : false,
        groupable     : false,
        resizable     : false,
        draggable     : false,
        filterable    : false,
        aggregates    : ['count'],
        width         : this.#_zprops.rowIndexWidth,
        cellsrenderer: (rowindex, columnField, value, defaultHTML, columnProperties, rowdata) => {
          let index = ++value;
          rowdata.numb = index;

          // NOTE:  handle groupable index render
          if (rowdata.parentItem) {
            index = rowdata.parentItem.subItems.findIndex(x => x['uid'] == rowdata.uid);
            rowdata.numb = ++index;
          }

          return $(defaultHTML).text(index).get(0).outerHTML;
        },
        aggregatesrenderer: aggregates => {
          let renderstring = aggregates.count;

          if (!renderstring) renderstring = 0;

          return `<div style="display: flex; align-items: center; justify-content: center; height: 100%;">${renderstring}</div>`;
        }
      });
    }
  } // end of #_displayRowIndex

  /** @private */
  #_renderToolbar() {
    const self = this;
    const gridId = this.#_id;
    const setId = gridId.slice(1);
    const props = this.#_props;
    const zProps = this.#_zprops;

    props.rendertoolbar = toolbar => {
      const container =
        $('<div />')
          .addClass('edg-group')
          .css({ height: '100%', padding: '0px 5px' });

      toolbar.append(container);

      // NOTE: display search bar if set
      if (typeof zProps.searchBar === 'boolean' && zProps.searchBar) {

        // add search input
        let searchInputProp = {
          width: 200,
          height: 25,
        };
        let searchInputCSS = {
          margin: '0px 5px 0px 3px',
          padding: '0px 3px',
          minWidth: 200
        };

        if ((typeof zProps.showFindButton === 'boolean' && zProps.showFindButton)
          || (typeof zProps.showFilterButton === 'boolean' && zProps.showFilterButton)
          || (typeof zProps.showAdvFilterButton === 'boolean' && zProps.showAdvFilterButton)
        ) {
          searchInputCSS.margin = '0px 5px 0px 0px';
        }

        if (typeof zProps.enterFilter === 'boolean' && zProps.enterFilter) searchInputProp.placeHolder = 'Search: Press Enter to filter';

        const searchInput =
          $(`<input id="${setId}_searchInput" type="text" />`)
            .jqxInput(searchInputProp)
            .css(searchInputCSS);

        container.append(searchInput);

        // NOTE: auto search feature
        if ((typeof zProps.autoSearch === 'boolean' && zProps.autoSearch)) {
          // searchInput
          //   .attr('placeholder', 'Auto searching')
          //   .keyup(EnhanceDataGrid.debounce(event => {
          //     if (this.value.trim() || EnhanceDataGrid.isValidKeyboardInput(event)) {
          //       event.preventDefault();
          //       self.#_filterData($(event.target), true);
          //     }
          //   }, 500));
        }

        // NOTE: enter to search feature
        if ((typeof zProps.enterSearch === 'boolean' && zProps.enterSearch)) {
          // searchInput
          //   .attr('placeholder', 'Press Enter to find')
          //   .keydown(event => {
          //     if (event.which === 13) { // NOTE: Enter keyCode
          //       event.preventDefault();
          //       self.#_highlight(searchInput);
          //     }
          //   });
        }

        // NOTE: enter to filter feature
        if ((typeof zProps.enterFilter === 'boolean' && zProps.enterFilter)) {
          searchInput
            .keydown(event => {
              if (event.which === 13) { // NOTE: Enter keyCode
                self.#_filterData($(event.target));
              }

              if (event.which === 27) { // NOTE: ESC keyCode
                clrFilterButton.trigger('click');
              }
            });
        }

        // NOTE: show/hide 'Find' button
        if (typeof zProps.showFindButton === 'boolean' && zProps.showFindButton) {
          // var findButton = $('<button>');

          // $('<i>').addClass('fas fa-search').css({ color: '#d63979' }).appendTo(findButton);

          // // $('<span>').css({ marginLeft: 5 }).text('Find').appendTo(findButton); // CHANGE: hide find text
          // findButton
          //   .jqxButton({ theme: this.theme, width: 25, height: 25 })
          //   .on('click', event => {
          //     event.preventDefault();

          //     self.#_highlight(searchInput);
          //   });

          // container.append(findButton);
        }

        let buttonCSS = {
          // theme: props.theme,
          // theme: 'material-purple',
          theme: zProps.buttonTheme,
          height: 25
        };

        // NOTE: show/hide 'Filter' button
        const filterButton =
          $('<button>')
            .attr('title', 'Filter');

        if (typeof zProps.showFilterButton === 'boolean' && zProps.showFilterButton) {
          $('<i>')
            .addClass('fa-solid fa-fw fa-filter')
            .appendTo(filterButton);

          // $('<span>').css({ marginLeft: 5 }).text('Filter').appendTo(filterButton); // CHANGE: hide filter text
          filterButton
            .jqxButton(buttonCSS)
            .on('click', event => {
              event.preventDefault();

              if (self.#_filterData(searchInput)) {
                // NOTE: can provide after filtered callback
              }
            });

          container.append(filterButton);
        }

        // NOTE: 'Clear Filter' button
        const clrFilterButton =
          $('<button>')
            .attr('title', 'Clear Filter');

        $('<i>')
          .attr('id', `${setId}_advancedFilterClear`)
          .addClass('fa-solid fa-fw fa-xmark')
          .appendTo(clrFilterButton);

        clrFilterButton
          .jqxButton(buttonCSS)
          .on('click', event => {
            event.preventDefault();

            $(gridId).jqxGrid('clearfilters');

            // TODO:: think about operation between single column filer and advanced filter
            // if (!$(gridId).jqxGrid('showfilterrow'))
              searchInput.val(null);
          });

        container.append(clrFilterButton);

        // NOTE: show/hide 'Advanced Filter' button
        if (typeof zProps.showAdvFilterButton === 'boolean' && zProps.showAdvFilterButton) {
          const advFilterButton =
            $('<button>')
              .attr({
                id: `${setId}_advancedFilterBtn`,
                title: 'Show Advanced Filter'
              });

          if (typeof props.showfilterrow === 'boolean' && props.showfilterrow) {
            $('<i>')
              .attr('id', `${setId}_advancedFilterArrowDown`)
              .addClass('fa-solid fa-fw fa-chevron-down')
              .hide()
              .appendTo(advFilterButton);

            $('<i>')
              .attr('id', `${setId}_advancedFilterArrowUp`)
              .addClass('fa-solid fa-fw fa-chevron-up')
              .appendTo(advFilterButton);
          } else {
            $('<i>')
              .attr('id', `${setId}_advancedFilterArrowDown`)
              .addClass('fa-solid fa-fw fa-chevron-down')
              .appendTo(advFilterButton);

            $('<i>')
              .attr('id', `${setId}_advancedFilterArrowUp`)
              .addClass('fa-solid fa-fw fa-chevron-up')
              .hide()
              .appendTo(advFilterButton);
          }

          // $('<span>').css({ marginLeft: 5 }).text('Filter').appendTo(advFilterButton);
          advFilterButton
            .jqxButton(buttonCSS)
            .on('click', event => {
              event.preventDefault();

              $(`${gridId}_advancedFilterBtn`)
                .attr('title', $(gridId).jqxGrid('showfilterrow') ? 'Show Advanced Filter' : 'Hide Advanced Filter');

              $(gridId).jqxGrid({ showfilterrow: $(gridId).jqxGrid('showfilterrow') ? false : true });

              // NOTE: enable clear filter button & toggle arrow icon {down/up}
              $(gridId).jqxGrid('clearfilters');

              if ($(gridId).jqxGrid('showfilterrow')) {
                $(`${gridId}_advancedFilterArrowDown`).hide();
                $(`${gridId}_advancedFilterArrowUp`).show();
              } else {
                $(`${gridId}_advancedFilterArrowDown`).show();
                $(`${gridId}_advancedFilterArrowUp`).hide();
              }
            });

          container.append(advFilterButton);
        }

        // NOTE: Append field divider
        const tbElement = zProps.tbElement;

        if (parseInt(tbElement.length) > 0
          && tbElement[0].button
          && tbElement[0].button != 'divider'
        ) {
          $('<div>')
            .css({ width: 4, height: 20, minWidth: 1, background: '#555555', borderRadius: 5 })
            .appendTo(container);
        }
      }

      // NOTE: Append toolbar element
      self.#_appendToolbarElement(container);
    };
  } // end of #_renderToolbar

  /** @private */
  #_appendToolbarElement(container) {
    const self = this;
    const props = this.#_props;
    const zProps = this.#_zprops;
    const tbElement = zProps.tbElement;

    const buttonDefault = {
      reload: {
        icon      : 'fa-solid fa-fw fa-sync-alt',
        // iconColor : '#00af00',
        // text      : 'Reload',
        title     : 'Reload Record',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      add: {
        icon      : 'fa-solid fa-fw fa-plus',
        // iconColor : '#34b7e2',
        // text      : 'Add',
        title     : 'Add New',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      edit: {
        icon      : 'fa-solid fa-fw fa-edit',
        // iconColor : '#e89412',
        // text      : 'Edit',
        title     : 'Edit',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      delete: {
        icon      : 'fa-solid fa-fw fa-trash-alt',
        // iconColor : '#ff0000',
        // text      : 'Delete',
        title     : 'Delete',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      find: {
        icon      : 'fa-solid fa-fw fa-search',
        // iconColor : '',
        // text      : 'Find',
        title     : 'Find',
        width     : 60,
        height    : 25,
        widget    : 'jqxButton',
      },
      view: {
        icon      : 'fa-solid fa-fw fa-eye',
        // iconColor : '',
        // text      : 'View',
        title     : 'View',
        width     : 60,
        height    : 25,
        widget    : 'jqxButton',
      },
      save: {
        icon      : 'fa-solid fa-fw fa-save',
        // iconColor : '',
        // text      : 'Save',
        title     : 'Save',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      print: {
        icon      : 'fa-solid fa-fw fa-print',
        // iconColor : '#0f35fb',
        // text      : 'Print',
        title     : 'Print',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      excel: {
        icon      : 'fa-solid fa-fw fa-file-excel',
        // iconColor : '#6ba939',
        // text      : 'Excel',
        title     : 'Export Excel',
        width     : 25,
        height    : 25,
        widget    : 'jqxButton',
      },
      csv: {
        icon      : 'fa-solid fa-fw fa-file-alt',
        // iconColor : '',
        // text      : 'CSV',
        title     : 'Export CSV',
        width     : 64,
        height    : 25,
        widget    : 'jqxButton',
      },
      active: {
        icon      : 'fa-regular fa-fw fa-bell',
        // iconColor : '#00af00',
        // text      : 'Active',
        title     : 'Active',
        width     : 70,
        height    : 25,
        widget    : 'jqxButton',
      },
      inactive: {
        icon      : 'fa-regular fa-fw fa-bell-slash',
        // iconColor : '#ff0000',
        // text      : 'Inactive',
        title     : 'Inactive',
        width     : 85,
        height    : 25,
        widget    : 'jqxButton',
      },
      custombutton: {
        icon      : 'fa-solid fa-fw fa-circle-question',
        // iconColor : '#000000',
        // text      : 'Button',
        title     : 'Button',
        width     : 'auto',
        height    : 25,
        widget    : 'jqxButton',
      },
    };

    const controlledMessage = {
      no_row_selected : 'Please select one of the record first.',
      no_data_id      : 'No data ID found !',
      no_row_print    : 'No record for printing.',
    };

    const buttonEvent = {
      click: {
        _add: function(event) {
          event.preventDefault();

          $(this).keydown();

          const button_id =
            event.currentTarget.id.indexOf('#') == -1
              ? '#' + event.currentTarget.id
              : event.currentTarget.id;

          const check_function = self.#_getGridButtonProps(tbElement, button_id, 'check');
          const proceed =
            typeof check_function === 'function'
              ? check_function()
              : true;

          // user-defined checking function, returns True|False
          if (proceed) {
            const win   = self.#_getGridButtonProps(tbElement, button_id, 'win');
            const modal = self.#_getGridButtonProps(tbElement, button_id, 'modal');
            const form  = self.#_getGridButtonProps(tbElement, button_id, 'form');

            if (form)
              _clearFormInputs(form);

            if (win) {
              _openJqxWindow({
                id: button_id, // current button ID
                element: this, // current target button
              });
            }

            if (modal)
              _openModal(modal/* , { timeout: 2000 } */);
          }

          $(this).keyup();
        },
        _edit: function(event) {
          event.preventDefault();

          const selectedRowIndex = self.getSelectedRowIndex();

          if (selectedRowIndex > -1) {
            $(this).keydown();

            const button_id =
              event.currentTarget.id.indexOf('#') == -1
                ? '#' + event.currentTarget.id
                : event.currentTarget.id;

            const check_function = self.#_getGridButtonProps(tbElement, button_id, 'check');
            const proceed =
              typeof check_function === 'function'
                ? check_function()
                : true;

            // user-defined checking function, returns True|False
            if (proceed) {
              const win   = self.#_getGridButtonProps(tbElement, button_id, 'win');
              const modal = self.#_getGridButtonProps(tbElement, button_id, 'modal');

              if (win) {
                _openJqxWindow({
                  id: button_id, // current button ID
                  element: this, // current target button
                });
              }

              if (modal)
                _openModal(modal/* , { timeout: 2000 } */);

              console.log(self.getSelectedRowData());
            }

            $(this).keyup();
          } else {
            _promptError({ error: controlledMessage.no_row_selected });
          }
        },
        _delete: function(event) {
          event.preventDefault();

          const selectedRowIndex = self.getSelectedRowIndex();

          if (selectedRowIndex > -1) {
            $(this).keydown();

            // NOTE: perform default operation
            const button_id =
              event.currentTarget.id.indexOf('#') == -1
                ? '#' + event.currentTarget.id
                : event.currentTarget.id;

            const check_function = self.#_getGridButtonProps(tbElement, button_id, 'check');
            const proceed =
              typeof check_function === 'function'
                ? check_function()
                : true;

            // user-defined checking function, returns True|False
            if (proceed) {
              const data      = self.getSelectedRowData();
              const data_id   = data.id;
              const _params   = self.#_getGridButtonProps(tbElement, button_id, 'param');
              const _success  = self.#_getGridButtonProps(tbElement, button_id, 'success');
              const _fail     = self.#_getGridButtonProps(tbElement, button_id, 'fail');
              let _url        = self.#_getGridButtonProps(tbElement, button_id, 'url');
              let _title      = self.#_getGridButtonProps(tbElement, button_id, 'title');
              let _message    = self.#_getGridButtonProps(tbElement, button_id, 'message');

              _title = (typeof _title === 'undefined' || _title === '') ? 'Delete Record' : _title;
              _message = (typeof _message === 'undefined' || _message === '') ? 'Are you sure to delete selected record ?' : _message;

              $.confirm({
                useBootstrap      : zProps.useBootstrap,
                columnClass       : 'medium',
                animation         : 'zoom',
                closeAnimation    : 'zoom',
                animateFromElement: false,
                backgroundDismiss : true,
                escapeKey         : true,
                title: _title,
                content: _message,
                buttons: {
                  confirm: {
                    btnClass: 'btn-danger',
                    action: () => {
                      if (typeof _url === 'undefined' || _url === undefined || typeof _url === 'null' || _url === null)
                        return true;

                      // NOTE: user-defined operation
                      if (typeof _url === 'function') {
                        if (data_id)
                          _url(data, data_id);
                        else
                          _url(data);
                      }

                      // NOTE: default delete operation, expected url is {String}
                      if (typeof _url === 'string') {
                        if (data_id) {
                          // insert data ID
                          const _post = { id: data_id };
                          _url = EnhanceDataGrid.insertQueryString(_url, _post);

                          // combine extra parameters
                          if (_params && typeof _params === 'object')
                            _url = EnhanceDataGrid.insertQueryString(_url, _params);

                          if (_params && typeof _params === 'function')
                            _url = EnhanceDataGrid.insertQueryString(_url, _params());

                          console.log(`$.post() to ${_url}`);
                          return true;

                          $.post(_url, _post)
                            .done(resp => {
                              if (_success && typeof _success === 'function')
                                _success(resp);
                              else
                                self.refresh();
                            })
                            .fail(resp => {
                              if (_fail && typeof _fail === 'function')
                                _fail(resp);
                              else {
                                self.#_alert({ title: 'Delete Failed', content: resp, });
                              }
                            });
                            // .always(resp => {
                            //   alert("finished");
                            // });
                        } else {
                          self.#_alert({ title: '', content: controlledMessage.no_data_id, });

                          return false;
                        }
                      }
                    }
                  },
                  cancel: () => {},
                  // somethingElse: {
                  //   text: 'Something else',
                  //   btnClass: 'btn-blue',
                  //   keys: ['enter', 'shift'],
                  //   action: () => {
                  //     $.alert('Something else?');
                  //   }
                  // }
                }
              });
            }

            $(this).keyup();
          } else {
            _promptError({ error: controlledMessage.no_row_selected });
          }
        },
        _find: function(event) {
          event.preventDefault();

          $(this).keydown();
          console.log('_find');
          $(this).keyup();
        },
        _reload: function(event) {
          event.preventDefault();

          $(this).keydown();

          self.refresh();

          $(this).keyup();
        },
        _view: function(event) {
          event.preventDefault();

          $(this).keydown();
          console.log('_view');
          $(this).keyup();
        },
        _save: function(event) {
          event.preventDefault();

          $(this).keydown();
          console.log('_save');
          $(this).keyup();
        },
        _print: function(event) {
          event.preventDefault();

          if (self.getRows().length > 0) {
            const button_id =
              event.currentTarget.id.indexOf('#') == -1
                ? '#' + event.currentTarget.id
                : event.currentTarget.id;

            $(this).keydown();

            console.log('_print');

            $(this).keyup();
          } else {
            _promptError({ error: controlledMessage.no_row_print });
          }
        },
        _excel: function(event) {
          event.preventDefault();

          $(this).keydown();

          console.log('_excel');
          // TODO: dev export Excel
          // self.jqxGrid.jqxGrid('exportdata', 'xlsx', 'jqxGrid');

          $(this).keyup();
        },
        _csv: function(event) {
          event.preventDefault();

          $(this).keydown();
          console.log('_csv');
          $(this).keyup();
        },
        _active: function(event) {
          event.preventDefault();

          $(this).keydown();
          console.log('_active');
          $(this).keyup();
        },
        _inactive: function(event) {
          event.preventDefault();

          $(this).keydown();
          console.log('_inactive');
          $(this).keyup();
        },
      }
    };

    function _getElement(opt) {
      if (typeof opt.id === 'string')
        return $(opt.id);

      if (typeof opt.id === 'object')
        return opt.id;

      return null;
    }

    // Form related functions
    function _clearFormInputs(form) {
      if ($(form).length > 0) {
        // TODO: debug for reset form input
        let debug = false;
        debug = true;

        if (debug)
          console.log(EnhanceDataGrid.transformStringToObject($(form).serialize()));

        // NOTE: clear jqxIput value
        if ($(form + ' .jqx-input').length > 0)
          $(form + ' .jqx-input').val(null);

        // NOTE: clear jqxDateTimeInput value
        if ($(form + ' .jqx-datetimeinput').length > 0)
          $(form + ' .jqx-datetimeinput').val(null);

        // NOTE: clear jqxCheckBox value
        if ($(form + ' .jqx-checkbox').length > 0)
          $(form + ' .jqx-checkbox').jqxCheckBox('uncheck');

        // NOTE: clear jqxRadioButton value
        if ($(form + ' .jqx-radiobutton').length > 0)
          $(form + ' .jqx-radiobutton').jqxRadioButton('uncheck');

        // NOTE: clear jqxComboBox value
        if ($(form + ' .jqx-combobox').length > 0)
          $(form + ' .jqx-combobox').jqxComboBox('clearSelection');

        // clear <input />
        $(form).find('*').filter(':input').each(function() { this.value = null; });

        // clear <input[type=checkbox] />
        $(form).find('input[type=checkbox]').prop('checked', false);

        // clear <input[type=radio] />
        $(form).find('input[type=radio]').prop('checked', false);

        // clear <select />
        $(form).find('select').prop('selectedIndex', -1);

        // NOTE: clear hidden input input[type=hidden]
        $(form).clearHiddenFields();

        if (debug)
          console.log(EnhanceDataGrid.transformStringToObject($(form).serialize()));

        return true;
      } else {
        self.#_alert({
          title: 'Form Not Found',
          content: `Form ID: <b>${form}</b>`
        });
      }
    }

    // Modal related functions
    function _switchModalContent(currentTarget) {
      const currentElement = $(currentTarget);
      const parentElement = currentElement.parent();

      parentElement.children().hide();
      currentElement.show();
    }

    function _openModal(id, opt/* optional */) {
      const modal = _getElement({ id: id });

      if (opt) {
        if (typeof opt.timeout === 'number')
          setTimeout(() => modal.modal('hide'), opt.timeout);

        if (typeof opt.showContent === 'string') {
          _switchModalContent(opt.showContent);

          $(opt.showContent).scrollTop(0);
        }
      }

      modal.modal('show');
    }

    function _promptError(opt) {
      if (zProps.useBootstrap)
        _createModalError.call(self, 'No Record Selected', opt.error);
      else
        self.#_alert(opt.error);
    }

    function _createModalError(modalTitle, modalBody) {
      if (typeof bootstrap === 'object') {
        const modal_error_id = `${this.#_id}_edit_modal_error`;
        const modal_error = `<div id="${modal_error_id.slice(1)}" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content text-bg-danger">
              <div class="modal-header">
                <h5 class="modal-modalTitle">${modalTitle}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p class="m-0">${modalBody}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>`;

        if ($(modal_error_id).length === 0) {
          $('body').append($(modal_error));

          const myModal = $(modal_error_id);
          const options = {};
          const myModalAlternative = new bootstrap.Modal(modal_error_id, options);

          myModal.on('hidden.bs.modal', e => {
            myModalAlternative.dispose();
            myModal.remove();
          });

          myModalAlternative.show();
        }
      } else {
        self.#_alert(
          $.alert
            ? {
              title: modalTitle,
              content: modalBody
            }
            : modalBody
        );
      }
    }

    // jqxWindow related functions
    function _openJqxWindow(opt) {
      const button_id     = opt.id;
      const el            = opt.element;
      const win           = self.#_getGridButtonProps(tbElement, button_id, 'win');
      const verticalAlign = self.#_getGridButtonProps(tbElement, button_id, 'verticalAlign');
      let winOpenOnButton = self.#_getGridButtonProps(tbElement, button_id, 'winOpenOnButton');
      let winOpenOnClick  = self.#_getGridButtonProps(tbElement, button_id, 'winOpenOnClick');

      if (typeof winOpenOnButton !== 'boolean' || EnhanceDataGrid.isUnset(winOpenOnButton))
        winOpenOnButton = true;

      if (typeof winOpenOnClick !== 'boolean' || EnhanceDataGrid.isUnset(winOpenOnClick))
        winOpenOnClick = true;

      if ($(win).length > 0) {
        _positioningJqxWindow({
          ...opt,
          ...{
            win     : win,
            vAlign  : verticalAlign,
            winOnBtn: winOpenOnButton,
            openWin : winOpenOnClick,
          }
        });

        // NOTE: auto open window when button click
        if (typeof winOpenOnClick === 'boolean' && winOpenOnClick)
          $(win).jqxWindow('open');
      } else {
        self.#_alert({
          title: 'jqxWindow Widget Not Found',
          content: `Button ID: <b>${el.id}</b><br />jqxWindow ID: <b>${win}</b>`
        });
      }
    }

    function _positioningJqxWindow(opt) {
      const win = opt.win;
      const el = opt.element;
      const verticalAlign = opt.vAlign;
      const winOpenOnButton = opt.winOnBtn;

      // always reset to center
      $(win).jqxWindow({ position: 'center' });

      if (typeof verticalAlign === 'number') {
        const response = new $.jqx.response();
        const viewPort = response.viewPort;

        $(win)
          .jqxWindow({
            position: {
              x: (viewPort.width - $(win).width()) / 2,
              y: verticalAlign
            }
          });
      }

      if (typeof winOpenOnButton === 'boolean' && winOpenOnButton) {
        const position = $(el).offset();

        $(win)
          .jqxWindow({
            position: {
              x: position.left,
              y: position.top
            }
          });
      }
    }

    // To show / hide button
    const flexExpander = $('<div class="flex-expander" style="position: relative; min-width: 20px;" />');
    const separator = $('<div>')
      .css({
        minWidth: 4,
        width: 4,
        height: 20,
        background: '#555555',
        borderRadius: 5
      });

    const widthChangeFunc = event => {
      if ($(this).width() === 20) {
        console.log('change layout');
      } else {
        console.log($(this).width());
      }
    };

    for (let i = 0; i < tbElement.length; i++) {
      const btn = tbElement[i].button.toLowerCase();

      // NOTE: generate button structure
      let showElement = true;
      const isBoolean = typeof tbElement[i].visible === 'boolean';
      const isNumber = typeof tbElement[i].visible === 'number' && tbElement[i].visible === 0;
      const isString = typeof tbElement[i].visible === 'string' && (tbElement[i].visible === '0' || tbElement[i].visible === '');

      if (isBoolean
        || isNumber
        || isString
      ) {
        showElement = false;
      }

      if (showElement) {
        if (btn === 'divider') {
          container.append(flexExpander.clone());

          // TODO: change extra button to option listing
          // $('#setFlexExpander').on('widthChanged', widthChangeFunc);
        } else if (btn === 'separator') {
          container.append(separator.clone());
        } else if (btn === 'custom') {
          if (tbElement[i].admin === true || tbElement[i].admin === 1 || tbElement[i].admin === '1') {
            container.append(tbElement[i].buttonNode.addClass('btn-admin'));
          } else {
            container.append(tbElement[i].buttonNode);
          }

          if (tbElement[i].callback && typeof tbElement[i].callback === 'function') tbElement[i].callback();
        } else if (btn === 'icon') {
          // NOTE: To be develop
          // var action = tbElement[i].action.toLowerCase();
          //
          // var genBtn = _genIconSyntax({
          //   // id: tbElement[i].id ? tbElement[i].id : null,
          //   disabled: typeof tbElement[i].disabled === 'boolean' ? tbElement[i].disabled : false,
          //   ic: tbElement[i].icon ? tbElement[i].icon : btnDefault.icon[action],
          //   iconColor: tbElement[i].iconColor ? tbElement[i].iconColor : btnDefault.iconColor[action]
          // });
          //
          // // NOTE: draw toolbar button
          // self.#_initGridButton({
          //   container: container,
          //   btn: genBtn,
          //   width: tbElement[i].width ? tbElement[i].width : btnDefault.width[btn],
          //   height: tbElement[i].height ? tbElement[i].height : btnDefault.height[btn],
          //   type: 'faIcon',
          //   disabled: tbElement[i].disabled
          // });
        } else {
          const generatedButton = this.#_generateButtonSyntax({
            id        : tbElement[i].id ? tbElement[i].id : null,
            disabled  : typeof tbElement[i].disabled === 'boolean' ? tbElement[i].disabled : false,
            icon      : tbElement[i].icon ? tbElement[i].icon : buttonDefault[btn].icon,
            iconColor : tbElement[i].iconColor ? tbElement[i].iconColor : buttonDefault[btn].iconColor,
            text      : (tbElement[i].text || tbElement[i].text === '') ? tbElement[i].text : '', // buttonDefault[btn].text,
            title     : (tbElement[i].title || tbElement[i].title === '') ? tbElement[i].title : buttonDefault[btn].title,
          });

          if (tbElement[i].admin === true || tbElement[i].admin === 1 || tbElement[i].admin === '1') {
            generatedButton.addClass('btn-admin');
          }

          // NOTE: Register EventListener
          let funcName = '_' + btn;

          // if (tbElement[i].form) funcName += 'Form'; // combine 'normal' and 'form' are same now

          generatedButton
            .on('click',
              tbElement[i].click
                ? e => tbElement[i].click(e, self.getSelectedRowData())
                : buttonEvent.click[funcName]
            );

          if (tbElement[i].beforeClick)
            generatedButton.keydown(tbElement[i].beforeClick);

          if (tbElement[i].afterClick)
            generatedButton.keyup(tbElement[i].afterClick);

          // NOTE: draw toolbar button
          tbElement[i] = this.#_initGridButton({
            container : container,
            btn       : generatedButton,
            theme     : tbElement[i].theme  ? tbElement[i].theme  : this.#_zprops.buttonTheme,
            width     : tbElement[i].width  ? tbElement[i].width  : (tbElement[i].text || tbElement[i].text === '') ? 'auto' : buttonDefault[btn].width,
            height    : tbElement[i].height ? tbElement[i].height : buttonDefault[btn].height,
            widget    : tbElement[i].widget ? tbElement[i].widget : buttonDefault[btn].widget,
            disabled  : tbElement[i].disabled,
            btnElement: tbElement[i],
          });
          // console.log(tbElement[i]);
        }
      }
    } // EOF for loop
  } // end of #_appendToolbarElement

  /** @private */
  #_generateButtonSyntax(opt) {
    const id          = opt.id;
    const disabled    = opt.disabled;
    const icon        = opt.icon;
    const iconColor   = opt.iconColor;
    const text        = opt.text;
    const title       = opt.title;
    const buttonType  = opt.widget;
    const iconButton  = $('<button>');

    if (id) iconButton.attr('id', id);

    if (title) iconButton.attr('title', title);

    if (icon != 'none') {
      const fontAwesome = $('<i>');

      if (iconColor) fontAwesome.css('color', iconColor);
      // .css({ color: iconColor, margin: '1px 2px 0' })

      fontAwesome.addClass(`${icon}`);

      fontAwesome.appendTo(iconButton);
    }

    if (text) {
      // const iconText = $('<span>').text(text).appendTo(iconButton);
      const iconText = $('<span>').html(text).appendTo(iconButton); // enhance on 27 oct 2022

      if (icon === 'none') { iconText.css('margin', 0); }
    }

    return iconButton;
  } // end of #_generateButtonSyntax

  /** @private */
  #_initGridButton(opt) {
    const container     = opt.container;
    const button        = opt.btn;
    const buttonWidth   = opt.width;
    const buttonHeight  = opt.height;
    const buttonType    = opt.widget;
    const theme         = opt.theme;
    const disabled      = opt.disabled;
    let buttonElement   = opt.btnElement;

    const buttonProperties = {
      theme   : theme,
      // width   : buttonWidth,
      height  : buttonHeight,
      disabled: typeof disabled === 'boolean' ? disabled : false
    };

    const setupElementId = (btn, element) => {
      if (btn.attr('id').indexOf('#') === -1)
        element.id = '#' + btn.attr('id');
      else
        element.id = btn.attr('id');

      return element;
    }

    if (buttonType) {
      if (buttonType === 'jqxToggleButton')
        button.jqxToggleButton(buttonProperties);

      if (buttonType === 'jqxButton')
        button.jqxButton(buttonProperties);

      if (buttonType === 'jqxDropDownList')
        button.jqxDropDownList(buttonProperties);

      // if (buttonType === 'faIcon')

      buttonElement = setupElementId(button, buttonElement);
    } else {
      console.error('Error: libGrid.#_initGridButton()', 'Unknown button type !<br />Plese check your coding.');
    }

    container.append(button);

    return buttonElement;
  } // end of #_initGridButton

  /** @private */
  #_getGridButtonProps = (json, key, type) => {
    let obj = '';
    key = key.toLowerCase();

    $.each(json, (index, v) => {
      if (v.id) {
        const result = v.id.toLowerCase() === key;

        if (result) {
          switch (type) {
            case 'title'          : obj = v.title; break;
            case 'form'           : obj = v.hasOwnProperty(type) ? v.form : ''; break;
            case 'url'            : obj = v.url; break;
            case 'element'        : obj = v.element; break;
            case 'debug'          : obj = v.debug; break;
            case 'message'        : obj = v.message; break;
            case 'filename'       : obj = v.filename; break;
            case 'modal'          : obj = v.modal; break;
            case 'window'         : obj = v.window; break;
            case 'win'            : obj = v.win; break;
            case 'winOpenOnButton': obj = v.winOpenOnButton; break;
            case 'winOpenOnClick' : obj = v.winOpenOnClick; break;
            case 'verticalAlign'  : obj = v.verticalAlign; break;
            case 'admin'          : obj = v.admin; break;
            case 'visible'        : obj = v.visible; break;
            case 'param'          : obj = v.param; break;
            case 'keyword'        : obj = v.keyword; break;
            case 'column'         : obj = v.column; break;
            case 'columnprefix'   : obj = v.columnprefix; break;
            case 'click'          : obj = v.click; break;
            case 'beforeClick'    : obj = v.beforeClick; break;
            case 'afterClick'     : obj = v.afterClick; break;
            case 'check'          : obj = v.check; break;
            case 'success'        : obj = v.success; break;
            case 'fail'           : obj = v.fail; break;
            case 'error'          : obj = v.error; break;
            default: break;
          }
          return false;
        }
      }
    });

    return obj;
  }

  /** @private */
  #_filterData(searchInput, clearInput = false) {
    // NOTE: Filter search
    const gridId = this.#_id;
    const sortColumn = $(gridId).jqxGrid('getsortcolumn');

    if (sortColumn) {
      const columnCellFormat = $(gridId).jqxGrid('getcolumnproperty', sortColumn, 'cellsformat');
      const filtergroup = new $.jqx.filter();
      const filter_or_operator = 1;
      let filtervalue = searchInput.val().trim();

      if (filtervalue) {
        // NOTE: string filter
        const filterString = filtergroup.createfilter('stringfilter', filtervalue, 'CONTAINS');
        filtergroup.addfilter(filter_or_operator, filterString);

        // NOTE: numeric filter
        const filterNumeric = filtergroup.createfilter('numericfilter', filtervalue, 'EQUAL');
        // filtergroup.addfilter(filter_or_operator, filterNumeric);

        // NOTE: date filter
        // if (columnCellFormat === constant.app.dateFormat) {
        //   filtervalue = Date.parse(filtervalue);

        //   var filterDate = filtergroup.createfilter('datefilter', filtervalue, 'EQUAL');
        //   filtergroup.addfilter(filter_or_operator, filterDate);
        // }

        $(gridId).jqxGrid('addfilter', sortColumn, filtergroup);
        $(gridId).jqxGrid('applyfilters');
      } else {
        $(gridId).jqxGrid('clearfilters');
      }

      return true;
    } else {
      this.#_alert('<b>Filter Warning</b> : Please perform column sorting to select filter field.');

      if (typeof clearInput === 'boolean' && clearInput) searchInput.val('');

      return false;
    }
  } // end of #_filterData

  // NOTE: Constructor ========== ========== ========== ========== ========== ========== ========== ==========
  /**
   * Constructs EnhanceDataGrid object.
   *
   * @todo Try to include following libraries for prettier UI experience.
   * @todo [<b>Font Awesome (<i>Icon Dependency</i>)</b>]{@link https://fontawesome.com/} - https://fontawesome.com/
   * @todo [<b>Bootstrap</b>]{@link https://getbootstrap.com/} - https://getbootstrap.com/
   * @todo [<b>jQuery-Confirm</b>]{@link https://craftpip.github.io/jquery-confirm/} - https://craftpip.github.io/jquery-confirm/
   *
   * @param {}                prop.jqxGridProperties              - Refer to Properties Category at [jqxGrid API]{@link https://goo.gl/sqcJnv}.
   * @param {Object}          prop                                - EnhanceDataGrid object properties, sets [prop]{@link EnhanceDataGrid#prop}.
   * @param {String}          prop.id                             - Grid's ID.
   * @param {String}          prop.dataSource=''                  - Grid's data source, needed when dataAdapter not provided.
   * @param {Object}          [prop.dataAdapter]                  - Grid's data adapter, needed when dataSource not provided.
   * @param {String}          [prop.checkedDatafield='selected']  - Data field which use to get all selected data ID.
   * @param {Boolean}         [prop.useBootstrap=false]           - Enable/Disable Bootstrap Theme on Grid message.
   * @param {Boolean}         [prop.searchBar=false]              - Show search bar (in toolbar).
   *
   * @param {Boolean}         [prop.showFindButton=false]         - Show 'Find' button (in toolbar).
   * @param {Boolean}         [prop.showFilterButton=true]        - Show 'Filter' button (in toolbar).
   * @param {Boolean}         [prop.showAdvFilterButton=true]     - Show 'Advanced Filter' button (in toolbar).
   * @param {Boolean}         [prop.showRowIndex=true]            - Show row index.
   * @param {Boolean}         [prop.rowIndexWidth=50]             - Row index width.
   * @param {Object[]}        [prop.tbElement=[]]                 - Grid's toolbar built-in component, see "<code>tbElement</code>" parameter.
   *
   * @param {Object}          tbElement                         - Built-in components, "prop.tbElement" object properties.
   * @param {String}          tbElement.button                  - Available button components : (<i style="color: gray;">width default behaviour and icon</i>)
   * <table class="table table-bordered table-condensed table-striped">
   *   <tr>
   *     <td><b><i>reload</i></b></td>
   *     <td>Reload Grid</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>add</i></b></td>
   *     <td>(1) Clear form entries<br />(2) Open jqxWindow/Bootstrap-Modal</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>edit</i></b></td>
   *     <td>Open jqxWindow/Bootstrap-Modal</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>delete</i></b></td>
   *     <td>POST AJAX with specified URL</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>print</i></b></td>
   *     <td>Open new window with specified URL</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>excel</i></b></td>
   *     <td>Export Grid data to Excel file</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>csv</i></b></td>
   *     <td>Export Grid data to CSV file</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>custombutton</i></b></td>
   *     <td>Custom button</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>custom</i></b></td>
   *     <td>Custom element, see <code>buttonNode</code> property</td>
   *   </tr>
   * </table>
   *
   * Other available components :
   * <table class="table table-bordered table-condensed table-striped" style="margin-bottom: 0;">
   *   <tr>
   *     <td><b><i>divider</i></b></td>
   *     <td>Divider between two components</td>
   *   </tr>
   *   <tr>
   *     <td><b><i>separator</i></b></td>
   *     <td>Separator between two components</td>
   *   </tr>
   * </table>
   * @param {}                [tbElement.buttonNode]            - Custom element syntax, only applicable to <b>'custom'</b> button.
   * @param {String}          [tbElement.text]                  - Button text, applicable to all buttons.
   * @param {String}          [tbElement.icon]                  - Button icon ([<i>Font Awesome</i>]{@link https://fontawesome.com/} icon), applicable to all buttons, sets <b>'none'</b> to hide icon.
   * @param {String}          [tbElement.iconColor]             - Button icon's color, applicable to all buttons.
   * @param {Boolean|Number}  [tbElement.visible]               - If set to True or 1, component will be visible, applicable to all buttons.
   * @!param {Boolean|Number}  [tbElement.admin]                 - If set to True or 1, admin button presentation, applicable to all buttons.
   * @param {Function}        [tbElement.click]                 - Button's on('click') callback function, applicable to all buttons.
   * @param {Function}        [tbElement.beforeClick]           - Callback function before on('click') implementation, applicable to all buttons.
   * @param {Function}        [tbElement.afterClick]            - Callback function after on('click') implemented, applicable to all buttons.
   * @param {Function}        [tbElement.check]                 - Checking function before default behaviours of buttons, only applicable to <b>'add'</b>, <b>'edit'</b>, <b>'delete'</b> buttons. Return False to stop button's default behaviours.
   * @param {String}          [tbElement.form]                  - Form's ID, only applicable to <b>'add'</b> button. When provided, form entries will be reset when button clicked. <i style="color: gray;">(Default Behaviour)</i>
   *                                                              <br /><br />Entries covered :
   *                                                              <br />&emsp;- &lt;<b>input</b> type="<i>text | date | checkbox | radio</i>" &sol;&gt;, &lt;<b>select</b> &sol;&gt;, &lt;<b>textarea</b> &sol;&gt;
   *                                                              <br />&emsp;- <b>jqxInput, jqxDateTimeInput, jqxCheckBox, jqxRadioButton, jqxComboBox, jqxTextArea</b>
   * @param {String}          [tbElement.win]                   - jqxWindow's ID, only applicable to <b>'add'</b>, <b>'edit'</b> buttons. When provided, jqxWindow will open automatically when button clicked. <i style="color: gray;">(Default Behaviour)</i>
   * @param {String}          [tbElement.modal]                 - Bootstrap Modal's ID, only applicable to <b>'add'</b>, <b>'edit'</b> buttons. When provided, Modal will open automatically when button clicked. <i style="color: gray;">(Default Behaviour)</i>
   * @param {Boolean}         [tbElement.winOpenOnButton=true]  - If set to False, jqxWindow will not be attached to the button when open, only applicable to <b>'add'</b>, <b>'edit'</b> buttons.
   * @param {Boolean}         [tbElement.winOpenOnClick=true]   - If set to False, jqxWindow will open when button clicked, only applicable to <b>'add'</b>, <b>'edit'</b> buttons.
   * @param {Number}          [tbElement.verticalAlign]         - Set jqxWindow top margin, only applicable to <b>'add'</b>, <b>'edit'</b> buttons. When specified, jqxWindow will always be horizontally centered.
   * @param {String|Function} [tbElement.url]                   - For <b>'delete'</b> button: Delete action's $.post() URL.<br /> For <b>'print'</b> button: Form's file URL.
   * @param {String}          [tbElement.filename]              - For <b>'print'</b> button: Document filename during download.<br /> For <b>'excel'</b>, <b>'csv'</b> buttons: Excel/CSV filename during export.
   * @param {Function}        [tbElement.success]               - Callback Function if delete action successed, only applicable to <b>'delete'</b> button.
   * @param {Function}        [tbElement.fail]                  - Callback function if delete action failed, only applicable to <b>'delete'</b> button.
   * @param {Function}        [tbElement.param]                 - Function to passing dynamic value argument into print action's location, only applicable to <b>'print'</b> button.
   */
  // insert spacing - https://www.geeksforgeeks.org/how-to-insert-spaces-tabs-in-text-using-html-css/
  constructor() {
    /**
     * EnhanceDataGrid properties.
     *
     * @example
     * new EnhanceDataGrid({
     *   id: '#grid_id',
     *   dataSource: 'source_url.php',
     *   dataAdapter: new $.jqx.dataAdapter('source_url'),
     *   checkedDatafield: 'checked',
     *   useBootstrap: true,
     *   searchBar: true,
     *   showFindButton: false,
     *   showFilterButton: false,
     *   showAdvFilterButton: false,
     *   showRowIndex: false,
     *   rowIndexWidth: 100,
     *   tbElement: [
     *     { button: 'reload' },
     *     { button: 'add', win: '#jqxWindow_id', form: '#form_id', winOpenOnButton: false,
     *       beforeClick: function() {
     *         // code to be run before button.on('click')
     *       },
     *       click: function() {
     *         // specified this property will overwrite button default behaviour
     *       },
     *       afterClick: function() {
     *         // code to be run after button.on('click')
     *       },
     *     },
     *     { button: 'edit', modal: '#modal_id', form: '#form_id' },
     *     { button: 'delete',
     *       url: 'delete.php',
     *       param: function() { return { param_1: value_1, param_2: value_2 }; },
     *       check: function() {
     *         if ($checking_not_passed)
     *           return false;
     *         else
     *           return true;
     *       },
     *     },
     *     { button: 'divider' },
     *     { button: 'excel', filename: 'Excel_FIlename_When_Export' },
     *     { button: 'csv', filename: 'CSV_FIlename_When_Export' },
     *   ],
     * });
     * // new syntax
     * new EnhanceDataGrid('#grid_id', {
     *   dataSource: 'source_url.php',
     *   ...
     * });
     *
     * @see for dataAdapter, Refer [jqxAdapter API]{@link https://goo.gl/AxUONX}, search for keyword 'source' at [jqxGrid API]{@link https://goo.gl/sqcJnv}
     */
    this.prop;

    // CAUTION: coding above this line is just for documentation purpose. ========== ========== ==========

    let args    = arguments[0];
    let args_1  = arguments[1];
    let syntax  = 'old';

    if (typeof args === 'object') {
      if (!args.id) return console.error("[EnhanceDataGrid] Error: No define 'id' !");
      if (!args.columns) { return console.error("[EnhanceDataGrid] Error: No define 'columns' !"); }

      this.#_id = args.id;
      delete args.id;
    }

    // new syntax
    if (typeof args === 'string' && typeof args_1 === 'object') {
      syntax = 'new';

      this.#_id = args;
      args = args_1;
    }

    this.#_props = { ...this.#_props, ...args };

    this.#_initJqxgrid(syntax);
  } // end of constructor

  /**
   * Gets jqxGrid object
   * @returns {Object} Grid object
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.jqxGrid;
   */
  get jqxGrid() {
    // return $(this.id);
    return this.#_grid;
  }

  // NOTE: Public Methods ========== ========== ========== ========== ========== ========== ========== ==========
  /**
   * Clears the selection.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.clearSelection();
   */
  clearSelection() {
    // 'none'                  - disables the selection
    // 'singlerow'             - full row selection
    // 'multiplerows'          - each click selects a new row. Click on a selected row unselects it
    // 'multiplerowsextended'  - multiple rows selection with drag and drop. The selection behavior resembles the selection of icons on your desktop
    // 'singlecell'            - single cell selection
    // 'multiplecells'         - each click selects a new cell. Click on a selected cell unselects it
    // 'multiplecellsextended' - in this mode, users can select multiple cells with a drag and drop. The selection behavior resembles the selection of icons on your desktop
    // 'multiplecellsadvanced' - this mode is the most advanced cells selection mode. In this mode, users can select multiple cells with a drag and drop. The selection behavior resembles the selection of cells in a spreadsheet
    // 'checkbox'              - multiple rows selection through a checkbox.

    if (this.#_syntax === 'old') {
      switch (this.jqxGrid.jqxGrid('selectionmode')) {
        case 'singlerow':
        case 'singlecell':
          if (this.getSelectedRowIndex() > -1)
            this.jqxGrid.jqxGrid('clearselection');
          break;
        case 'singlerow':
          if (this.getSelectedRowIndexes != '')
            this.jqxGrid.jqxGrid('clearselection');
          break;
        default:
          this.jqxGrid.jqxGrid('clearselection');
          break;
      }
    }

    if (this.#_syntax === 'new') {
      switch (this.jqxGrid.selectionmode) {
        case 'singlerow':
        case 'singlecell':
          if (this.getSelectedRowIndex() > -1)
            this.jqxGrid.clearselection();
          break;
        case 'singlerow':
          if (this.getSelectedRowIndexes().length > 0)
            this.jqxGrid.clearselection();
          break;
        default:
          this.jqxGrid.clearselection();
          break;
      }
    }
  } // end of clearSelection

  /**
   * Gets all dirty { key:value } pairs.
   *
   * @returns {Object} Object of all dirty { key:value } pairs classified by "id" datafield.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getAllDirty();
   */
  getAllDirty() {
    return this.#_allDirty;
  } // end of getAllDirty

  /**
   * Gets the value of a cell.
   *
   * @param {Number|String} rowBoundIndex - Row index.
   * @param {String}        dataField     - Data field.
   *
   * @returns Cell value.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * // get value of 'column_name' in first row
   * grid.getCellValue(0, 'column_name');
   */
  getCellValue(rowBoundIndex, dataField) {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getcellvalue', rowBoundIndex, dataField);

    if (this.#_syntax === 'new')
      return this.jqxGrid.getcellvalue(rowBoundIndex, dataField);
  } // end of getCellValue

  /**
   * Gets all selected data ID.
   *
   * @default checkedDatafield="selected"
   *
   * @returns {Array} Array of data ID which "datafield" specified in "checkedDatafield" property was checked. (columntype set to "checkbox")
   *1
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getCheckedItems();
   */
  getCheckedItems() {
    return this.#_checkedItems;
  } // end of getCheckedItems

  /**
   * Gets all dirty { id:value } pairs.
   *
   * @returns {Object.<Object>} Object of all dirty { id:value } paris which "value" taken from "datafield" specified in "checkedDatafield" property.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getDirty();
   */
  getDirty() {
    return this.#_dirty;
  } // end of getDirty

  /**
   * Gets the data of a row.
   *
   * @param {Number|String} rowBoundIndex - Row index.
   *
   * @returns {Object} Data object specified by row index.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * // get JSON data object of first row
   * grid.getRowData(0);
   */
  getRowData(rowBoundIndex) {
    rowBoundIndex = rowBoundIndex > -1 ? rowBoundIndex : -1;

    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getrowdata', rowBoundIndex);

    if (this.#_syntax === 'new')
      return this.jqxGrid.getrowdata(rowBoundIndex);
  } // end of getRowData

  /**
   * Gets all rows.
   *
   * @returns {Object[]} Array of all rows loaded in the Grid. If the Grid is filtered, the returned value is an array of the filtered records.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getRows();
   */
  getRows() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getrows');

    if (this.#_syntax === 'new')
      return this.jqxGrid.getrows();
  } // end of getRows

  /**
   * Gets the value of a cell of the selected row.
   *
   * @param {String} dataField - Data field.
   *
   * @returns Cell value of the selected row.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * // get value of 'column_name' of selected row
   * grid.getSelectedCellValue('column_name);
   */
  getSelectedCellValue(dataField) {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getcellvalue', this.getSelectedRowIndex(), dataField);

    if (this.#_syntax === 'new')
      return this.jqxGrid.getcellvalue(this.getSelectedRowIndex(), dataField);
  } // end of getSelectedCellValue

  /**
   * Gets the data of the selected row.
   *
   * @returns {Object} Data object of the selected row.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getSelectedRowData();
   */
  getSelectedRowData() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getrowdata', this.getSelectedRowIndex());

    if (this.#_syntax === 'new')
      return this.jqxGrid.getrowdata(this.getSelectedRowIndex());
  } // end of getSelectedRowData

  /**
   * Gets the bound index of the selected row.
   *
   * @returns {Number} Bound index of the selected row. Returns -1, if there is no selection. The expected selection mode is 'singlerow', 'multiplerows' or 'multiplerowsextended'.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getSelectedRowIndex();
   */
  getSelectedRowIndex() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getselectedrowindex');

    if (this.#_syntax === 'new')
      return this.jqxGrid.getselectedrowindex();
  } // end of getSelectedRowIndex

  /**
   * Gets the indexes of the selected rows.
   *
   * @returns {Array} Returns an array of the selected rows. The expected selection mode is 'singlerow', 'multiplerows' or 'multiplerowsextended'.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getSelectedRowIndexes();
   */
  getSelectedRowIndexes() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getselectedrowindexes');

    if (this.#_syntax === 'new')
      return this.jqxGrid.getselectedrowindexes();
  } // end of getSelectedRowIndexes

  /**
   * Get URL of data source.
   *
   * @returns {String} URL of data source.
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.getSourceUrl();
   */
  getSourceUrl() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('source')._source.url;

    // TODO: thin of what to do
    if (this.#_syntax === 'new')
      return null;
  } // end of getSourceUrl

  /**
   * Hide column.
   *
   * @param {String|Array.<String>} dataField - Data field / Array of data field.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * // Single column
   * grid.hideColumn('column_name');
   * // Multiple columns
   * grid.hideColumn(['column_name_1', 'column_name_2', ...]);
   */
  hideColumn(columns) {
    const grid = this.jqxGrid;

    if (typeof columns === 'string') {
      if (this.#_syntax === 'old') {
        grid.jqxGrid('beginupdate');
        grid.jqxGrid('hideColumn', columns);
        grid.jqxGrid('endupdate');
      }

      if (this.#_syntax === 'new') {
        grid.beginupdate();
        grid.hidecolumn(columns);
        grid.endupdate();
      }

      return true;
    }

    if (typeof columns === 'object') {
      if (columns.length > 0) {
        columns.forEach(column => {
          if (this.#_syntax === 'old') {
            grid.jqxGrid('beginupdate');
            grid.jqxGrid('hideColumn', column);
            grid.jqxGrid('endupdate');
          }

          if (this.#_syntax === 'new') {
            grid.beginupdate();
            grid.hidecolumn(column);
            grid.endupdate();
          }
        });

        return true;
      }

      return false;
    }

    return false;
  } // end of hideColumn

  /**
   * Register grid event listener.
   *
   * @param {String}    event     - Event name.
   * @param {Function}  callback  - Callback function.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.on('rowselect', function(event) {
   *   ...
   * });
   */
  // TODO: enhance to provide turning off 'off' event-listener ??
  on(event, callback) {
    this.jqxGrid.off(event);
    this.jqxGrid.on(event, callback);
  } // end of on

  /**
   * Repaints the Grid View.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.refresh();
   */
  refresh() {
    this.#_clearSelection = true;

    if (this.#_syntax === 'old')
      this.updateBoundData('all');

    if (this.#_syntax === 'new')
      this.jqxGrid.updatebounddata();
  } // end of refresh

  /**
   * Show column.
   *
   * @param {String|Array.<String>} dataField - Data field / Array of data field.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * // Single column
   * grid.showColumn('column_name');
   * // Multiple columns
   * grid.showColumn(['column_name_1', 'column_name_2', ...]);
   */
  showColumn(columns) {
    const grid = this.jqxGrid;

    if (typeof columns === 'string') {
      if (this.#_syntax === 'old') {
        grid.jqxGrid('beginupdate');
        grid.jqxGrid('showColumn', columns);
        grid.jqxGrid('endupdate');
      }

      if (this.#_syntax === 'new') {
        grid.beginupdate();
        grid.showcolumn(columns);
        grid.endupdate();
      }

      return true;
    }

    if (typeof columns === 'object') {
      if (columns.length > 0) {
        columns.forEach(column => {
          if (this.#_syntax === 'old') {
            grid.jqxGrid('beginupdate');
            grid.jqxGrid('showColumn', column);
            grid.jqxGrid('endupdate');
          }

          if (this.#_syntax === 'new') {
            grid.beginupdate();
            grid.showcolumn(column);
            grid.endupdate();
          }
        });

        return true;
      }

      return false;
    }

    return false;
  } // end of showColumn

  /**
   * Updates the bound data and refreshes the grid.
   *
   * @param {String} type - You can pass 'filter' or 'sort' as parameter, if the update reason is change in 'filtering' or 'sorting'.
   * To update only the data without the columns, use the 'data' parameter.
   * To make a quick update of the cells, pass "cells" as parameter.
   * Passing "cells" will refresh only the cells values when the new rows count is equal to the previous rows count.
   * To make a full update, do not pass any parameter.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.updateBoundData();
   */
  updateBoundData(type) {
    this.#_clearDirtyFlag();

    type = type ? type : 'data';

    if (type && type != 'all') {
      if (this.#_syntax === 'old')
        this.jqxGrid.jqxGrid('updatebounddata', type);

      if (this.#_syntax === 'new')
        this.jqxGrid.updatebounddata(type);
    } else {
      if (this.#_syntax === 'old')
        this.jqxGrid.jqxGrid('updatebounddata');

      if (this.#_syntax === 'new')
        this.jqxGrid.updatebounddata();
    }
  } // end of updateBoundData

  /**
   * Sets a new value to a cell.
   *
   * @param {Number}  rowBoundIndex - Row index.
   * @param {String}  dataField     - Data field.
   * @param {*}       value         - New value.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * //  set value of 'column_name' in first row to 'new value'
   * grid.updateCellValue(0, 'column_name', 'new value');
   */
  updateCellValue(rowBoundIndex, dataField, value) {
    if (this.#_syntax === 'old')
      this.jqxGrid.jqxGrid('setcellvalue', rowBoundIndex, dataField, value);

    if (this.#_syntax === 'new')
      this.jqxGrid.setcellvalue(rowBoundIndex, dataField, value);
  } // end of updateCellValue

  /**
   * Sets a new value to a cell of the selected row.
   *
   * @param {String}  dataField - Data field.
   * @param {*}       value     - New value.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * //  set value of 'column_name' of selected row
   * grid.updateCellValue('column_name', 'new value');
   */
  updateSelectedCellValue(column, value) {
    if (this.#_syntax === 'old')
      this.jqxGrid.jqxGrid('setcellvalue', this.getSelectedRowIndex(), column, value);

    if (this.#_syntax === 'new')
      this.jqxGrid.setcellvalue(this.getSelectedRowIndex(), column, value);
  } // end of updateSelectedCellValue

  /**
   * Update URL of data source and refresh Grid.
   *
   * @param {String}  url         - New URL of data source.
   * @param {Boolean} autoRefresh - IF False, Grid will not refresh after URL changed.
   *
   * @returns None
   *
   * @example
   * const grid = new EnhanceDataGrid();
   * grid.updateSourceUrl('new_source_url.php');
   */
  updateSourceUrl(url, autoRefresh) {
    if (this.#_syntax === 'old') {
      this.#_dataSource.url = url;

      if (!this.#_dataSource)
        this.dataAdapter._source.url = url;

      if (typeof autoRefresh === 'undefined' || (typeof autoRefresh === 'boolean' && autoRefresh))
        this.refresh();
    }

    // TODO: thin of what to do
    if (this.#_syntax === 'new')
      return null;
  } // end of updateSourceUrl
}