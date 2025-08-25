<template>
  <!-- <DesignCom /> -->
  <canvas ref="canvasRef" width="500" height="500"></canvas>
</template>
<script lang="ts" setup>
  import { defineAsyncComponent, ref, onMounted } from 'vue';

  // 使用异步组件加载，确保 setup 函数都已经加载执行完毕，导出的变量已经赋值
  const DesignCom = defineAsyncComponent(() => import('./views/index.vue'));

  const canvasRef = ref<HTMLCanvasElement | null>(null);

  onMounted(() => {
    const ctx = canvasRef.value.getContext('2d');
    // Create your Path2D object
    const path = new Path2D();
    path.moveTo(50, 50);
    path.lineTo(150, 50);
    path.lineTo(100, 150);
    path.closePath();

    // Draw the path
    ctx.strokeStyle = 'black';
    ctx.stroke(path);
  });
</script>
<style lang="less"></style>
