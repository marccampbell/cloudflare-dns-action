import * as core from '@actions/core';
import * as httpClient from '@actions/http-client';

type Record = {
  id: string;
  content: string;
}

export async function getCurrentRecord(token: string, zoneId: string, name: string): Promise<Record|undefined> {
  const http = new httpClient.HttpClient()

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=50000`;

  const response = await http.get(url, headers);
  const body = await response.readBody();
  const json = JSON.parse(body);

  if (json.success) {
    const record = json.result.find((record: any) => record.name === name);
    if (record) {
      return {
        id: record.id,
        content: record.content
      }
    }
  }
}

export async function updateRecord(token: string, zoneId: string, recordId: string, name: string, type: string, content: string, ttl: string, proxied: string): Promise<Record> {
  core.info(`Updating record ${recordId}`)
  const http = new httpClient.HttpClient()

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`;

  const body = {
    type,
    name,
    content,
    ttl,
    proxied: proxied === 'true' ? true : false
  }

  core.info(JSON.stringify(body));

  const response = await http.put(url, JSON.stringify(body), headers);
  const responseBody = await response.readBody();

  core.info(responseBody)
  const json = JSON.parse(responseBody);

  if (!json.success) {
    throw new Error(`Failed to update record ${recordId}`);
  }

  core.info(`success = ${json.success}`)
  core.info(`Record updated: ${json.result.id}`)

  return {
    id: json.result.id,
    content: json.result.content
  }
}

export async function createRecord(token: string, zoneId: string, name: string, type: string, content: string, ttl: string, proxied: string): Promise<Record> {
  core.info(`Creating record ${name}`)
  const http = new httpClient.HttpClient()

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;

  const body = {
    type,
    name,
    content,
    ttl,
    proxied: proxied === 'true' ? true : false
  }

  core.info(JSON.stringify(body));

  const response = await http.post(url, JSON.stringify(body), headers);
  const responseBody = await response.readBody();
  const json = JSON.parse(responseBody);

  if (!json.success) {
    throw new Error(`Failed to create record ${name}`);
  }

  core.info(`success = ${json.success}`)
  core.info(`Record created: ${json.result.id}`)

  return {
    id: json.result.id,
    content: json.result.content
  }
}
