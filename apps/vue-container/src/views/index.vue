<template>
  <Layout>
    <LayoutHeader :style="{ position: 'fixed', zIndex: 1, width: '100%', height: '55px', background: '#fff', paddingInline: '10px' }">
      <div class="logo" />
      <Menu v-model:selectedKeys="selectedKeys" :items="selectedMenuList" @click="handleClick" mode="horizontal" :style="{ lineHeight: '55px' }"> </Menu>
    </LayoutHeader>

    <LayoutContent :style="{ height: 'calc(100vh - 45px)', marginTop: '55px' }">
      <router-view />
    </LayoutContent>
    <LayoutFooter :style="{ textAlign: 'center', height: '45px', lineHeight: '6px' }"> Fer Codeless ©2025 Created by ferhannah</LayoutFooter>
  </Layout>
</template>
<script lang="ts" setup>
  import { ref, onMounted, h } from 'vue';
  import { useRouter } from 'vue-router';
  import { Breadcrumb, LayoutHeader, Menu, MenuItem, LayoutContent, Layout, LayoutSider, LayoutFooter } from 'ant-design-vue';
  import { FormOutlined, FileTextOutlined } from '@ant-design/icons-vue';
  const selectedKeys = ref<string[]>(['form-designer']);
  const selectedMenuList = ref<string[]>([
    {
      key: 'form-designer',
      label: '表单设计器',
    },
    {
      key: 'external-link',
      label: 'Ant Design Vue',
    },
  ]);

  const router = useRouter();

  function computedPath(path: string): string {
    return '/' + path;
  }

  function handleClick(item) {
    const path = computedPath(item.key);
    router.push(path);
  }
  function loadApp() {
    const path = computedPath(selectedKeys.value[0]);
    router.push(path);
  }

  onMounted(() => {
    loadApp();
  });
</script>
<style scoped>
  .logo {
    width: 40px;
    height: 40px;
    background-color: #1677ff;
    position: relative;
    margin: 8px 0 8px 0;
    float: left;
  }

  .logo::before,
  .logo::after {
    content: '';
    position: absolute;
    background-color: white;
  }

  /* Horizontal bar of F */
  .logo::before {
    top: 12px;
    left: 8px;
    width: 24px;
    height: 4px;
  }

  /* Vertical bar of F */
  .logo::after {
    top: 12px;
    left: 8px;
    width: 4px;
    height: 16px;
  }
</style>
