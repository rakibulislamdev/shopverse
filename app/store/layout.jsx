import StoreLayout from "@/components/store/StoreLayout";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export const metadata = {
  title: "Shopverse. - Store Dashboard",
  description: "Shopverse. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {
  return (
    <>
      <SignedIn>
        <StoreLayout>{children}</StoreLayout>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <SignIn fallbackRedirectUrl="/store" routing="hash" />
        </div>
      </SignedOut>
    </>
  );
}
