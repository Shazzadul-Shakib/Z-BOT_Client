import AddNewFeature from "@/components/pages/project/AddNewFeature";
import FeatureCard from "@/components/pages/project/FeatureCard";
import HeaderAboutCard from "@/components/pages/project/HeaderAboutCard";
import { useGetAllFeaturesQuery } from "@/redux/api/projects-api";
import { useLocation } from "react-router-dom";

const Project = () => {
  
  const location = useLocation();
  const { projectInfo } = location.state || {};
  const { data,isLoading } = useGetAllFeaturesQuery(projectInfo?._id);
  const allFeatures=data?.data;
  
  if(isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <div className=" h-[calc(100vh-95px)] overflow-y-auto hide-scrollbar">
      <section className="grid gap-5 ">
        <HeaderAboutCard projectInfo={projectInfo} />
      </section>
      <section className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {allFeatures.map((feature) => (
          <FeatureCard key={feature._id} feature={feature} />
        ))}

        <AddNewFeature projectInfo={projectInfo} />
      </section>
    </div>
  );
};

export default Project;
