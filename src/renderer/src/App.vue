<template>
  <WindowLayout v-if="isUpdated"></WindowLayout>
  <LodingPage :status="updateStat" :data="progressData" v-else></LodingPage>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import WindowLayout from './layouts/WindowLayout.vue';
import LodingPage from './pages/LodingPage.vue'
const isUpdated = ref(false);
const updateStat = ref('');
const progressData = ref({});
onMounted(() => {
  console.log(window.electronAPI);
  
  // progressData.value = {
  //   transferred: 50,
  //   total: 100
  // }
  progressData.value.percent = 0;
  console.log();
  if (__ENV.NODE_ENV == 'dev') {
    updateStat.value = 'dev';
    progressData.value.percent = 100;
    setTimeout(() => {
      isUpdated.value = true;
    },1500);
  }
  window.electronAPI?.onUpdateChecking(() => {
    console.log('🔔 업데이트 체크 중')
    updateStat.value = 'check';
  })

  window.electronAPI?.onUpdateAvailable(() => {
    console.log('🔔 업데이트 가능 알림 도착!')
    updateStat.value = 'avail';
  })

  window.electronAPI?.onUpdateNotAvailable(() => {
    console.log('🔔 최신버전임')
    updateStat.value = 'notAvail';
    progressData.value.percent = 100;
    setTimeout(() => {
      isUpdated.value = true;
    },1500);
  })

  window.electronAPI?.onUpdateProgress((data) => {
    console.log('🔔 업데이트 진행중')
    updateStat.value = 'progress';
    progressData.value = data;
  })

  window.electronAPI?.onUpdateError((data) => {
    console.log('🔔 업데이트 실패')
    updateStat.value = 'error';
    // setTimeout(() => {
    //   isUpdated.value = true;
    // },3000);
  })

  window.electronAPI?.onUpdateDownloaded(() => {
    console.log('⬇️ 업데이트 다운로드 완료!')
    updateStat.value = 'downloaded';
    progressData.value.percent = 100;
    setTimeout(() => {
      isUpdated.value = true;
    },1500);
  })
});
</script>

<style src="./assets/css/index.css">

</style>
