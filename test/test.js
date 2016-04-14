/**
 * Dependencies
 */
import {assert} from 'chai';
import loopback from 'loopback';
import mixin from '../src';
/**
 * Lets define a loopback application
 */
const app = loopback;
app.loopback = loopback;
mixin(app);
/**
 * Create Data Source and Models
 **/
const DataSource = app.createDataSource({ connector: app.Memory });
const Post = DataSource.createModel('Post', { 
    id: { type: Number, generated: true, id: true },
    text: String }, {  mixins: { Likes: true }
});
const User = DataSource.createModel('User', { 
    id: { type: Number, generated: true, id: true },
    name: String }
);
/**
 * Populate
 */
var user, post;
Post
.create({ text: 'a' })
.then(result => {
  post = result;
  return User.create({ name: 'tester' });
})
.then(result => {
  user = result;
  return Post.like(post.id, user.id);
});
/**
 * Start Tests
 */
describe('Loopback Likes Mixin)', () => {
  // It verifies the posts are created
  it('verifies if post is successfully liked', () => Post.findOne().then(post => {
    assert.lengthOf(post.likes.users, 1);
    assert.equal(post.likes.total, 1);
    assert.equal(post.likes.users.shift(), user.id);
  }));
});