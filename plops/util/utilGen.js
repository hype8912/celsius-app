module.exports = {
  description: 'Creates a util/helper file',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of the util (eg. celsius util)?'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'app/utils/{{dashCase name}}.js',
      templateFile: 'plops/util/util.js.txt'
    },
  ]
};
