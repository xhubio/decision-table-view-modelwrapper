'use strict';

import { assert } from 'chai';

import { getLogger, sectionTypes } from 'decision-table-model';

import ViewWrapper from '../lib/ViewWrapper';
import tableData from './fixtures/table_createPerson.json';

import { TESTCASE_NAME_PREFIX } from '../lib/Constants';

const FIELD_SECTION = sectionTypes.FIELD_SECTION;
const FIELD_SUB_SECTION = sectionTypes.FIELD_SUB_SECTION;
const MULTI_ROW_SECTION = sectionTypes.MULTI_ROW_SECTION;
const SUMMARY_SECTION = sectionTypes.SUMMARY_SECTION;
const DATA_ROW = sectionTypes.DATA_ROW;

const logger = getLogger();
logger.writeConsole = false;


describe('ViewWrapper', () => {

  describe('Columns', () => {
    it('_createFirstColumns', () => {
      const column = getWrapper()._createFirstColumnFor('c2');
      assert.deepEqual(column, {
        key: 'c2',
        name: 'Field Name'
      });
    });

    it('_createTestcaseColumnFor no name', () => {
      const column = getWrapper()._createTestcaseColumnFor(4);
      assert.deepEqual(column, {
        key: TESTCASE_NAME_PREFIX + '4',
        name: '4'
      });
    });

    it('_createTestcaseColumnFor with name', () => {
      const wrapper = getWrapper();
      wrapper.config.name.tc = 'gum_';
      const column = wrapper._createTestcaseColumnFor(4);
      assert.deepEqual(column, {
        key: TESTCASE_NAME_PREFIX + '4',
        name: 'gum_4'
      });
    });

    it('getColumns', () => {
      const wrapper = getWrapper();
      const columns = wrapper.getColumns();
      assert.equal(columns.length, 41);

      assert.deepEqual(columns[8], {
        key: TESTCASE_NAME_PREFIX + '4',
        name: '4'
      });
    });

  });

  describe('Rows', () => {
    it('_buildRows()', () => {
      const wrapper = getWrapper();
      wrapper._buildRows();

      assert.equal(wrapper.getRowCount(), 67);
    });

    it('getRowFor()', () => {
      const wrapper = getWrapper();
      // checks each row
      for (let i = 0; i < wrapper.getRowCount(); i++) {
        const expectedRow = getRowForNumber(i);
        const actualRow = wrapper.getRowFor(i);
        delete actualRow.id;
        assert.deepEqual(actualRow, expectedRow, `Error in row ${i}`);
      }
    });

    it('getFunctionGetRowFor()', () => {
      const wrapper = getWrapper();
      const rowGetter = wrapper.getFunctionGetRowFor();
      // checks each row
      for (let i = 0; i < wrapper.getRowCount(); i++) {
        const expectedRow = getRowForNumber(i);
        const actualRow = rowGetter(i);
        delete actualRow.id;
        assert.deepEqual(actualRow, expectedRow, `Error in row ${i}`);
      }
    });

    it('getRowTypeFor()', () => {
      const wrapper = getWrapper();
      // does some sanity checks for different row types
      assert.equal(wrapper.getRowTypeFor(3), MULTI_ROW_SECTION);
      assert.equal(wrapper.getRowTypeFor(7), FIELD_SECTION);
      assert.equal(wrapper.getRowTypeFor(12), FIELD_SUB_SECTION);
      assert.equal(wrapper.getRowTypeFor(58), SUMMARY_SECTION);
      assert.equal(wrapper.getRowTypeFor(24), DATA_ROW);
      assert.equal(wrapper.getRowTypeFor(66), DATA_ROW);
    });

    it('getFunctionGetRowTypeFor()', () => {
      const wrapper = getWrapper();
      const func = wrapper.getFunctionGetRowTypeFor();
      // does some sanity checks for different row types
      assert.equal(func(3), MULTI_ROW_SECTION);
      assert.equal(func(7), FIELD_SECTION);
      assert.equal(func(12), FIELD_SUB_SECTION);
      assert.equal(func(58), SUMMARY_SECTION);
      assert.equal(func(24), DATA_ROW);
      assert.equal(func(66), DATA_ROW);
    });

    it('getSectionTypeFor()', () => {
      const wrapper = getWrapper();
      // does some sanity checks for different row types
      for (let i = 0; i < expectedSectionTypes.length; i++) {
        assert.equal(wrapper.getSectionTypeFor(i), expectedSectionTypes[i], `Missmatch in row ${i}`);
      }
    });

    it('getFunctionGetSectionTypeFor()', () => {
      const wrapper = getWrapper();
      const func = wrapper.getFunctionGetSectionTypeFor();
      // does some sanity checks for different row types
      for (let i = 0; i < expectedSectionTypes.length; i++) {
        assert.equal(func(i), expectedSectionTypes[i], `Missmatch in row ${i}`);
      }
    });



  });

});


/**
 * Helper function to create a full loaded wrapper object
 */
function getWrapper() {
  const table = {};
  Object.assign(table, tableData);
  return new ViewWrapper(table);
}

/**
 * Creates the expected data for a given row number
 */
