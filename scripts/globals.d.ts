export {}

import { type Disposable } from 'vscode'

declare global {
  var vscode: typeof import('vscode')
  var output: ScriptDefinition
}

export interface AuthenticationContribution {
  id: string
  label: string
}

export interface BreakpointContribution {
  language: string
  when?: string
}

export interface ColorContribution {
  id: string
  description: string
  defaults: {
    light: string
    dark: string
    highContrast: string
    highContrastLight?: string
  }
}

export type IUserFriendlyIcon = string | { light: string; dark: string }

export interface CommandContribution {
  command: string
  title: string
  shortTitle?: string
  enablement?: string
  category?: string
  icon?: IUserFriendlyIcon
}

export type ConfigurationContribution = any //TODO: complex schema
export type ConfigurationDefaultsContribution = any //TODO: complex schema

export interface CustomEditorSelector {
  readonly filenamePattern?: string
}
export enum CustomEditorFields {
  viewType = 'viewType',
  displayName = 'displayName',
  selector = 'selector',
  priority = 'priority',
}

export interface CustomEditorContribution {
  readonly [CustomEditorFields.viewType]: string
  readonly [CustomEditorFields.displayName]: string
  readonly [CustomEditorFields.selector]?: readonly CustomEditorSelector[]
  readonly [CustomEditorFields.priority]?: string
}

export interface IPlatformSpecificAdapterContribution {
  program?: string
  args?: string[]
  runtime?: string
  runtimeArgs?: string[]
}

export enum DebuggerString {
  UnverifiedBreakpoints = 'unverifiedBreakpoints',
}

export interface IDebuggerContribution
  extends IPlatformSpecificAdapterContribution {
  type: string
  label?: string
  win?: IPlatformSpecificAdapterContribution
  winx86?: IPlatformSpecificAdapterContribution
  windows?: IPlatformSpecificAdapterContribution
  osx?: IPlatformSpecificAdapterContribution
  linux?: IPlatformSpecificAdapterContribution

  // supported languages
  languages?: string[]

  // debug configuration support
  configurationAttributes?: any
  initialConfigurations?: any[]
  configurationSnippets?: any[]
  variables?: { [key: string]: string }
  when?: string
  hiddenWhen?: string
  deprecated?: string
  strings?: { [key in DebuggerString]: string }
}

export interface EmbeddedLanguagesMap {
  [scopeName: string]: string
}

export interface TokenTypesContribution {
  [scopeName: string]: string
}

export interface GrammarContribution {
  language?: string // undefined if the grammar is only included by other grammars
  scopeName: string
  path: string
  embeddedLanguages: EmbeddedLanguagesMap
  tokenTypes: TokenTypesContribution
  injectTo: string[]
  balancedBracketScopes: string[]
  unbalancedBracketScopes: string[]
}

export interface IconContribution {
  [id: string]: {
    description: string
    default: { fontPath: string; fontCharacter: string } | string
  }
}

export enum ThemeTypeSelector {
  VS = 'vs',
  VS_DARK = 'vs-dark',
  HC_BLACK = 'hc-black',
  HC_LIGHT = 'hc-light',
}

export interface ThemeContribution {
  id: string
  label?: string
  description?: string
  path: string
  uiTheme?: ThemeTypeSelector
}

export interface JSONValidationContribution {
  fileMatch: string | string[]
  url: string
}

export interface KeyBindingContribution {
  command: string
  args?: any
  key: string
  when?: string
  mac?: string
  linux?: string
  win?: string
}

export interface LanguageContribution {
  id: string
  extensions: string[]
  filenames: string[]
  filenamePatterns: string[]
  firstLine: string
  aliases: string[]
  mimetypes: string[]
  configuration: string
  icon: { light: string; dark: string }
}

export interface IUserFriendlyMenuItem {
  command: string
  alt?: string
  when?: string
  group?: string
}

export interface IUserFriendlySubmenuItem {
  submenu: string
  when?: string
  group?: string
}

export interface IUserFriendlySubmenu {
  id: string
  label: string
  icon?: IUserFriendlyIcon
}

export interface MenuContribution {
  [loc: string]: IUserFriendlyMenuItem | IUserFriendlySubmenuItem
}

export type ProblemMatchersContribution = any //TODO: complex schema
export type ProblemPatternsContribution = any //TODO: complex schema

export interface ResourceLabelFormatterContribution {
  scheme: string
  authority?: string
  priority?: boolean
  formatting: ResourceLabelFormatting
}

export interface ResourceLabelFormatting {
  label: string // myLabel:/${path}
  separator: '/' | '\\' | ''
  tildify?: boolean
  normalizeDriveLetter?: boolean
  workspaceSuffix?: string
  workspaceTooltip?: string
  authorityPrefix?: string
  stripPathStartingSeparator?: boolean
}

