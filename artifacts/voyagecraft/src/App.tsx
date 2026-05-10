import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/contexts/AuthContext";

import { Navbar } from "@/components/Navbar";
import Landing from "@/pages/Landing";
import CreateTrip from "@/pages/CreateTrip";
import Itinerary from "@/pages/Itinerary";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route>
        <div className="min-h-screen bg-background font-sans">
          <Navbar />
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/create-trip" component={CreateTrip} />
            <Route path="/itinerary" component={Itinerary} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
