import { Command, Flags } from '@oclif/core';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import * as fs from 'fs-extra';

export default class Build extends Command {
    public static summary = 'Build Docker images';

    public static images = [
        'web',
    ];

    public static flags = {
        images: Flags.string({
            char: 'i',
            multiple: true,
            options: Build.images,
            default: Build.images,
        }),
    };

    public async run (): Promise<void> {
        const rootDir = fs.realpathSync(`${this.config.root}/../`);

        const baseTag = 'ghcr.io/buzzingpixel/blueoceandocker';

        const { flags } = await this.parse(Build);

        const images = flags.images as Array<string>;

        images.forEach((image) => {
            const tag = `${baseTag}_${image}`;

            this.log(chalk.cyan(`Building ${tag}`));

            execSync(
                `
                cd ${rootDir};
                docker build \
                  --build-arg BUILDKIT_INLINE_CACHE=1 \
                  --cache-from ${tag} \
                  --file docker/${image}/Dockerfile \
                  --tag ${tag} \
                  .
            `,
                { stdio: 'inherit' },
            );

            this.log(chalk.green(`Finished building ${tag}`));
        });
    }
}
