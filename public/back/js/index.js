$(function () {
  //初始化
  var echarts_left  = echarts.init(document.querySelector('.echarts_left '));
var option1 = {
  title: {
    //标题文本
    text:'2019注册人数',
  },
  //图例，图例一定要和数据项的name 一一对应
  legend: {
    data:['销量','人数']
  },
  //提示框组件
  tooltip: {},
  dataset: {
      source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
      ]
  },
  xAxis: {
     data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
      {
      name: '销量',
      type: 'bar',   // bar 柱状图   line 折线图   pie  饼图
      data: [1000, 200, 360, 200, 180, 400]},
      { name: '人数',
      type: 'bar',
      data: [500, 800, 460, 180, 880, 1200]},
    
  ]
};
echarts_left.setOption(option1);

//基于准备好的dom,初始化echarts 实例
var echarts_right = echarts.init(document.querySelector('.echarts_right'));

var option2 = {
  // 大标题
  title : {
    //标题文本
      text: '热门品牌销售',
      //副标题文本
      subtext: '2019年2月',
      //控制水平方向位置
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      //专门配置提示框组件的内容
      //{a}{系列名称}  {b}数据项名称 ， {c}(数值)， {d}(百分比)
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  //图例
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '老北京', '老奶奶', '回力']
  },
  series : [
      {
          name: '访问来源',//系列名称
          type: 'pie',//饼图
          radius : '55%',//控制圆的大小
          center: ['50%', '60%'],//控制圆心坐标
          data:[
            { value: 335, name: '耐克' },   // 数据项名称
            { value: 310, name: '阿迪' },
            { value: 234, name: '老北京' },
            { value: 135, name: '老奶奶' },
            { value: 1548, name: '回力' }
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};
// 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option2);
});
