// ==========================================================================
// Project:  Ember Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals MyApp:true */

module('system/binding/notEmpty', {
  setup: function() {
    MyApp = {
      foo: { value: 'FOO' },
      bar: { value: 'BAR' }
    };
  },

  teardown: function() {
    MyApp = null;
  }
});

test('forces binding values to be notEmpty if enumerable', function() {
  var binding;
  Ember.run(function(){
    binding = Ember.bind(MyApp, 'bar.value', 'foo.value').notEmpty('(EMPTY)');
  });
  
  deepEqual(Ember.getPath('MyApp.bar.value'), 'FOO', '1 MyApp.bar.value');

  Ember.run(function(){
    Ember.setPath('MyApp.foo.value', ['FOO']);
  });
  
  deepEqual(Ember.getPath('MyApp.bar.value'), ['FOO'], '2 Array passes through');

  Ember.run(function(){
    Ember.setPath('MyApp.foo.value', []);
  });
  
  deepEqual(Ember.getPath('MyApp.bar.value'), '(EMPTY)', '3 uses empty placeholder');

});
