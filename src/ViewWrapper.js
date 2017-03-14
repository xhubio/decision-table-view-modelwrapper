'use strict';

import assert from 'assert';

import { getLogger, sectionTypes } from 'decision-table-model';

import { TESTCASE_NAME_PREFIX, FIELD_SECTION_NAMES, MULTI_ROW_SECTION_NAMES, SUMMARY_SECTION_NAMES } from './Constants';

const FIELD_SECTION = sectionTypes.FIELD_SECTION;
const FIELD_SUB_SECTION = sectionTypes.FIELD_SUB_SECTION;
const MULTI_ROW_SECTION = sectionTypes.MULTI_ROW_SECTION;
const SUMMARY_SECTION = sectionTypes.SUMMARY_SECTION;
const DATA_ROW = sectionTypes.DATA_ROW;

export default class ViewWrapper {
  constructor(table) {
    assert(table);

    // the name of this testcase
    this.table = table;

    this.logger = getLogger();

    this.config = {
      width: {
        c1: 300,
        c2: 300,
        c3: 300,
        c4: 300,
        c5: 300,
        tc: 40
      },
      name: {
        c1: 'Name/Testcase',
        c2: 'Field Name',
        c3: 'Equivalenz Class',
        c4: 'Generator Function',
        c5: 'Comment',
        tc: TESTCASE_NAME_PREFIX
      }
    };

    // stores the columns configuration
    this.columns = undefined;

    // array of rowIds
    this.rowOrder = undefined;

    // the rows stored by there rowId
    this.rows = undefined;

    this.hasSummarySection = false;
  }

  /**
   * Returns the count of rows in this table
   * @return count {integer} The count of available rows
   */
  getRowCount() {
    if (this.rowOrder === undefined) {
      this._buildRows();
    }

    // The header is also a normal row
    return this.rowOrder.length;
  }

  /**
   * Recreates the rows out of the existing model. The data is stored.
   * Each row here is an object with the rowId and the row type. The
   * row itself will be created on demand.
   * in 'this.rows'.
   * rows = [
   *   {
   *     rowId : rowId,
   *     parentRowId : parentRowId
   *     section: sectionObject
   *     rowType : rowType
   *   }
   * ];
   */
  _buildRows() {
    this.rowOrder = [];
    this.rows = {};

    this.table.sectionOrder.forEach(sectionId => {
      const section = this.table.sections[sectionId];
      this._buildSectionRows(section);
    });

  }

  /**
   * Returns true if this table as a summary section
   * @return hasIt {boolean} True if this table already has a summar section
   */
  hasSummarySection() {
    return this.hasSummarySection;
  }

  /**
   * Returns a function which will return true if this table as a summary section
   * @return func {function} A function wich will return true if this table as a summary section
   */
  getFunctionHasSummarySection() {
    return () => {
      return this.hasSummarySection();
    };
  }


  /**
   * Returns the row at the given position
   * @param number {integer} The row number
   * @return row {object} The row object for the given number
   */
  getRowFor(number) {
    if (this.rowOrder === undefined) {
      this._buildRows();
    }

    if (number < this.rowOrder.length) {
      const rowId = this.rowOrder[number];
      return this._createRow(rowId);
    }

    throw new Error(`The index '${number}' is out of range. Only '${this.rows.length}' rows available.`);
  }


  /**
   * Returns a function which will return the row for a given position
   * @return rowGetter {function} A function wich will return the row for a given row number
   */
  getFunctionGetRowFor() {
    return (row) => {
      return this.getRowFor(row);
    };
  }

  /**
   * Returns the row type at the given position
   * @param rowNumber {integer} The row number
   * @return rowType {string} The type of this row
   */
  getRowTypeFor(rowNumber) {
    if (this.rowOrder === undefined) {
      this._buildRows();
    }

    if (rowNumber < this.rowOrder.length) {
      const rowId = this.rowOrder[rowNumber];
      const rowData = this.rows[rowId];
      return rowData.rowType;
    }

    throw new Error(`The index '${rowNumber}' is out of range. Only '${this.rows.length}' rows available.`);
  }


