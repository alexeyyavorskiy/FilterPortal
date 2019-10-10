import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { DataService } from "../../share/data.service";
import { GlobalService } from "../../core/global.service";
import { ChartItem } from "../../classes/chart-item";
import { ChartObject } from "../../classes/chart-object";
import {
  LangChangeEvent,
  TranslateService
} from "ng2-translate";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() colorClass;
  @Input() value;
  @Input() filterId;

  public warningClass = '';

  public view: any[];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = true;
  public showLegend = true;
  public showXAxisLabel = true;
  public autoScale = true;

  // showYAxisLabel = true;
  public colorScheme = {
    domain: ['#5AA454']
  };
  public data: any;
  private translateSubscription: Subscription;
  private translateWorldSubscription: Subscription;
  private chartDataSubscription: Subscription;
  private getChartDataSubscription: Subscription;

  ngOnInit() {
    this.loadChartData();
    this.chartDataSubscription = this.dataService.chartData.subscribe((res) => {
      if (res.filterId === this.filterId) {
        this.fillChartJson(res.data);
      }
    }, (err) => {
      console.log(err);
    });

    this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadChartData();
    });
  }

  ngOnDestroy(): void {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
    if (this.translateWorldSubscription) {
      this.translateWorldSubscription.unsubscribe();
    }
    if (this.chartDataSubscription) {
      this.chartDataSubscription.unsubscribe();
    }
    if (this.getChartDataSubscription) {
      this.getChartDataSubscription.unsubscribe();
    }
  }

  loadChartData() {
    this.getChartDataSubscription = this.dataService.getChartData(this.filterId).subscribe((res) => {
      if (res) {
        this.fillChartJson(res.reverse());
      }
    }, (err) => {
      console.log(err);
    });
  }

  constructor(private dataService: DataService, private globalService: GlobalService, private translate: TranslateService) {
  }

  fillChartJson(data) {
    const series: ChartItem[] = [];
    data.map((item) => {
      const date = new Date(item.timestamp * 1000);
      // console.log(date);
      this.translateWorldSubscription = this.translate.get(this.globalService.monthNameList[date.getMonth()]).subscribe((month) => {
        series.push(new ChartItem(`${this.globalService.minTwoDigits(date.getDate())} ${month}`, item.value_avg));
      });
    });

    this.data = [];
    this.data.push(new ChartObject('name', series));
    // console.log(JSON.stringify(this.data) )
  }

  takeEvent(info) {
    // this.object = info;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value: SimpleChange = changes.value;
    if (value && value.currentValue) {
      this.getColorClass(value.currentValue);
    }
  }

  public getColorClass(value) {
    if (value) {
      if (value >= 80 && value <= 100) {
        this.warningClass = 'chart-status--warning';
      } else {
        this.warningClass = 'chart-status';
      }
    }
  }

}
