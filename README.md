[![NPM](https://nodei.co/npm/loopback-likes-mixin.png?stars&downloads)](https://nodei.co/npm/loopback-likes-mixin/) [![NPM](https://nodei.co/npm-dl/loopback-likes-mixin.png)](https://nodei.co/npm/loopback-likes-mixin/)

Loopback Stats Mixin
=============
This module is designed for the [Strongloop Loopback](https://github.com/strongloop/loopback) framework.  It provides likes and dislikes functionallity to any Model.

#### INSTALL

```bash
  npm install loopback-likes-mixin --save
```
#### MIXINSOURCES

With [loopback-boot@v2.8.0](https://github.com/strongloop/loopback-boot/)  [mixinSources](https://github.com/strongloop/loopback-boot/pull/131) have been implemented in a way which allows for loading this mixin without changes to the `server.js` file previously required.

Add the `mixins` property to your `server/model-config.json` like the following:

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "../node_modules/loopback-likes-mixin/dist",
      "../common/mixins"
    ]
  }
}
```
STATS MIXIN
========

This mixin creates a [Remote Method](https://docs.strongloop.com/display/APIC/Remote+methods) with endpoint entry `/:id/like`.

#### EXAMPLE

The following is the default configuration

```json
"mixins": {
    "Likes": [
        {
          "method": "like",
          "endpoint": "/:id/like",
          "likes": "likes",
          "userModel": "User"
        }
    ]
}
```
is equivalent to 
```json
"mixins": {
    "Likes": true
}
```

The code defined above would create a `localhost:3000/api/model/:id/likes` endpoint with the ability to like and dislike an instance of a Model in which the mixin is implemented.

BOOT OPTIONS
=============

The following options are the optional configurations for the mixin to work.

| Options       | Type       | Requried          | Possible Values | Examples
|:-------------:|:-------------:|:-------------:|:---------------:| :------------------------:
| method        | String      | No  | Any               | like, likeThis, liker
| endpoint      | String      | No  | URL Form          | /likes, /:id/likes
| description   | String      | No  | Any               | Loopback Explorer Description
| likes         | String      | No  | Any               | Model property name with Object type
| userModel     | String      | No  | User based models | User, Account, Admin.. e


LICENSE
=============
[MIT](LICENSE.md)
