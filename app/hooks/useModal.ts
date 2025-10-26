export const useModal = (ModalId: string, CloseAnotherModal?: string) => {
  if (CloseAnotherModal) {
    (document.getElementById(CloseAnotherModal) as HTMLDialogElement).close();
  }
  (document.getElementById(ModalId) as HTMLDialogElement).show();
};

export const closeModal = (ModalId: string) => {
  (document.getElementById(ModalId) as HTMLDialogElement).close();
};
