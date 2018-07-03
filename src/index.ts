/** @license MIT License (c) copyright 2018 original author or authors */
/** @author Sergey Samokhov <hi@hoichi.io> */

import { Disposable, Scheduler, Sink, Stream } from '@most/types'
import { asap } from '@most/scheduler'
import { ArrayTask } from './ArrayTask'

// fromArray :: e[] -> Stream e
function fromArray<T> (a: T[]) {
  return new FromArray(a)
}

class FromArray<T> implements Stream<T> {
  constructor (private a: T[]) {}

  run (sink: Sink<T>, scheduler: Scheduler): Disposable {
    return asap(new ArrayTask(this.a, sink), scheduler)
  }
}

export { fromArray }
