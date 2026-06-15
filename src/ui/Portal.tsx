// 门户首页：10 个数据库 app 的导航卡片。点选在新标签页顶层打开现网址。
// 同 origin，所以打开后各 app 自动读到共享的 owner+token。

import { REGISTRY } from "../lib/registry";

export function Portal() {
  return (
    <main>
      <h1 class="page">数据库导航</h1>
      <p class="hint">
        共 {REGISTRY.length} 个库。已在「连接设置」里配好令牌，点开任意 app 都无需再单独登录。
      </p>
      <div class="grid">
        {REGISTRY.map((app) => (
          <a
            class="dbcard"
            key={app.id}
            href={app.url}
            target="_blank"
            rel="noopener"
          >
            <span class="ico">{app.icon}</span>
            <span class="name">{app.label}</span>
            <span class="blurb">{app.blurb}</span>
            <span class="fpath">{app.repo} ↗</span>
          </a>
        ))}
      </div>
    </main>
  );
}
