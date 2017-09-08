/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';

var React = require('react');
var ReactTestRenderer = require('react-test-renderer');
var prettyFormat = require('pretty-format');

// Kind of hacky, but we nullify all the instances to test the tree structure
// with jasmine's deep equality function, and test the instances separate. We
// also delete children props because testing them is more annoying and not
// really important to verify.
function cleanNode(node) {

  if (!node) {
    return;
  }

  if (Array.isArray(node)) {
    node.forEach(cleanNode);
    return;
  }

  if (node && node.instance) {
    node.instance = null;
  }
  if (node && node.props && node.props.children) {
    // eslint-disable-next-line no-unused-vars
    var {children, ...props} = node.props;
    node.props = props;
  }
  if (Array.isArray(node.rendered)) {
    node.rendered.forEach(cleanNode);
  } else if (typeof node.rendered === 'object') {
    cleanNode(node.rendered);
  }
}

const Wrap = ({children}) => children;
const Wrap2 = ({children}) => <div>children</div>;
const Wrap3 = ({children}) => <div>{children}</div>;
const Wrap4 = ({children}) => [...children, <div>Three</div>];
class Foo extends React.Component {
  render() {
    return [...this.props.children, <div key="3">333</div>];
  }
}

// describe('Test', () => {
//   it('renders 2 div', () => {
//     const rendered = ReactTestRenderer.create(
//       <Wrap>
//         <div>One</div>
//         <div>Two</div>
//       </Wrap>,
//     );
//
//     var tree = rendered.toTree();
//     cleanNode(tree);
//     console.log(prettyFormat(tree));
//   });
// });

// describe('Test2', () => {
//   it('renders 2 div', () => {
//     const rendered = ReactTestRenderer.create(
//       <div>
//         <Wrap>
//           <div>One</div>
//           <div>Two</div>
//           <Wrap>
//             <div>Three</div>
//           </Wrap>
//         </Wrap>
//         <div>Four</div>
//       </div>,
//     );
//
//     var tree = rendered.toTree();
//     cleanNode(tree);
//     console.log(prettyFormat(tree));
//   });
// });

// describe('Test3', () => {
//   it('renders 2 div', () => {
//     const rendered = ReactTestRenderer.create(
//       <Foo>
//         <div key="1">One</div>
//         <div key="2">Two</div>
//       </Foo>,
//     );
//
//     var tree = rendered.toTree();
//     cleanNode(tree);
//     console.log(prettyFormat(tree));
//   });
// });

// describe('Test2', () => {
//   it('renders 2 div', () => {
//     const rendered = ReactTestRenderer.create(
//       <div>
//         <Wrap3>
//           <div>One</div>
//           <div>Two</div>
//         </Wrap3>
//         <div>Three</div>
//       </div>,
//     );
//
//     var tree = rendered.toTree();
//     cleanNode(tree);
//     console.log(prettyFormat(tree));
//   });
// });
