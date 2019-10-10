import { ChartItem } from "./chart-item";

export class ChartObject {

  name: string;
  series: ChartItem[];


  constructor(name: string, series: ChartItem[]) {
    this.name = name;
    this.series = series;
  }
}
