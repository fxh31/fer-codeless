# 简介

本项目构建一个动态表单生成器。

- 项目架构：pnpm + workspace
- 主要开发依赖：vue3 + ant-design-vue

## 开发指南

### 项目结构

主要项目结构如下：

```text
fer-codeless/
│
├── packages/
│ ├── core/ # 主要组件代码
│ └── utils/ # 项目工具函数
└── ...
```

主要代码在 core 目录下：

```text
core/
│
├── src/ # 源代码目录
│ ├── components/ # 公共组件
│ │ ├── Container/
│ │ ├── Modal/
│ │ ├── Form/ # 定义表单组件（内含表单组件的 componentMap）
│ │ ├── ...
│ │ └── Fer/ # 二次封装的拖拽表单类组件
│ ├── hepler/ # 帮助函数
│ │ ├── componentMap.ts # 定义拖拽组件的基本属性
│ │ ├── render.ts # 渲染拖拽组件（根据 Form 中的 componentMap 渲染）
│ │ ├── rightPanel.ts # 右侧属性配置分组（根据不同的组件）
│ │ └── config # 拖拽组件分组（后续根据该分组进行属性的过滤等）
│ ├── views/ # 页面目录
│ │ ├── FormDesigner # 主要的表单生成器逻辑（主要布局为：左侧拖拽组件 + 中间渲染组件 + 右侧属性配置面板）
│ │ └── ...
└── ...
```

### 添加新的组件

自定义添加组件所需要修改的文件如下：

```text
core/
│
├── src/
│ ├── components/ # 在此编写公共或其他全局组件
│ │ ├── Container/
│ │ ├── Modal/
│ │ ├── Form/ # 定义表单组件（内含表单组件的 componentMap）更新表单组件映射
│ │ ├── ...
│ │ └── Fer/ # 二次封装表单拖拽组件
│ ├── hepler/
│ │ ├── componentMap.ts # 新增对应拖拽组件的基本属性
│ │ ├── rightPanel.ts
│ │   ├── rightComponents #
│ │ └── config # 拖拽组件分组（后续根据该分组进行属性的过滤等）
│ ├── views/
│ │ ├── FormDesigner # 表单配置逻辑
│ │ └── ...
└── ...
```

根据需求可修改渲染逻辑，结构等。
