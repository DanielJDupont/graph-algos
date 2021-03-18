import { depthFirstSearch, breadthFirstSearch } from './algorithms';

test('Expect depth first search to work with no input.', () => {
  expect(depthFirstSearch('0 0', [], () => {}));
});

test('Expect breadth first search to work with no input.', () => {
  expect(breadthFirstSearch('0 0', [], () => {}));
});
