class EnhanceDataGrid {
  static isNull(input, identical) {
    if (typeof identical === 'boolean' && identical) { return input === null; }
    else {
      if (typeof input === 'string') { input = input.toLowerCase(); }
      if (input === null || input === 'null') { return true; }
      return false;
    }
  } // end of isNull

  static isUndefined(input, identical) {
    if (typeof identical === 'boolean' && identical) { return input === undefined; }
    else {
      if (typeof input === 'string') { input = input.toLowerCase(); }
      if (input === undefined || input === 'undefined') { return true; }
      return false;
    }
  } // end of isUndefined

  static isEmptyString(input) { return input === ''; } // end of isEmptyString

  static isUnset(input, trim) {
    if (typeof trim === 'boolean' && trim && typeof input === 'string') { input = input.trim(); }
    if (EnhanceDataGrid.isNull(input) || EnhanceDataGrid.isUndefined(input) || EnhanceDataGrid.isEmptyString(input)) { return true; }
    return false;
  } // end of isUnset

  static queryStringToObject(prmstr) {
    const params = {};
    const prmArr = prmstr.split('&');

    for (let i = 0; i < prmArr.length; i++) {
      const tmparr = prmArr[i].split('=');

      params[tmparr[0]] = window.decodeURIComponent(tmparr[1]);
    }

    return params;
  }

  static objectToQueryString(qsObj) {
    let qsString = '';

    $.each(qsObj, (key, value) => { qsString = qsString + key + '=' + window.encodeURIComponent(value) + '&'; });

    return qsString.substring(0, qsString.length - 1);
  }

  static getSearchParameters(url) {
    const prmstr = (typeof url === 'string' && url)
      ? url.split('?')[1]
      : window.location.search.slice(1);

    return prmstr !== null && prmstr !== '' ? EnhanceDataGrid.queryStringToObject(prmstr) : {};
  }

  static insertQueryString(url, params) {
    if (url.indexOf('?') > -1) {
      const qs = EnhanceDataGrid.getSearchParameters(url);

      Object.assign(qs, params);
      params = qs;

      url = url.split('?')[0];
    }
    return url + '?' + EnhanceDataGrid.objectToQueryString(params);
  }

  static debounce(fn, delay) {
    let timer = null;

    return () => {
      const context = this;
      const args = arguments;

      window.clearTimeout(timer);

      timer = window.setTimeout(() => fn.apply(context, args), delay);
    };
  }

  static isValidKeyboardInput(keyDownEvent) {
    var keys = {
      // summary:
      //   Definitions for common key values.
      //   Client code should test keyCode against these named constants, as the actual codes can vary by browser.
      BACKSPACE : 8,
      TAB       : 9,
      CLEAR     : 12,
      ENTER     : 13,
      SHIFT     : 16,
      CTRL      : 17,
      ALT       : 18,
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

  #_syntax;

  #_grid;

  #_id;

  #_zproplist = [
    'autoSearch',
    'bootstrap',
    'buttonTheme',
    'centeredColumns',
    'checkedDatafield',
    'custBar',
    'enterFilter',
    'enterSearch',
    'extBar',
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

  #_zprops = {};

  #_props = {
    // same with jqxGrid properties
    theme             : '',
    width             : '100%',
    height            : '100%',
    sortable          : true,
    filterable        : true,
    filtermode        : 'excel',
    enabletooltips    : true,
    showaggregates    : true,
    showstatusbar     : true,

    // EnhanceDataGrid properties
    useBootstrap        : false,
    buttonTheme         : 'material',
    checkedDatafield    : 'selected',
    tbElement           : [],
    rowIndexWidth       : 50,
    centeredColumns     : false,
    statusBar           : false,
    searchBar           : false,
    autoSearch          : false,
    enterSearch         : false,
    enterFilter         : true,
    extBar              : false,
    custBar             : false,
    bootstrap           : false,
    showRowIndex        : true,
    showFindButton      : false,
    showFilterButton    : true,
    showAdvFilterButton : true,
  };

  #_dirty = {};

  #_allDirty = {};

  #_checkedItems = [];

  #_dataSource;

  #_dataAdapter;

  #_clearSelection = false;

  #_alert(opt) {
    $.alert({
      ...{
        animation         : 'zoom',
        closeAnimation    : 'zoom',
        animateFromElement: false,
        backgroundDismiss : true,
        escapeKey         : true,
      },
      ...opt
    });
  }

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

