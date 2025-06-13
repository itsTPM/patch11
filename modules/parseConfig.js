import * as fs from 'node:fs/promises';

export async function parseConfig() {
  const configPath = './config.json';

  try {
    await fs.access(configPath);
  } catch (error) {
    throw new Error(
      `Config file not found at ${configPath}. Please ensure it exists and is accessible. Error: ${error.message}`,
    );
  }

  const data = await fs.readFile(configPath, 'utf8');

  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error(
      `Failed to parse ${configPath}! Check JSON syntax and file existence. Error: ${error.name}, ${error.message}`,
    );
  }
}
