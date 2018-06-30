import {describe, it} from 'mocha'
import * as assert from 'power-assert'

import { ArrayTask } from './ArrayTask'
import {Sink, Time} from "@most/types"

describe('@most/fromArray', () => {
  let sink: GlassSink<number>
  let array: number[]
  let task: ArrayTask<number>

  beforeEach(() => {
    sink = new GlassSink<number>()
    array = [1,2,3,4,5]
    task = new ArrayTask<number>(array, sink)
  })

  it('Should emit all array elements, normally', () => {
    task.run(0)
    assert.deepEqual(sink.values, array)
  })

  it('Shouldn’t emit anything after dispose',  () => {
    task.dispose()
    task.run(0)
    assert.deepEqual(sink.values, [])
  })

  it('Can be interrupted in the middle of things',  () => {
    sink.maxEvents = 2
    task.run(0)
    assert.deepEqual(sink.values, [1,2])
  })
})

class GlassSink<A = number> implements Sink<A> {
  values: A[] = []
  active: boolean = true
  errorObj: Error | undefined
  private _maxEvents = Infinity

  event(_: Time, value: A) {
    if (this.values.length < this._maxEvents )
      this.values.push(value)
  };

  end(_: Time) {
    this.active = false
  };

  error(_: Time, err: Error) {
    this.errorObj = err
    this.active = false
  }

  set maxEvents(n: number) {
    this._maxEvents = n
  }
}
