import { logger } from '../logger';

export function exitWithError(msg) {
  logger.error(msg);
  process.exit();
}
