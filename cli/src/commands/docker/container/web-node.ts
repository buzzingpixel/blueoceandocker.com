import { Command } from '@oclif/core';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import * as fs from 'fs-extra';

export default class WebNode extends Command {
    // Allow variable arguments
    public static strict = false;

    public static summary = `Execute command in the ${chalk.cyan('web-node')} container. Empty argument starts a bash session`;

    public static description = 'If this command is run without arguments, a shell session will be started in the web-node container and you will be placed in that shell session. However, any arguments provided will, instead, be passed into and run in the shell session and then the session will exit. The latter is most often how you will use this command.';

    public static args = [
        {
            name: 'cmd',
            description: 'command',
            default: null,
        },
    ];

    public async run (): Promise<void> {
        const rootDir = fs.realpathSync(`${this.config.root}/../`);

        this.log(chalk.yellow(
            "You're working inside the 'web-node' application container of this project.",
        ));

        if (this.argv.length) {
            execSync(
                `
                    docker run -it --rm \
                        --entrypoint "" \
                        --env NODE_ENV=development \
                        --name blueoceandocker_web-node \
                        -v "${rootDir}/web:/app" \
                        -w /app \
                        ghcr.io/buzzingpixel/blueoceandocker_web sh -c "${this.argv.join(' ')}";
                `,
                { stdio: 'inherit' },
            );

            return;
        }

        this.log(chalk.yellow("Remember to exit when you're done"));

        execSync(
            `
                docker run -it --rm \
                    --entrypoint "" \
                    --env NODE_ENV=development \
                    --name blueoceandocker_web-node \
                    -v "${rootDir}/web:/app" \
                    -w /app \
                    ghcr.io/buzzingpixel/blueoceandocker_web sh;
            `,
            { stdio: 'inherit' },
        );
    }
}
