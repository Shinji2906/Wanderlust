import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col relative">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <ChatWidget />
  </div>
);

export default Layout;
