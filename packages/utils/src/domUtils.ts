/* istanbul ignore next */
export function on(element: Element | HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

/* istanbul ignore next */
export function off(element: Element | HTMLElement | Document | Window, event: string, handler: Fn): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
}
