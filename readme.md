# ts-compiler-api-question

Example repo related to question about Typescript compiler API

## Question

Language Service provides API to `findReferences`, result type is `ReferencedSymbol[]`, I can get fileName and `TextSpan` of the reference (see file `./src/script.ts:38:13`). Can I get the `ts.Node` of the reference without AST traversal?

## How to start?

Before start please install dependencies with `yarn` or `npm install`

```
$ yarn ts-node ./src/script.ts ./src/example.ts
```

Or use vscode debugger with task configuration

```
 {
    "name": "DEBUG",
    "type": "node",
    "request": "launch",
    "args": ["./src/script.ts","./src/example.ts"],
    "runtimeArgs": ["--nolazy", "-r","ts-node/register"],
    "sourceMaps": true,
    "cwd": "${workspaceRoot}",
    "protocol": "inspector"
}
```
