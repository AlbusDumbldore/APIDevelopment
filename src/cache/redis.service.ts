import { injectable } from 'inversify';
import { createClient, SetOptions } from 'redis';
import { appConfig } from '../config';

@injectable()
export class RedisService {
  private readonly client = createClient({
    url: appConfig.redisUrl,
  });

  async connect() {
    await this.client.connect();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async setJson(key: string, value: Record<string, any>, options?: SetOptions) {
    const json = JSON.stringify(value);

    return this.client.set(key, json, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getJson<T extends Record<string, any>>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }
}
