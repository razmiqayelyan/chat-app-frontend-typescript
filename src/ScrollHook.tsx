import { useEffect, useRef } from 'react'
import { messageType } from './types/messageType';

export function useChatScroll(dep : messageType[] | undefined){
  const ref = useRef<HTMLElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}