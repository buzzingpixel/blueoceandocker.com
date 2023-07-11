import { Command, Flags } from '@oclif/core';
import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export default class Eslint extends Command {
    public static summary = 'Run eslint';

    static flags = {
        fix: Flags.boolean({
            char: 'f',
            default: false,
        }),
    };

    public async run (): Promise<void> {
        const { flags } = await this.parse(Eslint);
        const rootDir = fs.realpathSync(`${this.config.root}/../`);
        const webDir = `${rootDir}/web`;

        let cmd = 'NODE_OPTIONS="--trace-warnings" yarn lint --max-warnings=0';

        if (flags.fix) {
            cmd += ' --fix';
        }

        this.log(chalk.cyan('Running eslint...'));

        this.log(chalk.yellow('```'));
        this.log(chalk.yellow(`cd ${webDir};`));
        this.log(chalk.yellow(`${cmd};`));
        this.log(chalk.yellow('```'));

        execSync(
            `
                cd ${webDir};
                ${cmd};
            `,
            { stdio: 'inherit' },
        );

        this.log(chalk.green('Finished running eslint.'));
    }
}
