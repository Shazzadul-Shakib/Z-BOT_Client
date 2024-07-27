import HeaderCard from "@/components/pages/projects/HeaderCard";
import HeaderStatsCard from "@/components/pages/projects/HeaderStatsCard";
import ProjectCard from "@/components/pages/projects/ProjectCard";

const Projects = () => {
    return (
      <main className="h-[calc(100vh-100px)] overflow-y-auto">
        <section className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <HeaderCard />
          <HeaderStatsCard />
        </section>
        <section className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </section>
      </main>
    );
};

export default Projects;