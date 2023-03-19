import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <main className="text-3xl font-bold underline uppercase">
        <h1>Hello world!</h1>
      </main>
    </>
  );
};

export default Home;
