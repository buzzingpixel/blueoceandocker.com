import { Command, Flags } from '@oclif/core';
import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export default class Hadolint extends Command {
    public static summary = 'Run Hadolint';

    public static dockerfiles = [
        'web',
    ];

    public static flags = {
        files: Flags.string({
            char: 'f',
            multiple: true,
            options: Hadolint.dockerfiles,
            default: Hadolint.dockerfiles,
        }),
    };

    public async run (): Promise<void> {
        const { flags } = await this.parse(Hadolint);

        const rootDir = fs.realpathSync(`${this.config.root}/../`);

        const files = flags.files as Array<string>;

        files.forEach((file) => {
            const filePath = `docker/${file}/Dockerfile`;

            this.log('------------------------------------------');

            this.log(chalk.yellow(`Checking ${filePath}…`));

            try {
                execSync(
                    `
                    docker run --rm -i \
                        -v ${rootDir}/.hadolint.yaml:/.config/hadolint.yaml \
                        hadolint/hadolint < ${rootDir}/${filePath};
                    `,
                    { stdio: 'inherit' },
                );

                this.log(chalk.green(`No issues found in ${filePath}`));

                // eslint-disable-next-line no-empty
            } catch (error) {
                this.log(chalk.red(`Issues found in ${filePath}`));
            }
        });
    }
}
