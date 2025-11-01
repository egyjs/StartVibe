#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import chalk from 'chalk';

const program = new Command();

program
  .name('start-vibe')
  .description('Bootstrap AI-ready documentation templates into your current project.')
  .option('-f, --force', 'Overwrite all existing files without prompting')
  .option('-s, --silent', 'Suppress informational logs')
  .option('-d, --dry-run', 'Show what would be copied without actually copying')
  .option('-v, --verbose', 'Show detailed progress information')
  .parse(process.argv);

const options = program.opts();
const force = Boolean(options.force);
const silent = Boolean(options.silent);
const dryRun = Boolean(options.dryRun);
const verbose = Boolean(options.verbose);

const log = (...messages) => {
  if (!silent) {
    console.log(...messages);
  }
};

const logVerbose = (...messages) => {
  if (!silent && verbose) {
    console.log(chalk.dim(...messages));
  }
};

const logError = (...messages) => {
  console.error(...messages);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.resolve(__dirname, '..', 'templates');
const targetDir = process.cwd();

// Statistics tracking
const stats = {
  created: 0,
  skipped: 0,
  overwritten: 0,
  total: 0
};

// Batch decision for conflicts
let batchDecision = null; // Can be 'all', 'none', or null (ask each time)

let rl;
const ensureReadline = () => {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  return rl;
};

const askToOverwrite = async (relativePath) => {
  // If we have a batch decision, use it
  if (batchDecision === 'all') return true;
  if (batchDecision === 'none') return false;

  const prompt = `${chalk.yellow('⚠️')} ${relativePath} already exists. Overwrite? ${chalk.dim('(Y/n/a/s) ')} `;
  const interfaceInstance = ensureReadline();
  return new Promise((resolve) => {
    interfaceInstance.question(prompt, (answer) => {
      const normalized = answer.trim().toLowerCase();
      
      // Handle batch decisions
      if (normalized === 'a' || normalized === 'all') {
        batchDecision = 'all';
        log(chalk.cyan('ℹ️  Will overwrite all remaining conflicts'));
        resolve(true);
      } else if (normalized === 's' || normalized === 'skip') {
        batchDecision = 'none';
        log(chalk.cyan('ℹ️  Will skip all remaining conflicts'));
        resolve(false);
      } else {
        // Default to 'yes' if user just presses Enter (empty answer)
        resolve(normalized === '' || normalized === 'y' || normalized === 'yes');
      }
    });
  });
};

const toDisplayPath = (absolutePath) => {
  const relative = path.relative(targetDir, absolutePath) || '.';
  return `/${relative.split(path.sep).join('/')}`;
};

const copyTemplates = async (sourceDir, destinationDir) => {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      logVerbose(`📁 Processing directory: ${entry.name}`);
      await fs.ensureDir(destinationPath);
      await copyTemplates(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      stats.total++;
      const displayPath = toDisplayPath(destinationPath);
      const exists = await fs.pathExists(destinationPath);

      let shouldCopy = true;
      let action = 'Created';

      if (exists && !force) {
        shouldCopy = await askToOverwrite(displayPath);
        if (shouldCopy) {
          action = 'Overwritten';
          stats.overwritten++;
        }
      } else if (exists && force) {
        action = 'Overwritten';
        stats.overwritten++;
      }

      if (shouldCopy) {
        if (dryRun) {
          log(`${chalk.blue('🔍')} Would ${action.toLowerCase()}: ${chalk.cyan(displayPath)}`);
          if (!exists) stats.created++;
        } else {
          await fs.ensureDir(path.dirname(destinationPath));
          await fs.copyFile(sourcePath, destinationPath);
          log(`${chalk.green('✅')} ${action} ${chalk.cyan(displayPath)}`);
          if (action === 'Created') stats.created++;
        }
      } else {
        stats.skipped++;
        log(`${chalk.yellow('⏭️')} Skipped ${chalk.cyan(displayPath)}`);
      }
    }
  }
};

const main = async () => {
  try {
    // Validate templates directory exists
    if (!(await fs.pathExists(templatesDir))) {
      logError(`${chalk.red('✖')} Templates directory not found: ${templatesDir}`);
      logError(chalk.dim('This might be a package installation issue.'));
      process.exitCode = 1;
      return;
    }

    // Show mode information
    if (dryRun) {
      log(chalk.blue.bold('🔍 DRY RUN MODE - No files will be modified\n'));
    }
    
    if (verbose) {
      log(chalk.dim(`📂 Templates: ${templatesDir}`));
      log(chalk.dim(`📂 Target: ${targetDir}\n`));
    }

    log(chalk.cyan('🚀 Starting template installation...\n'));

    await fs.ensureDir(targetDir);
    await copyTemplates(templatesDir, targetDir);
    
    // Display summary
    log('');
    log(chalk.magenta.bold('━'.repeat(50)));
    log(chalk.magenta.bold('🎉 Vibe setup complete!'));
    log(chalk.magenta.bold('━'.repeat(50)));
    
    if (stats.total > 0) {
      log('');
      log(chalk.bold('📊 Summary:'));
      if (stats.created > 0) {
        log(`   ${chalk.green('✅')} Created: ${chalk.bold(stats.created)} file${stats.created !== 1 ? 's' : ''}`);
      }
      if (stats.overwritten > 0) {
        log(`   ${chalk.yellow('♻️')} Overwritten: ${chalk.bold(stats.overwritten)} file${stats.overwritten !== 1 ? 's' : ''}`);
      }
      if (stats.skipped > 0) {
        log(`   ${chalk.gray('⏭️')} Skipped: ${chalk.bold(stats.skipped)} file${stats.skipped !== 1 ? 's' : ''}`);
      }
      log(`   ${chalk.cyan('📁')} Total: ${chalk.bold(stats.total)} file${stats.total !== 1 ? 's' : ''}`);
    }
    
    if (dryRun) {
      log('');
      log(chalk.blue('ℹ️  This was a dry run. Run without --dry-run to apply changes.'));
    }
    
    log('');
  } catch (error) {
    logError(`${chalk.red('✖')} Error: ${error.message}`);
    if (verbose && error.stack) {
      logError(chalk.dim(error.stack));
    }
    process.exitCode = 1;
  } finally {
    if (rl) {
      rl.close();
    }
  }
};

main();
