Add a JavaScript Playground on your project.

![PlayJS screenshot with a simple Hello World function](https://github.com/salteadorneo/PlayJS/assets/4882454/fa04d8cd-2f1a-4819-9d5e-1dcf23faa985)

## Installation

```bash
npm install react react-dom playjs-core
```

```bash
yarn add react react-dom playjs-core
```

```bash
pnpm install react react-dom playjs-core
```

## Basic usage

```tsx
import { PlayJS } from 'playjs-core';

<PlayJS />
```

## TypeScript support

```html
<PlayJS language="typescript" />
```

## Preload code

```html
<PlayJS code="console.log('Hello, world!')" />
```

## Themes

```html
<PlayJS theme="dark" />
<PlayJS theme="light" />
```

## Testing Helpers

PlayJS includes a minimal testing API available inside the editor:

- `expect(actual).eq(expected)`
- `expect(actual).neq(expected)`
- `expect(actual).truthy()`
- `expect(actual).falsy()`
- `cases(fn, [[input, expected], ...])`

### Examples

```js
expect(2 + 2).eq(4)
// ➜ '✓' 4 'eq' 4

expect(2 + 2).eq(5)
// ➜ '✗' 4 'eq' 5

expect(0).falsy()
// ➜ '✓' 0 'falsy' false

function double(n){ return n * 2 }
cases(double, [[1,2],[3,6],[5,10]])
// ➜ '✓' 2 'eq' 2 ┊ '✓' 6 'eq' 6 ┊ '✓' 10 'eq' 10
```

These helpers log concise results to the Console pane without requiring any imports.

## Contributing

If you think PlayJS is a cool project and you would like to do your bit, check out [**How to Contribute**](HOW_TO_CONTRIBUTE.md) for more information.

![GitHub stars](https://img.shields.io/github/stars/salteadorneo/PlayJS)
![GitHub issues](https://img.shields.io/github/issues/salteadorneo/PlayJS)
![GitHub license](https://img.shields.io/github/license/salteadorneo/PlayJS)
