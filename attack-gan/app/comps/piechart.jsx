"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export function Chart({ name, data }) {
  const dataconfig = {
    total: {
      label: "total",
    },

    attack: {
      label: "attack",
      color: "hsl(var(--chart-1))",
    },
    benign: {
      label: "benign",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <>
      {data != null ? (
        <Card>
          {console.log(data.attack)}
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={dataconfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={[
                      {
                        type: "attack",
                        total: data.attack,
                        fill: "var(--color-attack)",
                      },
                      {
                        type: "benign",
                        total: data.benign,
                        fill: "var(--color-benign)",
                      },
                    ]}
                    dataKey="total"
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="type" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Card>
      ) : (
        <Card>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>{name}</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <PieChart>
                  <Pie data={chartData} dataKey="visitors" />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="browser" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Card>
      )}
    </>
  );
}
