let assert = require('assert');
import sayHello from '../src/js/lib/someModule';

/* add your test cases here.
 * See https://mochajs.org/ and https://nodejs.org/api/assert.html
 */
describe('some test', () => {
  it('say: Hello World!', function() {
    assert.equal(sayHello(), 'Hello World!', 'Module said hello!');
  });
});