function getRowForNumber(rowNum) {
  const rowData = DATA[rowNum];
  const row = {};
  for (let i = 0; i < HEADER.length; i++) {
    const key = HEADER[i];
    const val = rowData[i];
    if (val) {
      row[key] = val;
    }
  }

  return row;
}

const expectedSectionTypes = [
  MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION,
  FIELD_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  FIELD_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION, FIELD_SUB_SECTION,
  SUMMARY_SECTION,
  MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION, MULTI_ROW_SECTION
];

/* eslint-disable */
const HEADER = ['c1', 'c2', 'c3', 'c4', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
const DATA = [
  ['Execute', 'Key', 'Other', 'Comment', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Yes', '', '', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '', '', 'x', '', 'x', ''],
  ['', 'No ', '', '', '', '', '', '', '', '', '', '', '', '', '', 'x', '', '', '', '', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', 'x', '', '', '', 'x', 'x'],
  ['Group', 'Key', 'Other', 'Comment', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Master part', '', '', 'x', '', '', '', '', '', '', '', '', '', 'x', '', 'x', 'x', '', '', 'x', 'x', 'x', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Other', '', '', '', 'x', '', '', 'x', '', 'x', 'x', '', 'x', 'x', '', '', 'x', 'x', 'x', 'x', '', '', 'x', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Group B', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['Secondary data', 'Equivalence Class', 'Generator Function', 'Comment', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
  ['person', '', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
  ['', 'Person exists', '', '', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'x', 'x'],
  ['', 'Person is New', '', '', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', 'x', '', ''],
  ['Primary data', 'Equivalence Class', 'Generator Function', 'Comment', 21000, 21000, 21000, 21000, 21000, 21000, 3000, 3000, 3000, 3000, 3000, 3000, 750, 750, 500, 200, 200, 200, 80, 80, 80, 32, 32, 32, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4],
  ['first-name', '', '', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ['', 'valid', '', 'A valid first name', '', '', '', '', '', '', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['', 'empty', '', 'No value given', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too short', '', 'The value is too short', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too long', '', 'The value is too long', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'number', '', 'Only a number is given', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'date', '', 'A valid date was given', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'boolean', '', 'A boolean value is given', '', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['last-name', '', '', '', 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ['', 'valid', '', 'A valid last name', 'a', 'e', 'e', 'e', 'e', 'e', '', '', '', '', '', '', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too short', '', 'The value is too short', 'e', 'e', 'e', 'e', 'e', 'e', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too long', '', 'The value is too long', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'number', '', 'Only a number is given', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'date', '', 'A valid date was given', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'boolean', '', 'A boolean value is given', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['email', '', '', '', 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ['', 'valid', '', 'A valid email is given', 'a', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
  ['', 'too long', '', 'The value is too long', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'not an email', '', 'This given value does not match the email format', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['date-of-birth', '', '', '', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ['', 'valid', '', 'A valid date is given', 'a', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
  ['', 'not a date', '', 'This given value does not match a valid date format', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['country', '', '', '', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ['', 'valid', '', 'A valid country', 'a', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', 'e', 'e', 'e', 'e', 'e', 'e', '', 'x', 'x', '', '', 'x', 'x', '', 'x', '', 'x', ''],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', 'x', 'x', '', '', 'x', '', 'x', '', 'x'],
  ['', 'too short', '', 'The value is too short', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too long', '', 'The value is too long', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'country not valid', '', 'The given country or country code does not exists', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['city', '', '', '', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ['', 'valid', '', 'A valid city in the given country', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', 'e', 'e', 'e', 'x', '', 'x', '', 'x', '', 'x', '', 'x', '', 'x', ''],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', 'e', 'e', 'e', '', 'x', '', 'x', '', 'x', '', 'x', '', 'x', '', 'x'],
  ['', 'too short', '', 'The value is too short', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too long', '', 'The value is too long', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'city not valid', '', 'The given city does not exists in the given country', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['street', '', '', '', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ['', 'valid', '', 'A valid street in the given city', 'a', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', 'x', 'x', '', 'x', '', '', 'x', '', 'x', '', 'x', ''],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', '', '', '', 'x', '', 'x', 'x', '', 'x', '', 'x', '', 'x'],
  ['', 'too short', '', 'The value is too short', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'too long', '', 'The value is too long', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'street not valid', '', 'The given street does not exists in the given city', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['id', '', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
  ['', 'an id given', '', 'The id exists', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'x', 'x', '', '', '', ''],
  ['', 'empty', '', 'No value given', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '', '', 'x', 'x', 'x', 'x'],
  ['Summary', '294000 Total testcases', '294000 Done testcases', '100%', 42000, 42000, 42000, 42000, 42000, 42000, 6000, 6000, 6000, 6000, 6000, 6000, 1500, 1500, 1000, 400, 400, 400, 160, 160, 160, 64, 64, 64, 16, 16, 16, 16, 16, 16, 8, 8, 4, 4, 4, 4],
  ['Result', 'Key', 'Other', 'Comment', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Key 1', 'Comment 1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Key 2', 'Error message here', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Key 3', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Key 4', 'Warning message here', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['Effect', 'Key', 'Other', 'Comment', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', 'Abort action', '', '', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '', '', 'x', 'x'],
  ['', 'Create new Person record', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'x', 'x', '', ''],
];
