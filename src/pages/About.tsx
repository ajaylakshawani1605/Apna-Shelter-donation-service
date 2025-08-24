import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import aboutUsImage from './aboutus.jpg';
import { Heart, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-24">
            <h1 className="text-5xl font-bold mb-8">About Us</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We are a community-driven organization dedicated to making a positive impact through clothing donations 
              and sustainable fashion practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Apna Shelter aims to bridge the gap between excess and need by collecting gently used clothing 
                and distributing them to underprivileged communities, disaster victims, and individuals facing financial hardships.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                We believe that everyone deserves access to quality clothing regardless of their economic situation. 
                Through our initiatives, we not only provide essential items but also promote dignity, confidence, and self-esteem.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-lg overflow-hidden shadow-lg w-full max-w-md">
                <img 
                  src={aboutUsImage}
                  alt="Our Mission" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-12 mb-24">
            <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center mb-6">
                  <Heart className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Compassion</h3>
                <p className="text-lg text-gray-600">We work with empathy and care for everyone we serve</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center mb-6">
                  <Users className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Community</h3>
                <p className="text-lg text-gray-600">We build strong networks of support and collaboration</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center mb-6">
                  <Target className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Impact</h3>
                <p className="text-lg text-gray-600">We measure our success by the positive change we create</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center mb-6">
                  <Award className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Integrity</h3>
                <p className="text-lg text-gray-600">We operate with transparency and accountability</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Join Our Cause</h2>
            <p className="text-2xl text-gray-600 mb-10">
              There are many ways to get involved with Apna Shelter. Whether you donate clothing, 
              volunteer your time, or contribute financially, your support makes our work possible.
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="/donate" 
                className="bg-brand-orange hover:bg-orange-600 text-white px-10 py-4 rounded-md text-xl font-medium transition-colors"
              >
                Donate Now
              </a>
              <a 
                href="/volunteer" 
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-10 py-4 rounded-md text-xl font-medium transition-colors"
              >
                Volunteer
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
