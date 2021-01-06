<template>
  <div>
    <!--<div class="chart-box"><div class="chart-content" style="margin-bottom: 22px;">2011年</div><div class="chart-content">gStore相关论文首度发表 Lei Zou., et al: gStore: Answering SPARQL Queries via Subgraph Matching. PVLDB 4(8): 482-493 (2011)</div></div>-->
    <div
      id="eventLine"
      style="width: 100%;height: 800px;"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      myChartData: [
        {
          // 折线图数据 value是折线图的每个点 symbol设置该点是否有拐点
          line: { value: 240, symbol: 'circle' },
          // lines -> coords 连线的起点 （【X轴的项数作为第一个参数， 起点所在的数值】）
          lines: { coords: [ [ 0, 240 ], [ 0, 380 ] ] },
          scatter: {
            title: '2015年',
            content: 'gStore相关论文首度发表 Lei Zou., et al: gStore: Answering SPARQL Queries via Subgraph Matching. PVLDB 4(8): 482-493 (2011)'
          }
        },
        {
          line: { value: 164, symbol: 'none' },
          lines: null,
          scatter: null
        },
        {
          line: { value: 202, symbol: 'circle' },
          lines: { coords: [ [ 2, 202 ], [ 2, 350 ] ] },
          scatter: {
            title: '2018年',
            content: '海量图结构数据存储和查询优化理论研究，中国计算机学会自然科学二等奖，大规模图结构数据管理，中国教育部自然科学二等奖'
          }
        },
        {
          line: { value: 268, symbol: 'none' },
          lines: null,
          scatter: null
        },
        {
          line: { value: 180, symbol: 'circle' },
          lines: { coords: [ [ 4, 180 ], [ 4, 100 ] ] },
          scatter: {
            title: '2020年',
            content: '中国软件测评中心对gStore分布式系统进行性能测试，测试结果表明gStore分布式系统在106亿规模数据存储条件下平均查询响应时间为1.79秒.'
          }
        }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    arrangeChartData(myData) {
      let lineDataArr = []
      let scatterDataArr = []
      let linesDataArr = []
      myData.map((item, index) => {
        lineDataArr.push(item.line)
        linesDataArr.push(item.lines)
        scatterDataArr.push(item.scatter)
      })
      let pureScatterDataArr = scatterDataArr.filter(item => item != null)
      return [
        {
          type: 'line',
          smooth: true, //true 为平滑曲线，false为直线
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 17,
          itemStyle: {
            color: '#94070A',
            borderColor: '#fff',
            borderWidth: 4
          },
          lineStyle: {
            normal: {
              color: '#ffffff',
              width: 3
            }
          },
          data: lineDataArr
        },
        {
          type: 'scatter',
          symbolSize: 10,
          itemStyle: {
            color: '#94070A',
            opacity: 1
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: ({ dataIndex }) => {
                let { title, content } = pureScatterDataArr[dataIndex]
                return [ `{title|${ title } }`, ...this.sliceStr(content, 30) ].join('\n')
              },
              rich: {
                title: {
                  fontSize: 14,
                  color: '#ffffff',
                  lineHeight: 44
                },
                value: {
                  fontSize: 14,
                  color: '#ffffff',
                  lineHeight: 22
                }
              }
            },
            emphasis: {
              show: true
            }
          },
          data: linesDataArr.filter(item => item != null).map(item => item['coords'][1])
        },
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          zlevel: 0,
          lineStyle: {
            color: '#94070A',
            width: 2,
            opacity: 1,
            curveness: .2,
            type: 'moddle'
          },
          data: linesDataArr.filter(item => item != null)
        }
      ]
    },
    initChart() {
      const myChart = echarts.init(document.getElementById('eventLine'))

      myChart.setOption(
        {
          color: [ '#006d75', '#722ed1', '#1890ff' ],
          backgroundColor: '#1b1b1b',
          tooltip: {
            show: false
          },
          xAxis: {
            type: 'category',
            show: false,
            axisLine: {
              lineStyle: {
                color: '#000000',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            data: [
              'Apr.1',
              'Apr.2',
              'Apr.3',
              'Apr.4',
              'Apr.5',
              'Apr.6',
              'Apr.7',
              'Apr.8',
              'Apr.9',
              'Apr.10',
              'Apr.11'
            ]
          },
          yAxis: {
            type: 'value',
            show: false,
            splitLine: { show: false }, //去除网格线
            axisLine: {
              lineStyle: {
                color: '#000000',
                width: 1 // 这里是为了突出显示加上的
              }
            }
          },
          series: this.arrangeChartData(this.myChartData)
        }
      )
    },
    sliceStr(content, sliceNum) {
      console.log("content",content)
      let seliceArr = []
      let myLength = 0
      let transitionNum = 0
      for (let i = 0; i < content.length; i++) {
        if (myLength >= sliceNum) {
          seliceArr.push(`{value|${ content.slice(transitionNum, i) }}`)
          transitionNum = i
          myLength = 0
        }
        let i_length = this.switchLength(content[i])
        myLength += i_length
      }
      if (content.length > transitionNum) {
        seliceArr.push(`{value|${ content.slice(transitionNum, content.length) }}`)
      }
      return seliceArr
    },
    switchLength(str) {
      let testChinese = new RegExp('[\u4E00-\u9FA5]+')
      if (testChinese.test(str)) {
        return 2
      } else {
        return 1
      }
    }
  }
}
</script>
<style scoped>
  .chart-box {
    width: 260px;
    display: inline-block;
  }

  .chart-content {
    display: inline-block;
    height: 14px;
    font-size: 14px;
    color: #a09f9f;
    font-weight: 400;
  }
</style>
