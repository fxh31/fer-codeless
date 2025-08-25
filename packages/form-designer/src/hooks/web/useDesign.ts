export function useDesign(scope: string) {
  const values = {
    prefixCls: 'fer',
  };

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
