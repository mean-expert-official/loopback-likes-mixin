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
          return reject(err);
        }
        if (!results.modelInstance) {
          err = new Error('No Model instance of ' + Model.definition.name + ' with id ' + id + ' was found');
          if (typeof finish === 'function') finish(err);
          return reject(err);
        }
        if (!results.userInstance) {
          err = new Error('No Model instance of ' + ctx.userModel + ' with id ' + userId + ' was found');
          if (typeof finish === 'function') finish(err);
          return reject(err);
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
          if (typeof finish === 'function') {
            finish(err, result);
          } else {
            resolve(result);
          }
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
//# sourceMappingURL=data:application/json;base64,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QU8sT0FBUCxFQUFiO0FBQ0EsY0FBSSxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsRUFBOEI7QUFDaEMsbUJBQU8sR0FBUCxFQUFZLE1BQVosRUFEZ0M7V0FBbEMsTUFFTztBQUNMLG9CQUFRLE1BQVIsRUFESztXQUZQO1NBRnlCLENBQTNCLENBMUJtQjtPQUFsQixDQUhILENBRHNDO0tBQXJCLENBQW5CLENBRitDO0dBQTdCOztBQVpXLE9Bd0QvQixDQUFNLFlBQU4sQ0FBbUIsSUFBSSxNQUFKLEVBQVk7QUFDN0IsYUFBUyxDQUNQLEVBQUUsS0FBSyxJQUFMLEVBQVcsTUFBTSxRQUFOLEVBQWdCLFVBQVUsSUFBVixFQUR0QixFQUVQLEVBQUUsS0FBSyxRQUFMLEVBQWUsTUFBTSxRQUFOLEVBQWdCLFVBQVUsSUFBVixFQUYxQixDQUFUO0FBSUEsYUFBUyxFQUFFLE1BQU0sSUFBTixFQUFZLE1BQU0sUUFBTixFQUF2QjtBQUNBLFVBQU0sRUFBRSxNQUFNLElBQUksUUFBSixFQUFjLE1BQU0sS0FBTixFQUE1QjtBQUNBLGlCQUFhLElBQUksV0FBSjtHQVBmLEVBeEQrQjtDQUFoQiIsImZpbGUiOiJsaWtlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGlrZXMgTWl4aW4gRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG4vKipcbiAgKiBMaWtlcyBNaXhpblxuICAqIEBBdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAU2VlIDxodHRwczovL3R3aXR0ZXIuY29tL2pvaG5jYXNhcnJ1Ymlhcz5cbiAgKiBAU2VlIDxodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9sb29wYmFjay1saWtlcy1taXhpbj5cbiAgKiBAU2VlIDxodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW4tY2FzYXJydWJpYXMvbG9vcGJhY2stbGlrZXMtbWl4aW4+XG4gICogQERlc2NyaXB0aW9uXG4gICpcbiAgKiBUaGUgZm9sbG93aW5nIG1peGluIHdpbGwgYWRkIGZ1bmN0aW9uYWxsaXR5IHRvIGxpa2UgYW5kIGRpc2xpa2UgdGhlIG1vZGVsIGluc3RhbmNlXG4gICoqL1xubW9kdWxlLmV4cG9ydHMgPSAoTW9kZWwsIGN0eCkgPT4ge1xuICAvLyBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIGN0eFxuICBjdHggPSBPYmplY3QuYXNzaWduKHtcbiAgICBtZXRob2Q6ICdsaWtlJyxcbiAgICBlbmRwb2ludDogJy86aWQvbGlrZScsXG4gICAgbGlrZXM6ICdsaWtlcycsXG4gICAgdXNlck1vZGVsOiAnVXNlcicsXG4gICAgZGVzY3JpcHRpb246ICdMaWtlcyBvciBkaXNsaWtlcyAnICsgTW9kZWwuZGVmaW5pdGlvbi5uYW1lICsgJyBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIHVzZXJJZCcsXG4gIH0sIGN0eCk7XG4gIC8vIERlZmluZSBsaWtlcyBwcm9wZXJ0eSBuYW1lXG4gIE1vZGVsLmRlZmluZVByb3BlcnR5KGN0eC5saWtlcywgeyB0eXBlOiBPYmplY3QsIGRlZmF1bHQ6IHsgdG90YWw6IDAsIHVzZXJzOiBbXSB9IH0pO1xuICAvLyBBZGQgTGlrZSBtZXRob2RcbiAgTW9kZWxbY3R4Lm1ldGhvZF0gPSBmdW5jdGlvbihpZCwgdXNlcklkLCBmaW5pc2gpIHtcbiAgICAvLyBWZXJpZnkgdGhhdCBjdXJyZW50IG1vZGVsIGluc3RhbmNlIGFuZCB1c2VyIGluc3RhbmNlcyBleGlzdHNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXN5bmMucGFyYWxsZWwoe1xuICAgICAgICBtb2RlbEluc3RhbmNlOiBuZXh0ID0+IE1vZGVsLmZpbmRCeUlkKGlkLCBuZXh0KSxcbiAgICAgICAgdXNlckluc3RhbmNlOiBuZXh0ID0+IE1vZGVsLmRhdGFTb3VyY2UubW9kZWxzW2N0eC51c2VyTW9kZWxdLmZpbmRCeUlkKHVzZXJJZCwgbmV4dCksXG4gICAgICB9LCAoZXJyLCByZXN1bHRzKSA9PiB7XG4gICAgICAgIC8vIEhhbmRsZSBFcnJvcnNcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmICh0eXBlb2YgZmluaXNoID09PSAnZnVuY3Rpb24nKSBmaW5pc2goZXJyKTtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXN1bHRzLm1vZGVsSW5zdGFuY2UpIHtcbiAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoJ05vIE1vZGVsIGluc3RhbmNlIG9mICcgKyBNb2RlbC5kZWZpbml0aW9uLm5hbWUgKyAnIHdpdGggaWQgJyArIGlkICsgJyB3YXMgZm91bmQnKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpbmlzaCA9PT0gJ2Z1bmN0aW9uJykgZmluaXNoKGVycik7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzdWx0cy51c2VySW5zdGFuY2UpIHtcbiAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoJ05vIE1vZGVsIGluc3RhbmNlIG9mICcgKyBjdHgudXNlck1vZGVsICsgJyB3aXRoIGlkICcgKyB1c2VySWQgKyAnIHdhcyBmb3VuZCcpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZmluaXNoID09PSAnZnVuY3Rpb24nKSBmaW5pc2goZXJyKTtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IGluZGV4IG9mIHVzZXIgbGlrZSBpbiBhcnJheSwgaWYgYW55XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmVzdWx0cy5tb2RlbEluc3RhbmNlW2N0eC5saWtlc10udXNlcnMuaW5kZXhPZih1c2VySWQpO1xuICAgICAgICAvLyBJZiB1c2VyIGRpZG50IGxpa2VkIGJlZm9yZSB0aGlzIGluc3RhbmNlIHdlIGFkZCBhIG5ldyBsaWtlXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICByZXN1bHRzLm1vZGVsSW5zdGFuY2VbY3R4Lmxpa2VzXS51c2Vycy5wdXNoKHVzZXJJZCk7XG4gICAgICAgICAgLy8gRWxzZSB3ZSByZW1vdmUgdGhlIGxpa2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLm1vZGVsSW5zdGFuY2VbY3R4Lmxpa2VzXS51c2Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMubW9kZWxJbnN0YW5jZVtjdHgubGlrZXNdLnRvdGFsID0gcmVzdWx0cy5tb2RlbEluc3RhbmNlW2N0eC5saWtlc10udXNlcnMubGVuZ3RoO1xuICAgICAgICByZXN1bHRzLm1vZGVsSW5zdGFuY2Uuc2F2ZSgoc2F2ZWVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHNhdmVlcnIpIHJlamVjdChzYXZlZXJyKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpbmlzaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZmluaXNoKGVyciwgcmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgLy8gRW5kcG9pbnQgc2V0dGluZ3NcbiAgTW9kZWwucmVtb3RlTWV0aG9kKGN0eC5tZXRob2QsIHtcbiAgICBhY2NlcHRzOiBbXG4gICAgICB7IGFyZzogJ2lkJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICB7IGFyZzogJ3VzZXJJZCcsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIF0sXG4gICAgcmV0dXJuczogeyByb290OiB0cnVlLCB0eXBlOiAnb2JqZWN0JyB9LFxuICAgIGh0dHA6IHsgcGF0aDogY3R4LmVuZHBvaW50LCB2ZXJiOiAnZ2V0JyB9LFxuICAgIGRlc2NyaXB0aW9uOiBjdHguZGVzY3JpcHRpb24sXG4gIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
