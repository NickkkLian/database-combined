// 门户首页：各数据库 app 的导航卡片。点选在新标签页顶层打开现网址。
// 同 origin，所以打开后各 app 自动读到共享的 owner+token。中英双语随父级 lang。

import { REGISTRY, GROUPS, type AppLink } from "../lib/registry";
import { t, type Lang } from "../lib/i18n";

export function Portal({ lang }: { lang: Lang }) {
  return (
    <main>
      <h1 class="page">{t("portalTitle", lang)}</h1>
      <p class="hint">
        {lang === "zh" ? (
          <>
            共 {REGISTRY.length} 个库。已在「连接设置」里配好令牌，点开任意 app 都无需再单独登录。
            <br />
            带 <span class="sitetag live">🌐 已上站</span> 的库，公开数据正在个人网站展示；
            带 <span class="sitetag ready">🌐 已接线</span> 的已配好通道，点「发布公开」后即可上站（鼠标停在标上看具体情况）。
          </>
        ) : (
          <>
            {REGISTRY.length} apps. The token is set in Settings — open any app, no separate login.
            <br />
            <span class="sitetag live">🌐 live</span> = its public data is showing on the personal site;
            <span class="sitetag ready">🌐 wired</span> = the pipe is configured, one «publish» away (hover the tag for details).
          </>
        )}
      </p>
      {/* 按组分区。顺序由 GROUPS 决定；空组不渲染标题，免得留个空壳。 */}
      {GROUPS.map((g) => {
        const apps = REGISTRY.filter((a) => a.group === g.id);
        if (!apps.length) return null;
        return (
          <section class="dbgroup" key={g.id}>
            <h2 class="grouphead">
              {lang === "zh" ? g.label : g.labelEn}
              <span class="groupcount">{apps.length}</span>
            </h2>
            <div class="grid">
              {apps.map((app) => (
                <Card app={app} lang={lang} key={app.id} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

function Card({ app, lang }: { app: AppLink; lang: Lang }) {
  return (
    <a class="dbcard" href={app.url} target="_blank" rel="noopener">
      {/* 有公开数据接进个人网站的库打个标（站长 2026-07-25 要求，放卡片右上角）。
          live＝已发布且网站在展示；ready＝已接线但还没上墙。悬停看具体原因。 */}
      {app.site && (
        <span
          class={`sitetag ${app.site}`}
          title={(lang === "zh" ? app.siteNote : app.siteNoteEn) ?? ""}
        >
          {app.site === "live"
            ? lang === "zh"
              ? "🌐 已上站"
              : "🌐 live"
            : lang === "zh"
              ? "🌐 已接线"
              : "🌐 wired"}
        </span>
      )}
      <span class="ico">{app.icon}</span>
      <span class="name">{lang === "zh" ? app.label : app.labelEn}</span>
      <span class="blurb">{lang === "zh" ? app.blurb : app.blurbEn}</span>
      <span class="fpath">{app.repo} ↗</span>
    </a>
  );
}
