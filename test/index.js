/* @flow */

import './lib/testdom';
import assert from 'assert';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {MenuList, MenuItem} from '../src';

describe('MenuList', function() {
  it('cursor movement works', sinon.test(function() {
    this.slow();
    this.spy(window, 'addEventListener');
    this.spy(window, 'removeEventListener');

    const mountPoint = document.createElement('div');
    const root: MenuList = (ReactDOM.render(
      <MenuList>
        <MenuItem onHighlightChange={sinon.spy()}>A</MenuItem>
        <div>
          <MenuItem onHighlightChange={sinon.spy()}>B</MenuItem>
        </div>
        <MenuItem onHighlightChange={sinon.spy()}>C</MenuItem>
      </MenuList>,
      mountPoint
    ): any);

    const menuListItems = TestUtils.scryRenderedComponentsWithType(root, MenuItem);

    assert.deepEqual(
      menuListItems.map(c=>c.props.children),
      ['A', 'B', 'C']
    );

    const keydownCaptureHandlers = window.addEventListener.args.filter(args =>
      args[0] === 'keydown' && args[2]
    ).map(args => args[1]);
    assert.strictEqual(keydownCaptureHandlers.length, 1);

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args, []);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args, []);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args, []);

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowDown',
      which: 40,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args, [[true, {byKeyboard: true}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args, []);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args, []);

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowDown',
      which: 40,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args, [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args, [[true, {byKeyboard: true}]]);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args, []);

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowDown',
      which: 40,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args, [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args, [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args, [[true, {byKeyboard: true}]]);

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowDown',
      which: 40,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args, [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args, [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args, [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);

    // Up time

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowUp',
      which: 38,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}]]);

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowUp',
      which: 38,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}]]);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);

    keydownCaptureHandlers[0]({
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      key: 'ArrowUp',
      which: 38,
      target: document.body
    });

    assert.deepEqual(menuListItems[0].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}]]);
    assert.deepEqual(menuListItems[1].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);
    assert.deepEqual(menuListItems[2].props.onHighlightChange.args,
      [[true, {byKeyboard: true}], [false, {byKeyboard: undefined}], [true, {byKeyboard: true}], [false, {byKeyboard: undefined}]]);

  }));
});
