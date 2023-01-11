# sui-document-viewer

Loads a document from Sakai content hosting from the supplied ref attribute. Ref is a Sakai entity reference.

Formats currently supported:
DOCX
ODP
ODT
PDF

PDFs are opened with PDF.js, the same plugin used natively by Chrome and Firefox. ODP (slides) are displayed using
ViewerJS. DOCX and ODT are converted to html on the server and retrieved vi a Fetch call. ViewerJS and PDF.js loads
happen in an iframe. You can specify the height of that with the height attribute. Light dom is in use, so you can
style this from the usual Sakai SASS build.

## Installation

```bash
npm i @sakai-ui/sui-document-viewer
```

## Usage

```html

<sui-document-viewer></sui-document-viewer>

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
