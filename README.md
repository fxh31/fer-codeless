English | [中文](./README-zh-CN.md)

# Introduction

This project builds a dynamic form generator.

- Project architecture: pnpm + workspace
- Main development dependencies: vue3 + ant-design-vue

## Development Guide

### Project Structure

The main project structure is as follows:

```text
fer-codeless/
│
├── packages/
│ ├── core/ # Main component code
│ └── utils/ # Project utility functions
└── ...
```

The main code is in the core directory:

```text
core/
│
├── src/ # Source code directory
│ ├── components/ # Public components
│ │ ├── Container/
│ │ ├── Modal/
│ │ ├── Form/ # Defines form components (contains componentMap for form components)
│ │ ├── ...
│ │ └── Fer/ # Re-encapsulated drag-and-drop form components
│ ├── helper/ # Helper functions
│ │ ├── componentMap.ts # Defines basic properties of drag components
│ │ ├── render.ts # Renders drag components (renders based on componentMap in Form)
│ │ ├── rightPanel.ts # Right-side property configuration grouping (based on different components)
│ │ └── config # Drag component grouping (later used for property filtering, etc.)
│ ├── views/ # Page directory
│ │ ├── FormDesigner # Main form generator logic (main layout: left drag components + middle rendering components + right property configuration panel)
│ │ └── ...
└── ...
```

### Adding New Components

Files that need to be modified when custom adding components are as follows:

```text
core/
│
├── src/
│ ├── components/ # Write public or other global components here
│ │ ├── Container/
│ │ ├── Modal/
│ │ ├── Form/ # Define form components (contains componentMap for form components) Update form component mapping
│ │ ├── ...
│ │ └── Fer/ # Re-encapsulated form drag components
│ ├── helper/
│ │ ├── componentMap.ts # Add basic properties for corresponding drag components
│ │ ├── rightPanel.ts
│ │   ├── rightComponents #
│ │ └── config # Drag component grouping (later used for property filtering, etc.)
│ ├── views/
│ │ ├── FormDesigner # Form configuration logic
│ │ └── ...
└── ...
```

Rendering logic, structure, etc. can be modified as needed.
