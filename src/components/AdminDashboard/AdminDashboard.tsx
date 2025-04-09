import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LoadingSpinner from "../Loading/LoadingSpinner";

// const AdminDashboard = () => {
// const currentUser = useAppSelector(selectCurrentUser);
// const dispatch = useAppDispatch();
// const [isLoading, setIsLoading] = useState(true);
// const [redirect, setRedirect] = useState(false);

// useEffect(() => {
//   const checkUserRole = async () => {
//     if (currentUser?.role !== "admin") {
//       await dispatch(logOut());
//       setRedirect(true);
//     }
//     setIsLoading(false);
//   };

//   checkUserRole();
// }, [currentUser, dispatch]);

// if (isLoading) return <LoadingSpinner />;
// if (redirect) return <Navigate to="/" />;

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 py-10 px-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { AppSidebar } from "../dashboard/app-sidebar";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function AdminDashboard() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (currentUser?.role !== "admin") {
        await dispatch(logOut());
        setRedirect(true);
      }
      setIsLoading(false);
    };

    checkUserRole();
  }, [currentUser, dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (redirect) return <Navigate to="/" />;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
