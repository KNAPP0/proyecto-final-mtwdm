import chalk from 'chalk';

export const DEBUG = () => {
    return {
        express: require('debug')('api:[Express]'), //6.7k (gzipped: 2.7k)
        mongoDB: require('debug')('api:[MongoDB]') //6.7k (gzipped: 2.7k)
    }
};

export const COLOR = () => {
    return {
        express: chalk.bgHex('#333333').whiteBright.bold,
        mongoDB: chalk.bgHex('#412F20').hex('#589636').bold,
        success: chalk.greenBright,
        danger: chalk.redBright.bold,
        warning: chalk.yellowBright,
        info: chalk.white.bold
    }
}