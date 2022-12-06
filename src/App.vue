<!--
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2022-11-25 16:29:19
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-06 14:36:25
-->
<template>
  <canvas
    class="w-screen h-screen absolute top-0 left-0"
    ref="threeCanvas"
    @mousemove="mouseMove"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ThreeWork from "./three";
const threeCanvas = ref<HTMLCanvasElement>();
let threeWork: ThreeWork;
onMounted(() => {
  threeWork = new ThreeWork(threeCanvas.value);
});
const mouseMove = (event:MouseEvent)=>{
  threeWork.cameraControl(event.pageX,event.pageY)
}
</script>

<style scoped></style>
