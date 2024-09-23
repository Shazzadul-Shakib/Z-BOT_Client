import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import HeaderCard from "@/components/pages/projects/HeaderCard";
import ProjectCard from "@/components/pages/projects/ProjectCard";
import { useGetAllProjectsQuery } from "@/redux/api/projects-api";
import { useSelector } from "react-redux";

const Projects = () => {
  const { user } = useSelector((state) => state.user);
  const { data: projects, isLoading } = useGetAllProjectsQuery(user?._id);

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  // Sort projects by most recent
  const sortedProjects = projects?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <main className="h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header Section */}
      <section className="mb-4">
        <HeaderCard />
      </section>

      {/* Project Cards Grid */}
      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProjects?.map((project) => (
          <ProjectCard key={project._id} projectInfo={project} />
        ))}
      </section>
    </main>
  );
};

export default Projects;
