import chalk from 'chalk';
import { program } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { getSheetContent } from './feishu-api/spreadsheet/api';
import { spreadsheetToJson } from './feishu-api/spreadsheet/utils';


const spreadsheetCommand = program.command('spreadsheet');
spreadsheetCommand.command('download')
  .description('Downloads the spreadsheet')
  .argument('<docUrl>', 'The spreadsheet url, e.g. https://test-ciso15gzgfgx.feishu.cn/sheets/shtcnUQqsyPEuWze47yNQs0sQ6d?sheet=699fea')
  .argument('<output>', 'The output JSON file path')
  .action(async (docUrl: string, output: string) => {
    console.log(chalk.yellow('Downloading spreadsheet...'));
    const content = await getSheetContent(docUrl);
    const json = spreadsheetToJson(content);
    const jsonStr = JSON.stringify(json, null, 2);
    const outputPath = path.resolve(output);
    fs.ensureFileSync(outputPath);
    fs.writeFileSync(outputPath, jsonStr, { encoding: 'utf8' });
    console.log(chalk.green(`Spreadsheet downloaded to ${outputPath}`));
  });

program.parse(process.argv);
