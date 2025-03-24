<template>
    <header>
        <div class="wh-info">
            <img src="../assets/icons/bluejump.svg" alt="">
            BlueJump
        </div>
        <div class="wh-btn-gorup" @click.stop="minWindow">
            <div class="wh-btn">
                <img src="../assets/icons/minus.svg" alt="" style="height: 20px; width: 20px;">
            </div>
            <div class="wh-btn" @click.stop="maxWindow">
                <img v-if="!isMaximize" src="../assets/icons/square.svg" alt="" style="height: 16px; width: 16px;">
                <img v-else src="../assets/icons/layers.png" alt="" style="height: 16px; width: 16px;"> 
            </div>
            <div class="wh-btn" @click.stop="close">
                <img src="../assets/icons/close.svg" alt="" style="height: 20px; width: 20px;">
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isMaximize = ref(false);
const close = () => {
    window.close();
}
const maxWindow = () => {
    if (isMaximize.value) {
        window.electronAPI?.send('unmax-window');
        isMaximize.value = false;
    } else {
        window.electronAPI?.send('max-window');
        isMaximize.value = true;
    }
}
const minWindow = () => {
    window.electronAPI?.send('min-window');
}
</script>

<style lang="scss" scoped>

header {
    width: 100%;
    -webkit-app-region: drag;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.wh-btn-gorup {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
}
.wh-info {
    display: flex;
    align-items: center;
    padding-inline: 10px;
    gap: 5px;
    font-family: Interop;
    font-weight: 500;
    >img {
        width: 20px;
        height: 20px;
    }
}
.wh-btn {
    padding-block: 5px;
    padding-inline: 12px;
    -webkit-app-region: no-drag;
    display: flex;
    align-items: center;
}
.wh-btn:hover {
    background-color: rgba(0, 0, 0, 0.075);
}

</style>