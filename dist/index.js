'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _likes = require('./likes');

var _likes2 = _interopRequireDefault(_likes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _util.deprecate)(function (app) {
  app.loopback.modelBuilder.mixins.define('Likes', _likes2.default);
}, 'DEPRECATED: Use mixinSources, see https://github.com/jonathan-casarrubias/loopback-likes-mixin#mixinsources');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7a0JBRWUscUJBQ2IsZUFBTztBQUNMLE1BQUksUUFBSixDQUFhLFlBQWIsQ0FBMEIsTUFBMUIsQ0FBaUMsTUFBakMsQ0FBd0MsT0FBeEMsbUJBREs7Q0FBUCxFQUdBLDZHQUphIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtkZXByZWNhdGV9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IExpa2VzIGZyb20gJy4vbGlrZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZXByZWNhdGUoXG4gIGFwcCA9PiB7XG4gICAgYXBwLmxvb3BiYWNrLm1vZGVsQnVpbGRlci5taXhpbnMuZGVmaW5lKCdMaWtlcycsIExpa2VzKTtcbiAgfSxcbiAgJ0RFUFJFQ0FURUQ6IFVzZSBtaXhpblNvdXJjZXMsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW4tY2FzYXJydWJpYXMvbG9vcGJhY2stbGlrZXMtbWl4aW4jbWl4aW5zb3VyY2VzJ1xuKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
