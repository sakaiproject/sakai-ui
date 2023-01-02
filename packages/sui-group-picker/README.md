# sui-group-picker

A component that renders a list of Sakai groups and allows you to select one

## Installation

```bash
npm i @sakai-ui/sui-group-picker
```

## Usage

```html
import { SuiElement } from '@sakai-ui/sui-element';
import '@sakai-ui/sui-group-picker';

class MyElement extends SuiElement {

  render() {

    return html`
      <sui-group-picker site-id="xyz"></sui-group-picker>
    `;
  }
}
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```
