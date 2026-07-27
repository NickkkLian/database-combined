// 门户注册表 —— 站长已部署的数据库 / 工具 web app + 个人网站后台。
// 数据库 app 全部在 https://nickkklian.github.io 同一 origin 下，与导航站共享同一份 localStorage（owner/token）。
// 个人网站后台在 Cloudflare Pages（不同 origin，不共享令牌、有自己的登录）——仅作链接跳转。
// 导航站不读写数据、不碰各 app 的 repo/path；只负责链接它们 + 写入共享 owner/token。

export interface AppLink {
  /** 内部标识 */
  id: string;
  /** 对应 GitHub 仓库名（= Pages 路径） */
  repo: string;
  /** 卡片标题（中文） */
  label: string;
  /** 卡片标题（英文） */
  labelEn: string;
  /** 一句话说明（中文） */
  blurb: string;
  /** 一句话说明（英文） */
  blurbEn: string;
  /** 卡片图标（emoji，零依赖） */
  icon: string;
  /** 现网址（顶层打开） */
  url: string;
  /**
   * 这个库的公开数据有没有接进个人网站（站长 2026-07-25 要求在卡片上标出来）。
   * 判据只认两处硬事实，别凭印象填：
   *   ① personal-hub/sources.config.json 里有没有配这个 app 的 *.public.json
   *   ② 该文件在不在 Database-Public 仓库里 + 对应模块在 site.config.json 里开没开
   * - "live"  ＝ 已发布且网站正在展示
   * - "ready" ＝ 已接线（网站认这个文件），但还没上墙：或没点过「发布公开」、或展厅模块关着
   * - 不写    ＝ 压根没有公开导出这条路（含隐私铁律里永不公开的那几个）
   */
  site?: "live" | "ready";
  /** 标记的补充说明（鼠标悬停显示），只在 site 有值时用 */
  siteNote?: string;
  siteNoteEn?: string;
}

const BASE = "https://nickkklian.github.io";
const at = (repo: string) => `${BASE}/${repo}/`;

