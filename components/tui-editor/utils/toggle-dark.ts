export const toggleDark = () => {
  const el = document.querySelector(".toastui-editor-defaultUI");

  if (el) {
    if (el.classList.contains("toastui-editor-dark")) {
      el.classList.remove("toastui-editor-dark");
    } else {
      el.classList.add("toastui-editor-dark");
    }
  }
};