export interface TokenTypeContribution {
  id: string
  description: string
  superType?: string
}

export interface TokenModifierContribution {
  id: string
  description: string
}

export interface TokenScopeContribution {
  language?: string
  scopes: { [selector: string]: string[] }
}

export interface SnippetsContribution {
  language: string
  path: string
}

export interface TaskDefinitionContribution {
  type?: string
  required?: string[]
  properties?: any
  when?: string
}

export interface ITerminalProfileContribution {
  title: string
  id: string
  icon?: IUserFriendlyIcon
  color?: string
}

export interface ITerminalContributions {
  profiles?: ITerminalProfileContribution[]
}

export enum ViewType {
  Tree = 'tree',
  Webview = 'webview',
}

export interface IUserFriendlyViewDescriptor {
  type?: ViewType

  id: string
  name: string
  when?: string

  icon?: string
  contextualTitle?: string
  visibility?: string

  initialSize?: number

  // From 'remoteViewDescriptor' type
  group?: string
  remoteName?: string | string[]
  virtualWorkspace?: string

  accessibilityHelpContent?: string
}

export interface ViewContributions {
  [loc: string]: IUserFriendlyViewDescriptor[]
}

export interface IUserFriendlyViewsContainerDescriptor {
  id: string
  title: string
  icon: string
}

export interface ViewContainerContributions {
  [loc: string]: IUserFriendlyViewsContainerDescriptor[]
}

export enum ViewsWelcomeExtensionPointFields {
  view = 'view',
  contents = 'contents',
  when = 'when',
  group = 'group',
  enablement = 'enablement',
}

export interface ViewWelcomeContribution {
  readonly [ViewsWelcomeExtensionPointFields.view]: string
  readonly [ViewsWelcomeExtensionPointFields.contents]: string
  readonly [ViewsWelcomeExtensionPointFields.when]: string
  readonly [ViewsWelcomeExtensionPointFields.group]: string
  readonly [ViewsWelcomeExtensionPointFields.enablement]: string
}

export interface WalkthroughStep {
  readonly id: string
  readonly title: string
  readonly description: string | undefined
  readonly media:
    | {
        image: string | { dark: string; light: string; hc: string }
        altText: string
        markdown?: never
        svg?: never
        video?: never
      }
    | { markdown: string; image?: never; svg?: never; video?: never }
    | {
        svg: string
        altText: string
        markdown?: never
        image?: never
        video?: never
      }
    | {
        video: string | { dark: string; light: string; hc: string }
        poster: string | { dark: string; light: string; hc: string }
        altText: string
        markdown?: never
        image?: never
        svg?: never
      }
  readonly completionEvents?: string[]
  /** @deprecated use `completionEvents: 'onCommand:...'` */
  readonly doneOn?: { command: string }
  readonly when?: string
}

export interface WalkthroughContribution {
  readonly id: string
  readonly title: string
  readonly icon?: string
  readonly description: string
  readonly steps: WalkthroughStep[]
  readonly featuredFor: string[] | undefined
  readonly when?: string
}

export interface Contributions {
  authentication?: AuthenticationContribution[]
  breakpoints?: BreakpointContribution[]
  colors?: ColorContribution[]
  commands?: CommandContribution[]
  configurations?: ConfigurationContribution
  configurationDefaults?: ConfigurationDefaultsContribution
  customEditors?: CustomEditorContribution[]
  debuggers?: IDebuggerContribution[]
  grammars?: GrammarContribution[]
  icons?: IconContribution
  iconThemes?: ThemeContribution[]
  jsonValidation?: JSONValidationContribution[]
  keybindings?: KeyBindingContribution[]
  languages?: LanguageContribution[]
  menus?: MenuContribution
  problemMatchers?: ProblemMatchersContribution[]
  problemPatterns?: ProblemPatternsContribution[]
  productIconThemes?: ThemeContribution[]
  resourceLabelFormatters?: ResourceLabelFormatterContribution[]
  semanticTokenModifiers?: TokenModifierContribution[]
  semanticTokenScopes?: TokenScopeContribution[]
  semanticTokenTypes?: TokenTypeContribution[]
  snippets?: SnippetsContribution[]
  submenus?: IUserFriendlySubmenu[]
  taskDefinitions?: TaskDefinitionContribution[]
  terminal?: ITerminalContributions
  themes?: ThemeContribution[]
  views?: ViewContributions
  viewsContainers?: ViewContainerContributions
  viewsWelcome?: ViewWelcomeContribution[]
  walkthroughs?: WalkthroughContribution[]
}

export interface ScriptDefinition {
  name: string
  description: string
  disposables: Disposable[]
  contributions: Contributions
}
