import { useProjectsStore } from '../store/projectsStore';
import './Projects.css';

export function Projects() {
  const activeProjects = useProjectsStore((s) => s.activeProjects);
  const executeProject = useProjectsStore((s) => s.executeProject);
  
  if (activeProjects.length === 0) return null;
  
  return (
    <div className="section projects">
      <h3>Projects</h3>
      <hr />
      
      <div className="project-list">
        {activeProjects.map((project) => {
          const canAfford = project.cost();
          
          return (
            <button
              key={project.id}
              className={`project-button ${canAfford ? 'affordable' : 'disabled'}`}
              onClick={() => executeProject(project.id)}
              disabled={!canAfford}
            >
              <span className="project-title">{project.title}</span>
              <span className="project-price">{project.priceTag}</span>
              <span className="project-desc">{project.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
