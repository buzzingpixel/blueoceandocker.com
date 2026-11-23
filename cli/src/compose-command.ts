import * as fs from 'fs-extra';

// Git-ignored, machine-specific overrides, such as extra hostnames for one
// machine's dev sites
const LOCAL_OVERRIDE_FILE = 'docker-compose.local.yml';

export default function composeCommand (dockerDir: string, args: string): string {
    const files = ['-f docker-compose.dev.yml'];

    if (fs.existsSync(`${dockerDir}/${LOCAL_OVERRIDE_FILE}`)) {
        files.push(`-f ${LOCAL_OVERRIDE_FILE}`);
    }

    return `docker compose ${files.join(' ')} -p blueoceandocker ${args}`;
}
