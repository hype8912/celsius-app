module.exports = {
  description: 'Creates React Native screen and style files inside /screens',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new Screen?'
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'app/components/screens/{{pascalCase name}}/{{pascalCase name}}.js',
      templateFile: 'plops/screen/screen.js.txt'
    },
    {
      type: 'add',
      path: 'app/components/screens/{{pascalCase name}}/{{pascalCase name}}.styles.js',
      templateFile: 'plops/component/component.styles.js.txt'
    },
  ]
};
