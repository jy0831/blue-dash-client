<template>
    <div class="page-wrap">
      <div class="page-dashboard-tabs">
        <div class="tab" @click="selectMatricType(true)" :class="{ selected: matricType }">총 시청자</div>
        <div class="tab" @click="selectMatricType(false)" :class="{ selected: !matricType }">고정 시청자</div>
      </div>
      <div class="page-dashboard">
        <ViwesMatric :matricType="matricType"></ViwesMatric>
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
import { onMounted, reactive, ref, markRaw, computed  } from 'vue';
import * as echarts from 'echarts';
import ViwesMatric from '../components/ViwesMatric.vue'

const matricType = ref(true);

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

const domOption = {
  height: '100%',
}

const myChart1 = ref();
const myChart2 = ref();

const liveList = ref([]);
const viwerData = ref([]);


const getLiveDataAPI = async () => {
    const data = await window.electronAPI?.invoke('getData:Live');
    liveList.value = data;
}
const getViwerDataAPI = async () => {
    const data = await window.electronAPI?.invoke('getData:ViewersByStreamer');
    viwerData.value = data;
}
const selectMatricType = (type) => {
  matricType.value = type;
}
onMounted(async () => {
    await getLiveDataAPI();
    await getViwerDataAPI();
    console.log(viwerData.value);
    
    const all = viwerData.value.shift();
    console.log(all);
    
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
    
    const chartDom1 = document.getElementById('main1');
    myChart1.value = echarts.init(chartDom1, domOption);
    myChart1.value.setOption(option1);

    const chartDom2 = document.getElementById('main2');
    myChart2.value = echarts.init(chartDom2, domOption);
    myChart2.value.setOption(option2);

    window.addEventListener('resize', () => {
      myChart1.value.resize();
      myChart2.value.resize();
    });
    window.addEventListener('side-bar-hide', () => {
      myChart1.value.resize();
      myChart2.value.resize();
    });
});

</script>

<style lang="scss" scoped>

.page-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
}
.page-dashboard {
    width: 100%;
    height: 47vh;
    background-color: var(--cg--0_3);
    border: 1px solid var(--cg-0_7);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #00000010;
    position: relative;
    &.stream {
        height: 35vh;
        width: 100%;
    }
}
.stream {
    
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    padding: 10px;
    z-index: 1;
    >div>img {
        height: 140px !important;
        border-radius: 10px;
        border: 1px solid #9c9c9c;
    }
}
.page-dashboard-tabs {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  top: 5px;
  padding-inline: 5px;
  >.tab {
    transition: all .25s;
    background-color: var(--cg-1_8);
    border-top: 1px solid var(--cg-1);
    border-inline: 1px solid var(--cg-1);
    border-radius:  10px 10px 0px 0px;
    padding-inline: 8px;
    padding-block: 3px;
    cursor: pointer;
    &.selected {
      z-index: 2;
      background-color: var(--cg--0_3);
    }
  }
}

</style>