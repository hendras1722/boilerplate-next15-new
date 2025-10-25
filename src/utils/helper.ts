import { useCallback, type RefCallback } from 'react';

/**
 * ref - Membuat reactive reference seperti Vue 3
 * Mirip ref() di Vue 3, tapi untuk React
 * 
 * @example
 * const count = ref(0);
 * count.value = 5; // set value
 * console.log(count.value); // get value
 */
export function ref<T>(initialValue?: T) {
  const state = { value: initialValue as T };
  
  return new Proxy(state, {
    get(target, prop) {
      if (prop === 'value') {
        return target.value;
      }
      return target[prop as keyof typeof target];
    },
    set(target, prop, newValue) {
      if (prop === 'value') {
        target.value = newValue;
        return true;
      }
      return false;
    }
  });
}

/**
 * reactive - Membuat reactive object seperti Vue 3
 * Mirip reactive() di Vue 3, tapi untuk React
 * 
 * @example
 * const state = reactive({ count: 0, name: 'John' });
 * state.count = 5; // langsung akses tanpa .value
 * console.log(state.name);
 */
export function reactive<T extends object>(obj: T): T {
  return new Proxy(obj, {
    get(target, prop) {
      return target[prop as keyof T];
    },
    set(target, prop, newValue) {
      (target as any)[prop] = newValue;
      return true;
    }
  });
}

/**
 * useTemplateRef - Mirip Vue 3 templateRef
 * Bisa langsung digunakan sebagai ref dan akses property tanpa .current
 * Compatible dengan React Server Components
 * 
 * @example
 * const input = useTemplateRef<HTMLInputElement>();
 * 
 * <input ref={input} />
 * 
 * // Akses langsung tanpa .current (tapi harus cek null dulu)
 * input.value?.focus();
 * input.value?.value;
 */
export function useTemplateRef<T = any>() {
  const elementRef = ref<T | null>(null);
  const proxyRef   = ref<any>(null);

  const refCallback: RefCallback<T> = useCallback((el: T | null) => {
    elementRef.value = el;
  }, [elementRef]);

  if (!proxyRef.value) {
    proxyRef.value = new Proxy(refCallback, {
      get(_, prop) {
        // Expose .value seperti Vue 3
        if (prop === 'value') {
          return elementRef.value;
        }
        
        // Akses property dari element
        const element = elementRef.value;
        if (element && typeof element === 'object' && prop in element) {
          const value = (element as any)[prop];
          return typeof value === 'function' ? value.bind(element) : value;
        }
        return undefined;
      },
      apply(_, _thisArg, args) {
        return refCallback.apply(null, args as [T | null]);
      }
    });
  }

  return proxyRef.value as { value: T | null } & RefCallback<T>;
}