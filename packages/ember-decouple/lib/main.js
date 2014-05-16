/**
Ember Decouple

@module ember
@submodule ember-decouple
*/



var platform = (function () {
  if (typeof window.MSApp === 'object' && window.MSApp.execUnsafeLocalFunction !== undefined) {
    return 'windows8';
  }

  return 'notWindows8';

});

var decouple;

if (platform === 'windows8') {
  decouple = {
    innerHTML: function (target, content) {
      return window.MSApp.execUnsafeLocalFunction(function () {
        console.log('unsafe');
        return target.innerHTML = content;
      });
    },
    $: {
      appendTo: function (target, thisArg) {
        return window.MSApp.execUnsafeLocalFunction(function () {
          console.log('unsafe');
          return thisArg.$().appendTo(target);
        });
      }
    }
  };

} else {
  decouple = {
    innerHTML: function (target, content) {
      return target.innerHTML = content;
    },
    $: {
      appendTo: function (target, thisArg) {
        return thisArg.$().appendTo(target);
      }
    }
  };
}

Ember.decouple = decouple;
