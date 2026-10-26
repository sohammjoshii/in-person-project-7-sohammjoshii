import { createContext, useState, useContext, useEffect } from 'react';

// TODO: Create the ProjectsContext
const ProjectsContext = createContext(); // Replace with createContext()

// Custom hook for using projects
export const useProjects = () => {
  // TODO: Implement similar to useTheme
  //return {}; // TODO: Return the context
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  // TODO: Create state for projects, loading, and error
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement useEffect to fetch projects when component mounts
  // Remember to:
  // 1. Create an async function inside useEffect
  // 2. Handle loading states
  // 3. Handle errors with try/catch
  // 4. Implement cleanup to prevent race conditions
  // useEffect(() => {
  //   let isCancelled = false;
  //
  //   const fetchProjects = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //
  //       // TODO: Fetch from 'http://localhost:3001/projects'
  //       // Check if response is ok
  //       // Parse JSON
  //       // Update state only if not cancelled
  //     } catch (err) {
  //       // TODO: Handle error only if not cancelled
  //     }
  //   };
  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };





  //
   fetchProjects();
  //
  //   // Cleanup function
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);
  return () => {
      isCancelled = true;
    };
  }, []);

  
  // TODO: Create addProject function
  // const addProject = async (projectData) => {
  //   try {
  //     // POST request to API
  //     // Update local state on success
  //   } catch (error) {
  //     // Handle error
  //   }
  // };
  const addProject = async (projectData) => {
  const response = await fetch('http://localhost:3001/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...projectData, id: Date.now() })
  });
  if (!response.ok) {
    throw new Error('Failed to add project');
  }
  const newProject = await response.json();
  setProjects(prev => [...prev, newProject]);
  return newProject;
};

  // TODO: Create updateProject function
  // const updateProject = async (id, updates) => {
  //   // PUT request to API
  //   // Update local state
  // };

  // TODO: Create deleteProject function
  // const deleteProject = async (id) => {
  //   // DELETE request to API
  //   // Update local state
  // };

  // TODO: Create the value object
  const value = {
     projects, loading, error , addProject
    // Add all state and functions here
  };

  // TODO: Return the Provider
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider> // Replace with actual Provider
  );
};