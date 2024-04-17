import {
  Component,
  input,
  ElementRef,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import {
  ChartDefault,
  ChartWithDate,
  ChartWithMonth,
} from '../../business/model/vibbra-nfmei.model';

type ChartData = ChartDefault[] | ChartWithDate[] | ChartWithMonth[];
type SeriesType = {
  legend: string;
  property: string;
  color: string;
};

@Component({
  selector: 'app-chart-default',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './chart.default.component.html',
  styleUrl: './chart.default.component.scss',
})
export class ChartDefaultComponent {
  @ViewChild('chartID') chartID!: ElementRef;
  private zone = inject(NgZone);
  protected root!: am5.Root;

  series = input.required<SeriesType[]>();
  title = input.required<string>();
  icon = input.required<string>();
  chartData = input.required<ChartData, ChartData>({
    transform: (c) => {
      if (this.root) {
        this.root.dispose();
        this.update(c);
      }
      return c;
    },
  });
  divId = input.required<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  chartBuild(data: ChartData): void {
    const root = am5.Root.new(this.divId());
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        wheelX: 'panX',
        layout: root.verticalLayout,
      }),
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );

    legend.labels.template.setAll({
      fontSize: 12,
    });

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      centerY: am5.p50,
      centerX: am5.p100,
      fontSize: 12,
      oversizedBehavior: 'fit',
      forceHidden: false,
      visible: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'month',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });

    yRenderer.labels.template.setAll({
      fontSize: 12,
      oversizedBehavior: 'fit',
      forceHidden: false,
      visible: true,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const makeSeries = (name: string, fieldName: string, color: string) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'month',
          fill: am5.Color.fromString(color),
        }),
      );

      series.columns.template.setAll({
        tooltipText: '{categoryX}:{valueY}',
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0,
      });

      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    };

    this.series().forEach((s) => makeSeries(s.legend, s.property, s.color));

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    this.root = root;
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.chartID.nativeElement.id = this.divId();
      this.root = am5.Root.new(this.divId());
    });
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  update(data: ChartData): void {
    this.browserOnly(() => this.chartBuild(data));
  }
}
