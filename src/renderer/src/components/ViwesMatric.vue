<template>
    <div class="date-picker">
        <VueDatePicker
          v-if="!dateType"
          v-model="dateRange"
          range
          :enable-time-picker="false"
          :format="format"
          position="right"
          locale="ko"
          :model-type="dateType ? 'yyyy-MM' : 'yyyy-MM-dd'"
          @update:model-value="dateUpdate"
        />
        <VueDatePicker
          v-else
          v-model="monthRange"
          range
          :enable-time-picker="false"
          :format="format"
          position="right"
          locale="ko"
          :model-type="'yyyy-MM'"
          month-picker
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
    <div id="main3" style="height: 100%; width: 100%;">
    </div>
    <!-- <Spinner class="loading"></Spinner> -->
    <img class="reload" @click="reload" src="../assets/icons/restart_alt.svg" alt="">
</template>

<script setup>
import { onMounted, reactive, ref, markRaw, defineProps, watch  } from 'vue';
import * as echarts from 'echarts';
import Spinner from './Spinner.vue'

const props = defineProps(['matricType']);
const option3 = reactive({
  title: {
    left: 'center',
    text: props.matricType ? '일일 시청자 통계' : '일일 고정 시청자 통계',
    top: '5%'
  },
  height: '70%',
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => {
      return value ? `${value}명` : '휴방';
    }
  },
  legend: {
    show: true,         // 생략 시 기본 true
    top: 'bottom',         // 또는 'bottom', 'left', 'right', 픽셀값/백분율도 가능
    left: 'center',     // 가운데 정렬
    orient: 'horizontal', // 또는 'vertical'
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      myRefresh: {
        show: true,
        title: '새로고침',
        icon: 'circle', // or use built-in shape like 'circle'
        onclick: () => {
            dateUpdate();
        }
      }
    },
    top: '10px',
    right: '10px',
  },
  grid: {
    top: '25%',
    left: '3%',
    right: '4%',
    bottom: '80',
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
const dateType = ref(false);

watch(props, () => {
    dateUpdate();
});
/**
 * @param {Date} date 
 */
 const format = (date, type=false) => {
  if (!date) {
    return '';
  }
  const date1 = new Date(date[0]);
  const day = String(date1.getDate()).padStart(2, '0');
  const month = String(date1.getMonth() + 1).padStart(2, '0');
  const year = date1.getFullYear();
  
  const date2 = new Date(date[1]);
  const day2 = String(date2.getDate()).padStart(2, '0');
  const month2 = String(date2.getMonth() + 1).padStart(2, '0');
  const year2 = date2.getFullYear();

  let front;
  let back;
  if (dateType.value || type) {
    front = `${year}-${month}`;
    back = `${year2}-${month2}`;
  } else {
    front = `${year}-${month}-${day}`;
    back = `${year2}-${month2}-${day2}`;
  }
  if (!date[1]) {
    return front;
  }
  return `${front} ~ ${back}`;
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
  return [... new Set(result)]
}
const viwersByStreamerMap = ref(new Map());
const rangeArr = ref([]);

const myChart3 = ref();
const curDate = new Date();
const dateRange = ref([format([new Date(curDate-(7*24*60*60*1000))]), format([curDate])]);
const monthRange = ref([format([new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1)], true), format([curDate], true)]);

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
  return grouped; // [['2025-04-01', 250], ...]
}
const dateUpdate = async (e) => {
  if (!myChart3.value) {
    const chartDom3 = document.getElementById('main3');
    myChart3.value = markRaw(echarts.init(chartDom3, { height: '100%' }));
  }
  const dateParam = dateType.value ? monthRange.value : dateRange.value;
  
  const param = {
    start: dateParam[0],
    end: dateParam[1] ?? dateParam[0],
    type: dateType.value, // false 일별  true: 월별
    matricType: props.matricType
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
  if (props.matricType) {
    option3.title.text = '일일 총 시청자 통계';
  } else {
    option3.title.text = '일일 고정 시청자 통계';
  }
  myChart3.value.setOption(option3, true);
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
  myChart3.value.setOption(dumyOption, true);
}

const getViwerMatricsAPI = async (range = null) => {
    const { parseDataArr, dateArr } = await window.electronAPI?.invoke('getData:ViewersMtricsByDate', range);
    viwersByStreamerMap.value = parseDataArr;
    
    rangeArr.value = getDateRangeByDay(dateArr[0].start, dateArr[0].end);
    option3.xAxis.data = rangeArr.value;
    // option3.legend.data = parseDataArr.keys();
}
const reload = () => {
  myChart3.value.clear();
  dateUpdate();
}
onMounted(async () => {
    const param = {
      start: dateRange.value[0],
      end: dateRange.value[1] ?? dateRange.value[0],
      type: dateType.value, // false 일별  true: 월별별
      matricType: props.matricType
    }
    
    await getViwerMatricsAPI(param);

    if (!viwersByStreamerMap.value || viwersByStreamerMap.value.size == 0) {
      dataEmpty();
    } else {
      const parseData = dateType.value ? groupAndSum(viwersByStreamerMap.value) : viwersByStreamerMap.value;
      
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

    const chartDom3 = document.getElementById('main3');
    myChart3.value = markRaw(echarts.init(chartDom3, { height: '100%' }));
    myChart3.value.setOption(option3);

    window.addEventListener('resize', () => {
      myChart3.value.resize();
    });
    window.addEventListener('side-bar-hide', () => {
      myChart3.value.resize();
    });
    
});
</script>

<style lang="scss" scoped>
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
.date-picker {
  position: absolute;
  padding: 10px;
  width: 250px;
  z-index: 5;
}
.date-type {
  position: absolute;
  padding: 15px;
  top: 35px;
  z-index: 2;
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
.reload {
    position: absolute;
    right: 70px;
    top: 14px;
    cursor: pointer;
    &:hover {
      background-color: var(--cg-0_7);
      border-radius: 5px;
      transition: all .15s;
    }
}
.loading {
  z-index: 10;
  // left: 50%;
  // top: 50%;
  top: -65%;
}
</style>