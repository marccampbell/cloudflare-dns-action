import * as core from '@actions/core';
import { getCurrentRecord, updateRecord, createRecord } from './cloudflare';

async function run() {
  try {
    const type: string = core.getInput('type');
    const name: string = core.getInput('name');
    const content: string = core.getInput('content');
    const ttl: string = core.getInput('ttl');
    const proxied: string = core.getInput('proxied');
    const zoneId: string = core.getInput('zoneId');
    const token: string = core.getInput('token');

    const currentRecord = await getCurrentRecord(token, zoneId, name);
    if (currentRecord) {
      const updatedRecord = await updateRecord(token, zoneId, currentRecord.id, name, type, content, ttl, proxied);
      core.setOutput('record-id', updatedRecord.id);
    } else {
      const newRecord = await createRecord(token, zoneId, name, type, content, ttl, proxied);
      core.setOutput('record-id', newRecord.id);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}


run()
