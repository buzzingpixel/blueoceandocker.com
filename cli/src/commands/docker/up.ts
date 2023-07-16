import { Command, Flags } from '@oclif/core';
import { execSync } from 'node:child_process';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import Build from './build';
import EnsureDevFiles from './ensure-dev-files';

interface StandAlone {
    pull?: boolean,
    inPlace?: boolean,
    skipProvision?: boolean,
}

export default class Up extends Command {
    public static summary = 'Brings Docker environment online and runs provisioning as necessary';

    public static flags = {
        pull: Flags.boolean({
            char: 'p',
            default: false,
        }),
        'in-place': Flags.boolean({
            char: 'i',
            default: false,
            description: 'Run docker up without the detach flag',
        }),
        'skip-provision': Flags.boolean({
            char: 's',
            default: false,
        }),
        simple: Flags.boolean({
            default: false,
            description: 'Alias of --skip-provision',
        }),
    };

    public async run (): Promise<void> {
        const { flags } = await this.parse(Up);

        return this.runStandAlone({
            pull: flags.pull,
            inPlace: flags['in-place'],
            skipProvision: flags['skip-provision'] || flags.simple,
        });
    }

    public async runStandAlone (params?: StandAlone) {
        const rootDir = fs.realpathSync(`${this.config.root}/../`);
        const dockerDir = `${rootDir}/docker`;
        const ephemeralStorageDir = `${dockerDir}/_ephemeral-storage`;
        const hasBuilt = `${ephemeralStorageDir}/has_built`;

        const EnsureDevFilesC = new EnsureDevFiles(this.argv, this.config);
        await EnsureDevFilesC.run();

        const hasPulled = fs.existsSync(hasBuilt);

        if (!hasPulled || params?.pull) {
            this.log(chalk.cyan('Building Docker images…'));

            const BuildC = new Build([], this.config);
            await BuildC.run();

            this.log(chalk.green('Docker images were built.'));

            fs.writeFileSync(hasBuilt, '');
        }

        if (!params?.skipProvision) {
            this.log(chalk.cyan('Running web provisioning…'));

            execSync(
                `
                    cd ${dockerDir};

                    chmod +x web/pre-up-provisioning.sh;
                    web/pre-up-provisioning.sh;
                `,
                { stdio: 'inherit' },
            );

            this.log(chalk.green('Web provisioning finished.'));
        }

        this.log(chalk.cyan('Bringing the Docker environment online…'));

        execSync(
            '(docker network create traefik >/dev/null 2>&1) || true;',
            { stdio: 'inherit' },
        );

        // If inPlace is specified, run up without the detach flag then exit
        if (params?.inPlace) {
            execSync(
                `
                    cd ${dockerDir};
                    docker compose -f docker-compose.dev.yml -p blueoceandocker up;
                `,
                { stdio: 'inherit' },
            );

            return;
        }

        execSync(
            `
                cd ${dockerDir};
                docker compose -f docker-compose.dev.yml -p blueoceandocker up -d;
            `,
            { stdio: 'inherit' },
        );

        this.log(chalk.green('Docker environment is online.'));
    }
}
