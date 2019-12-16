/**
 * Created by Berger on 2017/6/8.
 */

export const reportQuery = {
  productPlan: 'Meum',
  reportType: 'Fitness'
}

export const getLevelByScore = (score) => {
  if (score < -5) {
    return 1
  }
  if (score >= -5 && score <= 5) {
    return 2
  }
  return 3
}

export const levelArray = [{
  level: 1,
  text: '过少',
  color: '#FFD15C',
  defaultColor: '#E6EBF0'
}, {
  level: 2,
  text: '正常',
  color: '#2DD6D6',
  defaultColor: '#E6EBF0'
}, {
  level: 3,
  text: '过量',
  color: '#FFD15C',
  defaultColor: '#E6EBF0'
}]

// 趋势图配置
export const chartOptions = {
  credits: false,
  chart: {
    type: 'area',
    height: 224,
    borderRadius: 4,
    marginTop: 30,
    spacing: [15, 15, 15, 15]
  },
  title: {
    text: null
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      lineColor: '#fff',
      lineWidth: 2,
      marker: {
        lineWidth: 2,
        width: 0.5,
        states: {
          hover: {
            radiusPlus: 0.5,
            lineWidthPlus: 0
          }
        }
      },
      states: {
        hover: {
          lineWidthPlus: 0
        }
      }
    }
  },
  xAxis: {
    type: 'category',
    lineWidth: 0,
    tickLength: 0,
    labels: {
      style: {
        color: '#fff',
        fontSize: '.24rem'
      },
      align: 'center',
      y: 18
    }
  },
  yAxis: {
    title: null,
    tickAmount: 4,
    min: 0,
    max: 3,
    showFirstLabel: false,
    labels: {
      style: {
        color: '#fff',
        fontSize: '.24rem'
      },
      formatter: function () {
        if (this.value <= 0) return ''
        return levelArray[this.value - 1].text
      },
      y: 30
    },
    gridLineWidth: 2
  },
  tooltip: {
    animation: true,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 4,
    headerFormat: '',
    pointFormat: '<span style="font-size: .24rem;">{point.text}</span>',
    footerFormat: ''
  },
  series: [{
    marker: {
      symbol: 'circle',
      fillColor: '#fff',
      lineColor: '#fff',
      lineWidth: 2,
      width: 0.5
    },
    data: []
  }, {
    data: []
  }]
}

// 食物列表
export const foodList = [{
  id: 'yecailei',
  name: '叶菜类',
  text: '以叶菜为主体的蔬菜类。例如：菠菜、白菜、西兰花'
}, {
  id: 'gaodianfenshucai',
  name: '高淀粉蔬菜',
  text: '主成分是淀粉的蔬菜，大部分是根茎类。例如：土豆、南瓜、芋头、薯类'
}, {
  id: 'gualei',
  name: '瓜类',
  text: '瓜类蔬菜。例如：黄瓜'
}, {
  id: 'luobo',
  name: '萝卜',
  text: '萝卜类蔬菜。例如：白萝卜、胡萝卜'
}, {
  id: 'gaoshengtangshuiguo',
  name: '高升糖水果',
  text: '消化后造成血糖上升速度较快的食物。例如：西瓜'
}, {
  id: 'zhongshengtangshuiguo',
  name: '中升糖水果',
  text: '消化后造成血糖上升速度中等的食物。例如：草莓'
}, {
  id: 'dishengtangshuiguo',
  name: '低升糖水果',
  text: '消化后造成血糖上升速度较慢的食物。例如：番石榴'
}, {
  id: 'gaozhifangshuiguo',
  name: '高脂肪水果',
  text: '脂肪含量高的水果。例如：牛油果、榴莲'
}, {
  id: 'gaozhirou',
  name: '高脂肉',
  text: '脂肪含量较高的肉类。例如：五花肉、培根、香肠、热狗'
}, {
  id: 'zhongzhirou',
  name: '中脂肉',
  text: '脂肪含量中等的肉类。例如：猪里脊肉、鸡蛋'
}, {
  id: 'dizhirou',
  name: '低脂肉',
  text: '脂肪含量较低的肉类。例如：鸡胸肉'
}, {
  id: 'naizhipin',
  name: '奶制品',
  text: '各种奶类或其制品。例如：牛奶'
}, {
  id: 'douzhipin',
  name: '豆制品',
  text: '黄豆加工制品。例如：豆腐、腐竹'
}, {
  id: 'doulei',
  name: '豆类',
  text: '各种杂豆类。例如：绿豆、红豆'
}, {
  id: 'guwuzaliang',
  name: '谷物杂粮',
  text: '各种杂粮类。例如：米、麦'
}, {
  id: 'jiagongguwu',
  name: '加工谷物',
  text: '各种谷物加工类食品。例如：面条、米粉、馒头'
}, {
  id: 'youzhilei',
  name: '油脂类',
  text: '以油脂为主的调味料。例如：大豆油、沙拉酱、鲜奶油'
}, {
  id: 'jianguolei',
  name: '坚果类',
  text: '各式坚果类。例如：南瓜子、核桃、芝麻'
}]
