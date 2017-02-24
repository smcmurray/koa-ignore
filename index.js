(function(){
  'use strict';

  const compose = require("koa-compose");

  module.exports = (...mw) => Object.create(Object.prototype, {
    "if": {
      value: function(fn){
        return (ctx, next)=>
          fn(ctx)
            ? next()
            : compose(mw)(ctx, next)
      }
    }
    ,"unless": {
      value: function(fn){
        return (ctx, next)=>
          fn(ctx)
            ? compose(mw)(ctx, next)
            : next()
      }
    }
  })
}())
