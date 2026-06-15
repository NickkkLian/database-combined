// 共享连接配置 —— 同 origin 下导航站与 10 个 app 共用的单一键 pha-config。
// 按站长拍板：只放 owner + token；各 app 的 repo / branch / path 由 app 自己保留。
// 令牌只存本设备浏览器，绝不进仓库 / 硬编码 / 明文产物。

export interface Config {
  owner: string;
  /** fine-grained PAT，授权各数据库仓库、Contents 读写 */
  token: string;
}

const KEY = "pha-config";

const DEFAULTS: Config = {
  owner: "NickkkLian",
  token: "",
};

export function loadConfig(): Config {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<Config>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveConfig(cfg: Config): void {
  localStorage.setItem(KEY, JSON.stringify(cfg));
}

export function clearConfig(): void {
  localStorage.removeItem(KEY);
}

/** 是否已具备共享给各 app 的最小信息 */
export function isConfigured(cfg: Config): boolean {
  return Boolean(cfg.owner && cfg.token);
}
