export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [
      2,
      'always',
      '^\\p{Emoji_Presentation}\\s(?:feat|fix|docs|style|refactor|perf|test|chore)(\\(.+\\))?:\\s.+',
      'Commit message must start with an emoji, then a conventional commit type, and a description'
    ],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\p{Emoji_Presentation}\s)?(\w*)(?:\((.*)\))?!?: (.*)$/,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },
};
