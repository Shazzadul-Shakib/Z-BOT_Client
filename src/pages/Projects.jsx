import HeaderCard from "@/components/pages/projects/HeaderCard";
import ProjectCard from "@/components/pages/projects/ProjectCard";
import { useGetAllProjectsQuery } from "@/redux/api/projects-api";
import { useSelector } from "react-redux";

const Projects = () => {
  const {user}=useSelector(state=>state.user);
  const {data:projects,isLoading}=useGetAllProjectsQuery(user?._id);
  if(isLoading){
    return <h1>loading...</h1>;
  }
  return (
    <main className="h-[calc(100vh-100px)] overflow-y-auto hide-scrollbar">
      <section >
        <HeaderCard />
      </section>
      <section className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {projects?.map((project) => (
          <ProjectCard key={project._id} projectInfo={project} />
        ))}
      </section>
    </main>
  );
};

export default Projects;
