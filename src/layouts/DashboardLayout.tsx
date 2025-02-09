
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useClinic } from "@/hooks/use-clinic";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { loading: clinicLoading } = useClinic();
  const location = useLocation();

  // Mostra loading durante qualquer verificação
  if (loading || clinicLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não houver usuário autenticado, redireciona para o login mantendo a rota atual
  if (!user) {
    console.log("Usuário não autenticado, redirecionando para login. Rota atual:", location.pathname);
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
