import AdminLayout from "@/components/admin/AdminLayout";
import { SignIn, SignedOut, SignedIn } from "@clerk/nextjs";

export const metadata = {
  title: "GoCart. - Admin",
  description: "GoCart. - Admin",
};

export default function RootAdminLayout({ children }) {
  return (
    <>
      <SignedIn>
        <AdminLayout>{children}</AdminLayout>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <SignIn fallbackRedirectUrl="/admin" routing="hash" />
        </div>
      </SignedOut>
    </>
  );
}
