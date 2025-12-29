import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';

const yamlPath = path.join(process.cwd(), 'src/docs/chat-api.yml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const openApiSpec = yaml.load(yamlContent);

export default {
    definition: openApiSpec,
    apis: []
};
