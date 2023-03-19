# ts-copyright-action

This GitHub Action adds or updates a copyright comment at the top of your
TypeScript and JavaScript files. It uses the TypeScript compiler API to search
and update existing copyright comments in your files.

## Usage

```yaml
name: Copyright

on:
  # Runs on merge to master branch or manual dispatching
  push:
    branches: [master]
  workflow_dispatch:

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Run the action to add copyright text to files
      - name: Add Copyright Comment
        uses: alizeait/ts-copyright-action@v1
        with:
          copyright: Copyright (c) 2023 XXX.\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.
          exclude: "fixtures/**,dist/**,node_modules/**,src/tests/**"

      # Open a pull request with changed files
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: Add copyright comment to files
          title: Add Copyright Comment to Files
          body: Update Copyright text
          token: ${{ secrets.TOKEN }}
```

If some file already has a copyright comment at the top, the action will update
the comment to the new specified copyright text. This is useful to update the
copyright year or any new license text easily.

You can customize the glob pattern and exclusion rules to fit your project's
needs.

## Inputs

### `copyright`

**Required**. The copyright comment to prepend or update in the matched files.

### `pattern`

The glob pattern to find TypeScript and JavaScript files. Default is
`**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts}`.

### `exclude`

Comma-separated glob patterns to exclude from the glob search. Default is
`node_modules/**,dist/**,build/**,coverage/**`
