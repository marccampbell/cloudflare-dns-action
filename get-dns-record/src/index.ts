import * as core from '@actions/core';
import { getCurrentRecord } from './cloudflare';

async function run() {
  try {
    const type: string = core.getInput('type');
    const name: string = core.getInput('name');
    const zoneId: string = core.getInput('zoneId');
    const token: string = core.getInput('token');

    const currentRecord = await getCurrentRecord(token, zoneId, name);
    if (currentRecord) {
      core.setOutput('record-id', currentRecord.id);
      core.setOutput('content', currentRecord.content);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}


run()
