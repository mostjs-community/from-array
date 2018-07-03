import {Sink, Task, Time} from '@most/types'

export class ArrayTask<T> implements Task {
  private active: boolean = true

  constructor(private array: T[], private sink: Sink<T>) {}

  run(time: Time) {
    const { active, array, sink } = this
    const { length } = array

    for (let i = 0; i < length && active; i++) {
      sink.event(time, array[i])
    }

    active && sink.end(time)
  }

  error(t: Time, e: Error) {
    this.sink.error(t, e)
  }

  dispose() {
    this.active = false
  }
}