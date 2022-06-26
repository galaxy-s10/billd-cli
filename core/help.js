const program = require('commander');
const pkg = require('../package.json')

const helpOptions = () => {
    program
        .version(pkg.name + ' ' + pkg.version, '-v, --version', 'output the current version')

}

module.exports = { helpOptions };

