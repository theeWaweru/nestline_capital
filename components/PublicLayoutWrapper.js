// components/PublicLayoutWrapper.js
import Footer from "./footer";
import Menu from "./menu";

export default function PublicLayoutWrapper({ children }) {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
}
