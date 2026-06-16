import React, { useEffect } from 'react';
import Hero from './components/Hero';
import TimelineSections from './components/TimelineSections';
import NavDots from './components/NavDots';
import ChatFab from './components/ChatFab';
import Footer from './components/Footer';

// 引入全局工具脚本
import './utils/scroll-engine.js';
import './utils/animations.js';
import './utils/tracking.js';

function App() {
  useEffect(() => {
    // 初始化全局系统（滚动引擎、动画协调器、追踪系统）
    const scrollEngine = new window.ScrollEngine();
    const animations = new window.AnimationOrchestrator();
    const tracking = new window.TrackingSystem();

    return () => {
      // 组件卸载时清理资源
      scrollEngine.destroy();
      animations.destroy();
    };
  }, []);

  return (
    <>
      <Hero />
      <TimelineSections />
      <NavDots />
      <ChatFab />
      <Footer />
    </>
  );
}

export default App;
