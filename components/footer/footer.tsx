function Footer() {
  return (
    // <footer className="footer-h flex justify-center items-center shadow-md bg-gray-300 dark:bg-black">
    <footer className="footer-h flex justify-end items-end p-2">
      {/* FIXME: 끝나는 날짜 포함시키기 */}
      <p className="text-sm text-muted-foreground">
        Copyright © 2024.4 ~ - All right reserved by <b>Team Jak Dang Moi</b>
      </p>
    </footer>
  );
}

export default Footer;
