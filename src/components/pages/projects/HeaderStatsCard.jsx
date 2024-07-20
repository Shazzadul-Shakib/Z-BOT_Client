import { Card, CardContent } from "@/components/ui/card";


const HeaderStatsCard = () => {
    return (
      <main className="">
        <Card className="col-span-1">
          <CardContent className="grid p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">
                  All Projects
                </div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  5
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Finished</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  4
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">On Going</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  1
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
};

export default HeaderStatsCard;