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

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${name}`;

  const response = await http.get(url, headers);
  const body = await response.readBody();
  const json = JSON.parse(body);

  core.info(body);

  if (json.success) {
    const record = json.result.find((record: any) => record.name === name);
    if (record) {
      return record.id;
    }
  }
}
