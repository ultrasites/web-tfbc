"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebTFBC = void 0;
const fs = __importStar(require("fs"));
const web_tfbc_types_1 = require("./web-tfbc.types");
class WebTFBC {
    constructor(config = web_tfbc_types_1.WebTFBCDefaultConfig) {
        this.config = config;
    }
    _isExpired(fileBirthday) {
        const currentTimestamp = new Date().valueOf();
        const fsTimestamp = new Date(fileBirthday).valueOf();
        return currentTimestamp - fsTimestamp > this.config.expired;
    }
    _clear(key) {
        fs.unlinkSync(this.config.filePath + key);
    }
    _get(key) {
        try {
            const stats = fs.statSync(this.config.filePath + key);
            if (!stats.isFile()) {
                return false;
            }
            if (this._isExpired(stats.birthtimeMs)) {
                this._clear(key);
                return false;
            }
            else {
                try {
                    const content = fs.readFileSync(this.config.filePath + key, {
                        encoding: this.config.encoding,
                    });
                    return content;
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        catch (_e) {
            return false;
        }
    }
    cache(key, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.access(this.config.filePath);
            }
            catch (_a) {
                fs.mkdirSync(this.config.filePath, { recursive: true });
            }
            const cached = this._get(key);
            let data = "";
            if (content instanceof HTMLElement) {
                data = content.innerHTML;
            }
            else {
                data = content;
            }
            if (cached !== false) {
                return cached;
            }
            else {
                fs.writeFileSync(this.config.filePath + key, data, { encoding: this.config.encoding });
                return content;
            }
        });
    }
}
exports.WebTFBC = WebTFBC;
//# sourceMappingURL=web-tfbc.js.map