  /**
   * returns the the function 'getRowTypeFor'
   * @return func {function} The function
   */
  getFunctionGetRowTypeFor() {
    return (rowNumber) => {
      return this.getRowTypeFor(rowNumber);
    };
  }


  /**
   * Returns the section type for the given row number.
   * If the row is a data row the containing section type will be returned
   * @param rowNumber {integer} The row number
   * @return sectionType {string} The section type of this row or containing sectio
   */
  getSectionTypeFor(rowNumber) {
    if (this.rowOrder === undefined) {
      this._buildRows();
    }

    if (rowNumber < this.rowOrder.length) {
      const rowId = this.rowOrder[rowNumber];
      let rowData = this.rows[rowId];

      if (rowData.rowType === DATA_ROW) {
        rowData = this.rows[rowData.parentRowId];
      }

      return rowData.rowType;
    }

    throw new Error(`The index '${rowNumber}' is out of range. Only '${this.rows.length}' rows available.`);
  }

  /**
   * returns the the function 'getSectionTypeFor'
   * @return func {function} The function
   */
  getFunctionGetSectionTypeFor() {
    return (rowNumber) => {
      return this.getSectionTypeFor(rowNumber);
    };
  }


  /**
   * Creates the row for a given reference.
   *   rowData = {
   *     rowId : rowId,
   *     parentRowId : parentRowId
   *     section: sectionObject
   *     rowType : rowType
   *     c1 .. c4 : first columns
   *     1..n :  testcase data
   *   }
   * @param rowId {string} The rowId of the row to be created
   * @return row {object} The row as needed for the view
   */
  _createRow(rowId) {
    assert(rowId);

    let names = [];
    const rowData = this.rows[rowId];
    assert(rowData);

    if (rowData.rowType === FIELD_SECTION) {
      names = [rowData.section.name, ...FIELD_SECTION_NAMES];
    } else if (rowData.rowType === FIELD_SUB_SECTION) {
      names = [rowData.section.name];
    } else if (rowData.rowType === MULTI_ROW_SECTION) {
      names = [rowData.section.name, ...MULTI_ROW_SECTION_NAMES];
    } else if (rowData.rowType === SUMMARY_SECTION) {
      names = [...SUMMARY_SECTION_NAMES];
    }
    const row = this._getRow(rowData.rowId, names);
    this._addTestcaseDataForRow(row, rowData.rowId);

    if (rowData.rowType === DATA_ROW) {
      const parentRowData = this.rows[rowData.parentRowId];
      const prentRowType = parentRowData.rowType;
      if (prentRowType === FIELD_SUB_SECTION) {
        if (parentRowData.section.equivalenceClasses[rowId]) { row.c2 = parentRowData.section.equivalenceClasses[rowId]; }
        if (parentRowData.section.tdgs[rowId]) { row.c3 = parentRowData.section.tdgs[rowId]; }
        if (parentRowData.section.comments[rowId]) { row.c4 = parentRowData.section.comments[rowId]; }
      } else if (prentRowType === MULTI_ROW_SECTION) {
        // MultiRowSection
        if (parentRowData.section.keys[rowId]) { row.c2 = parentRowData.section.keys[rowId]; }
        if (parentRowData.section.others[rowId]) { row.c3 = parentRowData.section.others[rowId]; }
        if (parentRowData.section.comments[rowId]) { row.c4 = parentRowData.section.comments[rowId]; }
      }
    } else if (rowData.rowType === SUMMARY_SECTION) {
      // MultiRowSection
      if (rowData.section.total) { row.c2 = rowData.section.total + ' Total testcases'; }
      if (rowData.section.done) { row.c3 = rowData.section.done + ' Done testcases'; }
      if (rowData.section.percent) { row.c4 = rowData.section.percent + '%'; }
    }
    return row;
  }

