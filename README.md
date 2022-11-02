[![tests](https://github.com/sufyanadam/replace-placeholders/actions/workflows/test.yml/badge.svg)](https://github.com/sufyanadam/replace-placeholders/actions/workflows/test.yml)

# Replace Placeholders GitHub Action

Replace all occurrences of placeholders found in files of the provided directory
matching the provided filename pattern with the provided replacement values.

The desired placeholders to replace and their respective replacement values are
passed in as a JSON string. For example:

```
    placeholders: |
      {
        "<APP_NAME>": "my-app",
        "<NAMESPACE>": "my-namespace"
      }
```

## Usage in your workflow

```
  - uses: sufyanadam/replace-placeholders@v3
    with:
      placeholders: |
        {
          "<APP_NAME>": "my-app",
          "<NAMESPACE>": "my-namespace"
        }
      filename-pattern: '*.yml'
      search-directory: path/to/files
```

## Running Tests


```bash
$ npm test

 PASS  ./index.test.js
  ✓ Replaces placeholders in all files in the given directory matching the given filename pattern (70ms)
...
```
