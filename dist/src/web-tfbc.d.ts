import { WebTFBCConfig } from "./web-tfbc.types";
export declare class WebTFBC {
    config: WebTFBCConfig;
    constructor(config?: WebTFBCConfig);
    private _isExpired;
    private _clear;
    private _get;
    cache<T>(key: string, content: T): Promise<T>;
}
