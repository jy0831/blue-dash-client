<template>
    <WindowHeader></WindowHeader>
    <div class="window-body">
        <div 
            class="side-bar" 
            :class="isHide ? 'hide' : ''"
            @transitionend.stop="test2($event)"
        >
            <div class="side-btn" @click="test">
                {{ isHide ? '>>' : '<<' }}
            </div>
            <div class="side-item">
                <img src="../assets/vue.svg" alt="">
                <div v-if="isVisibleText">대쉬보드</div>
            </div>
            <div class="side-item">
                <img src="../assets/vue.svg" alt="">
                <div v-if="isVisibleText">테스트</div>
            </div>
        </div>
        <router-view :key="route.path"></router-view>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import WindowHeader from './WindowHeader.vue';
import { ref } from 'vue';
const route = useRoute();
const isHide = ref(false);
const isVisibleText = ref(false);
const test = (e) => {
    isHide.value = !isHide.value;
}
const test2 = (e) => {
    console.log('event', e);
    
    if (!isHide.value) {
        isVisibleText.value = true;
    }
    e.stopPropagation();
    
}
</script>

<style lang="scss" scoped>
.window-body {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: calc(100% - 31px);
    overflow-y: auto;
}
.side-bar {
    background-color: rgb(127, 245, 205);
    height: 100%;
    width: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 2px;
    transition: all 0.5s;
}
.side-bar.hide {
    width: 50px;
    >.side-item>div {
        display: none;
    }
}
.side-item {
    width: calc(100% - 10px);
    padding-block: 12px;
    font: 20px bold;
    padding-left: 10px;
    transition: all .25s;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    >img {
        width: 25px;
        height: 25px;
    }
}
.side-item:hover {
    background-color: rgb(105, 202, 170);
}
.side-btn {
    top: 0px;
    right: 0px;
    padding-top: 5px;
    padding-inline: 12px;
    cursor: pointer;
    display: flex;
    justify-content: flex-end
}
</style>