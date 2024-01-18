import * as core from '@actions/core';
import { getCurrentRecordId } from './cloudflare';

async function run() {
  try {
    const type: string = core.getInput('type');
    const name: string = core.getInput('name');
    const content: string = core.getInput('content');
    const ttl: string = core.getInput('ttl');
    const proxied: string = core.getInput('proxied');
    const zoneId: string = core.getInput('zoneId');
    const token: string = core.getInput('token');

    const currentRecordId = await getCurrentRecordId(token, zoneId, name);
    if (currentRecordId) {
      console.log(`Record already exists with id ${currentRecordId}`);
    } else {
      console.log(`Record does not exist, creating...`);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}


run()
