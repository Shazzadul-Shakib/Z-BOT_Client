import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HeaderAboutCard = () => {
  return (
    <main className=" grid">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-3xl">Project Name</CardTitle>
          <CardDescription className=" leading-relaxed py-2 text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati eius inventore labore adipisci velit error laudantium architecto debitis reiciendis porro. Consequuntur, modi totam. Placeat voluptates sint nihil officia expedita nulla.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};

export default HeaderAboutCard;
