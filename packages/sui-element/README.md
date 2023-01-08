# sui-element

A base class for Sakai UI elements. It renders to the light dom and gives us the
loadTranslations and tr methods.

## Installation

```bash
npm i @sakai-ui/sui-element
```

## Usage

```html
import { SuiElement } from "@sakai-ui/sui-element";

class MyElement extends SuiElement {

    constructor() {

      super();

      this.loadTransations("myelement").then(r => { this.i18n = r; this.requestUpdate(); });
    }

    ...
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
