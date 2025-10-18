'use client';

import Modal, { type ModalRef } from "@/components/modal";
import { removeSingleton, useSingleton } from "@/utils/useSingleton";


export async function useModalSingleton(): Promise<ModalRef> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const modal = await useSingleton<ModalRef>(Modal);
  return modal;
}

export async function removeModalSingleton(): Promise<void> {
  return await removeSingleton(Modal);
}
