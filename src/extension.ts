import { ExtensionContext } from 'vscode'

export function activate(context: ExtensionContext) {
  const extPath = context.extensionPath
  console.log('extPath', extPath)
}

export function deactivate() {}
