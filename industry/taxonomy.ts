// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉模型怎么归类。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 */
export const CATEGORIES = [
  { key: "releases", label: "发行", section: "发行与更新", guide: "新作发行、全球/区域上线、重大更新、赛季/资料片、重要补丁与平衡性调整、停运与下架" },
  { key: "industry", label: "行业", section: "行业动态", guide: "平台政策、排行榜与市场数据、监管与评级、诉讼、硬件主机策略、渠道与发行政策" },
  { key: "esports", label: "电竞", section: "电竞与社区", guide: "电竞赛事、战队与选手转会、社区现象、模组/同人文化、直播与创作者生态" },
  { key: "tools-engines", label: "工具引擎", section: "引擎与工具", guide: "游戏引擎、中间件、编辑器、SDK、构建与管线工具、平台开发者文档与版本发布" },
  { key: "studios", label: "工作室", section: "工作室与商务", guide: "工作室成立/关闭、融资并购、人事任命、发行协议、财报与商务合作" },
  { key: "tech-art", label: "技术美术", section: "技术与观点", guide: "渲染/玩法/网络技术分享、美术管线、GDC 级演讲、深度评测、观点与复盘、教程实践" },
] as const;

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["game_release", "product_launch", "tool_or_workflow", "tech_article", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "游戏发行", "产品更新", "工具引擎", "技术文章", "教程实践", "大佬观点", "评测导购", "电竞社区", "行业动态", "政策监管",
  "非游戏", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "主机", "PC", "移动", "独立游戏", "网游/MMO", "射击", "RPG", "开放世界", "电竞", "云游戏",
  "引擎", "渲染", "多人联机", "工具链", "发行/渠道", "LiveOps", "AI 玩法", "XR/VR",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = [
  "Nintendo", "Sony", "Microsoft", "Valve", "Epic", "Unity", "Unreal", "Tencent", "NetEase", "miHoYo",
  "Steam", "PlayStation", "Xbox", "Switch",
] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  发行: "游戏发行", 发售: "游戏发行", 上线: "游戏发行", 上架: "游戏发行", 新作: "游戏发行", 资料片: "游戏发行", 赛季: "游戏发行",
  更新: "产品更新", 补丁: "产品更新", 版本: "产品更新", hotfix: "产品更新",
  引擎: "工具引擎", 开源: "工具引擎", 中间件: "工具引擎", 编辑器: "工具引擎", SDK: "工具引擎", 工具: "工具引擎",
  技术: "技术文章", GDC: "技术文章", 演讲: "技术文章", 论文: "技术文章",
  教程: "教程实践", 实践: "教程实践", 指南: "教程实践", 管线: "教程实践",
  评测: "评测导购", 导购: "评测导购", 评分: "评测导购", review: "评测导购",
  电竞: "电竞社区", 赛事: "电竞社区", 战队: "电竞社区", 社区: "电竞社区", 模组: "电竞社区", mod: "电竞社区",
  行业: "行业动态", 动态: "行业动态", 融资: "行业动态", 收购: "行业动态", 并购: "行业动态", 人事: "行业动态", 财报: "行业动态",
  政策: "政策监管", 监管: "政策监管", 评级: "政策监管", ESRB: "政策监管", PEGI: "政策监管", 版号: "政策监管",
  观点: "大佬观点", 访谈: "大佬观点", 复盘: "大佬观点", 趋势: "大佬观点",
  非游戏: "非游戏", "non-game": "非游戏",
  主机游戏: "主机", 单机: "PC", 手游: "移动", indie: "独立游戏", 独立: "独立游戏",
  MMO: "网游/MMO", FPS: "射击", "开放世界": "开放世界",
  UE: "引擎", "Unreal Engine": "引擎", Unity引擎: "引擎",
  联机: "多人联机", 网络同步: "多人联机",
  Live: "LiveOps", 运营: "LiveOps",
  VR: "XR/VR", AR: "XR/VR", XR: "XR/VR",
  任天堂: "Nintendo", 索尼: "Sony", 微软: "Microsoft", 腾讯: "Tencent", 网易: "NetEase", 米哈游: "miHoYo", 崩坏: "miHoYo", 原神: "miHoYo",
  蒸汽: "Steam", 史低: "Steam", PS5: "PlayStation", PS4: "PlayStation", Series: "Xbox",
};

