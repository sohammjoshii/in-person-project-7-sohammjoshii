import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
const ProjectForm = () => {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    imageUrl: 'https://placehold.co/600x400?text=New+Project',
    technologies: []
  });
  const [formError, setFormError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === '') {
      setFormError('Title cannot be empty');
      return;
    }
    try {
      setFormError(null);
      await addProject(formData);
      setFormData({
        title: '',
        description: '',
        category: 'web',
        imageUrl: 'https://placehold.co/600x400?text=New+Project',
        technologies: []
      });
    } catch (err) {
      setFormError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h3>Add New Project</h3>
      {formError && <p className="error-text">{formError}</p>}
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="data">Data</option>
        </select>
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};
export default ProjectForm;