module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false // 允许没有babel.config.js也能正常解析
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    // 你可以在这里自定义规则
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
} 