/**
 * Likes Mixin Dependencies
 */
import async from 'async';
/**
  * Likes Mixin
  * @Author Jonathan Casarrubias
  * @See <https://twitter.com/johncasarrubias>
  * @See <https://www.npmjs.com/package/loopback-likes-mixin>
  * @See <https://github.com/jonathan-casarrubias/loopback-likes-mixin>
  * @Description
  *
  * The following mixin will add functionallity to like and dislike the model instance
  **/
module.exports = (Model, ctx) => {
  // Set default values for ctx
  ctx = Object.assign({
    method: 'like',
    endpoint: '/:id/like',
    likes: 'likes',
    userModel: 'User',
    description: 'Likes or dislikes ' + Model.definition.name + ' instance for the given userId',
  }, ctx);
  // Define likes property name
  Model.defineProperty(ctx.likes, { type: Object, default: { total: 0, users: [] } });
  // Add Like method
  Model[ctx.method] = function(id, userId, finish) {
    // Verify that current model instance and user instances exists
    return new Promise((resolve, reject) => {
      async.parallel({
        modelInstance: next => Model.findById(id, next),
        userInstance: next => Model.dataSource.models[ctx.userModel].findById(userId, next),
      }, (err, results) => {
        // Handle Errors
        if (err) {
          if (typeof finish === 'function') finish(err);
          return resolve(err);
        }
        if (!results.modelInstance) {
          err = new Error('No Model instance of ' + Model.definition.name + ' with id ' + id + ' was found');
          if (typeof finish === 'function') finish(err);
          return resolve(err);
        }
        if (!results.modelInstance) {
          err = new Error('No Model instance of ' + ctx.userModel + ' with id ' + userId + ' was found');
          if (typeof finish === 'function') finish(err);
          return resolve(err);
        }
        // Get index of user like in array, if any
        const index = results.modelInstance[ctx.likes].users.indexOf(userId);
        // If user didnt liked before this instance we add a new like
        if (index < 0) {
          results.modelInstance[ctx.likes].users.push(userId);
          // Else we remove the like
        } else {
          results.modelInstance[ctx.likes].users.splice(index, 1);
        }
        results.modelInstance[ctx.likes].total = results.modelInstance[ctx.likes].users.length;
        results.modelInstance.save((saveerr, result) => {
          if (saveerr) reject(saveerr);
          if (typeof finish === 'function') finish(err, result);
          resolve(result);
        });
      });
    });
  };
  // Endpoint settings
  Model.remoteMethod(ctx.method, {
    accepts: [
      { arg: 'id', type: 'string', required: true },
      { arg: 'userId', type: 'string', required: true },
    ],
    returns: { root: true, type: 'object' },
    http: { path: ctx.endpoint, verb: 'get' },
    description: ctx.description,
  });
};
