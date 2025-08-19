import type { ContextMenuItem } from '@/components/ContextMenu';
export type { ContextMenuItem };

import { onUnmounted, getCurrentInstance } from 'vue';
import { createContextMenu, destroyContextMenu } from '@/components/ContextMenu';
export function useContextMenu() {
  if (getCurrentInstance()) {
    onUnmounted(() => {
      destroyContextMenu();
    });
  }
  return [createContextMenu, destroyContextMenu];
}
