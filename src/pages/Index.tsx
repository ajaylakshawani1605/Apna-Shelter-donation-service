import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shirt, ShoppingBag, BookOpen, Users } from 'lucide-react';
import landingPageImage from './landingpage.png';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src={landingPageImage}
          alt="Landing Page"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Donations Even If It Is A <br />Small Can Bring <span className="text-orange-500">Bigger</span> Impact
          </h1>
          <p className="text-2xl text-center mb-10 max-w-3xl">
            Your contribution is changing lives one donation at a time
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-xl px-10 py-7">
              DONATE NOW
            </Button>
          </Link>
        </div>
      </div>

      {/* Donation Categories */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">DONATE ALMOST ANYTHING</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                <Shirt className="text-white" size={56} />
              </div>
              <h3 className="text-2xl font-semibold">Clothes</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                <ShoppingBag className="text-white" size={56} />
              </div>
              <h3 className="text-2xl font-semibold">Accessories</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                <BookOpen className="text-white" size={56} />
              </div>
              <h3 className="text-2xl font-semibold">Stationary</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                <Users className="text-white" size={56} />
              </div>
              <h3 className="text-2xl font-semibold">Volunteer</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="text-center p-12 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-orange-500 mb-4">5,000+</div>
                <div className="text-xl">Lives Impacted Through Our Campaign</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-12 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-orange-500 mb-4">20,000+</div>
                <div className="text-xl">Clothes Donated Across Communities Where Needed</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-12 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-5xl font-bold text-orange-500 mb-4">100+</div>
                <div className="text-xl">Active Volunteers Helping to Reach Many Lives</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