  /**
   * The generic data row creater for the sections
   * @param rowId {string} The row ID of the row to be build
   * @return row {object} The row to be added to the tree model
   */
  _getRow(rowId, names) {
    const myRow = { id: rowId };

    let i = 1;
    names.forEach(name => {
      myRow['c' + i] = name;
      i++;
    });

    return myRow;
  }



  /**
   * Adds the testcase data for a data row. Adds the data to the given row object
   * @param row {object} The created row for the tree model without the testcase data
   * @param rowId {string} The row ID of the row to be build
   */
  _addTestcaseDataForRow(row, rowId) {
    for (let i = 0; i < this.table.testcaseOrder.length; i++) {
      const tcId = this.table.testcaseOrder[i];
      const tc = this.table.testcases[tcId];
      if (tc.data[rowId] !== undefined) {
        row[TESTCASE_NAME_PREFIX + (i + 1)] = tc.data[rowId];
      }
    }
  }



  /**
   * Build the rows for a section. If the section is a field section
   * it will recurse. The data will be added to the given parent object
   * @param section {object} The section to get the rowIDs from
   * @param parentId {string} The parent section rowId
   */
  _buildSectionRows(section, parentId) {
    assert(section);
    const rowId = section.headerRow;
    const rowType = section.sectionType;

    this.logger.debug({ message: `Work on section ${section.name}`, sectionType: section.sectionType, function: '_buildSectionRows', sheet: this.table.name });

    const row = {
      rowId,
      rowType,
      section
    };

    if (parentId !== undefined) {
      row.parentRowId = parentId;
    }

    this.rowOrder.push(rowId);
    this.rows[rowId] = row;

    if (rowType === FIELD_SECTION) {
      section.dataRows.forEach(subRowId => {
        const subSection = section.subSections[subRowId];
        assert(subSection);
        this._buildSectionRows(subSection, subRowId);
      });
    } else if (rowType === SUMMARY_SECTION) {
      this.hasSummarySection = true;
    } else if (rowType === FIELD_SUB_SECTION || rowType === MULTI_ROW_SECTION) {
      for (let i = 0; i < section.dataRows.length; i++) {
        const subRowId = section.dataRows[i];
        const subRow = {
          rowId: subRowId,
          parentRowId: section.headerRow,
          rowType: DATA_ROW,
          rowNum: i
        };

        this.rowOrder.push(subRowId);
        this.rows[subRowId] = subRow;
      }
    }
  }


  /**
   * Returns the columns of this table as it needed by the grid view
   * @param reload {boolean} If true then the columns will be recreated from the model
   * @return columns {array} An array of column objects
   */
  getColumns(reload) {

    if (this.columns === undefined || reload) {
      this.logger.debug({ message: `Reload the columns`, function: 'getColumns' });

      const columns = [];

      // create the first columns
      for (let i = 1; i < 6; i++) {
        columns.push(this._createFirstColumnFor('c' + i));
      }
      // create the testcase columns
      for (let i = 1; i <= this.table.testcaseOrder.length; i++) {
        columns.push(this._createTestcaseColumnFor(i));
      }

      this.columns = columns;
    }

    return this.columns;
  }

  /**
   * Creates the testcase columns
   * @param num {integer} The number of this column
   * @return col {object} The created column
   */
  _createTestcaseColumnFor(num) {
    const width = this.config.width.tc;
    const name = this.config.name.tc; // the name prefix

    assert(width);

    const col = {
      key: TESTCASE_NAME_PREFIX + num,
      name: name + num
    };
    return col;
  }

  /**
   * Creates the first header columns
   * @param key {string} The key name of this column
   * @return col {object} The created column
   */
  _createFirstColumnFor(key) {
    const width = this.config.width[key];
    const name = this.config.name[key];

    assert(width);
    assert(name);

    const col = {
      key,
      name
    };
    return col;
  }

}
