(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['from-event'] = {})));
}(this, (function (exports) { 'use strict';

  /** @license MIT License (c) copyright 2010-2016 original author or authors */

  // curry2 :: ((a, b) -> c) -> (a -> b -> c)
  function curry2(f) {
    function curried(a, b) {
      switch (arguments.length) {
        case 0:
          return curried;
        case 1:
          return function (b) {
            return f(a, b);
          };
        default:
          return f(a, b);
      }
    }
    return curried;
  }

  // Schedule a task to run as soon as possible, but
  // not in the current call stack
  var asap = /*#__PURE__*/curry2(function (task, scheduler) {
    return scheduler.scheduleTask(0, 0, -1, task);
  });

  var ArrayTask = /** @class */ (function () {
      function ArrayTask(array, sink) {
          this.array = array;
          this.sink = sink;
          this.active = true;
      }
      ArrayTask.prototype.run = function (time) {
          var _a = this, array = _a.array, sink = _a.sink;
          var length = array.length;
          for (var i = 0; i < length && this.active; i++) {
              sink.event(time, array[i]);
          }
          this.active && sink.end(time);
      };
      ArrayTask.prototype.error = function (t, e) {
          this.sink.error(t, e);
      };
      ArrayTask.prototype.dispose = function () {
          this.active = false;
      };
      return ArrayTask;
  }());

  /** @license MIT License (c) copyright 2018 original author or authors */
  // fromArray :: e[] -> Stream e
  function fromArray(a) {
      return new FromArray(a);
  }
  var FromArray = /** @class */ (function () {
      function FromArray(a) {
          this.a = a;
      }
      FromArray.prototype.run = function (sink, scheduler) {
          return asap(new ArrayTask(this.a, sink), scheduler);
      };
      return FromArray;
  }());

  exports.fromArray = fromArray;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
