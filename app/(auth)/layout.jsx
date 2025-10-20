import Header from "../(home)/_components/Header";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
