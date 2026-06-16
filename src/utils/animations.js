/**
 * ============================================
 * animations.js — 动画编排器
 * ============================================
 * 使用 IntersectionObserver 检测动画元素进入视口，
 * 自动添加 .visible 类触发 CSS 动画。
 * 支持交错延迟和重复触发。
 * ============================================
 */

class AnimationOrchestrator {
  /**
   * 构造函数
   * @param {Object} options - 配置项
   */
  constructor(options = {}) {
    this.config = {
      // 需要动画的元素选择器
      animatedSelector: '[class*="anim-"]',
      // 触发阈值（元素可见多少时触发）
      threshold: 0.15,
      // 是否只触发一次（false = 滚回时重置）
      once: true,
      ...options,
    };

    this._init();
  }

  /**
   * 初始化 — 查找所有动画元素并观察
   */
  _init() {
    // 获取所有带动画类的元素
    this.elements = document.querySelectorAll(this.config.animatedSelector);

    // 创建观察器
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 元素进入视口 → 添加 visible 触发动画
          entry.target.classList.add('visible');

          // 如果只触发一次，停止观察该元素
          if (this.config.once) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.config.once) {
          // 允许重复触发时，离开视口移除 visible
          entry.target.classList.remove('visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px', // 底部提前 50px 触发
      threshold: this.config.threshold,
    });

    // 观察所有元素
    this.elements.forEach(el => this.observer.observe(el));

    // 同时观察 feature-card 元素
    document.querySelectorAll('.feature-card').forEach(el => {
      this.observer.observe(el);
    });
  }

  /**
   * 销毁 — 断开所有观察
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// 导出
window.AnimationOrchestrator = AnimationOrchestrator;
