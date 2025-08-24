import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Campaign from "./pages/Campaign";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import CampaignRegistration from "./pages/CampaignRegistration";
import PrivateRoute from "@/components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/campaign/register" element={<CampaignRegistration />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/donate" element={<PrivateRoute><Donate /></PrivateRoute>} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
