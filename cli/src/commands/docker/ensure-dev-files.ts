import { Command } from '@oclif/core';
import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';

export default class EnsureDevFiles extends Command {
    public static summary = 'Ensure local dev files exist';

    public async run (): Promise<void> {
        const rootDir = fs.realpathSync(`${this.config.root}/../`);

        execSync(
            `
                cd ${rootDir};
                touch docker/web/.env.local;
            `,
            { stdio: 'inherit' },
        );
    }
}
