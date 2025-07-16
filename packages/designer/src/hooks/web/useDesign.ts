export function useDesign(scope: string) {
  const values = 'fer';

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
