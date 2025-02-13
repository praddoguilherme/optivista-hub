
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  DollarSign,
  Eye,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard"
  },
  {
    title: "Pacientes",
    icon: Users,
    url: "/dashboard/pacientes"
  },
  {
    title: "Consultas",
    icon: Calendar,
    url: "/dashboard/consultas"
  },
  {
    title: "Exames",
    icon: FileText,
    url: "/dashboard/exames"
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    url: "/dashboard/financeiro"
  },
  {
    title: "Configurações",
    icon: Settings,
    url: "/dashboard/configuracoes"
  }
];

const DashboardSidebar = () => {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 justify-center">
          <Eye className="w-10 h-10 text-primary animate-pulse" />
          <span className="text-2xl font-semibold text-primary">Íris</span>
        </div>
      </div>

      <SidebarContent className="flex-1 px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-500 px-4 mb-4">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2">
                  <SidebarMenuButton asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start py-6 text-base hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      onClick={() => {
                        window.location.href = item.url;
                        if (isMobile) setIsOpen(false);
                      }}
                    >
                      <item.icon className="mr-4 h-5 w-5" />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start py-6 text-base hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200"
          onClick={handleSignOut}
        >
          <LogOut className="mr-4 h-5 w-5" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        
        <Sidebar 
          className={`fixed inset-y-0 left-0 w-72 transform transition-transform duration-300 ease-in-out z-40 bg-white/80 backdrop-blur-lg ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </Sidebar>
      </>
    );
  }

  return (
    <Sidebar className="border-r border-gray-200 bg-white/80 backdrop-blur-lg w-72 min-h-screen">
      {sidebarContent}
    </Sidebar>
  );
};

export default DashboardSidebar;
