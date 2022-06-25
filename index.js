const { chalk } = require("./utils/chalkTip");
const program = require('commander');
const leven = require('leven');
const { createAction } = require('./actions/create')

program
    .command('create <project> [others...]')
    .description('create a awesome project!')
    .action(createAction);


function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name)

    let suggestion

    availableCommands.forEach(cmd => {
        const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
        if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
            suggestion = cmd
        }
    })
    if (suggestion) {
        console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
}

// output help information on unknown commands
program.on('command:*', ([cmd]) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
    process.exitCode = 1
})



program.parse(process.argv);
