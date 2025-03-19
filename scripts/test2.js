/// <reference path="globals.d.ts" />

output.name = 'test 2'
output.description = 'test 2'

const disposable = vscode.commands.registerCommand('sample.test2', () => {
  vscode.window.showInformationMessage('Hello World from test222222!')
})

output.disposables.push(disposable)
output.contributions.commands.push({
  command: 'sample.test2',
  title: 'Test 2',
  category: 'Test',
})

const disposable2 = vscode.commands.registerCommand('sample.test3', () => {
  vscode.window.showInformationMessage('Hello World from test33333!')
})

output.disposables.push(disposable2)
output.contributions.commands.push({
  command: 'sample.test3',
  title: 'Test 3',
  category: 'Test',
})

return output
