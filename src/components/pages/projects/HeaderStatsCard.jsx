/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const HeaderStatsCard = ({projectsNumber}) => {
  const chartData = [
    { projects: "done", visitors: 4, fill: "hsl(var(--chart-1))" },
    { projects: "onGoing", visitors: 1, fill: "hsl(var(--chart-2))" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    done: {
      label: "done",
      color: "hsl(var(--chart-1))",
    },
    onGoing: {
      label: "onGoing",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <main className="col-span-1">
      <Card>
        <CardContent className="grid grid-cols-2 p-4 gap-4">
          {/* Stats */}
          <div className="col-span-1 grid items-center gap-2">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">All Projects</div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {projectsNumber}
              </div>
            </div>
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">Finished</div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                4
              </div>
            </div>
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">On Progress</div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                1
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-1 flex justify-center items-center">
            <ChartContainer
              config={chartConfig}
              className="aspect-square w-full max-w-[150px] min-w-[130px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="projects"
                  innerRadius={35}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {projectsNumber.toLocaleString()}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default HeaderStatsCard;
