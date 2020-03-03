module.exports = {
  description: 'Creates a service file with basic CRUD methods setup.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of the service (eg. celsius, users ...)?'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'app/services/{{dashCase name}}-service.js',
      templateFile: 'plops/service/service.js.txt',
    },
  ]
};
