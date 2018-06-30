import {describe, it} from 'mocha'
import * as assert from 'power-assert'

import {runEffects, zipItems} from "@most/core"
import {newDefaultScheduler} from "@most/scheduler"

import { fromArray } from "./index"

describe('@most/from-array', () => {
  it('Should emit the values it’s given', () => {
    const array = [7, 4, 32]
    const stream = fromArray(array)
    const withAssert = zipItems(assert.equal, array, stream)

    runEffects(withAssert, newDefaultScheduler())
  })
})
