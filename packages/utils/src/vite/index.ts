type ProxyItem = [string, string];
type ProxyList = ProxyItem[];

const httpsRE = /^https:\/\//;

// 处理 vite 配置代理
export function createProxy(list: ProxyList = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
