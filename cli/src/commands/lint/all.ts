import { Command } from '@oclif/core';
import Eslint from './eslint';
import Hadolint from './hadolint';
import Tsc from './tsc';

export default class All extends Command {
    public static summary = 'Run all linting for RxEffect';

    public async run (): Promise<void> {
        const EsLintC = new Eslint(this.argv, this.config);
        await EsLintC.run();

        const TscC = new Tsc(this.argv, this.config);
        await TscC.run();

        const HadolintC = new Hadolint(this.argv, this.config);
        await HadolintC.run();
    }
}
