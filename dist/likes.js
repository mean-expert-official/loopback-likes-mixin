'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
module.exports = function (Model, ctx) {
  // Set default values for ctx
  ctx = (0, _assign2.default)({
    method: 'like',
    endpoint: '/:id/like',
    likes: 'likes',
    userModel: 'User',
    description: 'Likes or dislikes ' + Model.definition.name + ' instance for the given userId'
  }, ctx);
  // Define likes property name
  Model.defineProperty(ctx.likes, { type: Object, default: { total: 0, users: [] } });
  // Add Like method
  Model[ctx.method] = function (id, userId, finish) {
    // Verify that current model instance and user instances exists
    return new _promise2.default(function (resolve, reject) {
      _async2.default.parallel({
        modelInstance: function modelInstance(next) {
          return Model.findById(id, next);
        },
        userInstance: function userInstance(next) {
          return Model.dataSource.models[ctx.userModel].findById(userId, next);
        }
      }, function (err, results) {
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
        var index = results.modelInstance[ctx.likes].users.indexOf(userId);
        // If user didnt liked before this instance we add a new like
        if (index < 0) {
          results.modelInstance[ctx.likes].users.push(userId);
          // Else we remove the like
        } else {
            results.modelInstance[ctx.likes].users.splice(index, 1);
          }
        results.modelInstance[ctx.likes].total = results.modelInstance[ctx.likes].users.length;
        results.modelInstance.save(function (saveerr, result) {
          if (saveerr) reject(saveerr);
          if (typeof finish === 'function') finish(err, result);
          resolve(result);
        });
      });
    });
  };
  // Endpoint settings
  Model.remoteMethod(ctx.method, {
    accepts: [{ arg: 'id', type: 'string', required: true }, { arg: 'userId', type: 'string', required: true }],
    returns: { root: true, type: 'object' },
    http: { path: ctx.endpoint, verb: 'get' },
    description: ctx.description
  });
}; /**
    * Likes Mixin Dependencies
    */
