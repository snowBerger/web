// 问卷类型
export const QUESTION_TYPE = {
  SINGLE: 1,
  MULTI: 2,
  TEXT: 3,
  PERCENT: 4,
  PERCENT_BAR: 5,
  SLEEP: 6
}

// 饼图颜色梯度
export const pieColors = ['#358CF0', '#4D73F0', '#8880FF', '#BB7DFA', '#00BADB']

// 饼图配置
export const pieOptions = {
  series: [{
    type: 'pie',
    selectedMode: 'single',
    selectedOffset: 5,
    hoverAnimation: false,
    radius: ['13%', '50%'],
    center: ['50%', '50%'],
    data: [],
    label: {
      normal: {
        formatter: '{a|\n{b}{d}%\n}',
        rich: {
          a: {
            color: '#7A7D80',
            align: 'left'
          }
        }
      }
    },
    labelLine: {
      normal: {
        lineStyle: {
          color: '#E6EBF0'
        },
        smooth: 0,
        length: 10,
        length2: 20
      }
    }
  }]
}
