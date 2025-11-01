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
  .option('-f, --force', 'Overwrite existing files')
  .option('-s, --silent', 'Suppress informational logs')
  .parse(process.argv);

const options = program.opts();
const force = Boolean(options.force);
const silent = Boolean(options.silent);

const log = (...messages) => {
  if (!silent) {
    console.log(...messages);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.resolve(__dirname, '..', 'templates');
const targetDir = process.cwd();

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
  const prompt = `${chalk.yellow('⚠️')} ${relativePath} already exists. Overwrite? ${chalk.dim('(y/N) ')} `;
  const interfaceInstance = ensureReadline();
  return new Promise((resolve) => {
    interfaceInstance.question(prompt, (answer) => {
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === 'y' || normalized === 'yes');
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
      await fs.ensureDir(destinationPath);
      await copyTemplates(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      const displayPath = toDisplayPath(destinationPath);
      const exists = await fs.pathExists(destinationPath);

      let shouldCopy = true;
      if (exists && !force) {
        shouldCopy = await askToOverwrite(displayPath);
      }

      if (shouldCopy) {
        await fs.ensureDir(path.dirname(destinationPath));
        await fs.copyFile(sourcePath, destinationPath);
        log(`${chalk.green('✅')} Created ${chalk.cyan(displayPath)}`);
      } else {
        log(`${chalk.yellow('⏭️')} Skipped ${chalk.cyan(displayPath)}`);
      }
    }
  }
};

const main = async () => {
  try {
    await fs.ensureDir(targetDir);
    await copyTemplates(templatesDir, targetDir);
    log(chalk.magenta.bold('🎉 Vibe setup complete!'));
  } catch (error) {
    console.error(`${chalk.red('✖')} ${error.message}`);
    process.exitCode = 1;
  } finally {
    if (rl) {
      rl.close();
    }
  }
};

main();
