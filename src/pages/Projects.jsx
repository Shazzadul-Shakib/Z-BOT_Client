import HeaderCard from "@/components/pages/projects/HeaderCard";
import HeaderStatsCard from "@/components/pages/projects/HeaderStatsCard";

const Projects = () => {
    return (
      <main>
        <section className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <HeaderCard />
          <HeaderStatsCard />
        </section>
      </main>
    );
};

export default Projects;