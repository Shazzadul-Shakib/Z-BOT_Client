import AddNewFeature from "@/components/pages/project/AddNewFeature";
import FeatureCard from "@/components/pages/project/FeatureCard";
import HeaderAboutCard from "@/components/pages/project/HeaderAboutCard";

const Project = () => {
    return (
      <div>
        <section className="grid gap-5 ">
          <HeaderAboutCard />
        </section>
        <section className=" mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard/>
          <AddNewFeature/>
        </section>
      </div>
    );
};

export default Project;