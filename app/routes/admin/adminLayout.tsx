import React from "react";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavItems, MobileSidebar } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");
    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === "user") {
      return redirect("/sign-in");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error in clientLoader:", e);
    return redirect("/sign-in");
  }
}
export function HydrateFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <span className="max-sm:w-12 max-sm:h-12 w-16 h-16 rounded-full border-1 border-t-5 border-b-5 border-blue-600 animate-spin" />
    </div>
  );
}

clientLoader.hydrate = true as const;

const adminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <div className="w-full h-full">
            <NavItems />
          </div>
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default adminLayout;
