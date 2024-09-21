import HeaderCard from "@/components/pages/projects/HeaderCard";
import ProjectCard from "@/components/pages/projects/ProjectCard";
import { useGetAllProjectsQuery } from "@/redux/api/projects-api";
import { useSelector } from "react-redux";

const Projects = () => {
  const { user } = useSelector((state) => state.user);
  const { data: projects, isLoading } = useGetAllProjectsQuery(user?._id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header Section */}
      <section className="mb-4">
        <HeaderCard />
      </section>

      {/* Project Cards Grid */}
      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects?.map((project) => (
          <ProjectCard key={project._id} projectInfo={project} />
        ))}
      </section>
    </main>
  );
};

export default Projects;
