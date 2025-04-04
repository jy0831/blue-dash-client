<template>
    <div class="page-wrap">
      <div class="date-picker">
        <VueDatePicker 
          v-model="dateRange" 
          :range="{ maxRange: 31 }" 
          :enable-time-picker="false"
          :format="format"
          position="right"
          locale="ko"
          model-type="yyyy-MM-dd"
          @update:model-value="dateUpdate"
        />
      </div>
      <div class="date-type">
        <label>
          <span>일별</span>
          <input role="switch" type="checkbox" v-model="dateType" @update:model-value="dateUpdate" />
          <span>월별</span>
        </label>
        <label v-if="dateType">
          <span>합산</span>
          <input role="switch" type="checkbox" v-model="monthType" @update:model-value="dateUpdate" />
          <span>평균</span>
        </label>
      </div>
      <div class="page-dashboard">
        <div class="date-controll">
          <div class="date-prev"></div>
          <div class="date-curr"></div>
          <div class="date-next"></div>
        </div>
        <div id="main3" style="height: 100%; width: 100%;"></div>
      </div>
      <div style="display: flex; flex-direction: row; gap: 10px;">
        <div class="page-dashboard stream" id="stream">
            <div id="main2" style="height: 100%; width: 100%;"></div>
        </div>
        <div class="page-dashboard stream" id="stream">
            <div id="main1" style="height: 100%; width: 100%;"></div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, nextTick, markRaw  } from 'vue';
import * as echarts from 'echarts';

