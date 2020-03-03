module.exports = {
    description: 'Adds a Redux folder with Actions and/or Reducer',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your Redux folder name?',
        },
        {
            type: 'list',
            name: 'files',
            message: 'What files do you need?',
            choices: ['reducer', 'actions', 'both'],
        },
    ],
    actions: function(data) {
        const actions = [];

        if (data.files === 'actions' || data.files === 'both') {
            actions.push(
                {
                    type: 'add',
                    path: 'app/redux/{{camelCase name}}/{{camelCase name}}Actions.js',
                    templateFile: 'plops/redux/actions.js.txt',
                },
                {
                    type: 'modify',
                    path: 'app/redux/actions.js',
                    pattern: '// NOTE(fj): plop reduxGen importing new Actions here',
                    template: [
                        'export * from \'./{{camelCase name}}/{{camelCase name}}Actions\'',
                        '// NOTE(fj): plop reduxGen importing new Actions here',
                    ].join('\n'),
                },
            );
        }

        if (data.files === 'reducer' || data.files === 'both') {
            actions.push(
                {
                    type: 'add',
                    path: 'app/redux/{{camelCase name}}/{{camelCase name}}Reducer.js',
                    templateFile: 'plops/redux/reducer.js.txt',
                },
                {
                    type: 'modify',
                    path: 'app/redux/reducers.js',
                    pattern: '// NOTE(fj): plop reduxGen importing new Reducer here',
                    template: [
                        'import {{camelCase name}} from \'./{{camelCase name}}/{{camelCase name}}Reducer\';',
                        '// NOTE(fj): plop reduxGen importing new Reducer here',
                    ].join('\n'),
                },
                {
                    type: 'modify',
                    path: 'app/redux/reducers.js',
                    pattern: '// NOTE(fj): plop reduxGen inserting new Reducer here',
                    template: [
                        '{{camelCase name}},',
                        '  // NOTE(fj): plop reduxGen inserting new Reducer here',
                    ].join('\n'),
                }
            );
        }

        return actions;
    }
};
