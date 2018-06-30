# most-from-array

Creates a [most/core](https://github.com/mostjs/core) stream from and array.

## Usage

```ts
import { fromArray } from 'most-from-array'
import { map, tap, runEffects } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'

++ import runEffects

const stream = fromArray[1, 2, 3, 4]

const mapped = map(n => n*10, stream)
const tapped = tap(console.log, mapped)

runEffects(tapped, newDefaultScheduler())
/*
Console output:
10
20
30
40
*/

```