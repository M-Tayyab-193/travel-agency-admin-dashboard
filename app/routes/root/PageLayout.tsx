import React from "react";
import { logoutUser } from "../../appwrite/auth";
import { useNavigate } from "react-router";
const PageLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <button onClick={handleLogout} className="cursor-pointer">
        <img src="/assets/icons/logout.svg" alt="Logout" className="size-6" />
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Dashboard
      </button>
    </div>
  );
};

export default PageLayout;
