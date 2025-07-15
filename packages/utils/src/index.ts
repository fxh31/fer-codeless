export const withInstall = (component, alias?: string) => {
  (component as Record<string, unknown>).install = app => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component;
};
