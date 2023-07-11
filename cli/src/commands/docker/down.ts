import { Command } from '@oclif/core';
import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export default class Down extends Command {
    public static summary = 'Stops the Docker environment';

    public async run (): Promise<void> {
        const rootDir = fs.realpathSync(`${this.config.root}/../`);
        const dockerDir = `${rootDir}/docker`;

        this.log(chalk.cyan('Stopping the Docker environment…'));

        execSync(
            `
                cd ${dockerDir};
                docker compose -f docker-compose.dev.yml -p blueoceandocker down;
            `,
            { stdio: 'inherit' },
        );

        this.log(chalk.green('Docker environment is offline.'));
    }
}