export const REGISTRY: AppLink[] = [
  {
    id: "develop",
    repo: "Development-Log",
    label: "开发日志",
    labelEn: "Dev Log",
    blurb: "项目与开发记录台账",
    blurbEn: "Project & dev log",
    icon: "🛠️",
    url: at("Development-Log"),
    site: "live",
    siteNote: "已发布 → 网站 /projects 展厅（改了公开项目要跑一次 sync.yml 才上站）",
    siteNoteEn: "Published, shown at /projects (run sync.yml after changing public entries)",
  },
  {
    id: "writing",
    repo: "Creation-Ideas",
    label: "创意 / 写作",
    labelEn: "Ideas & Writing",
    blurb: "创意想法库 · 写作",
    blurbEn: "Idea vault · writing",
    icon: "✍️",
    url: at("Creation-Ideas"),
    site: "ready",
    siteNote: "网站 /writing 展厅也认这个库的 writing.public.json，但还没点过「发布公开」",
    siteNoteEn: "The site also reads writing.public.json from here, not published yet",
  },
  {
    id: "investment",
    repo: "Investment-Info",
    label: "投资情报",
    labelEn: "Investment",
    blurb: "情报终端 · 持仓与资讯",
    blurbEn: "Intel desk · holdings & news",
    icon: "📈",
    url: at("Investment-Info"),
  },
  {
    id: "life",
    repo: "Life-Atlas",
    label: "生活",
    labelEn: "Life",
    blurb: "旅居与吃喝记录",
    blurbEn: "Travel & food log",
    icon: "🌿",
    url: at("Life-Atlas"),
    site: "ready",
    siteNote: "网站已接线，等你点「发布公开」；展厅模块目前关着",
    siteNoteEn: "Wired up, awaiting publish. The site module is currently off",
  },
  {
    id: "business",
    repo: "Business-Lab",
    label: "选题实验室",
    labelEn: "Idea Lab",
    blurb: "选题与项目实验室",
    blurbEn: "Topics & projects lab",
    icon: "💼",
    url: at("Business-Lab"),
  },
  {
    id: "knowledge",
    repo: "Knowledge-Atlas",
    label: "知识图谱",
    labelEn: "Knowledge",
    blurb: "第二大脑 · 知识管理",
    blurbEn: "Second brain · knowledge",
    icon: "📚",
    url: at("Knowledge-Atlas"),
    site: "ready",
    siteNote: "网站已接线，等你点「发布公开」；展厅模块目前关着",
    siteNoteEn: "Wired up, awaiting publish. The site module is currently off",
  },
  {
    id: "menu",
    repo: "My-Menu",
    label: "菜单",
    labelEn: "Menu",
    blurb: "菜谱 / 调酒 / 烘焙",
    blurbEn: "Recipes / cocktails / baking",
    icon: "🍽️",
    url: at("My-Menu"),
    site: "ready",
    siteNote: "网站已接线（只导出菜品类），等你点「发布公开」；家人菜谱永不导出",
    siteNoteEn: "Wired up (dishes only), awaiting publish. Family recipes are never exported",
  },
  {
    id: "mind",
    repo: "Mind-Archive",
    label: "思维库",
    labelEn: "Mind",
    blurb: "想法与念头归档",
    blurbEn: "Thoughts & ideas archive",
    icon: "🧠",
    url: at("Mind-Archive"),
    site: "live",
    siteNote: "已发布 thoughts.public.json → 网站 /writing（THOUGHTS）展厅；发布时自动翻译一版中英",
    siteNoteEn: "Published thoughts.public.json, shown at /writing (auto zh/en translation on publish)",
  },
  {
    id: "mystery",
    repo: "Mystery-Trick-Archive",
    label: "诡计逻辑库",
    labelEn: "Mystery Tricks",
    blurb: "推理诡计 / 概念归档",
    blurbEn: "Detective tricks & concepts",
    icon: "🔮",
    url: at("Mystery-Trick-Archive"),
    site: "ready",
    siteNote: "网站已接线，等你点「发布公开」；展厅模块目前关着",
    siteNoteEn: "Wired up, awaiting publish. The site module is currently off",
  },
  {
    id: "album",
    repo: "Album-Journal",
    label: "专辑收藏",
    labelEn: "Albums",
    blurb: "音乐专辑 / 唱片收藏",
    blurbEn: "Music albums & records",
    icon: "💿",
    url: at("Album-Journal"),
    site: "ready",
    siteNote: "已发布 album-journal.public.json，但网站的专辑墙模块还关着（见 BACKLOG）",
    siteNoteEn: "Published, but the album-wall module on the site is still off (see BACKLOG)",
  },
  {
    id: "content",
    repo: "content-organizer",
    label: "收藏整理库",
    labelEn: "Content Organizer",
    blurb: "小红书(图文/视频) + B站(视频) · 跨平台 AI 整理",
    blurbEn: "XHS (posts/videos) + Bilibili · cross-platform AI",
    icon: "📚",
    url: at("content-organizer"),
  },
  {
    id: "storage",
    repo: "Storage-Tracker",
    label: "暂存库存",
    labelEn: "Stash",
    blurb: "各处暂存物品 · 地址/数量/图片",
    blurbEn: "Stored items · address/qty/photos",
    icon: "📦",
    url: at("Storage-Tracker"),
  },
  {
    id: "mail",
    repo: "Mail-Sorter",
    label: "邮件分拣台",
    labelEn: "Mail Sorter",
    blurb: "Gmail 自动分类打标 · 每日摘要",
    blurbEn: "Auto-labels Gmail daily · digest",
    icon: "📮",
    url: at("Mail-Sorter"),
  },
  {
    id: "people",
    repo: "People-Atlas",
    label: "人力资源",
    labelEn: "People Atlas",
    blurb: "量化朋友 · 工作/创业人脉打分",
    blurbEn: "Friends & network, scored",
    icon: "🤝",
    url: at("People-Atlas"),
  },
  {
    id: "jobtracker",
    repo: "Job-Tracker",
    label: "求职追踪",
    labelEn: "Job Tracker",
    blurb: "多地区投递 · 简历模板 · AI 工具",
    blurbEn: "Multi-region apply · resume templates · AI",
    icon: "💼",
    url: at("Job-Tracker"),
  },
  {
    id: "mediaops",
    repo: "Media-Ops",
    label: "媒体台账",
    labelEn: "Media Ops",
    blurb: "自媒体账号 · 风格/workflow/成本收益",
    blurbEn: "Media accounts · style/workflow/P&L",
    icon: "📣",
    url: at("Media-Ops"),
  },
  {
    id: "polaris",
    repo: "Polaris",
    label: "北极星",
    labelEn: "Polaris",
    blurb: "多计划人生追踪 · 现金流/里程碑/检查点",
    blurbEn: "Multi-plan tracker · cashflow/milestones/checkpoints",
    icon: "🌟",
    url: at("Polaris"),
  },
  {
    id: "toolbox",
    repo: "Toolbox",
    label: "工具箱",
    labelEn: "Toolbox",
    blurb: "通用知识库 · 文章甄别归档",
    blurbEn: "Curated knowledge vault",
    icon: "🧰",
    url: at("Toolbox"),
  },
  {
    id: "siteadmin",
    repo: "personal-hub",
    label: "网站后台",
    labelEn: "Site Admin",
    blurb: "个人网站 · 文案/字体编辑（独立登录）",
    blurbEn: "Personal site · text & fonts editor (own login)",
    icon: "🎛️",
    url: "https://personal-hub-7uc.pages.dev/admin",
  },
];
