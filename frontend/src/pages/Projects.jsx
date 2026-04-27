import Projects from '../components/sections/Projects';

const ProjectsPage = () => {
  return (
    <>
      <div className="pt-32 pb-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            <span className="gradient-text">My Projects</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development,
            from concept to deployment.
          </p>
        </div>
      </div>
      <Projects />
    </>
  );
};

export default ProjectsPage;
