import { describe, it } from 'mocha'
import * as assert from 'power-assert'

import { ArrayTask } from './ArrayTask'
import { Sink, Time } from "@most/types"

describe('ArrayTask', () => {
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

  it('Should end the stream after normal run', () => {
    task.run(0)
    assert(sink.ended === true)
  })

  it('Shouldn’t emit anything after dispose',  () => {
    task.dispose()
    task.run(0)
    assert.deepEqual(sink.values, [])
  })

  it('Can be terminated early',  () => {
    sink.maxEvents = 2
    sink.onMaxOut = () => task.dispose()
    task.run(0)
    assert.deepEqual(sink.values, [1,2])
  })
})

class GlassSink<A = number> implements Sink<A> {
  values: A[] = []
  active: boolean = true
  ended: boolean = false
  errorObj: Error | undefined
  maxEvents = Infinity
  onMaxOut?: () => void

  event (_: Time, value: A) {
    this.values.push(value)
    if (this.values.length >= this.maxEvents && this.onMaxOut) this.onMaxOut()
  };

  end (_: Time) {
    this.active = false
    this.ended = true
  };

  error (_: Time, err: Error) {
    this.errorObj = err
    this.active = false
  }
}
