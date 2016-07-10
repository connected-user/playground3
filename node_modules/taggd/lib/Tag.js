'use strict';

const tagType = Symbol('tag');
const textType = Symbol('text');

class Tag {
  constructor(name, attributes, children) {
    if (!name || typeof name !== 'string') {
      throw new Error('A Tag must have a name.');
    }
    this.name = name;
    this.attributes = attributes || {};
    this.children = null;
    this.parent = null;
    this.childType = null;
    if (children) {
      if (Array.isArray(children)) {
        children.forEach(c => this.appendChild(c));
      } else {
        this.appendChild(children);
      }
    }
  }

  appendChild(child) {
    if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
      if (this.childType === null || this.childType === textType) {
        this.childType = textType;
        this.children = (this.children || '') + String(child);
        return this;
      } else {
        throw new Error('Cannot mix children of different types. This Tag already has Tag children.');
      }
    } else if (typeof child === 'object' && child instanceof Tag) {
      if (this.childType === null || this.childType === tagType) {
        this.childType = tagType;
        this.children = (this.children || []).concat([child]);
        return this;
      } else {
        throw new Error('Cannot mix children of different types. This Tag already has text children.');
      }
    } else {
      throw new Error('Invalid child type. It must either be text or a Tag object.');
    }
  }

  attributeString() {
    let attributes = [];
    for (let attr in this.attributes) {
      attributes.push(attr + '="' + String(this.attributes[attr]) + '"');
    }
    return attributes.join(' ');
  }

  emptyTag() {
    let tag = '<' + this.name;
    let attributes = this.attributeString();
    if (attributes.length > 0) {
      tag += ' ' + attributes;
    }
    tag += ' />';
    return tag;
  }

  openingTag() {
    let tag = '<' + this.name;
    let attributes = this.attributeString();
    if (attributes.length > 0) {
      tag += ' ' + attributes;
    }
    tag += '>';
    return tag;
  }

  closingTag() {
    return '</' + this.name + '>';
  }

  toString() {
    if (!this.children) {
      return this.emptyTag();
    }
    let contents = typeof this.children === 'string' ?
      this.children :
      this.children.map(c => c.toString()).join('');
    return (
      this.openingTag() +
      contents +
      this.closingTag()
    );
  }
}

module.exports = Tag;
