// Interface kept identical to the ranking-site template.
// h_index → "Influence Score" (0–100), citations → "Followers", papers → "Signal Posts"
// "Researcher" field kept as a key name for the template; semantically "Crypto KOL" here.

export interface Researcher {
  id: number;
  name_en: string;
  name_zh: string;
  affiliation_en: string;
  affiliation_zh: string;
  field_en: string;
  field_zh: string;
  h_index: number;     // relabeled in i18n: Influence Score (0-100)
  citations: number;   // relabeled: Followers
  papers: number;      // relabeled: Signal Posts (est. high-reach tweets)
  notable_work_en: string;
  notable_work_zh: string;
  country: string;
  native_province_en: string;
  native_province_zh: string;
  homepage?: string;
}

export interface ProvinceStats {
  province_en: string;
  province_zh: string;
  count: number;
  researchers: Researcher[];
  avg_h_index: number;
  total_citations: number;
}

export function getProvinceStats(data: Researcher[]): ProvinceStats[] {
  const map = new Map<string, Researcher[]>();
  for (const r of data) {
    const key = r.native_province_en;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  const stats: ProvinceStats[] = [];
  for (const [province_en, rs] of map) {
    stats.push({
      province_en,
      province_zh: rs[0].native_province_zh,
      count: rs.length,
      researchers: rs.sort((a, b) => b.h_index - a.h_index),
      avg_h_index: Math.round(rs.reduce((s, r) => s + r.h_index, 0) / rs.length),
      total_citations: rs.reduce((s, r) => s + r.citations, 0),
    });
  }
  return stats.sort((a, b) => b.count - a.count || b.avg_h_index - a.avg_h_index);
}

type _R = {
  n: string; z: string;
  a: string; az: string;
  f: string; fz: string;
  h: number; c: number; p: number;
  w: string; wz: string;
  g: string;
  pn: string; pz: string;
  hp?: string;
};

const _data: _R[] = [
  // === Exchange Founders ===
  {n:"Changpeng Zhao (CZ)",z:"赵长鹏",a:"Binance",az:"币安",f:"Exchange · Industry Leader",fz:"交易所 · 行业领袖",h:99,c:9400000,p:18000,w:"Founder of the world's largest crypto exchange; served 4-month US prison term and returned",wz:"全球最大加密交易所创始人；曾在美服刑 4 个月后回归",g:"🇨🇳",pn:"Jiangsu",pz:"江苏",hp:"https://x.com/cz_binance"},
  {n:"Yi He",z:"何一",a:"Binance",az:"币安",f:"Exchange · Marketing",fz:"交易所 · 品牌运营",h:88,c:2100000,p:8000,w:"Co-founder, content/marketing engine behind Binance brand",wz:"币安联合创始人，品牌与内容核心",g:"🇨🇳",pn:"Sichuan",pz:"四川",hp:"https://x.com/heyibinance"},
  {n:"Justin Sun",z:"孙宇晨",a:"TRON · HTX · Poloniex",az:"波场 · HTX · Poloniex",f:"L1 · Exchange · Self-promotion",fz:"公链 · 交易所 · 营销大师",h:92,c:3900000,p:14000,w:"Founder of Tron, owner of HTX (Huobi), perpetual headline generator",wz:"波场创始人，收购火币 (HTX)，永不停歇的话题制造者",g:"🇸🇬",pn:"Qinghai",pz:"青海",hp:"https://x.com/justinsuntron"},
  {n:"Star Xu",z:"徐明星",a:"OKX",az:"欧易",f:"Exchange",fz:"交易所",h:85,c:220000,p:1500,w:"Founder of OKX / OKCoin; pivoted Hong Kong base post-2021 China ban",wz:"欧易 (OKX) / OKCoin 创始人，2021 禁令后转战香港",g:"🇭🇰",pn:"Anhui",pz:"安徽",hp:"https://x.com/star_okx"},
  {n:"Leon Li",z:"李林",a:"Huobi (former)",az:"前火币",f:"Exchange",fz:"交易所",h:72,c:80000,p:300,w:"Huobi founder; sold controlling stake to Justin Sun in 2022",wz:"火币创始人，2022 年将控股权出售给孙宇晨",g:"🇨🇳",pn:"Hubei",pz:"湖北"},
  {n:"Du Jun",z:"杜均",a:"Node Capital · Huobi (former)",az:"节点资本 · 前火币",f:"Exchange · VC",fz:"交易所 · 投资",h:75,c:120000,p:600,w:"Huobi co-founder; now runs Node Capital and multiple crypto portfolio companies",wz:"火币联合创始人，现经营节点资本与多家加密公司",g:"🇨🇳",pn:"Hunan",pz:"湖南"},
  {n:"Bobby Lee",z:"李启元",a:"Ballet Wallet · BTCC (former)",az:"Ballet 钱包 · 前 BTCC",f:"Bitcoin · Hardware Wallet",fz:"比特币 · 硬件钱包",h:70,c:240000,p:900,w:"BTCChina founder (first Chinese BTC exchange); now cold-wallet maker",wz:"BTCChina 创始人（中国首家比特币交易所），现专注冷钱包",g:"🇺🇸",pn:"Overseas Chinese",pz:"海外华裔",hp:"https://x.com/bobbyclee"},
  {n:"Charlie Lee",z:"李启威",a:"Litecoin Foundation",az:"莱特币基金会",f:"L1 · Bitcoin Fork",fz:"公链 · 比特币分叉",h:78,c:1100000,p:3200,w:"Creator of Litecoin; ex-Coinbase engineering director",wz:"莱特币创造者，前 Coinbase 工程总监",g:"🇺🇸",pn:"Overseas Chinese",pz:"海外华裔",hp:"https://x.com/satoshilite"},
  {n:"Yang Linke",z:"杨林科",a:"BTCChina (former)",az:"前 BTCChina",f:"Bitcoin OG",fz:"比特币元老",h:60,c:30000,p:200,w:"BTCChina co-founder; early Chinese BTC exchange pioneer",wz:"BTCChina 联合创始人，早期中国 BTC 交易所先驱",g:"🇨🇳",pn:"Shanghai",pz:"上海"},
  {n:"Jay Hao",z:"Jay Hao",a:"OKX (former CEO)",az:"前欧易 CEO",f:"Exchange",fz:"交易所",h:55,c:70000,p:250,w:"Former OKX CEO during the 2020-2023 expansion",wz:"2020-2023 年欧易 CEO，主导国际化扩张",g:"🇨🇳",pn:"Unknown",pz:"未知"},

  // === Mining & Hardware ===
  {n:"Jihan Wu",z:"吴忌寒",a:"Bitmain · Matrixport",az:"比特大陆 · Matrixport",f:"Mining · Hardware",fz:"矿机 · 硬件",h:90,c:180000,p:400,w:"Bitmain co-founder; Matrixport / Matrixdock builder; financial-services pivot",wz:"比特大陆联合创始人，Matrixport / Matrixdock 创始人，转向金融服务",g:"🇸🇬",pn:"Chongqing",pz:"重庆"},
  {n:"Micree Zhan",z:"詹克团",a:"Bitmain (former)",az:"前比特大陆",f:"Mining · Hardware",fz:"矿机 · 硬件",h:82,c:35000,p:120,w:"Bitmain co-founder; chip design lead behind Antminer",wz:"比特大陆联合创始人，蚂蚁矿机芯片设计主导者",g:"🇨🇳",pn:"Fujian",pz:"福建"},
  {n:"Jiang Zhuoer",z:"江卓尔",a:"Lebit Mining Pool",az:"莱比特矿池",f:"Mining · BCH",fz:"矿池 · BCH",h:72,c:190000,p:2800,w:"Lebit (BTC.TOP) mining pool founder; vocal BCH supporter on Weibo",wz:"莱比特矿池创始人，BCH 坚定支持者，微博活跃 KOL",g:"🇨🇳",pn:"Shanghai",pz:"上海",hp:"https://weibo.com/jiangzhuoer"},
  {n:"Pan Zhibiao (7fff)",z:"潘志彪",a:"Cobo",az:"Cobo",f:"Mining · Custody",fz:"矿池 · 托管",h:68,c:45000,p:150,w:"Early Chinese miner; Cobo Wallet co-founder",wz:"早期中国矿工，Cobo 钱包联合创始人",g:"🇸🇬",pn:"Jiangsu",pz:"江苏"},
  {n:"Mao Shihang (Discus Fish)",z:"毛世行 (神鱼)",a:"Cobo · F2Pool (former)",az:"Cobo · 前 F2Pool",f:"Mining · Custody",fz:"矿池 · 托管",h:74,c:210000,p:2400,w:"F2Pool co-founder; Cobo CEO; legendary OG",wz:"F2Pool 联合创始人，Cobo CEO，元老级 OG",g:"🇸🇬",pn:"Sichuan",pz:"四川",hp:"https://x.com/discusfish"},
  {n:"Wang Chun",z:"王纯 (Chun Wang)",a:"F2Pool · Stakefish",az:"F2Pool · Stakefish",f:"Mining · Staking",fz:"矿池 · 质押",h:70,c:80000,p:600,w:"F2Pool co-founder; first civilian in polar orbit (Fram2 mission)",wz:"F2Pool 联合创始人，首位进入极地轨道的民用太空旅客（Fram2）",g:"🇨🇳",pn:"Jiangsu",pz:"江苏",hp:"https://x.com/satofishi"},
  {n:"Zhang Nangeng",z:"张楠赓",a:"Canaan Creative",az:"嘉楠科技",f:"Mining Hardware",fz:"矿机硬件",h:62,c:18000,p:80,w:"Canaan Creative founder; first Avalon ASIC miner",wz:"嘉楠创始人，首款阿瓦隆 ASIC 矿机",g:"🇨🇳",pn:"Shandong",pz:"山东"},

  // === DeFi / Protocol Builders ===
  {n:"Da Hongfei",z:"达鸿飞",a:"NEO · Onchain",az:"NEO · 分布科技",f:"L1 · Enterprise Chain",fz:"公链 · 企业链",h:78,c:300000,p:1400,w:"Founder of NEO (originally AntShares); China's first mainstream smart-contract L1",wz:"NEO（原小蚁）创始人，中国首个主流智能合约公链",g:"🇨🇳",pn:"Shanghai",pz:"上海",hp:"https://x.com/dahongfei"},
  {n:"Yu Xian (Cos)",z:"余弦",a:"SlowMist",az:"慢雾科技",f:"Security · Auditing",fz:"安全 · 审计",h:80,c:220000,p:3500,w:"SlowMist founder; top Chinese security researcher; hack forensics authority",wz:"慢雾创始人，头部华语安全研究员，黑客事件取证权威",g:"🇨🇳",pn:"Fujian",pz:"福建",hp:"https://x.com/evilcos"},
  {n:"Sandy Peng",z:"彭绫",a:"Scroll",az:"Scroll",f:"ZK-Rollup",fz:"零知识 Rollup",h:55,c:45000,p:450,w:"Co-founder of Scroll zkEVM; one of few Chinese-female L2 founders",wz:"Scroll zkEVM 联合创始人，少见的华语女性 L2 创始人",g:"🇭🇰",pn:"Unknown",pz:"未知",hp:"https://x.com/sandyzkpeng"},
  {n:"Forrest Fang",z:"范金",a:"Sora Ventures · IOST",az:"Sora Ventures · IOST",f:"L1 · VC",fz:"公链 · 投资",h:50,c:40000,p:300,w:"IOST co-founder; Sora Ventures managing partner",wz:"IOST 联合创始人，Sora Ventures 管理合伙人",g:"🇹🇼",pn:"Taiwan",pz:"台湾"},
  {n:"Chen Li",z:"陈驰",a:"Cobo",az:"Cobo",f:"Custody · MPC",fz:"托管 · MPC",h:58,c:28000,p:180,w:"Cobo co-founder; MPC/institutional custody builder",wz:"Cobo 联合创始人，MPC/机构托管方向",g:"🇸🇬",pn:"Sichuan",pz:"四川"},

  // === Investors / VCs ===
  {n:"Li Xiaolai",z:"李笑来",a:"INBlockchain",az:"硬币资本",f:"Early BTC · VC · Controversial",fz:"早期 BTC · 投资 · 争议人物",h:82,c:850000,p:4200,w:"Self-declared 'Bitcoin Billionaire'; author of Getting Rich; long-running controversy",wz:"自封'比特币首富'，《通往财富自由之路》作者，争议与话题持续不断",g:"🇯🇵",pn:"Liaoning",pz:"辽宁",hp:"https://x.com/xiaolai"},
  {n:"Bao Erye",z:"郭宏才 (宝二爷)",a:"Bitangel",az:"天使投资",f:"Angel · Entertainment",fz:"天使投资 · 娱乐",h:70,c:520000,p:6800,w:"Flamboyant Bitcoin angel investor; Inner Mongolia hot-pot magnate turned BTC evangelist",wz:"张扬的比特币天使投资人，从内蒙火锅大王转身 BTC 布道者",g:"🇺🇸",pn:"Inner Mongolia",pz:"内蒙古",hp:"https://x.com/bao3"},
  {n:"Mable Jiang",z:"江晚晚",a:"Multicoin Capital · Tesseract",az:"Multicoin Capital · Tesseract",f:"VC · Asia Crypto",fz:"投资 · 亚洲加密",h:68,c:180000,p:1200,w:"Ex-Multicoin partner; bridge between Asian and US crypto VCs; prolific podcaster",wz:"前 Multicoin 合伙人，中美加密 VC 桥梁，活跃播客主持",g:"🇺🇸",pn:"Beijing",pz:"北京",hp:"https://x.com/mablejiang"},
  {n:"Dovey Wan",z:"王灵东",a:"Primitive Ventures",az:"原语资本",f:"VC · BTC-Native",fz:"投资 · 比特币原教旨",h:75,c:420000,p:5800,w:"Primitive Ventures founding partner; outspoken Chinese voice on US crypto Twitter",wz:"原语资本创始合伙人，美国加密 Twitter 上最活跃的华人声音之一",g:"🇺🇸",pn:"Hubei",pz:"湖北",hp:"https://x.com/doveywan"},
  {n:"Bo Shen",z:"沈波",a:"Fenbushi Capital · Distributed Capital",az:"分布式资本",f:"VC · Enterprise",fz:"投资 · 企业区块链",h:65,c:35000,p:150,w:"Fenbushi Capital founder; early ETH investor; 2022 attack victim recovered $260M",wz:"分布式资本创始人，早期 ETH 投资人；2022 年被黑 2.6 亿美元后戏剧性追回",g:"🇨🇳",pn:"Shanghai",pz:"上海"},
  {n:"Cai Wensheng (Jet Cai)",z:"蔡文胜",a:"Meitu · LongLing Capital",az:"美图 · 隆领资本",f:"Angel · Meme-era",fz:"天使投资 · 山寨币时代",h:72,c:280000,p:450,w:"Meitu founder; famous Chinese BTC whale; investor in countless Chinese crypto projects",wz:"美图创始人，知名 BTC 巨鲸，无数中国加密项目的投资人",g:"🇨🇳",pn:"Fujian",pz:"福建"},
  {n:"Xiao Feng",z:"肖风",a:"HashKey Group · Wanxiang Blockchain",az:"HashKey 集团 · 万向区块链",f:"VC · Institutional",fz:"投资 · 机构派",h:70,c:75000,p:300,w:"HashKey Group chairman; Wanxiang Blockchain Labs founder; institutional statesman",wz:"HashKey 集团主席，万向区块链实验室创始人，机构派代表人物",g:"🇨🇳",pn:"Zhejiang",pz:"浙江"},
  {n:"Jeff Ren",z:"任铮",a:"OKX Ventures",az:"欧易 Ventures",f:"VC · Exchange-backed",fz:"投资 · 交易所系",h:55,c:30000,p:200,w:"OKX Ventures general partner; prolific Asia crypto investor",wz:"欧易 Ventures 管理合伙人，活跃的亚洲加密投资人",g:"🇭🇰",pn:"Unknown",pz:"未知"},
  {n:"Deng Chao",z:"邓超",a:"HashKey Capital",az:"HashKey Capital",f:"VC",fz:"投资",h:52,c:28000,p:120,w:"HashKey Capital CEO; significant Asian institutional crypto deals",wz:"HashKey Capital CEO，主导多起亚洲机构加密交易",g:"🇭🇰",pn:"Unknown",pz:"未知"},

  // === Media / Analysts ===
  {n:"Lao Yapi",z:"老雅痞",a:"Lao Yapi Media",az:"老雅痞传媒",f:"Media · Analyst",fz:"媒体 · 分析师",h:60,c:620000,p:14000,w:"Leading Chinese-language crypto news & commentary account",wz:"中文圈头部加密新闻与评论账号",g:"🇨🇳",pn:"Unknown",pz:"未知",hp:"https://x.com/laoyaoba"},
  {n:"Colin Wu (Wu Blockchain)",z:"吴说区块链",a:"Wu Blockchain",az:"吴说区块链",f:"Media · Investigative",fz:"媒体 · 调查报道",h:75,c:295000,p:9800,w:"Leading bilingual crypto investigative journalist; broke many insider stories",wz:"领先的双语加密调查记者，多次率先曝光行业大新闻",g:"🇨🇳",pn:"Hubei",pz:"湖北",hp:"https://x.com/WuBlockchain"},
  {n:"Phyrex",z:"Phyrex (链上分析)",a:"Independent",az:"独立分析师",f:"On-chain Analysis",fz:"链上分析",h:68,c:380000,p:13000,w:"Prolific on-chain data commentator in Chinese crypto Twitter",wz:"中文加密 Twitter 上产量最高的链上数据评论员",g:"🇨🇳",pn:"Unknown",pz:"未知",hp:"https://x.com/Phyrex_Ni"},
  {n:"Lao Pan (OldPan)",z:"老潘",a:"Block Unicorn · 区块律动",az:"Block Unicorn · 区块律动",f:"Media · Editor",fz:"媒体 · 编辑",h:58,c:120000,p:4500,w:"Block Unicorn co-founder; Chinese-language crypto media OG",wz:"Block Unicorn 联合创始人，中文加密媒体元老",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"Alex Liu",z:"刘锋",a:"PANews",az:"PANews",f:"Media · News",fz:"媒体 · 新闻",h:55,c:90000,p:3200,w:"PANews co-founder; Chinese crypto news standard-bearer",wz:"PANews 联合创始人，中文加密新闻门户标杆",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"Chang Jia (Babbitt)",z:"长铗",a:"Babbitt (former)",az:"前 巴比特",f:"Bitcoin OG · Media",fz:"比特币元老 · 媒体",h:70,c:140000,p:1800,w:"Babbitt founder — the earliest Chinese BTC forum/media platform",wz:"巴比特创始人，中国最早的比特币论坛/媒体平台",g:"🇨🇳",pn:"Sichuan",pz:"四川"},
  {n:"Mike Han",z:"韩冰 (Mike)",a:"Mars Finance · ZB (former)",az:"火星财经 · 前 ZB",f:"Media · Conference",fz:"媒体 · 会议",h:58,c:85000,p:900,w:"Mars Finance founder; ran many of China's biggest crypto conferences pre-2021",wz:"火星财经创始人，2021 年前中国最大加密会议主办方之一",g:"🇨🇳",pn:"Unknown",pz:"未知"},

  // === Anons / Power Twitter Users ===
  {n:"Ai Yi",z:"艾亿",a:"Independent · Anon",az:"独立 · 匿名",f:"Trader · Technical",fz:"交易员 · 技术分析",h:58,c:240000,p:6500,w:"High-frequency trader anon; Chinese CT technical-analysis reference",wz:"高频交易匿名账号，中文加密 Twitter 的技术分析标杆",g:"🇨🇳",pn:"Unknown",pz:"未知",hp:"https://x.com/ai_9684xtpa"},
  {n:"On-chain Buffett",z:"链上巴菲特",a:"Independent · Anon",az:"独立 · 匿名",f:"On-chain · Long-term",fz:"链上 · 长期持有",h:50,c:180000,p:2800,w:"Anonymous long-term-holding philosophy account; Weibo-famous",wz:"匿名长期持有流派账号，微博知名",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"0xSun",z:"0xSun",a:"Independent",az:"独立",f:"Trader · Memecoin",fz:"交易员 · 迷因币",h:52,c:160000,p:4800,w:"Solana memecoin trader; documented on-chain returns",wz:"Solana 迷因币交易员，链上收益公开可查",g:"🇨🇳",pn:"Unknown",pz:"未知",hp:"https://x.com/0xSunNFT"},
  {n:"Da Feng",z:"大饼圈 (大风)",a:"Independent",az:"独立",f:"Trader · Cycles",fz:"交易员 · 周期派",h:48,c:110000,p:3400,w:"Market-cycle commentator in Chinese CT",wz:"中文加密圈的市场周期派评论员",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"Chain Forensics Wu",z:"吴刚 (链上风控)",a:"Independent",az:"独立",f:"On-chain · Forensics",fz:"链上 · 取证",h:45,c:85000,p:1800,w:"On-chain forensic commentator; tracks rug pulls and hacks",wz:"链上取证型评论员，专注追踪 rug 与黑客事件",g:"🇨🇳",pn:"Unknown",pz:"未知"},

  // === Regional / Diaspora ===
  {n:"Arthur (0xArthur)",z:"0xArthur",a:"DeFiance Capital",az:"DeFiance Capital",f:"VC · DeFi",fz:"投资 · DeFi",h:70,c:220000,p:2800,w:"DeFiance founder; ex-3AC alumni rebuild story",wz:"DeFiance 创始人，三箭资本老将的再创业故事",g:"🇸🇬",pn:"Singapore",pz:"新加坡",hp:"https://x.com/Arthur_0x"},
  {n:"Yat Siu",z:"蕭逸",a:"Animoca Brands",az:"Animoca 品牌",f:"Gaming · NFT",fz:"链游 · NFT",h:75,c:280000,p:2400,w:"Animoca Brands chairman; Hong Kong-based, major Web3 gaming investor",wz:"Animoca Brands 主席，驻港华人，链游与 Web3 游戏重仓投资人",g:"🇭🇰",pn:"Hong Kong",pz:"香港",hp:"https://x.com/ysiu"},
  {n:"Zixi.eth",z:"Zixi",a:"Independent · Research",az:"独立研究",f:"Research · DeFi",fz:"研究 · DeFi",h:52,c:70000,p:1100,w:"DeFi research thread author; bilingual coverage",wz:"双语 DeFi 研究长文作者",g:"🇺🇸",pn:"Unknown",pz:"未知"},
  {n:"Yu Jianing (Uweb)",z:"于佳宁",a:"Uweb",az:"Uweb 教育",f:"Education · Policy",fz:"教育 · 政策",h:58,c:140000,p:1200,w:"Uweb blockchain education founder; policy-friendly Chinese voice",wz:"Uweb 区块链教育创始人，政策友好型中文声音",g:"🇨🇳",pn:"Unknown",pz:"未知"},

  // === OG Personalities ===
  {n:"Zhao Dong",z:"赵东",a:"DGroup · Bitfinex (former)",az:"DGroup · 前 Bitfinex",f:"OTC · BTC OG",fz:"OTC · 比特币元老",h:65,c:160000,p:1400,w:"OTC legend; DGroup founder; served 2 years in China prison 2022-2024 for illegal operations",wz:"OTC 传奇，DGroup 创始人，2022-2024 因非法经营在国内服刑 2 年",g:"🇨🇳",pn:"Zhejiang",pz:"浙江"},
  {n:"V-God Translator",z:"何翻译",a:"Community",az:"社区",f:"Community · Translation",fz:"社区 · 翻译",h:35,c:48000,p:2200,w:"Chinese translator-commentator of Vitalik's posts; bridge for Ethereum community",wz:"V 神长文的中文译评者，以太坊社区桥梁",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"Seven (Xie Zhe)",z:"谢哲 (七爷)",a:"Independent",az:"独立",f:"Trader · Memecoin",fz:"交易员 · 迷因币",h:45,c:95000,p:3200,w:"High-profile memecoin/NFT Chinese trader; occasional mentor",wz:"高调的中文迷因币/NFT 交易员，偶尔授课",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"Han Feng",z:"韩锋",a:"Blockchain Education",az:"区块链教育",f:"Education · EOS era",fz:"教育 · EOS 时代",h:42,c:65000,p:800,w:"Early EOS evangelist turned education entrepreneur",wz:"早期 EOS 布道者，后转向区块链教育",g:"🇨🇳",pn:"Unknown",pz:"未知"},
  {n:"Gu Yanxi",z:"谷燕西",a:"Liquefy Labs (former)",az:"前 Liquefy 实验室",f:"RWA · Securities Tokenization",fz:"真实资产 · 证券通证化",h:55,c:40000,p:900,w:"Prolific writer on tokenization of securities and RWA",wz:"证券通证化与真实资产方向的多产作者",g:"🇺🇸",pn:"Unknown",pz:"未知"},
];

export const researchers: Researcher[] = _data.map((d, i) => ({
  id: i + 1,
  name_en: d.n, name_zh: d.z,
  affiliation_en: d.a, affiliation_zh: d.az,
  field_en: d.f, field_zh: d.fz,
  h_index: d.h, citations: d.c, papers: d.p,
  notable_work_en: d.w, notable_work_zh: d.wz,
  country: d.g,
  native_province_en: d.pn, native_province_zh: d.pz,
  homepage: d.hp,
}));

export type SortKey = "h_index" | "citations" | "papers";

export function sortResearchers(data: Researcher[], key: SortKey): Researcher[] {
  return [...data].sort((a, b) => (b[key] as number) - (a[key] as number));
}
