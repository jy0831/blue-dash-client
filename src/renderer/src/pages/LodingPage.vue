<template>
    <WindowHeader></WindowHeader>
    <div class="ld-wrap">
        <div class="ld-desc" v-html="getStatus()">
        </div>
        <!-- <div class="ld-desc">
            {{ getStatus() }}
        </div> -->
        <div>
            <Spinner></Spinner>
        </div>
        <div>
            <div class="progress">
                <div class="percent">{{ props.data?.percent + "/" + 100 }}</div>
                <div class="bar" :style="{ width: props.data?.percent + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Spinner from '../components/Spinner.vue'
import WindowHeader from '../layouts/WindowHeader.vue'

const props = defineProps(['status', 'data']);

const status = {
    check: '업데이트를 확인중 입니다.',
    avail: '업데이트 가능한 최신버전이 있습니다 </br>업데이트를 진행합니다.',
    notAvail: '최신버전입니다.',
    progress: '업데이트 가능한 최신버전이 있습니다 </br>업데이트를 진행합니다.',
    downloaded: '업데이트가 완료되었습니다.',
    error: '업데이트중 문제가 발생하였습니다 </br> 관리자에세 문의 부탁드립니다.',
    dev: '개발환경 업데이트 스킵'
}
const getStatus = () => {
    return status[props.status] ?? status['check'];
}
</script>

<style lang="scss" scoped>
.progress {
    width: 800px;
    text-align: center;
    position: relative;
    height: 20px;
    background-color: rgb(223, 223, 223);
    border: 2px solid rgb(201, 201, 201);
    border-radius: 15px;
    >.bar {
        height: 100%;
        background-color: #4ca8ff;
        border-radius: 15px;
    }
    >.percent {
        position: absolute; 
        left: calc(50% - 30px); 
        width: 60px;
        font-weight: 700;
    }
}
.ld-wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: calc(100% - 130px);
    gap: 20px;
    
}
.ld-desc {
    font-size: 28px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    height: 70px;
}
</style>