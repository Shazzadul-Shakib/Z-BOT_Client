import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CircleUser,
  Home,
  Menu,
  PanelsTopLeft,
  Search,
  WalletMinimal,
  Sun,
  Moon,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import useTheme from "@/hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/userSlice";
import { persistor } from "@/redux/store";
import { useLogoutUserMutation } from "@/redux/api/users-api";
import { useGetAllProjectsQuery } from "@/redux/api/projects-api";

const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { isLoading, error } = useGetAllProjectsQuery(user?._id, {
    skip: !user?._id, // Skip the query if user is not logged in
  });

  const handleLogout = async () => {
    dispatch(logout());
    persistor.purge();
    await logoutUser();
  };
  if (error?.status === 401 || error?.status === 403) {
    handleLogout();
    console.log(error?.data.message);
  }
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img className="h-[50px]" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === "/" ? "bg-muted text-primary" : ""
                }`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                to="/projects"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname.startsWith("/projects")
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                <PanelsTopLeft className="h-5 w-5" />
                Projects
              </Link>
              <Link
                to="/finance"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname.startsWith("/finance")
                    ? "bg-muted text-primary"
                    : ""
                }`}
              >
                <WalletMinimal className="h-5 w-5" />
                Finance
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Link
                to="/"
                className="flex items-center mb-4 text-lg font-semibold"
              >
                <img className="h-[45px]" src={logo} alt="Logo" />
              </Link>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    pathname === "/" ? "bg-muted text-primary" : ""
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    pathname.startsWith("/projects")
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <PanelsTopLeft className="h-5 w-5" />
                  Projects
                </Link>
                <Link
                  to="/finance"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    pathname === "/finance" ? "bg-muted text-primary" : ""
                  }`}
                >
                  <WalletMinimal className="h-5 w-5" />
                  Finance
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="text-center text-orange-300 my-2">
                  <h1 className=" text-lg font-bold px-2">{user.userName}</h1>
                  <p className="text-xs px-2">{user.userEmail}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
          {/* Main page layout here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
