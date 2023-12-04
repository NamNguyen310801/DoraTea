import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { NewsMain, NewsSide } from "./components";
export default function News() {
  return (
    <>
      <Header />
      <main className="container relative mx-auto pt-16 bg-slate-100 mt-10 min-h-[calc(100vh)] px-2 md:px-0 flex">
        <NewsSide />
        <NewsMain />
      </main>
      <Footer />
    </>
  );
}
