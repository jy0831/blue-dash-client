<template>
    <div class="page-body">
        <div class="search-group">
            <input type="date" name="" id="" v-model="date">
            <button @click="getDataByDate" style="margin-inline: 10px;">조회</button>
        </div>
        <div class="result-list">
            <div v-for="item of result" :key="item" class="result-parent">
                <div>이름: {{ item.NAME }}</div>
                <div>ㄴ 총 시청자: {{ String(item.VIWERS).replace('n', '') }}명 / 시청시간: {{ formatNumber(item.VT) }}</div>
                <div>ㄴ 고정 시청자: {{ String(item.STATIC_VIWERS).replace('n', '') }}명 / 시청시간: {{ formatNumber(item.STATIC_VT) }}</div>
                <div>ㄴ 방송일: {{ new Date(item.BROADCAST_DATE).toLocaleDateString() }}</div>
                <div>- 공유하는 시청자</div>
                <div v-for="node of item.SHARE_VIERS" :key="node" class="pl-20">
                    <div>- {{ node.STREAMER_NAME }}</div>
                    <div class="pl-20">
                        <div>ㄴ 총 시청자: {{ String(node.VIWERS).replace('n', '') }}명 / 시청시간: {{ formatNumber(node.VIWERS_VT) }}</div>
                        <div>ㄴ 고정 시청자: {{ String(node.STATIC).replace('n', '') }}명 / 시청시간: {{ formatNumber(node.STATIC_VT) }}</div>
                    </div>
                </div>
                ---------------------------------------------------------------------------------
            </div>
        </div>
    </div>
    <div class="page-loder" v-if="isLoading">
        <Spinner></Spinner>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Spinner from '../components/Spinner.vue'

const date = ref('');
const result = ref();
const isLoading = ref(false);
const getDataByDate = async () => {
    console.log(date.value);
    isLoading.value = true;
    result.value = await window.electronAPI?.invoke('getData:date',date.value);
    isLoading.value = false;
    console.log(result.value);
}
const parseTime = (minit) => {
    const hours = Math.floor(minit / 60);
    const mins = minit % 60;
    let result = '';
    if (hours > 0) result += `${hours}시간 `;
    result += `${mins}분`;
    return result.trim();
}
const formatNumber = (num) => {
  return Number(num).toLocaleString('ko-KR')+'분';
}
</script>

<style lang="scss" scoped>
.result-parent {
    >* {
        padding-block: 2px;
    }
}
.pl-20 {
    padding-left: 20px;
}
.result-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.search-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.page-loder {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    top: 0px;
}
</style>