      // TODO: public methods not applicable for new syntax
      if (syntax === 'new') this.#_grid = new jqxGrid(gridId, props);
    } else {
      return console.error(`[EnhanceDataGrid] Error: DOM element '${gridId}' not found !`);
    }
  } // end of #_initJqxgrid

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

  #_clearDirtyFlag() {
    this.#_dirty    = {};
    this.#_allDirty = {};
  };

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

  #_processColumns() {
    if (this.#_zprops.centeredColumns === true) {
      this.#_props.columns.forEach(c => {
        if (!c.hidden && !c.align)
          c.align = 'center';
      });
    }

    this.#_displayRowIndex();
  } // end of #_processColumns

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
      no_row_selected: 'Please select one of the record first.',
      no_data_id: 'No data ID found !',
    };

    const buttonEvent = {
      click: {
        _add: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_add');
          $(this).keyup();
        },
        _addForm: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_addForm');
          $(this).keyup();
        },
        _edit: event => {
          event.preventDefault();

          const selectedRowIndex = self.getSelectedRowIndex();

          if (selectedRowIndex > -1) {
            $(this).keydown();

            // TODO: perform default operation
            console.log(self.getSelectedRowData());
            // #_getGridButtonProps

            $(this).keyup();
          } else {
            if (zProps.useBootstrap)
              _createModalError.call(self, 'No Record Selected', controlledMessage.no_row_selected);
            else
              window.alert(controlledMessage.no_row_selected);
          }
        },
        _editForm: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_editForm');
          $(this).keyup();
        },
        _delete: event => {
          event.preventDefault();

          const selectedRowIndex = self.getSelectedRowIndex();

          if (selectedRowIndex > -1) {
            $(this).keydown();

            // NOTE: perform default operation
            const button_id = event.currentTarget.id.indexOf('#') === -1 ? '#' + event.currentTarget.id : event.currentTarget.id;
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

            $(this).keyup();
          } else {
            if (zProps.useBootstrap)
              _createModalError.call(self, 'No Record Selected', controlledMessage.no_row_selected);
            else
              window.alert(controlledMessage.no_row_selected);
          }
        },
        _find: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_find');
          $(this).keyup();
        },
        _reload: event => {
          event.preventDefault();

          $(this).keydown();

          self.refresh();

          $(this).keyup();
        },
        _view: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_view');
          $(this).keyup();
        },
        _save: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_save');
          $(this).keyup();
        },
        _print: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_print');
          $(this).keyup();
        },
        _excel: event => {
          event.preventDefault();

          $(this).keydown();

          console.log('_excel');
          // TODO: dev export Excel
          // self.jqxGrid.jqxGrid('exportdata', 'xlsx', 'jqxGrid');

          $(this).keyup();
        },
        _csv: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_csv');
          $(this).keyup();
        },
        _active: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_active');
          $(this).keyup();
        },
        _inactive: event => {
          event.preventDefault();

          $(this).keydown();
          console.log('_inactive');
          $(this).keyup();
        },
      }
    };

    function _createModalError(modalTitle, modalBody) {
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
    }

    // To show / hide button
    const flexExpander = $('<div class="flex-expander" style="position: relative; min-width: 20px;" />');
    const separator = $('<div>')
      .css({ minWidth: 4, width: 4, height: 20, background: '#555555', borderRadius: 5 });

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

          if (tbElement[i].form) funcName += 'Form';

          generatedButton.on('click', tbElement[i].click
            ? e => tbElement[i].click(e, self.getSelectedRowData())
            : buttonEvent.click[funcName]);

          if (tbElement[i].beforeClick) generatedButton.keydown(tbElement[i].beforeClick);

          if (tbElement[i].afterClick) generatedButton.keyup(tbElement[i].afterClick);

          // NOTE: draw toolbar button
          tbElement[i] = this.#_initGridButton({
            container : container,
            btn       : generatedButton,
            theme     : tbElement[i].theme ? tbElement[i].theme : 'fresh',
            width     : tbElement[i].width ? tbElement[i].width : (tbElement[i].text || tbElement[i].text === '') ? 'auto' : buttonDefault[btn].width,
            height    : tbElement[i].height ? tbElement[i].height : buttonDefault[btn].height,
            widget    : tbElement[i].widget ? tbElement[i].widget : buttonDefault[btn].widget,
            disabled  : tbElement[i].disabled,
            btnElement: tbElement[i],
          });
        }
      }
    } // EOF for loop
  } // end of #_appendToolbarElement

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

  #_initGridButton(opt) {
    const container     = opt.container;
    const button        = opt.btn;
    const buttonWidth   = opt.width;
    const buttonHeight  = opt.height;
    const buttonType    = opt.widget;
    const theme         = opt.theme;
    const disabled      = opt.disabled;
    let buttonElement   = opt.btnElement;
    // console.log(buttonElement)

    switch (buttonType) {
      case 'jqxToggleButton':
        button.jqxToggleButton({
          // theme: theme,
          // theme: 'material-purple',
          theme: this.#_zprops.buttonTheme,
          // width: btnWidth,
          height: 25, // btnHeight,
          disabled: typeof disabled === 'boolean' ? disabled : false
        });

        if (button.attr('id').indexOf('#') === -1) buttonElement.id = '#' + button.attr('id');
        else buttonElement.id = button.attr('id');
        break;
      case 'jqxButton':
        // button.jqxButton({ theme: theme, width: btnWidth, height: btnHeight });
        button.jqxButton({
          // theme: theme,
          // theme: 'material-purple',
          theme: this.#_zprops.buttonTheme,
          // width: btnWidth,
          height: 25, // btnHeight,
          disabled: typeof disabled === 'boolean' ? disabled : false
        });

        if (button.attr('id').indexOf('#') === -1) buttonElement.id = '#' + button.attr('id');
        else buttonElement.id = button.attr('id');
        break;
      case 'jqxDropDownList':
        button.jqxDropDownList({
          // theme: theme,
          // theme: 'material-purple',
          theme: this.#_zprops.buttonTheme,
          // width: btnWidth,
          height: 25, // btnHeight,
          disabled: typeof disabled === 'boolean' ? disabled : false
        });

        if (button.attr('id').indexOf('#') === -1) buttonElement.id = '#' + button.attr('id');
        else buttonElement.id = button.attr('id');
        break;
      case 'faIcon':
        break;
      default: console.error('Error: libGrid.#_initGridButton()', 'Unknown button type !<br>Plese check your coding.'); break;
    }

    // if (buttonType === 1) { // toggled button
    //   button.jqxToggleButton({ theme: theme, width: wSize, height: 17 });
    // } else {
    //   button.jqxButton({ theme: theme, width: wSize, height: 17 });
    // }

    container.append(button);

    return buttonElement;
  } // end of #_initGridButton

  #_getGridButtonProps = (json, key, type) => {
    // console.log(json)
    // console.log(key)
    // console.log(type)
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
            case 'autoOpenWindow' : obj = v.autoOpenWindow; break;
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

  #_filterData(searchInput, clearInput=false) {
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
      window.alert('Filter Error : Please perform column sorting to select filter field.');

      if (typeof clearInput === 'boolean' && clearInput) searchInput.val('');

      return false;
    }
  } // end of #_filterData

  constructor() {
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

  get jqxGrid() {
    // return $(this.id);
    return this.#_grid;
  }

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

  getAllDirty() {
    return this.#_allDirty;
  } // end of getAllDirty

  getCellValue(rowindex, column) {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getcellvalue', rowindex, column);

    if (this.#_syntax === 'new')
      return this.jqxGrid.getcellvalue(rowindex, column);
  } // end of getCellValue

  getCheckedItems() {
    return this.#_checkedItems;
  } // end of getCheckedItems

  getDirty() {
    return this.#_dirty;
  } // end of getDirty

  getRowData(rowindex) {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getrowdata', rowindex);

    if (this.#_syntax === 'new')
      return this.jqxGrid.getrowdata(rowindex);
  } // end of getRowData

  getRows() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getrows');

    if (this.#_syntax === 'new')
      return this.jqxGrid.getrows();
  } // end of getRows

  getSelectedCellValue(column) {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getcellvalue', this.getSelectedRowIndex(), column);

    if (this.#_syntax === 'new')
      return this.jqxGrid.getcellvalue(this.getSelectedRowIndex(), column);
  } // end of getSelectedCellValue

  getSelectedRowData() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getrowdata', this.getSelectedRowIndex());

    if (this.#_syntax === 'new')
      return this.jqxGrid.getrowdata(this.getSelectedRowIndex());
  } // end of getSelectedRowData

  getSelectedRowIndex() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getselectedrowindex');

    if (this.#_syntax === 'new')
      return this.jqxGrid.getselectedrowindex();
  } // end of getSelectedRowIndex

  getSelectedRowIndexes() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('getselectedrowindexes');

    if (this.#_syntax === 'new')
      return this.jqxGrid.getselectedrowindexes();
  } // end of getSelectedRowIndexes

  getSourceUrl() {
    if (this.#_syntax === 'old')
      return this.jqxGrid.jqxGrid('source')._source.url;

    // TODO: thin of what to do
    if (this.#_syntax === 'new')
      return null;
  } // end of getSourceUrl

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

  on(event, callback) {
    this.jqxGrid.off(event);
    this.jqxGrid.on(event, callback);
  } // end of on

  refresh() {
    this.#_clearSelection = true;

    if (this.#_syntax === 'old')
      this.updateBoundData('all');

    if (this.#_syntax === 'new')
      this.jqxGrid.updatebounddata();
  } // end of refresh

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

  updateBoundData(arg) {
    this.#_clearDirtyFlag();

    arg = arg ? arg : 'data';

    if (arg && arg != 'all') {
      if (this.#_syntax === 'old')
        this.jqxGrid.jqxGrid('updatebounddata', arg);

      if (this.#_syntax === 'new')
        this.jqxGrid.updatebounddata(arg);
    } else {
      if (this.#_syntax === 'old')
        this.jqxGrid.jqxGrid('updatebounddata');

      if (this.#_syntax === 'new')
        this.jqxGrid.updatebounddata();
    }
  } // end of updateBoundData

  updateCellValue(rowindex, column, value) {
    if (this.#_syntax === 'old')
      this.jqxGrid.jqxGrid('setcellvalue', rowindex, column, value);

    if (this.#_syntax === 'new')
      this.jqxGrid.setcellvalue(rowindex, column, value);
  } // end of updateCellValue

  updateSelectedCellValue(column, value) {
    if (this.#_syntax === 'old')
      this.jqxGrid.jqxGrid('setcellvalue', this.getSelectedRowIndex(), column, value);

    if (this.#_syntax === 'new')
      this.jqxGrid.setcellvalue(this.getSelectedRowIndex(), column, value);
  } // end of updateSelectedCellValue

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