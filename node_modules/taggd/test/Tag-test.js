'use strict';

const assert = require('assert');
const Tag = require('../lib/Tag');

describe('Tag', () => {
  describe('constructor', () => {
    it('should reject invalid names', () => {
      try {
        new Tag();
        assert.equal(true, false);
      } catch (e) {
        assert.equal(e.message, 'A Tag must have a name.');
      }
    });
  });

  describe('#attributeString', () => {
    it('returns an empty string when there are no attributes', () => {
      assert.equal(new Tag('div').attributeString(), '');
    });

    it('works for a single attribute', () => {
      assert.equal(
        new Tag('div', { id: 'abc' }).attributeString(),
        'id="abc"'
      );

      assert.equal(
        new Tag('div', { 'class': 'visible' }).attributeString(),
        'class="visible"'
      );
    });

    it('works for multiple attributes', () => {
      assert.equal(
        new Tag('div', { id: 'abc', tabindex: -1 }).attributeString(),
        'id="abc" tabindex="-1"'
      );

      assert.equal(
        new Tag('div', { id: 'abc', tabindex: -1, 'class': 'visible' }).attributeString(),
        'id="abc" tabindex="-1" class="visible"'
      );
    });

    it('stringifies attribute values', () => {
      assert.equal(
        new Tag('div', { width: 12 }).attributeString(),
        'width="12"'
      );

      assert.equal(
        new Tag('div', { valid: true }).attributeString(),
        'valid="true"'
      );
    });
  });

  describe('#emptyTag', () => {
    it('works when there are no attributes', () => {
      let div = new Tag('div');
      assert.equal(div.emptyTag(), '<div />');

      let span = new Tag('span');
      assert.equal(span.emptyTag(), '<span />');
    });

    it('works when there are attributes', () => {
      let div = new Tag('div', {
        id: 'foo'
      });
      assert.equal(div.emptyTag(), '<div id="foo" />');
    });
  });

  describe('#openingTag', () => {
    it('works when there are no attributes', () => {
      let div = new Tag('div');
      assert.equal(div.openingTag(), '<div>');

      let span = new Tag('span');
      assert.equal(span.openingTag(), '<span>');
    });

    it('works when there are attributes', () => {
      let div = new Tag('div', {
        id: 'foo'
      });
      assert.equal(div.openingTag(), '<div id="foo">');
    });
  });

  describe('#closingTag', () => {
    it('prints a closing tag', () => {
      assert.equal(new Tag('div').closingTag(), '</div>');
      assert.equal(new Tag('span').closingTag(), '</span>');
    });
  });

  describe('#appendChild', () => {
    it('appends a Tag', () => {
      let child = new Tag('li');
      let parent = new Tag('ul');
      parent.appendChild(child);
      assert.equal(parent.children.length, 1);
      assert.equal(parent.children[0], child);

      let child2 = new Tag('li');
      parent.appendChild(child2);
      assert.equal(parent.children.length, 2);
      assert.equal(parent.children[0], child);
      assert.equal(parent.children[1], child2);

      let child3 = new Tag('li');
      parent.appendChild(child3);
      assert.equal(parent.children.length, 3);
      assert.equal(parent.children[0], child);
      assert.equal(parent.children[1], child2);
      assert.equal(parent.children[2], child3);
    });

    it('appends text', () => {
      let parent = new Tag('span');
      parent.appendChild('abc');
      assert.equal(parent.children, 'abc');

      parent.appendChild('def');
      assert.equal(parent.children, 'abcdef');

      parent.appendChild('g');
      assert.equal(parent.children, 'abcdefg');
    });

    it('throws when children are of different types', () => {
      let parent = new Tag('span');
      parent.appendChild('abc');
      assert.throws(
        () => parent.appendChild(new Tag('li')),
        (error) => error.message === 'Cannot mix children of different types. This Tag already has text children.'
      );

      parent = new Tag('ul');
      parent.appendChild(new Tag('li'));
      assert.throws(
        () => parent.appendChild('abc'),
        (error) => error.message === 'Cannot mix children of different types. This Tag already has Tag children.'
      );
    });
  });

  describe('#toString', () => {
    it('encodes an empty tag', () => {
      let empty = new Tag('div');
      assert.equal(empty.toString(), '<div />');
    });

    it('encodes a tag with a single child', () => {
      let parent = new Tag('div', {}, [ new Tag('span', {}, 'hello') ]);
      assert.equal(parent.toString(), '<div><span>hello</span></div>');
    });

    it('encodes a tag with a multiple children', () => {
      let parent = new Tag('ul', {}, [
        new Tag('li', {}, 'apple'),
        new Tag('li', {}, 'banana'),
        new Tag('li', {fruit: false}, 'carrot'),
        new Tag('li', {empty: 1})
      ]);
      assert.equal(parent.toString(), '<ul><li>apple</li><li>banana</li><li fruit="false">carrot</li><li empty="1" /></ul>');
    });
  });
});
