import {deprecate} from 'util';
import Likes from './likes';

export default deprecate(
  app => {
    app.loopback.modelBuilder.mixins.define('Likes', Likes);
  },
  'DEPRECATED: Use mixinSources, see https://github.com/jonathan-casarrubias/loopback-likes-mixin#mixinsources'
);
