/**
 * ============================================
 * tracking.js — 用户行为追踪系统
 * ============================================
 * 轻量级客户端分析层（无外部依赖）。
 * 记录用户在各章节的停留时间、滚动深度、
 * 材质偏好和按钮点击等行为。
 * 所有事件存储在 window.__yoohAnalytics 中，
 * 可随时对接任何分析后端。
 * ============================================
 */

class TrackingSystem {
  constructor() {
    // 全局分析数据存储
    window.__yoohAnalytics = window.__yoohAnalytics || [];

    // 章节停留时间追踪
    this._sectionTimers = {};
    this._currentSection = null;
    this._sectionEnterTime = null;

    // 最大滚动深度（百分比）
    this._maxScrollDepth = 0;

    // 会话开始时间
    this._sessionStart = Date.now();

    // 初始化
    this._setupListeners();
    this._trackPageView();

    // 开发模式标志 — 设为 true 时在控制台输出事件
    this.debugMode = true;
  }

  /**
   * 设置所有事件监听器
   */
  _setupListeners() {
    // 监听章节进入事件（来自 ScrollEngine）
    document.addEventListener('section:enter', (e) => {
      this._onSectionEnter(e.detail);
    });

    // 监听章节离开事件
    document.addEventListener('section:exit', (e) => {
      this._onSectionExit(e.detail);
    });

    // 监听滚动进度（记录最大深度）
    document.addEventListener('section:progress', (e) => {
      const { progress } = e.detail;
      if (progress > this._maxScrollDepth) {
        this._maxScrollDepth = progress;
      }
    });

    // 监听材质切换事件
    document.addEventListener('tracking:event', (e) => {
      this._record(e.detail.type, e.detail);
    });

    // 监听客服按钮点击
    const chatBtn = document.querySelector('.chat-fab');
    if (chatBtn) {
      chatBtn.addEventListener('click', () => {
        this._record('chat_click', { timestamp: Date.now() });
      });
    }

    // 页面离开前记录会话数据
    window.addEventListener('beforeunload', () => {
      this._onSessionEnd();
    });

    // 页面可见性变化（切后台时也记录）
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this._onSessionEnd();
      }
    });
  }

  /**
   * 章节进入回调 — 开始计时
   * @param {Object} detail - 包含 index 和 section
   */
  _onSectionEnter(detail) {
    // 先结束上一个章节的计时
    this._finishCurrentSection();

    this._currentSection = detail.index;
    this._sectionEnterTime = Date.now();

    this._record('section_enter', {
      sectionIndex: detail.index,
      sectionId: detail.section?.id || `section-${detail.index}`,
    });
  }

  /**
   * 章节离开回调
   */
  _onSectionExit(detail) {
    this._finishCurrentSection();
  }

  /**
   * 结束当前章节的停留计时
   */
  _finishCurrentSection() {
    if (this._currentSection !== null && this._sectionEnterTime) {
      const dwellTime = Date.now() - this._sectionEnterTime;

      // 累加该章节的总停留时间
      if (!this._sectionTimers[this._currentSection]) {
        this._sectionTimers[this._currentSection] = 0;
      }
      this._sectionTimers[this._currentSection] += dwellTime;

      this._record('section_dwell', {
        sectionIndex: this._currentSection,
        dwellTimeMs: dwellTime,
        totalDwellMs: this._sectionTimers[this._currentSection],
      });
    }
    this._sectionEnterTime = null;
  }

  /**
   * 记录页面访问
   */
  _trackPageView() {
    this._record('page_view', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
    });
  }

  /**
   * 会话结束 — 汇总数据
   */
  _onSessionEnd() {
    this._finishCurrentSection();

    this._record('session_end', {
      sessionDurationMs: Date.now() - this._sessionStart,
      maxScrollDepth: Math.round(this._maxScrollDepth * 100),
      sectionDwellTimes: { ...this._sectionTimers },
    });
  }

  /**
   * 核心记录方法 — 将事件存入全局数组
   * @param {string} eventType - 事件类型
   * @param {Object} data - 事件数据
   */
  _record(eventType, data = {}) {
    const event = {
      event: eventType,
      timestamp: new Date().toISOString(),
      ...data,
    };

    // 存入全局数组
    window.__yoohAnalytics.push(event);

    // 开发模式下输出到控制台
    if (this.debugMode) {
      console.log(
        `%c📊 [Yooh Analytics] %c${eventType}`,
        'color: #B76E79; font-weight: bold;',
        'color: #6B6560;',
        data
      );
    }
  }
}

// 导出
window.TrackingSystem = TrackingSystem;
