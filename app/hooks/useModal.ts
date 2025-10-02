export const useModal = (
  ModalId: string,
  CloseAnotherModal: string | undefined
) => {
  if (CloseAnotherModal) {
    (document.getElementById(CloseAnotherModal) as HTMLDialogElement).close();
  }
  (document.getElementById(ModalId) as HTMLDialogElement).show();
};
