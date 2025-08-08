import { openWindow } from '..';

type TargetContext = '_self' | '_blank';

/**
 * 根据地址下载文件
 */
export function downloadByUrl({ url, target = '_blank', fileName }: { url: string; target?: TargetContext; fileName?: string }): boolean {
  if (!url) return false;

  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  const isFirefox = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  // 判断 url 是否是相对路径，并且是 base64 的 URL 格式，如果是则加上全局配置的 apiUrl 的前缀
  // if (!/https?:\/\//.test(url) && url.indexOf('data:image/png;base64') < 0) url = apiUrl + url;

  // 为下载URL添加文件名参数（使用 encodeURIComponent 编码避免中文 URL 解析错误）
  if (fileName && url.indexOf('data:image/png;base64') < 0 && url.indexOf('&name=') < 0 && url.indexOf('?name=') < 0) {
    url = url + (url.indexOf('?') > -1 ? `&name=${encodeURIComponent(fileName)}` : `?name=${encodeURIComponent(fileName)}`);
  }
  // 排除 ios 设备（iPhone/iPad）- 其限制太多
  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return false;
  }
  // 利用 a 标签的下载属性（download）实现下载
  if (isChrome || isSafari || isFirefox) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || '';
    // 触发点击事件
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  // 兼容性处理：如果没有 download 则手动添加
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  // 直接打开
  openWindow(url, { target });
  return true;
}