//# sourceMappingURL=data:application/json;base64,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QU8sT0FBUCxFQUFiO0FBQ0EsY0FBSSxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsRUFBOEIsT0FBTyxHQUFQLEVBQVksTUFBWixFQUFsQztBQUNBLGtCQUFRLE1BQVIsRUFIOEM7U0FBckIsQ0FBM0IsQ0ExQm1CO09BQWxCLENBSEgsQ0FEc0M7S0FBckIsQ0FBbkIsQ0FGK0M7R0FBN0I7O0FBWlcsT0FxRC9CLENBQU0sWUFBTixDQUFtQixJQUFJLE1BQUosRUFBWTtBQUM3QixhQUFTLENBQ1AsRUFBRSxLQUFLLElBQUwsRUFBVyxNQUFNLFFBQU4sRUFBZ0IsVUFBVSxJQUFWLEVBRHRCLEVBRVAsRUFBRSxLQUFLLFFBQUwsRUFBZSxNQUFNLFFBQU4sRUFBZ0IsVUFBVSxJQUFWLEVBRjFCLENBQVQ7QUFJQSxhQUFTLEVBQUUsTUFBTSxJQUFOLEVBQVksTUFBTSxRQUFOLEVBQXZCO0FBQ0EsVUFBTSxFQUFFLE1BQU0sSUFBSSxRQUFKLEVBQWMsTUFBTSxLQUFOLEVBQTVCO0FBQ0EsaUJBQWEsSUFBSSxXQUFKO0dBUGYsRUFyRCtCO0NBQWhCIiwiZmlsZSI6Imxpa2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMaWtlcyBNaXhpbiBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbi8qKlxuICAqIExpa2VzIE1peGluXG4gICogQEF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBTZWUgPGh0dHBzOi8vdHdpdHRlci5jb20vam9obmNhc2FycnViaWFzPlxuICAqIEBTZWUgPGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2xvb3BiYWNrLWxpa2VzLW1peGluPlxuICAqIEBTZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25hdGhhbi1jYXNhcnJ1Ymlhcy9sb29wYmFjay1saWtlcy1taXhpbj5cbiAgKiBARGVzY3JpcHRpb25cbiAgKlxuICAqIFRoZSBmb2xsb3dpbmcgbWl4aW4gd2lsbCBhZGQgZnVuY3Rpb25hbGxpdHkgdG8gbGlrZSBhbmQgZGlzbGlrZSB0aGUgbW9kZWwgaW5zdGFuY2VcbiAgKiovXG5tb2R1bGUuZXhwb3J0cyA9IChNb2RlbCwgY3R4KSA9PiB7XG4gIC8vIFNldCBkZWZhdWx0IHZhbHVlcyBmb3IgY3R4XG4gIGN0eCA9IE9iamVjdC5hc3NpZ24oe1xuICAgIG1ldGhvZDogJ2xpa2UnLFxuICAgIGVuZHBvaW50OiAnLzppZC9saWtlJyxcbiAgICBsaWtlczogJ2xpa2VzJyxcbiAgICB1c2VyTW9kZWw6ICdVc2VyJyxcbiAgICBkZXNjcmlwdGlvbjogJ0xpa2VzIG9yIGRpc2xpa2VzICcgKyBNb2RlbC5kZWZpbml0aW9uLm5hbWUgKyAnIGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gdXNlcklkJyxcbiAgfSwgY3R4KTtcbiAgLy8gRGVmaW5lIGxpa2VzIHByb3BlcnR5IG5hbWVcbiAgTW9kZWwuZGVmaW5lUHJvcGVydHkoY3R4Lmxpa2VzLCB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogeyB0b3RhbDogMCwgdXNlcnM6IFtdIH0gfSk7XG4gIC8vIEFkZCBMaWtlIG1ldGhvZFxuICBNb2RlbFtjdHgubWV0aG9kXSA9IGZ1bmN0aW9uKGlkLCB1c2VySWQsIGZpbmlzaCkge1xuICAgIC8vIFZlcmlmeSB0aGF0IGN1cnJlbnQgbW9kZWwgaW5zdGFuY2UgYW5kIHVzZXIgaW5zdGFuY2VzIGV4aXN0c1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhc3luYy5wYXJhbGxlbCh7XG4gICAgICAgIG1vZGVsSW5zdGFuY2U6IG5leHQgPT4gTW9kZWwuZmluZEJ5SWQoaWQsIG5leHQpLFxuICAgICAgICB1c2VySW5zdGFuY2U6IG5leHQgPT4gTW9kZWwuZGF0YVNvdXJjZS5tb2RlbHNbY3R4LnVzZXJNb2RlbF0uZmluZEJ5SWQodXNlcklkLCBuZXh0KSxcbiAgICAgIH0sIChlcnIsIHJlc3VsdHMpID0+IHtcbiAgICAgICAgLy8gSGFuZGxlIEVycm9yc1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaW5pc2ggPT09ICdmdW5jdGlvbicpIGZpbmlzaChlcnIpO1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXN1bHRzLm1vZGVsSW5zdGFuY2UpIHtcbiAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoJ05vIE1vZGVsIGluc3RhbmNlIG9mICcgKyBNb2RlbC5kZWZpbml0aW9uLm5hbWUgKyAnIHdpdGggaWQgJyArIGlkICsgJyB3YXMgZm91bmQnKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpbmlzaCA9PT0gJ2Z1bmN0aW9uJykgZmluaXNoKGVycik7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3VsdHMubW9kZWxJbnN0YW5jZSkge1xuICAgICAgICAgIGVyciA9IG5ldyBFcnJvcignTm8gTW9kZWwgaW5zdGFuY2Ugb2YgJyArIGN0eC51c2VyTW9kZWwgKyAnIHdpdGggaWQgJyArIHVzZXJJZCArICcgd2FzIGZvdW5kJyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaW5pc2ggPT09ICdmdW5jdGlvbicpIGZpbmlzaChlcnIpO1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IGluZGV4IG9mIHVzZXIgbGlrZSBpbiBhcnJheSwgaWYgYW55XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmVzdWx0cy5tb2RlbEluc3RhbmNlW2N0eC5saWtlc10udXNlcnMuaW5kZXhPZih1c2VySWQpO1xuICAgICAgICAvLyBJZiB1c2VyIGRpZG50IGxpa2VkIGJlZm9yZSB0aGlzIGluc3RhbmNlIHdlIGFkZCBhIG5ldyBsaWtlXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICByZXN1bHRzLm1vZGVsSW5zdGFuY2VbY3R4Lmxpa2VzXS51c2Vycy5wdXNoKHVzZXJJZCk7XG4gICAgICAgICAgLy8gRWxzZSB3ZSByZW1vdmUgdGhlIGxpa2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLm1vZGVsSW5zdGFuY2VbY3R4Lmxpa2VzXS51c2Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMubW9kZWxJbnN0YW5jZVtjdHgubGlrZXNdLnRvdGFsID0gcmVzdWx0cy5tb2RlbEluc3RhbmNlW2N0eC5saWtlc10udXNlcnMubGVuZ3RoO1xuICAgICAgICByZXN1bHRzLm1vZGVsSW5zdGFuY2Uuc2F2ZSgoc2F2ZWVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHNhdmVlcnIpIHJlamVjdChzYXZlZXJyKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpbmlzaCA9PT0gJ2Z1bmN0aW9uJykgZmluaXNoKGVyciwgcmVzdWx0KTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIC8vIEVuZHBvaW50IHNldHRpbmdzXG4gIE1vZGVsLnJlbW90ZU1ldGhvZChjdHgubWV0aG9kLCB7XG4gICAgYWNjZXB0czogW1xuICAgICAgeyBhcmc6ICdpZCcsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgeyBhcmc6ICd1c2VySWQnLCB0eXBlOiAnc3RyaW5nJywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBdLFxuICAgIHJldHVybnM6IHsgcm9vdDogdHJ1ZSwgdHlwZTogJ29iamVjdCcgfSxcbiAgICBodHRwOiB7IHBhdGg6IGN0eC5lbmRwb2ludCwgdmVyYjogJ2dldCcgfSxcbiAgICBkZXNjcmlwdGlvbjogY3R4LmRlc2NyaXB0aW9uLFxuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
