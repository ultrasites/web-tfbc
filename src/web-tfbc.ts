import * as fs from "fs";
import { WebTFBCConfig, WebTFBCDefaultConfig } from "./web-tfbc.types";

export class WebTFBC {
  config: WebTFBCConfig;

  constructor(config: WebTFBCConfig = WebTFBCDefaultConfig) {
    this.config = config;
  }

  private _isExpired(fileBirthday: number): boolean {
    const currentTimestamp = new Date().valueOf();
    const fsTimestamp = new Date(fileBirthday).valueOf();
    return currentTimestamp - fsTimestamp > this.config.expired;
  }

  private _clear(key: string) {
    fs.unlinkSync(this.config.filePath + key);
  }

  private _get<T>(key: string): T | boolean | void {
    try {
      const stats = fs.statSync(this.config.filePath + key);

      if (!stats.isFile()) {
        return false;
      }

      if (this._isExpired(stats.birthtimeMs)) {
        this._clear(key);
        return false;
      } else {
        try {
          const content = fs.readFileSync(this.config.filePath + key, {
            encoding: this.config.encoding,
          });
          return content as unknown as T;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (_e) {
      return false;
    }
  }

  async cache<T>(key: string, content: T) {
    try {
      await fs.promises.access(this.config.filePath);
    } catch {
      fs.mkdirSync(this.config.filePath, { recursive: true });
    }
    const cached = this._get<T>(key);
    let data = "";

    if(content instanceof HTMLElement) {
      data = content.innerHTML;
    } else {
      data = content as unknown as string;
    }

    if (cached !== false) {
      return cached as T;
    } else {
      fs.writeFileSync(
        this.config.filePath + key,
        data,
        { encoding: this.config.encoding }
      );
      return content;
    }
  }
}
