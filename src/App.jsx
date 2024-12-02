import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Footer, Header } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <h1 className="font-extrabold text-9xl text-sky-400">Loading...</h1>
      </>
    );
  }
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main> {/* TODO: <Outlet /> */}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
