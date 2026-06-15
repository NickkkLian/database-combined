// 应用外壳：未配置 → 连接设置页；已配置 → 门户导航。
// 门户不读写数据、不做站内编辑；只链接 10 个现网址 + 写入共享 owner+token。

import { useState } from "preact/hooks";
import { loadConfig, isConfigured, type Config } from "./lib/store";
import { Connection } from "./ui/Connection";
import { Portal } from "./ui/Portal";

export function App() {
  const [cfg, setCfg] = useState<Config>(loadConfig());
  const [connected, setConnected] = useState<boolean>(isConfigured(loadConfig()));

  // 回到连接设置页（不清令牌，值预填；如需清除用页内「清除本机令牌」）
  function openSettings() {
    setCfg(loadConfig());
    setConnected(false);
  }

  return (
    <>
      <header class="top">
        <span class="brand">
          <span class="ring">NL</span> 数据库导航台
        </span>
        <span class="grow" />
        {connected ? (
          <button class="linkbtn" onClick={openSettings}>
            连接设置
          </button>
        ) : (
          <span class="mono">未连接</span>
        )}
      </header>

      {connected ? (
        <Portal />
      ) : (
        <Connection
          initial={cfg}
          onConnected={(c) => {
            setCfg(c);
            setConnected(true);
          }}
        />
      )}
    </>
  );
}
