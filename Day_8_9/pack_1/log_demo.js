import { createLogger } from './FileRotator.js';

const logger = createLogger({ dir: '.', filename: 'app.log', maxBytes: 1024 * 1024 });

console.log('Writing sample logs until rotation occurs (maxBytes = 1MB)...');
for (let i = 0; i < 200000; i++) {
  logger.log(`Demo log line number ${i} - sample payload to grow file size quickly.`);
  if (i % 5000 === 0) process.stdout.write('.');
}
console.log('\nDone. Check app.log and rotated files in the same directory.');
