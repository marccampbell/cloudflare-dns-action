import * as httpClient from '@actions/http-client';

export async function getCurrentRecordId(token: string, zoneId: string, name: string): Promise<string|undefined> {
  const http = new httpClient.HttpClient()

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=A&name=${name}`;

  const response = await http.get(url, headers);
  const body = await response.readBody();
  const json = JSON.parse(body);
  console.log(json);
  if (json.success) {
    const record = json.result.find((record: any) => record.name === name);
    if (record) {
      return record.id;
    }
  }
}
