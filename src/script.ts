import * as fs from 'fs';
import * as ts from 'typescript';

const program = ts.createProgram(process.argv.slice(2), {
  strict: true,
});

function createLanguageService() {
  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () =>
      program.getSourceFiles().map(file => file.fileName),
    getScriptVersion: () => '0', //  no watch in this example
    getScriptSnapshot: fileName => {
      if (!fs.existsSync(fileName)) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => program.getCompilerOptions(),
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
  };

  return ts.createLanguageService(servicesHost, ts.createDocumentRegistry());
}

function startWalk() {
  const walk = (
    node: ts.Node,
    sourceFile: ts.SourceFile,
    service: ts.LanguageService
  ) => {
    if (ts.isInterfaceDeclaration(node)) {
      const references = service.findReferences(
        sourceFile.fileName,
        node.name.end
      );

      // references of type ReferencedSymbol[]
      // inside has array of ReferenceEntry[] that extends DocumentSpan
      // that has the folowing information
      // textSpan: TextSpan;
      // fileName: string;
      // so I know file name and position but I could not find  the way how I can get ts.Node based on this without ast traversal

      console.log('references %O', references);
    } else {
      ts.forEachChild(node, nextNode => walk(nextNode, sourceFile, service));
    }
  };

  const sourceFiles = program.getSourceFiles();

  for (const sourceFile of sourceFiles.filter(
    sourceFile => !sourceFile.isDeclarationFile
  )) {
    walk(sourceFile, sourceFile, createLanguageService());
  }
}

startWalk();
