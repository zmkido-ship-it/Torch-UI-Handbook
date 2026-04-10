import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "火炬技术部 UI 入职手册",
  description: "适配 UI 设计岗位，帮助新人快速融入团队",
  base: '/Torch-UI-Handbook/', 
  
  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      // 修复：移除 .html，修正锚点格式
      { text: '设计规范', link: '/part3#6-设计规范速查' }
    ],

    // 侧边栏配置（多页面导航）
    sidebar: [
      {
        text: '🚪 第一部分：入门前置',
        collapsed: false,
        items: [
          { text: '1. 软硬件工具箱', link: '/part1#1.软硬件工具箱' },
          { text: '2. 业务黑话词典', link: '/part1#2.业务黑话词典' },
          { text: '3. 首周闯关任务卡', link: '/part1#3.首周闯关任务卡' }
        ]
      },
      {
        text: '🗺️ 第二部分：标准工作流',
        collapsed: false,
        items: [
          { text: '4. 火炬 UI 设计全流程', link: '/part2#4.火炬 UI 设计全流程' },
          { text: '5. 上线后复盘与沉淀', link: '/part2#5.上线后复盘与沉淀' }
        ]
      },
      {
        text: '🛡️ 第三部分：生存法则与红线',
        collapsed: false,
        items: [
          { text: '6. 设计规范速查', link: '/part3#6.设计规范速查' },
          { text: '7. 协作与沟通铁律', link: '/part3#7.协作与沟通铁律' },
          { text: '8. 职业素养与持续学习', link: '/part3#8.职业素养与持续学习' }
        ]
      }
    ],

    // 社交链接（可选）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zmkido-ship-it/Torch-UI-Handbook' }
    ],

    footer: {
      message: '辽宁火炬网络科技文化有限责任公司 技术部',
      copyright: 'Copyright © 2025 火炬技术部'
    },

    search: {
      provider: 'local'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    editLink: {
      pattern: 'https://github.com/你的用户名/仓库名/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  },

  markdown: {
    lineNumbers: true,  // 代码块显示行号
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})