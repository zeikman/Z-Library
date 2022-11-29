# Z-Library
jQwidgets/EnhanceDataGrid.js

## EnhanceDataGrid.js

EnhanceDataGrid is a library that extend jQWidgets jqxGrid widget and provides a lot of useful built-in methods.

## Get Started

Include library after jqxGrid.

```sh
<link rel="stylesheet" href="path-to-jqwidgets/jqwidgets/styles/jqx.base.css" type="text/css" />
<script type="text/javascript" src="jqwidgets-ver14.0.0/jqwidgets/jqxgrid.js"></script>
...other necessary dependency

<link rel="stylesheet" href="jQWidgets/EnhanceDataGrid.css" type="text/css" />
<script type="text/javascript" src="jQWidgets/EnhanceDataGrid.js"></script>
```

It is recommended to be use with the following libraries to have a prettier UI experience.

[Font-Awesome](https://fontawesome.com/) - Default icon library.

[Bootstrap](https://getbootstrap.com/) - Utilizes Modal, etc.

[jQuery-Confirm](https://craftpip.github.io/jquery-confirm/) - Utilizes jQuery.confirm, jQuery.alert, and etc.

### How to use

Full [documentation](https://coming-soon.com) is over here.

```javascript
const grid = new EnhanceDataGrid({
  // jqxGrid properties
  column: [...],
  source: new $.jqx.dataAdapter({
    id: 'id',
    datafields: [
      { name: 'id', type: 'number' },
      ...
    ],
    // example for JSON
    datatype: "json",
    url: 'url.php',
    // example for local Array
    datatype: "array",
    localdata: [Array of Object],
  }),
  ...
  // EnhanceDataGrid properties
  id: '#grid_id',
  dataSource: 'source_url.php',
  dataAdapter: new $.jqx.dataAdapter('source_url'),
  checkedDatafield: 'checked',
  useBootstrap: true,
  searchBar: true,
  showFindButton: false,
  showFilterButton: false,
  showAdvFilterButton: false,
  showRowIndex: false,
  rowIndexWidth: 100,
  tbElement: [
    { button: 'reload' },
    { button: 'add' },
    { button: 'edit' },
    { button: 'delete' },
    { button: 'divider' },
    { button: 'excel', filename: 'Export_Excel' },
  ],
});
```

## Properties

<table>
  <thead>
    <tr>
      <th>Properties</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>{String}</td>
      <td>Grid's ID</td>
      <td></td>
    </tr>
    <tr>
      <td>dataSource</td>
      <td>{String}</td>
      <td>Grid's data source, needed when dataAdapter not provided.</td>
      <td></td>
    </tr>
    <tr>
      <td>dataAdapter</td>
      <td>{Object}</td>
      <td>Grid's data adapter, needed when dataSource not provided.</td>
      <td></td>
    </tr>
    <tr>
      <td>checkedDatafield</td>
      <td>{String}</td>
      <td>Data field which use to get all selected data ID.</td>
      <td>'selected'</td>
    </tr>
    <tr>
      <td>useBootstrap</td>
      <td>{Boolean}</td>
      <td>Enable/Disable Bootstrap Theme on Grid message.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>searchBar</td>
      <td>{Boolean}</td>
      <td>Show search bar (in toolbar).</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showFindButton</td>
      <td>{Boolean}</td>
      <td>Show 'Find' button (in toolbar).</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showFilterButton</td>
      <td>{Boolean}</td>
      <td>Show 'Filter' button (in toolbar).</td>
      <td>true</td>
    </tr>
    <tr>
      <td>showAdvFilterButton</td>
      <td>{Boolean}</td>
      <td>Show 'Advanced Filter' button (in toolbar).</td>
      <td>true</td>
    </tr>
    <tr>
      <td>showRowIndex</td>
      <td>{Boolean}</td>
      <td>Show row index.</td>
      <td>true</td>
    </tr>
    <tr>
      <td>rowIndexWidth</td>
      <td>{Boolean}</td>
      <td>Row index width.</td>
      <td>50</td>
    </tr>
    <tr>
      <td>tbElement</td>
      <td>{Object[ ]}</td>
      <td>Grid's toolbar built-in component.</td>
      <td>[ ]</td>
    </tr>
  </tbody>
</table>

## Methods

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>clearSelection</td>
      <td>Clears the selection.</td>
    </tr>
    <tr>
      <td>getAllDirty</td>
      <td>Gets all dirty { key:value } pairs.</td>
    </tr>
    <tr>
      <td>getCellValue</td>
      <td>Gets the value of a cell.</td>
    </tr>
    <tr>
      <td>getCheckedItems</td>
      <td>Gets all selected data ID.</td>
    </tr>
    <tr>
      <td>getDirty</td>
      <td>Gets all dirty { id:value } pairs.</td>
    </tr>
    <tr>
      <td>getRowData</td>
      <td>Gets the data of a row.</td>
    </tr>
    <tr>
      <td>getRows</td>
      <td>Gets all rows.</td>
    </tr>
    <tr>
      <td>getSelectedCellValue</td>
      <td>Gets the value of a cell of the selected row.</td>
    </tr>
    <tr>
      <td>getSelectedRowData</td>
      <td>Gets the data of the selected row.</td>
    </tr>
    <tr>
      <td>getSelectedRowIndex</td>
      <td>Gets the bound index of the selected row.</td>
    </tr>
    <tr>
      <td>getSelectedRowIndexes</td>
      <td>Gets the indexes of the selected rows.</td>
    </tr>
    <tr>
      <td>getSourceUrl</td>
      <td>Get URL of data source.</td>
    </tr>
    <tr>
      <td>hideColumn</td>
      <td>Hide column.</td>
    </tr>
    <tr>
      <td>on</td>
      <td>Register grid event listener.</td>
    </tr>
    <tr>
      <td>refresh</td>
      <td>Repaints the Grid View.</td>
    </tr>
    <tr>
      <td>showColumn</td>
      <td>Show column.</td>
    </tr>
    <tr>
      <td>updateBoundData</td>
      <td>Updates the bound data and refreshes the grid.</td>
    </tr>
    <tr>
      <td>updateCellValue</td>
      <td>Sets a new value to a cell.</td>
    </tr>
    <tr>
      <td>updateSelectedCellValue</td>
      <td>Sets a new value to a cell of the selected row.</td>
    </tr>
    <tr>
      <td>updateSourceUrl</td>
      <td>Update URL of data source and refresh Grid.</td>
    </tr>
  </tbody>
</table>

## Static Methods

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>isNull</td>
      <td>Check input is <code>null</code>.</td>
    </tr>
    <tr>
      <td>isUndefined</td>
      <td>Check input is <code>undefined</code>.</td>
    </tr>
    <tr>
      <td>isEmptyString</td>
      <td>Check input is empty string.</td>
    </tr>
    <tr>
      <td>isUnset</td>
      <td>Check input is unset.</td>
    </tr>
    <tr>
      <td>transformStringToObject</td>
      <td>Transform String to Object.</td>
    </tr>
    <tr>
      <td>transformObjectToString</td>
      <td>Transform Object to String.</td>
    </tr>
    <tr>
      <td>getSearchParameters</td>
      <td>Get query string of an URL.</td>
    </tr>
    <tr>
      <td>insertQueryString</td>
      <td>Append query string to an URL.</td>
    </tr>
    <tr>
      <td>debounce</td>
      <td>Returns a Debounce function. <a href="https://remysharp.com/2010/07/21/throttling-function-calls">Reference</a></td>
    </tr>
    <tr>
      <td>throttle</td>
      <td>Returns a Throttle function. <a href="https://remysharp.com/2010/07/21/throttling-function-calls">Reference</a></td>
    </tr>
    <tr>
      <td>isValidKeyboardInput</td>
      <td>Check whether is a valid keyboard input.</td>
    </tr>
  </tbody>
</table>