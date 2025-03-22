# cyber
赛博烧香·AI开光系统
赛博烧香小程序开发文档

1. 项目概述

1.1 项目名称

赛博烧香小程序（Cyber Temple）

1.2 目标用户

有情绪慰藉需求的年轻人（职场焦虑、考试党、感情失意者）

对佛学、玄学、烧香文化感兴趣的用户

喜欢社交分享、积累功德值的用户

1.3 产品形态

微信小程序（主要）

H5 页面（可选，方便非微信用户访问）

1.4 商业模式

虚拟香火付费（普通香、高级香、限定香）

功德值体系（功德值可兑换虚拟法器、特定香型）

AI 解签（NLP 解析用户问题，生成签文，付费解锁）

联名寺庙推广（与线下寺庙合作，兑换真实香火）

2. 功能需求

2.1 基础功能

功能

描述

虚拟烧香

用户点击“点燃香”按钮，播放燃香动画，背景播放诵经音效。

功德证书

生成电子功德证书（包含用户昵称、烧香时间、心愿）。

功德值系统

记录用户烧香次数，积累功德值，可兑换虚拟法器。

社交分享

用户可将烧香记录分享到朋友圈，好友点赞增加功德值。

2.2 进阶功能

功能

描述

AI 解签

用户输入烦恼，AI 生成解签并提供个性化建议。

节气限定香

在特定节日（如春节、端午）推出限定香型。

联名活动

与知名寺庙合作，推出线上捐香资活动。

3. 技术架构

3.1 前端

技术栈：
- [Uniapp](https://uniapp.dcloud.io/) + [Vue3](https://v3.vuejs.org/) + [Vant UI](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)

交互特效：Canvas 2D / WebGL（燃香动画）

社交分享：微信小程序分享功能

3.2 后端

技术栈：Node.js（Nest.js / Express）+ MongoDB

核心 API：

/burn（POST）→ 记录烧香数据，返回功德证书

/sign（POST）→ AI 解析用户问题，生成签文

/points（GET）→ 查询用户功德值

3.3 AI 解析

NLP 关键词提取 + 语境匹配（焦虑、事业、感情等）

结合大模型 [GPT](https://platform.openai.com/docs/api-reference) + 预设签文库，生成个性化签文

4. 数据结构设计

4.1 用户数据

{
  "userId": "123456",
  "nickname": "佛系青年",
  "karmaPoints": 120,
  "burnHistory": [
    {"timestamp": "2025-03-16T12:00:00Z", "type": "祈福香"}
    {"timestamp": "2025-03-15T10:30:00Z", "type": "消灾香"}
  ]
}

4.2 香型数据

{
  "id": "1",
  "name": "升职加薪香",
  "description": "适用于职场人士，助力事业腾飞。",
  "price": 9.9,
  "image": "promotion_incense.png"
}

4.3 签文数据

{
  "id": "101",
  "fortuneLevel": "上签",
  "message": "风生水起，贵人相助。",
  "advice": "近期可主动争取机会，贵人相助，事业有望提升。",
  "relatedTopics": ["职场", "财富", "贵人"]
}

5. API 设计

5.1 烧香接口

接口路径：POST /burn

请求参数：

{
  "userId": "123456",
  "incenseType": "升职加薪香"
}

返回示例：

{
  "message": "烧香成功，功德值+10",
  "karmaPoints": 130,
  "certificate": "https://img.cybertemple.com/certificate123.png"
}

5.2 AI 解签接口

接口路径：POST /sign

请求参数：

{
  "userId": "123456",
  "question": "最近工作压力大，如何缓解？"
}

返回示例：

{
  "fortuneLevel": "中签",
  "message": "静心修行，自然顺遂。",
  "advice": "适当调整作息，多与贵人交流，事业会有转机。"
}

6. UI 设计

6.1 主界面

顶部：寺庙背景 + 虚拟香炉

中部：“点燃香”按钮 + 烧香动画

底部：功德值显示 + 个人中心

6.2 功德证书

内容：

用户名 + 烧香时间 + 烧香类型

功德语录（如“心善则福至”）

可下载 & 分享

6.3 AI 解签

文本输入框（用户输入烦恼）

AI 解析后返回签文 & 建议

付费解锁更详细的个性化建议

7. 付费策略

付费项

价格

说明

普通烧香

¥5.9

基础烧香动画，记录功德值

高级烧香

¥19.9

额外包含 AI 祝福语 & 限定香型

AI 解签

¥9.9

NLP 解析 + 预设签文返回

VIP 会员

¥29.9/月

无限烧香 + AI 高级解签

支付接口：
- [微信支付](https://pay.weixin.qq.com/)
- [Stripe国际支付](https://stripe.com/)

8. 部署方案

前端：
- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Vercel](https://vercel.com/)（H5）

后端：
- [阿里云ECS](https://www.aliyun.com/product/ecs)
- [Firebase](https://firebase.google.com/)

数据库：
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Firestore](https://firebase.google.com/docs/firestore)

9. 未来扩展

[VR 赛博寺庙](https://aframe.io/examples/)

联名寺庙推广

冥想 & [ASMR 模块](https://www.epidemicsound.com/sound-effects/)

10. 参考资源

- [微信小程序开发框架](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Vue3响应式系统原理](https://v3.vuejs.org/guide/reactivity.html)
- [MongoDB数据建模指南](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)
