export {}

import { type Disposable } from 'vscode'

declare global {
  var vscode: typeof import('vscode')
  var output: ScriptDefinition
}

export interface Command {
  command: string
  title: string
  shortTitle?: string
  enablement?: string
  category?: string
  icon?: string | { light: string; dark: string }
}

export interface Contributions {
  commands: Command[]
}

export interface ScriptDefinition {
  name: string
  description: string
  disposables: Disposable[]
  contributions: Contributions
}
