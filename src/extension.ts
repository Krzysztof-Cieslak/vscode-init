import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'
import { ExtensionContext, window } from 'vscode'
import * as vscode from 'vscode'
import { ScriptDefinition } from '../scripts/globals'
import * as merge from 'deepmerge'
import { modify, applyEdits, parse } from 'jsonc-parser'

export async function activate(context: ExtensionContext) {
  await process(context)

  const watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(
      vscode.Uri.file(join(context.extensionPath, 'scripts')),
      '**/*.js'
    )
  )

  watcher.onDidChange(async (e) => await process(context))
  watcher.onDidCreate(async (e) => await process(context))
  watcher.onDidDelete(async (e) => await process(context))
}

async function process(context: ExtensionContext) {
  context.subscriptions.forEach((d) => d.dispose())
  const definitions = await processFiles(context)

  processContributions(context, definitions)
  definitions
    .flatMap((d) => d.disposables)
    .forEach((d) => context.subscriptions.push(d))
}

async function processFiles(
  context: ExtensionContext
): Promise<ScriptDefinition[]> {
  const scriptsPath = join(context.extensionPath, 'scripts')

  if (!existsSync(scriptsPath)) {
    mkdirSync(scriptsPath)
    console.log('Created scripts directory at:', scriptsPath)
  } else {
    console.log('extPath', scriptsPath)
  }

  const files = readdirSync(scriptsPath)
  const promises = files
    .filter((f) => extname(f) === '.js')
    .map(async (f) => {
      const output: ScriptDefinition = {
        name: '',
        description: '',
        disposables: [],
        contributions: {},
      }

      const content = await readFile(join(scriptsPath, f), 'utf-8')
      const fs = new Function('require', 'vscode', 'output', content)
      const scriptOutput: ScriptDefinition = fs(require, vscode, output)
      return scriptOutput
    })
  const definitions = await Promise.all(promises)
  return definitions
}

function processContributions(
  context: ExtensionContext,
  definitions: ScriptDefinition[]
) {
  const contributions = definitions.map((d) => d.contributions)
  const mergedContributions = merge.all(contributions)
  console.log('mergedContributions', mergedContributions)

  const packageJSONPath = join(context.extensionPath, 'package.json')
  const packageJSON = readFileSync(packageJSONPath, 'utf-8')
  const packageObj = parse(packageJSON)

  const areSame = deepCompare(packageObj.contributes, mergedContributions)
  if (!areSame) {
    console.log('updating package.json')
    const edits = modify(packageJSON, ['contributes'], mergedContributions, {})
    if (edits.length > 0) {
      const updatedPackageJSON = applyEdits(packageJSON, edits)
      writeFileSync(packageJSONPath, updatedPackageJSON)
      window.showInformationMessage(
        'VSCode.init contributions has been updated, please reload the VSCode window'
      )
    }
  }
}

function deepCompare(arg1: any, arg2: any): boolean {
  if (
    Object.prototype.toString.call(arg1) ===
    Object.prototype.toString.call(arg2)
  ) {
    if (
      Object.prototype.toString.call(arg1) === '[object Object]' ||
      Object.prototype.toString.call(arg1) === '[object Array]'
    ) {
      if (Object.keys(arg1).length !== Object.keys(arg2).length) {
        return false
      }
      return Object.keys(arg1).every(function (key) {
        return deepCompare(arg1[key], arg2[key])
      })
    }
    return arg1 === arg2
  }
  return false
}

export function deactivate() {}
