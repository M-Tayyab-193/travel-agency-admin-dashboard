import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import React from "react";
import { Link, redirect } from "react-router";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (user.$id) return redirect("/");
  } catch (e) {
    console.log("Error fetching client:", e);
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

const signIn = () => {
  return (
    <main className="auth">
      <section className="size-full flex-center glassmorphism px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="text-dark-100 p-28-bold">Tourvisto</h1>
          </header>
          <article>
            <h2 className="text-dark-100 text-center p-28-semibold">
              Start Your Travel Journey
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, user
              activity with ease.
            </p>
            <ButtonComponent
              type="button"
              iconCss="e-search-icon"
              className="button-class !h-11 !w-full"
              onClick={async () => await loginWithGoogle()}
            >
              <img
                src="/assets/icons/google.svg"
                alt="google"
                className="size-5"
              />
              <span className="p-18-semibold text-white">
                Sign in with Google
              </span>
            </ButtonComponent>
          </article>
        </div>
      </section>
    </main>
  );
};

export default signIn;
