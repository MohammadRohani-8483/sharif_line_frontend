import { T_ChartData } from "../types/global";

export type ChartResponse = {
  counts: number;
  percentages: number;
  id: number;
  title: string;
  text: string;
}[]

export const handleChartData: (res: T_ChartData) => ChartResponse = (res) => {
  const data = res.options.map(
    option => ({
      ...option,
      counts: res.counts[option.id],
      percentages: res.percentages[option.id]
    })
  )
  return data
}