import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(name, email, password, phone, address);
        toast({
          title: "Success",
          description: "Registration successful! You can now log in.",
        });
        setIsRegistering(false);
      } else {
        await login(email, password);
        toast({
          title: "Success",
          description: "Login successful!",
        });
        navigate('/donate');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isRegistering ? 'CREATE AN ACCOUNT' : 'SIGN INTO YOUR ACCOUNT'}
              </CardTitle>
              {isRegistering && (
                <CardDescription>One Time Registration</CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {isRegistering && (
                    <>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-brand-orange/50 focus:border-brand-orange"
                      />
                      <Input
                        placeholder="Phone Number"
                        type="tel"
                        value={phone}
                        pattern="^[0-9]{10}$"
                        maxLength={10}
                        minLength={10}
                        inputMode="numeric"
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length <= 10) setPhone(val);
                        }}
                        required
                        className="border-brand-orange/50 focus:border-brand-orange"
                      />
                      <Input
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="border-brand-orange/50 focus:border-brand-orange"
                      />
                    </>
                  )}
                  
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-brand-orange/50 focus:border-brand-orange"
                  />
                  
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-brand-orange/50 focus:border-brand-orange"
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-orange hover:bg-orange-600"
                  >
                    {isRegistering ? 'Register' : 'Login'}
                  </Button>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-gray-500 hover:bg-gray-100"
                    onClick={() => setIsRegistering(!isRegistering)}
                    type="button"
                  >
                    {isRegistering ? 'Login' : 'Register'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
