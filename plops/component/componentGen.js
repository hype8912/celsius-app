module.exports = {
  description: 'Creates React Native component and style files inside /components',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'What is your React Native Component type?',
      choices: ['atom', 'molecule', 'organism', 'layout', 'graph']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is your React Component name?'
    },
    {
      type: 'list',
      name: 'complexity',
      message: 'What is the complexity of your React Component?',
      choices: ['dumb', 'smart', 'connected', 'graphs'],
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'app/components/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.js',
      templateFile: 'plops/component/{{complexity}}.js.txt'
    },
    {
      type: 'add',
      path: 'app/components/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.styles.js',
      templateFile: 'plops/component/component.styles.js.txt'
    }
  ]
};
