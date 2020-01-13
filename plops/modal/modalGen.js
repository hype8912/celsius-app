module.exports = {
  description: "Creates React Native modal and style files inside /modals",
  prompts: [
    {
      type: "list",
      name: "modalType",
      message: "What is your React Native Modal type?",
      choices: ["info", "basic", "multistep"],
    },
    {
      type: "input",
      name: "name",
      message: "What is your React Native Modal name?",
    },
  ],
  actions: [
    {
      type: "add",
      path: "app/components/modals/{{pascalCase name}}/{{pascalCase name}}.js",
      templateFile: "plops/modal/{{modalType}}.js.txt",
    },
    {
      type: "add",
      path:
        "app/components/modals/{{pascalCase name}}/{{pascalCase name}}.styles.js",
      templateFile: "plops/component/component.styles.js.txt",
    },
  ],
};
