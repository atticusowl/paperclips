import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { useProjectsStore } from '../store/projectsStore';

// Original game has TWO loops:
// - Fast loop at 10ms: ticks, autoclippers, operations, creativity, milestones
// - Slow loop at 100ms: sales, wire price fluctuation, revenue calculation

const FAST_TICK_RATE = 10; // 10ms - matches original main loop
const SLOW_TICK_RATE = 100; // 100ms - matches original slow loop

export function useGameLoop() {
  const tick = useGameStore((s) => s.tick);
  const slowTick = useGameStore((s) => s.slowTick);
  const checkProjects = useProjectsStore((s) => s.checkProjects);
  const initializeProjects = useProjectsStore((s) => s.initializeProjects);
  const initialized = useRef(false);
  
  // Initialize projects on first load
  useEffect(() => {
    if (!initialized.current) {
      initializeProjects();
      initialized.current = true;
    }
  }, [initializeProjects]);
  
  // Fast game loop (10ms) - autoclippers, operations, creativity, milestones
  useEffect(() => {
    const gameLoop = setInterval(() => {
      tick();
    }, FAST_TICK_RATE);
    
    return () => clearInterval(gameLoop);
  }, [tick]);
  
  // Slow game loop (100ms) - sales, wire price, revenue
  useEffect(() => {
    const slowLoop = setInterval(() => {
      slowTick();
    }, SLOW_TICK_RATE);
    
    return () => clearInterval(slowLoop);
  }, [slowTick]);
  
  // Project check loop (every 100ms like original)
  useEffect(() => {
    const projectLoop = setInterval(() => {
      checkProjects();
    }, 100);
    
    return () => clearInterval(projectLoop);
  }, [checkProjects]);
}