const option1 = reactive({
  title: {
    left: 'center',
    text: '블루점프 시청자 분포'
  },
  // grid: {
  //   top: '10%'
  // },
  tooltip: {
    trigger: 'item',
    position: function (point, params, dom, rect, size) {
      const x = point[0];
      const y = point[1];
      const tooltipWidth = size.contentSize[0];

      return [x + 10, y - 10]; // 마우스 오른쪽 10px 위치에 표시
    }
  },
  series: [
    {
      name: '시청자 수',
      type: 'pie',
      radius: '70%',
      center: ['50%', '55%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
const option2 = reactive({
  title: {
    left: 'center',
    text: '전체 시청자 분포'
  },
  tooltip: {
    trigger: 'item',
    position: function (point, params, dom, rect, size) {
      const x = point[0];
      const y = point[1];
      const tooltipWidth = size.contentSize[0];

      return [x + 10, y - 10]; // 마우스 오른쪽 10px 위치에 표시
    }
  },
  series: [
    {
      name: '시청자 수',
      type: 'pie',
      radius: '70%',
      center: ['50%', '55%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
const option3 = reactive({
  title: {
    left: 'center',
    text: '일일 시청자 통계',
    top: '5%'
  },
  height: '70%',
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => {
      return value ? `${value}명` : '휴방';
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
    top: '10px',
    right: '10px',
  },
  grid: {
    top: '25%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
    // data: ['2025-04-01', '2025-04-02', '2025-04-03']
  },
  yAxis: {
   type: 'value',
   
  },
  series: []
});
const domOption = {
  height: '100%',
}
/**
 * @param {Date} date 
 */
 const format = (date) => {
  const day = String(date[0].getDate()).padStart(2, '0');
  const month = String(date[0].getMonth() + 1).padStart(2, '0');
  const year = date[0].getFullYear();
  const front = `${year}-${month}-${day}`;

  if (!date[1]) {
    return front;
  }
  const day2 = String(date[1].getDate()).padStart(2, '0');
  const month2 = String(date[1].getMonth() + 1).padStart(2, '0');
  const year2 = date[1].getFullYear();
  const back = `${year2}-${month2}-${day2}`;

  return `${front} ~ ${back}`;
}

const curDate = new Date();
const dateRange = ref([format([new Date(curDate-(7*24*60*60*1000))]), format([curDate])]);
const myChart1 = ref();
const myChart2 = ref();
const myChart3 = ref();

const liveList = ref([]);
const viwerData = ref([]);
const viwersByStreamerMap = ref(new Map());
const rangeArr = ref([]);
const dateType = ref(false);
const monthType = ref(false);
const groupAndSum = (data) => {
  const grouped = new Map()
  data.forEach((item, key) => {
    const dataArr = new Map();
    if (!item) return;
    item.forEach(val => {
      const prev = dataArr.get(val.date) || 0
      dataArr.set(val.date, prev + val.value)
    });
    dataArr.forEach((val, date) => {
      const itemVal = monthType.value ? Math.round(val/item.length) : val;
      const streamer = grouped.get(key);
      if (streamer) {
        streamer.push({ date: date, value: itemVal});
        grouped.set(key, streamer)
      } else {
        grouped.set(key, [{ date: date, value: itemVal}])
      }
    })
  })
  console.log(grouped);
  
  return grouped; // [['2025-04-01', 250], ...]
}
const dateUpdate = async (e) => {
  console.log(e,dateType.value);
  const param = {
    start: dateRange.value[0],
    end: dateRange.value[1] ?? dateRange.value[0],
    type: dateType.value // false 일별  true: 월별별
  }
  await getViwerMatricsAPI(param);
  option3.series = [];
  if (!viwersByStreamerMap.value || viwersByStreamerMap.value.size == 0) {
    dataEmpty();
  } else {
    const dataArr = [];
    const parseData = dateType.value ? groupAndSum(viwersByStreamerMap.value) : viwersByStreamerMap.value;
    parseData.forEach((val, key) => {
      const dataMap = new Map(val.map(d => [d.date, d.value]));
      const parseData = rangeArr.value.map(date => dataMap.get(date) ?? null)
      dataArr.push({
        name: key,
        type: 'line',
        data: parseData,
        symbolSize: 7
      });
    });
    option3.series = dataArr;
  }
  myChart3.value.setOption(option3, true);
}
const getDateRangeByDay = (startDate, endDate) => {
  let result = []
  const start = startDate;
  const end = endDate;
  for (
    let d = new Date(start);
    d <= end;
    d.setDate(d.getDate() + 1)
  ) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    if (dateType.value) {
      result.push(`${yyyy}-${mm}`)
    } else {
      result.push(`${yyyy}-${mm}-${dd}`)
    }
  }
  console.log(result);
  
  return [... new Set(result)]
}

const getLiveDataAPI = async () => {
    const data = await window.electronAPI?.invoke('getData:Live');
    liveList.value = data;
}
const getViwerDataAPI = async () => {
    const data = await window.electronAPI?.invoke('getData:ViewersByStreamer');
    viwerData.value = data;
}
const getViwerMatricsAPI = async (range = null) => {
    const { parseDataArr, dateArr } = await window.electronAPI?.invoke('getData:ViewersMtricsByDate', range);
    viwersByStreamerMap.value = parseDataArr;
    rangeArr.value = getDateRangeByDay(dateArr[0].start, dateArr[0].end);
    option3.xAxis.data = rangeArr.value;
}
const dataEmpty = () => {
  const dumyOption = {
    xAxis: {
      trigger: 'category',
      data: []
    },
    series: [],
    graphic: {
      elements: [{
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: '데이터가 없습니다',
          fontSize: 18,
          fill: '#999'
        }
      }]
    }
  }
  // option3.xAxis.data = [];
  // option3.series = [];
  // option3.graphic = 
  myChart3.value.setOption(dumyOption, true);
}
onMounted(async () => {
    const param = {
      start: dateRange.value[0],
      end: dateRange.value[1] ?? dateRange.value[0],
      type: dateType.value // false 일별  true: 월별별
    }
    await getLiveDataAPI();
    await getViwerDataAPI();
    await getViwerMatricsAPI(param);

    const all = viwerData.value.shift();
    viwerData.value.forEach(item => {
      option1.series[0].data.push({
        value: item.count,
        name: item.MAIN_STREAM
      });
    });
    option2.series[0].data.push({
      value: all.count,
      name: all.MAIN_STREAM,
      itemStyle: {
        color: '#e1e1e1'
      }
    });
    const total = viwerData.value.reduce((sum, item) => sum + Number(item.count), 0);
    option2.series[0].data.push({
      value: total,
      name: '블루점프'
    });

    if (!viwersByStreamerMap.value || viwersByStreamerMap.value.size == 0) {
      dataEmpty();
    } else {
      const parseData = dateType.value ? groupAndSum(viwersByStreamerMap.value) : viwersByStreamerMap.value;
      console.log(parseData);
      
      parseData.forEach((val, key) => {
        const dataMap = new Map(val.map(d => [d.date, d.value]));
        const parseData = rangeArr.value.map(date => dataMap.get(date) ?? null)
        option3.series.push({
          name: key,
          type: 'line',
          data: parseData,
          symbolSize: 7
        });
      });
    }
    
    const chartDom1 = document.getElementById('main1');
    myChart1.value = echarts.init(chartDom1, domOption);
    myChart1.value.setOption(option1);

    const chartDom2 = document.getElementById('main2');
    myChart2.value = echarts.init(chartDom2, domOption);
    myChart2.value.setOption(option2);

    const chartDom3 = document.getElementById('main3');
    myChart3.value = markRaw(echarts.init(chartDom3, domOption));
    myChart3.value.setOption(option3);

    window.addEventListener('resize', () => {
      myChart1.value.resize();
      myChart2.value.resize();
      myChart3.value.resize();
    });
    window.addEventListener('side-bar-hide', () => {
      myChart1.value.resize();
      myChart2.value.resize();
      myChart3.value.resize();
    });
});

</script>

<style lang="scss" scoped>

.page-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.page-dashboard {
    width: 100%;
    height: 45vh;
    background-color: var(--cg--0_3);
    border: 1px solid var(--cg-0_7);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #00000010;
    &.stream {
        height: 35vh;
        width: 100%;
    }
}
.stream {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    padding: 10px;
    >div>img {
        height: 140px !important;
        border-radius: 10px;
        border: 1px solid #9c9c9c;
    }
}
.date-picker {
  position: absolute;
  padding: 10px;
  width: 250px;
  z-index: 1;
}
.date-type {
  position: absolute;
  padding: 15px;
  top: 55px;
  z-index: 1;
  >label {
    margin-right: 15px;
  }
}
label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  >span {
    text-wrap: nowrap;
  }
}

[type="checkbox"] {
  appearance: none;
  position: relative;
  border: max(2px, 0.1em) solid #7babd8;
  border-radius: 1.25em;
  width: 2.25em;
  height: 1.25em;
}

[type="checkbox"]::before {
  content: "";
  position: absolute;
  left: 0;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  transform: scale(0.8);
  background-color: #7babd8;
  transition: left 250ms linear;
}

[type="checkbox"]:checked {
  background-color: #7babd8;
  border-color: #7babd8;
}
[type="checkbox"]:checked::before {
  background-color: white;
  left: 1em;
}
</style>