// 极简 GitHub 校验。门户本身不读写任何数据文件，只在「连接设置」里验证令牌是否有效。
// 用 GET /user（不需要指定仓库），顺带核对登录名是否与填写的 owner 一致。

export interface ValidateResult {
  ok: boolean;
  /** 令牌对应的 GitHub 登录名 */
  login?: string;
  /** owner 与令牌登录名不一致时给出提示（非致命） */
  warning?: string;
  error?: string;
}

export async function validateToken(owner: string, token: string): Promise<ValidateResult> {
  let r: Response;
  try {
    r = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (e) {
    return { ok: false, error: `网络错误：${(e as Error).message}` };
  }

  if (r.status === 401) return { ok: false, error: "令牌无效或已过期（HTTP 401）" };
  if (r.status === 403) return { ok: false, error: "无权限或触发频率限制（HTTP 403）" };
  if (!r.ok) return { ok: false, error: `校验失败 HTTP ${r.status}` };

  const j = await r.json().catch(() => ({}));
  const login: string | undefined = j.login;
  const warning =
    login && owner && login.toLowerCase() !== owner.toLowerCase()
      ? `注意：令牌属于账号「${login}」，与填写的 owner「${owner}」不一致。`
      : undefined;
  return { ok: true, login, warning };
}
