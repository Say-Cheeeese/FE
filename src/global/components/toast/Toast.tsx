import React from 'react';
import { createRoot, Root } from 'react-dom/client';

const TOAST_CONTAINER_ID = '__toast-container';

// HTMLElement에 커스텀 프로퍼티 하나 더 붙여서 root 저장
interface ToastContainerElement extends HTMLElement {
  __root?: Root;
}

const getContainer = (id: string): ToastContainerElement => {
  let toastContainer = document.getElementById(
    id,
  ) as ToastContainerElement | null;

  if (!toastContainer) {
    toastContainer = document.createElement('div') as ToastContainerElement;
    toastContainer.id = id;
    toastContainer.style.display = 'flex';
    toastContainer.style.justifyContent = 'center';
    document.body.appendChild(toastContainer);
  }

  return toastContainer;
};

const renderToast = (
  component: React.ReactNode,
  container: ToastContainerElement,
): void => {
  // 이미 root가 있으면 그거 쓰고, 없으면 새로 만든다
  if (!container.__root) {
    container.__root = createRoot(container);
  }

  container.__root.render(component);
};

const unmountToast = (
  toastContainer: ToastContainerElement,
  ms = 3000,
): void => {
  setTimeout(() => {
    // 만들어둔 root가 있으면 그걸로 언마운트
    toastContainer.__root?.unmount();
    toastContainer.remove();
  }, ms);
};

const Toast = {
  alert: async (message: string): Promise<void> => {
    const toastContainer = getContainer(TOAST_CONTAINER_ID);

    const { default: ToastView } = await import('./ToastView');

    renderToast(<ToastView message={message} />, toastContainer);
    unmountToast(toastContainer);
  },
};

export default Toast;
