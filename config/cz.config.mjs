import { definePrompt } from 'cz-git'

export default definePrompt({
  alias: { fd: 'docs: 修复文档拼写错误' },
  messages: {
    type: '选择你要提交的变更类型:',
    scope: '指定此次变更的范围（可选）:',
    customScope: '指定此次变更的范围:',
    subject: '编写简短、祈使语气的变更描述:\n',
    body: '提供更详细的变更描述（可选）。使用"|"换行:\n',
    breaking: '列出任何非兼容性重大变更（可选）。使用"|"换行:\n',
    footerPrefixesSelect: '选择此次变更关联的问题类型前缀（可选）:',
    customFooterPrefix: '输入问题类型前缀:',
    footer: '列出此次变更关联的问题。例如: #31, #34:\n',
    generatingByAI: '正在通过AI生成提交描述...',
    generatedSelectByAI: '选择AI生成的合适描述:',
    confirmCommit: '你确定要进行上述提交吗?'
  },
  types: [
    {
      value: 'feat',
      name: '新增功能 | feat: A new feature',
      emoji: ':sparkles:'
    },
    { value: 'fix', name: '修复缺陷 | fix: A bug fix', emoji: ':bug:' },
    {
      value: 'docs',
      name: '文档变更 | docs: Documentation only changes',
      emoji: ':memo:'
    },
    {
      value: 'style',
      name: '代码格式调整 | style: Changes that do not affect the meaning of the code',
      emoji: ':lipstick:'
    },
    {
      value: 'refactor',
      name: '代码重构 | refactor: A code change that neither fixes a bug nor adds a feature',
      emoji: ':recycle:'
    },
    {
      value: 'perf',
      name: '性能优化 | perf: A code change that improves performance',
      emoji: ':zap:'
    },
    {
      value: 'test',
      name: '测试相关修改 | test: Adding missing tests or correcting existing tests',
      emoji: ':white_check_mark:'
    },
    {
      value: 'build',
      name: '构建相关变更 | build: Changes that affect the build system or external dependencies',
      emoji: ':package:'
    },
    {
      value: 'ci',
      name: '持续集成配置修改 | ci: Changes to our CI configuration files and scripts',
      emoji: ':ferris_wheel:'
    },
    {
      value: 'chore',
      name: "其他杂项修改 | chore: Other changes that don't modify src or test files",
      emoji: ':hammer:'
    },
    {
      value: 'revert',
      name: '回滚提交 | revert: Reverts a previous commit',
      emoji: ':rewind:'
    }
  ],
  useEmoji: true,
  emojiAlign: 'center',
  useAI: true,
  aiNumber: 1,
  themeColorCode: '',
  scopes: [],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  customScopesAlign: 'bottom',
  customScopesAlias: '自定义范围',
  emptyScopesAlias: '无范围',
  upperCaseSubject: false,
  markBreakingChangeMode: false,
  allowBreakingChanges: ['feat', 'fix'],
  breaklineNumber: 100,
  breaklineChar: '|',
  skipQuestions: [],
  issuePrefixes: [
    { value: 'closed', name: '已完成: 問題已处理' },
    { value: 'done', name: '已完成: 問題已处理' },
    { value: 'fixed', name: '已完成:  問題已修復' },
    { value: 'resolved', name: '已完成: 问题已解决' }
  ],
  customIssuePrefixAlign: 'top',
  emptyIssuePrefixAlias: '跳过',
  customIssuePrefixAlias: '自定义前缀',
  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  minSubjectLength: 0,
  scopeOverrides: undefined,
  defaultBody: '',
  defaultIssues: '',
  defaultScope: '',
  defaultSubject: ''
})
