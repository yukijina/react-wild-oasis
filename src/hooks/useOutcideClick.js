import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log('click outside');
          handler();
        }
      }

      // 3rd arg = true, event handling only in caputureing phase
      document.addEventListener('click', handleClick, listenCapturing);
      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler]
  );

  return ref;
}
