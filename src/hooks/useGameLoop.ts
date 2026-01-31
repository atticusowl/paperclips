import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { useProjectsStore } from '../store/projectsStore';

const TICK_RATE = 10; // 10ms = 100 ticks per second (like original game)

export function useGameLoop() {
  const tick = useGameStore((s) => s.tick);
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
  
  // Main game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      tick();
    }, TICK_RATE);
    
    return () => clearInterval(gameLoop);
  }, [tick]);
  
  // Project check loop (less frequent)
  useEffect(() => {
    const projectLoop = setInterval(() => {
      checkProjects();
    }, 100); // Check projects every 100ms
    
    return () => clearInterval(projectLoop);
  }, [checkProjects]);
}
