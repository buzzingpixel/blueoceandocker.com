import { Command } from '@oclif/core';
import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export default class Tsc extends Command {
    static summary = 'Run TypeScript checking';

    async run (): Promise<void> {
        const rootDir = fs.realpathSync(`${this.config.root}/../`);
        const webDir = `${rootDir}/web`;

        const cmd = 'yarn tsc';

        this.log(chalk.cyan('Running tsc (TypeScript checking)...'));

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

        this.log(chalk.green('Finished running tsc.'));
    }
}
