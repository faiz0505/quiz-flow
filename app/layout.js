import "./globals.css";
import Provider from "./lib/nextui/provider";
import NextauthProvider from "./lib/nextauth/provider";
import Navigation from "./components/header/navigation";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Quiz Flow",
  description:
    "Embark on a knowledge-filled adventure with Quiz Flow, the dynamic quiz platform designed to make learning both engaging and enjoyable. Explore diverse categories, track your progress, and compete with fellow enthusiasts on the public leaderboard. Join Quiz Flow today for a fun and interactive way to expand your knowledge!",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full bg-slate-900 min-h-screen overflow-hidden py-3">
        <Provider>
          <NextauthProvider>
            <Navigation />
            <NextTopLoader />
            {children}
            <Footer />
          </NextauthProvider>
        </Provider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              background: "#fff",
              color: "#363636",
            },

            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
