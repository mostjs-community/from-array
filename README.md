# most-from-array

Creates a [most/core](https://github.com/mostjs/core) stream from and array.

## Usage

```ts
import { fromArray } from 'most-from-array'
/* other imports */

const stream = fromArray[1, 2, 3, 4]
const tapped = tap(console.log, mapped)
runEffects(tapped, newDefaultScheduler())
/*
Console output:
1
2
3
4
*/
```
