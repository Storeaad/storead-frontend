export const toggleDark = (isDark: boolean) => {
  const el = document.querySelector(".toastui-editor-defaultUI");

  if (el) {
    if (isDark) {
      el.classList.add("toastui-editor-dark");
    }
    else {
      el.classList.remove("toastui-editor-dark");
    }
  }
};
