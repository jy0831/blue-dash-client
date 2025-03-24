<template>
  <WindowLayout></WindowLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import WindowLayout from './layouts/WindowLayout.vue';
onMounted(() => {
  console.log(window.electronAPI);
  
  window.electronAPI?.onUpdateChecking(() => {
    console.log('🔔 업데이트 체크 중')
  })

  window.electronAPI?.onUpdateAvailable(() => {
    console.log('🔔 업데이트 가능 알림 도착!')
  })

  window.electronAPI?.onUpdateNotAvailable(() => {
    console.log('🔔 최신버전임')
  })

  window.electronAPI?.onUpdateProgress((data) => {
    console.log('🔔 업데이트 진행중')
    console.log(data);
    
  })

  window.electronAPI?.onUpdateProgress((data) => {
    console.log('🔔 업데이트 실패')
    console.log(data);
  })

  window.electronAPI?.onUpdateDownloaded(() => {
    console.log('⬇️ 업데이트 다운로드 완료!')
  })
});
</script>

<style src="./assets/css/index.css">

</style>
