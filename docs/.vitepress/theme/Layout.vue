<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted } from 'vue'

const { site, theme, page } = useData()
const sidebar = theme.value?.sidebar || []
const footer = theme.value?.footer

// 检查链接是否为当前激活状态
const isActive = (link: string) => {
  if (typeof window === 'undefined') return false
  const path = page.value.relativePath.replace(/\.md$/, '')
  const target = link.replace(/^\//, '').replace(/\.html$/, '')
  return path === target
}

// 跳转函数（增加环境检查和容错）
const navigateTo = (href: string) => {
  if (typeof window === 'undefined') return
  
  const id = decodeURIComponent(href.split('#')[1])
  if (!id) return

  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    // 调整滚动位置，避免被顶部导航栏遮挡
    setTimeout(() => {
      window.scrollBy(0, -80)
    }, 100)
    // 更新 URL hash
    window.history.pushState(null, '', href)
  }
}

// 处理页面跳转
const handlePageNavigation = (link: string) => {
  if (typeof window === 'undefined') return

  if (link.includes('#')) {
    const [url, anchor] = link.split('#')
    const currentPath = window.location.pathname
    
    // 如果是当前页面的锚点
    if (url === '' || url === '/' || currentPath.includes(url)) {
      navigateTo(`#${anchor}`)
    } else {
      // 跨页面跳转
      window.location.href = link.endsWith('.html') || link.includes('#') ? link : `${link}.html`
    }
  } else {
    window.location.href = link
  }
}

// 页面加载或路由变化时处理锚点
onMounted(() => {
  if (window.location.hash) {
    setTimeout(() => navigateTo(window.location.hash), 500)
  }
})
</script>

<template>
  <div class="doc-layout">
    <header class="doc-header">
      <div class="header-left">
        <a href="/" class="site-title">{{ site.title }}</a>
      </div>
      <div class="header-right">
        <span class="header-subtitle">{{ site.description }}</span>
      </div>
    </header>

    <div class="doc-container">
      <aside class="doc-sidebar">
        <nav class="sidebar-nav">
          <div v-for="(section, sIndex) in sidebar" :key="sIndex" class="sidebar-section">
            <div class="section-header">
              {{ section.text }}
            </div>
            <ul class="section-items">
              <li v-for="item in section.items" :key="item.text">
                <a 
                  :href="item.link" 
                  class="sidebar-link"
                  :class="{ active: isActive(item.link) }"
                  @click.prevent="handlePageNavigation(item.link)"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main class="doc-content">
        <div class="content-wrapper">
          <Content />
        </div>
      </main>
    </div>

    <footer class="doc-footer">
      <div class="footer-content">
        <p>{{ footer?.message || '辽宁火炬网络科技文化有限责任公司 技术部' }}</p>
        <p>{{ footer?.copyright || 'Copyright © 2025 火炬技术部' }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 确保 Content 渲染正常 */
.content-wrapper {
  max-width: 900px;
  width: 100%;
}

/* 其他样式建议保持原样 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.doc-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: #333;
  background: #fff;
}

.doc-header {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.site-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  transition: color 0.2s;
}

.site-title:hover {
  color: #3b82f6;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-subtitle {
  font-size: 14px;
  color: #6b7280;
}

.doc-container {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 40px;
}

.doc-sidebar {
  width: 280px;
  padding: 32px 0;
  flex-shrink: 0;
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  border-right: 1px solid #e5e7eb;
}

.sidebar-nav {
  padding-right: 24px;
}

.sidebar-section {
  margin-bottom: 24px;
}

.section-header {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding: 0 12px;
  line-height: 1.5;
}

.section-items {
  list-style: none;
}

.sidebar-link {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  color: #4b5563;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
  line-height: 1.5;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
}

.sidebar-link:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.sidebar-link.active {
  background: #eff6ff;
  color: #3b82f6;
  font-weight: 500;
}

.doc-content {
  flex: 1;
  padding: 32px 48px;
  min-width: 0;
}

.content-wrapper :deep(h1) {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
  line-height: 1.3;
}

.content-wrapper :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-top: 48px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
  line-height: 1.4;
}

.content-wrapper :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-top: 32px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.content-wrapper :deep(p) {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 16px;
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  padding-left: 24px;
  margin-bottom: 16px;
}

.content-wrapper :deep(li) {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 8px;
}

.content-wrapper :deep(a) {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s;
}

.content-wrapper :deep(a:hover) {
  color: #2563eb;
  text-decoration: underline;
}

.content-wrapper :deep(code) {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.content-wrapper :deep(pre) {
  background: #1f2937;
  color: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.content-wrapper :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}

.doc-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 24px 40px;
  text-align: center;
}

.footer-content p {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0;
}

@media (max-width: 1200px) {
  .doc-container {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .doc-sidebar {
    display: none;
  }
  
  .doc-header {
    padding: 0 20px;
  }
  
  .header-subtitle {
    display: none;
  }
  
  .doc-container {
    padding: 0 20px;
  }
  
  .doc-content {
    padding: 24px 20px;
  }
  
  .content-wrapper :deep(h1) {
    font-size: 26px;
  }
  
  .content-wrapper :deep(h2) {
    font-size: 20px;
  }
  
  .content-wrapper :deep(h3) {
    font-size: 18px;
  }
}
</style>