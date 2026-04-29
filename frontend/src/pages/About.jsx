import About from '../components/sections/About';

const AboutPage = () => {
  return (
    <>
      <div className="pt-32 pb-12 bg-bg-base transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            <span className="gradient-text">About Me</span>
          </h1>
          <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
            Learn more about my journey, skills, and experience
          </p>
        </div>
      </div>
      <About />
    </>
  );
};

export default AboutPage;
