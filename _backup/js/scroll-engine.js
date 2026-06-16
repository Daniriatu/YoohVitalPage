/**
 * ============================================
 * scroll-engine.js — 滚动检测引擎
 * ============================================
 * 核心功能：
 * 1. 使用 IntersectionObserver 检测各章节的可见性
 * 2. 计算全局滚动进度（0~1）供戒指旋转使用
 * 3. 派发自定义事件：section:enter / section:exit / section:progress
 * 4. 驱动侧边导航圆点的高亮状态
 * ============================================
 */

class ScrollEngine {
  /**
   * 构造函数
   * @param {Object} options - 配置项
   * @param {string} options.sectionSelector - 章节元素的 CSS 选择器
   * @param {string} options.navDotSelector  - 导航圆点的 CSS 选择器
   */
  constructor(options = {}) {
    // 默认配置
    this.config = {
      sectionSelector: '.timeline-section',
      navDotSelector: '.nav-dots__dot',
      ...options,
    };

    // 获取所有章节元素
    this.sections = Array.from(document.querySelectorAll(this.config.sectionSelector));
    // 获取导航圆点
    this.navDots = Array.from(document.querySelectorAll(this.config.navDotSelector));
    // 当前激活的章节索引（-1 表示英雄区）
    this.activeSectionIndex = -1;
    // 全局滚动进度 0~1
    this.scrollProgress = 0;
    // 是否正在请求动画帧
    this._rafId = null;
    // 上一次的滚动位置（用于检测变化）
    this._lastScrollY = -1;

    this._init();
  }

  /**
   * 初始化 — 设置观察器和滚动监听
   */
  _init() {
    this._setupIntersectionObserver();
    this._setupScrollListener();
    this._setupNavDots();
    // 首次触发一次进度计算
    this._updateScrollProgress();
  }

  /**
   * 设置 IntersectionObserver
   * 使用多个阈值来精确追踪章节的可见比例
   */
  _setupIntersectionObserver() {
    const observerOptions = {
      root: null, // 视口
      rootMargin: '0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // 多阈值检测
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;
        const sectionIndex = this.sections.indexOf(section);

        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          // 章节进入视口（可见比例 ≥ 25%）
          if (this.activeSectionIndex !== sectionIndex) {
            // 离开旧章节
            if (this.activeSectionIndex >= 0) {
              this._dispatchEvent('section:exit', {
                index: this.activeSectionIndex,
                section: this.sections[this.activeSectionIndex],
              });
            }
            // 进入新章节
            this.activeSectionIndex = sectionIndex;
            this._dispatchEvent('section:enter', {
              index: sectionIndex,
              section: section,
            });
            // 更新导航圆点
            this._updateNavDots(sectionIndex);
          }
        }
      });
    }, observerOptions);

    // 观察所有章节
    this.sections.forEach(section => this.observer.observe(section));
  }

  /**
   * 设置滚动监听 — 用 rAF 节流，计算滚动进度
   */
  _setupScrollListener() {
    window.addEventListener('scroll', () => {
      if (this._rafId) return; // 已有待执行的帧，跳过
      this._rafId = requestAnimationFrame(() => {
        this._updateScrollProgress();
        this._rafId = null;
      });
    }, { passive: true }); // passive 提升滚动性能
  }

  /**
   * 计算全局滚动进度
   * scrollProgress = 当前滚动位置 / (文档总高度 - 视口高度)
   */
  _updateScrollProgress() {
    const scrollY = window.scrollY || window.pageYOffset;
    // 如果位置没变，无需更新
    if (scrollY === this._lastScrollY) return;
    this._lastScrollY = scrollY;

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    // 避免除以零
    const maxScroll = docHeight - winHeight;
    this.scrollProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    // 派发进度事件
    this._dispatchEvent('section:progress', {
      progress: this.scrollProgress,
      scrollY: scrollY,
      activeSectionIndex: this.activeSectionIndex,
    });
  }

  /**
   * 设置导航圆点的点击事件 — 点击跳转到对应章节
   */
  _setupNavDots() {
    this.navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (this.sections[index]) {
          this.sections[index].scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * 更新导航圆点的高亮状态
   * @param {number} activeIndex - 当前章节索引
   */
  _updateNavDots(activeIndex) {
    this.navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  /**
   * 派发自定义事件到 document
   * @param {string} eventName - 事件名称
   * @param {Object} detail - 事件附带数据
   */
  _dispatchEvent(eventName, detail) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  /**
   * 销毁 — 清理观察器和监听器
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
    }
  }
}

// 导出供其他模块使用
window.ScrollEngine = ScrollEngine;
