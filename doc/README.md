[![npm](https://img.shields.io/npm/v/.svg)](https://www.npmjs.com/package/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com//)
[![Build Status](https://secure.travis-ci.org//.png)](http://travis-ci.org//)
[![bithound](https://www.bithound.io/github///badges/score.svg)](https://www.bithound.io/github//)
[![codecov.io](http://codecov.io/github///coverage.svg?branch=master)](http://codecov.io/github//?branch=master)
[![Coverage Status](https://coveralls.io/repos///badge.svg)](https://coveralls.io/r//)
[![Code Climate](https://codeclimate.com/github///badges/gpa.svg)](https://codeclimate.com/github//)
[![Known Vulnerabilities](https://snyk.io/test/github///badge.svg)](https://snyk.io/test/github//)
[![GitHub Issues](https://img.shields.io/github/issues//.svg?style=flat-square)](https://github.com///issues)
[![Stories in Ready](https://badge.waffle.io//.svg?label=ready&title=Ready)](http://waffle.io//)
[![Dependency Status](https://david-dm.org//.svg)](https://david-dm.org//)
[![devDependency Status](https://david-dm.org///dev-status.svg)](https://david-dm.org//#info=devDependencies)
[![docs](http://inch-ci.org/github//.svg?branch=master)](http://inch-ci.org/github//)
[![downloads](http://img.shields.io/npm/dm/.svg?style=flat-square)](https://npmjs.org/package/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


=====



API Reference
=====

* <a name="getRowCount"></a>

## getRowCount() ⇒ <code>integer</code>
Returns the count of rows in this table

**Kind**: global function  
**Returns**: <code>integer</code> - count  The count of available rows  

* <a name="_buildRows"></a>

## _buildRows()
Recreates the rows out of the existing model. The data is stored.
Each row here is an object with the rowId and the row type. The
row itself will be created on demand.
in 'this.rows'.
rows = [
  {
    rowId : rowId,
    parentRowId : parentRowId
    section: sectionObject
    rowType : rowType
  }
];

**Kind**: global function  

* <a name="hasSummarySection"></a>

## hasSummarySection() ⇒ <code>boolean</code>
Returns true if this table as a summary section

**Kind**: global function  
**Returns**: <code>boolean</code> - hasIt  True if this table already has a summar section  

* <a name="getFunctionHasSummarySection"></a>

## getFunctionHasSummarySection() ⇒ <code>function</code>
Returns a function which will return true if this table as a summary section

**Kind**: global function  
**Returns**: <code>function</code> - func  A function wich will return true if this table as a summary section  

* <a name="getRowFor"></a>

## getRowFor(number) ⇒ <code>object</code>
Returns the row at the given position

**Kind**: global function  
**Returns**: <code>object</code> - row  The row object for the given number  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>integer</code> | The row number |


* <a name="getFunctionGetRowFor"></a>

## getFunctionGetRowFor() ⇒ <code>function</code>
Returns a function which will return the row for a given position

**Kind**: global function  
**Returns**: <code>function</code> - rowGetter  A function wich will return the row for a given row number  

* <a name="getRowTypeFor"></a>

## getRowTypeFor(rowNumber) ⇒ <code>string</code>
Returns the row type at the given position

**Kind**: global function  
**Returns**: <code>string</code> - rowType  The type of this row  

| Param | Type | Description |
| --- | --- | --- |
| rowNumber | <code>integer</code> | The row number |


* <a name="getFunctionGetRowTypeFor"></a>

## getFunctionGetRowTypeFor() ⇒ <code>function</code>
returns the the function 'getRowTypeFor'

**Kind**: global function  
**Returns**: <code>function</code> - func  The function  

* <a name="getSectionTypeFor"></a>

## getSectionTypeFor(rowNumber) ⇒ <code>string</code>
Returns the section type for the given row number.
If the row is a data row the containing section type will be returned

**Kind**: global function  
**Returns**: <code>string</code> - sectionType  The section type of this row or containing sectio  

| Param | Type | Description |
| --- | --- | --- |
| rowNumber | <code>integer</code> | The row number |


* <a name="getFunctionGetSectionTypeFor"></a>

## getFunctionGetSectionTypeFor() ⇒ <code>function</code>
returns the the function 'getSectionTypeFor'

**Kind**: global function  
**Returns**: <code>function</code> - func  The function  

* <a name="_createRow"></a>

## _createRow(rowId) ⇒ <code>object</code>
Creates the row for a given reference.
  rowData = {
    rowId : rowId,
    parentRowId : parentRowId
    section: sectionObject
    rowType : rowType
    c1 .. c4 : first columns
    1..n :  testcase data
  }

**Kind**: global function  
**Returns**: <code>object</code> - row  The row as needed for the view  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | The rowId of the row to be created |


* <a name="_getRow"></a>

## _getRow(rowId) ⇒ <code>object</code>
The generic data row creater for the sections

**Kind**: global function  
**Returns**: <code>object</code> - row  The row to be added to the tree model  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | The row ID of the row to be build |


* <a name="_addTestcaseDataForRow"></a>

## _addTestcaseDataForRow(row, rowId)
Adds the testcase data for a data row. Adds the data to the given row object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>object</code> | The created row for the tree model without the testcase data |
| rowId | <code>string</code> | The row ID of the row to be build |


* <a name="_buildSectionRows"></a>

## _buildSectionRows(section, parentId)
Build the rows for a section. If the section is a field section
it will recurse. The data will be added to the given parent object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| section | <code>object</code> | The section to get the rowIDs from |
| parentId | <code>string</code> | The parent section rowId |


* <a name="getColumns"></a>

## getColumns(reload) ⇒ <code>array</code>
Returns the columns of this table as it needed by the grid view

**Kind**: global function  
**Returns**: <code>array</code> - columns  An array of column objects  

| Param | Type | Description |
| --- | --- | --- |
| reload | <code>boolean</code> | If true then the columns will be recreated from the model |


* <a name="_createTestcaseColumnFor"></a>

## _createTestcaseColumnFor(num) ⇒ <code>object</code>
Creates the testcase columns

**Kind**: global function  
**Returns**: <code>object</code> - col  The created column  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>integer</code> | The number of this column |


* <a name="_createFirstColumnFor"></a>

## _createFirstColumnFor(key) ⇒ <code>object</code>
Creates the first header columns

**Kind**: global function  
**Returns**: <code>object</code> - col  The created column  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key name of this column |


* * *

install
=======

With [npm](http://npmjs.org) do:

```shell
npm install 
```

license
=======

BSD-2-Clause
