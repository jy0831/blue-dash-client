<template>
    <div class="page-body">
        <div class="search-group">
            <input type="date" name="" id="" v-model="date">
            <button @click="getDataByDate" style="margin-inline: 10px;">조회</button>
        </div>
        <div class="result-list">
            <div v-for="item of result" :key="item">
                <div>이름: {{ item.NAME }}</div>
                <div>ㄴ 총 시청자: {{ String(item.VIWERS).replace('n', '') }}명</div>
                <div>ㄴ 고정 시청자: {{ String(item.STATIC_VIWERS).replace('n', '') }}명</div>
                <div>ㄴ 방송일: {{ new Date(item.BROADCAST_DATE).toLocaleDateString() }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const date = ref('');
const result = ref();
const getDataByDate = async () => {
    console.log(date.value);
    
    result.value = await window.electronAPI?.invoke('getData:date',date.value);
    console.log(result.value);
    
}
</script>

<style lang="scss" scoped>
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
</style>