/** 模型漏了分类标签时，按内容类型补一个。 */
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  game_release: "游戏发行",
  product_launch: "产品更新",
  tool_or_workflow: "工具引擎",
  tech_article: "技术文章",
  industry_event: "行业动态",
  opinion_analysis: "大佬观点",
  tutorial_explainer: "教程实践",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/** 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  nintendo: { name: "Nintendo", displayTag: "Nintendo", aliases: ["Nintendo", "任天堂", "Switch", "Switch 2"] },
  sony: { name: "Sony / PlayStation", displayTag: "Sony", aliases: ["Sony", "索尼", "PlayStation", "PS5", "PS4", "SIE"] },
  microsoft: { name: "Microsoft / Xbox", displayTag: "Microsoft", aliases: ["Microsoft", "微软", "Xbox", "Game Pass", "Activision", "Blizzard", "Bethesda"] },
  valve: { name: "Valve / Steam", displayTag: "Valve", aliases: ["Valve", "Steam", "Steam Deck", "Source 2"] },
  epic: { name: "Epic Games", displayTag: "Epic", aliases: ["Epic", "Epic Games", "Fortnite", "Unreal", "UE5", "Epic Games Store"] },
  unity: { name: "Unity", displayTag: "Unity", aliases: ["Unity", "Unity Technologies"] },
  tencent: { name: "Tencent", displayTag: "Tencent", aliases: ["Tencent", "腾讯", "光子", "天美", "腾讯游戏"] },
  netease: { name: "NetEase", displayTag: "NetEase", aliases: ["NetEase", "网易", "网易游戏"] },
  mihoyo: { name: "miHoYo / HoYoverse", displayTag: "miHoYo", aliases: ["miHoYo", "Hoyoverse", "HoYoverse", "米哈游", "原神", "崩坏", "绝区零"] },
  take2: { name: "Take-Two / Rockstar", displayTag: null, aliases: ["Take-Two", "Rockstar", "2K", "GTA"] },
  ea: { name: "Electronic Arts", displayTag: null, aliases: ["EA", "Electronic Arts", "DICE", "Respawn"] },
  ubisoft: { name: "Ubisoft", displayTag: null, aliases: ["Ubisoft", "育碧"] },
  squareenix: { name: "Square Enix", displayTag: null, aliases: ["Square Enix", "史克威尔艾尼克斯", "Final Fantasy"] },
  capcom: { name: "Capcom", displayTag: null, aliases: ["Capcom", "卡普空", "Resident Evil", "Monster Hunter"] },
  sega: { name: "SEGA", displayTag: null, aliases: ["SEGA", "世嘉", "Sonic"] },
  bandainamco: { name: "Bandai Namco", displayTag: null, aliases: ["Bandai Namco", "万代南梦宫"] },
  krafton: { name: "Krafton", displayTag: null, aliases: ["Krafton", "PUBG"] },
  riot: { name: "Riot Games", displayTag: null, aliases: ["Riot", "Riot Games", "League of Legends", "Valorant", "英雄联盟"] },
  blizzard: { name: "Blizzard", displayTag: null, aliases: ["Blizzard", "暴雪", "World of Warcraft", "Overwatch", "Diablo"] },
  roblox: { name: "Roblox", displayTag: null, aliases: ["Roblox"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "nintendo", name: "Nintendo", patterns: [/nintendo|任天堂|\bswitch\s?2?\b/i] },
  { id: "sony", name: "Sony / PlayStation", patterns: [/\bsony\b|索尼|playstation|\bps[45]\b|\bSIE\b/i] },
  { id: "microsoft", name: "Microsoft / Xbox", patterns: [/microsoft|微软|\bxbox\b|game\s?pass|activision|bethesda/i] },
  { id: "valve", name: "Valve / Steam", patterns: [/\bvalve\b|\bsteam\b|steam\s?deck|source\s?2/i] },
  { id: "epic", name: "Epic Games", patterns: [/\bepic\b|fortnite|unreal\s?engine|\bue[45]\b/i] },
  { id: "unity", name: "Unity", patterns: [/\bunity\b/i] },
  { id: "tencent", name: "Tencent", patterns: [/tencent|腾讯/i] },
  { id: "netease", name: "NetEase", patterns: [/netease|网易/i] },
  { id: "mihoyo", name: "miHoYo / HoYoverse", patterns: [/mihoyo|hoyoverse|米哈游|原神|崩坏|绝区零|\bgenshin\b/i] },
  { id: "take2", name: "Take-Two / Rockstar", patterns: [/take-?two|rockstar|\bgta\b|\b2k\b/i] },
  { id: "ea", name: "Electronic Arts", patterns: [/\bea\b|electronic\sarts|respawn|\bdice\b/i] },
  { id: "ubisoft", name: "Ubisoft", patterns: [/ubisoft|育碧/i] },
  { id: "squareenix", name: "Square Enix", patterns: [/square\s?enix|史克威尔|final\sfantasy/i] },
  { id: "capcom", name: "Capcom", patterns: [/capcom|卡普空|resident\sevil|monster\shunter/i] },
  { id: "riot", name: "Riot Games", patterns: [/\briot\b|league\sof\slegends|\bvalorant\b|英雄联盟/i] },
  { id: "blizzard", name: "Blizzard", patterns: [/blizzard|暴雪|world\sof\swarcraft|\boverwatch\b|\bdiablo\b/i] },
  { id: "roblox", name: "Roblox", patterns: [/\broblox\b/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、Medium 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "nintendo", domains: ["nintendo.com", "nintendo.co.jp"] },
  { entityId: "sony", domains: ["playstation.com", "blog.playstation.com"] },
  { entityId: "microsoft", domains: ["xbox.com", "news.xbox.com", "microsoft.com"] },
  { entityId: "valve", domains: ["steampowered.com", "store.steampowered.com", "valvesoftware.com"] },
  { entityId: "epic", domains: ["epicgames.com", "unrealengine.com", "fortnite.com"] },
  { entityId: "unity", domains: ["unity.com", "blog.unity.com", "blogs.unity3d.com"] },
  { entityId: "tencent", domains: ["tencent.com", "tencentgames.com"] },
  { entityId: "netease", domains: ["netease.com", "163.com"] },
  { entityId: "mihoyo", domains: ["mihoyo.com", "hoyoverse.com", "genshin.hoyoverse.com"] },
  { entityId: "riot", domains: ["riotgames.com"] },
  { entityId: "blizzard", domains: ["blizzard.com", "worldofwarcraft.com"] },
  { entityId: "roblox", domains: ["roblox.com"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "microsoft", pattern: /@Xbox\b|@Microsoft\b/i },
  { entityId: "sony", pattern: /@PlayStation\b/i },
  { entityId: "nintendo", pattern: /@NintendoAmerica\b|@Nintendo\b/i },
  { entityId: "epic", pattern: /@UnrealEngine\b|@EpicGames\b/i },
  { entityId: "unity", pattern: /@Unity\b/i },
];
