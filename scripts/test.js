/// <reference path="globals.d.ts" />

output.name = 'test'
output.description = 'test'
output.disposables = []

const disposable = vscode.commands.registerCommand('sample.test', () => {
  vscode.window.showInformationMessage('Hello World from test!')
})

output.disposables.push(disposable)
output.contributions.commands.push({
  command: 'sample.test',
  title: 'Test',
  category: 'Test',
})

return output
