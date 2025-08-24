import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users } from 'lucide-react';
import campaignImage from './c11.jpg';
import backToSchoolImage from './bac.jpeg';
import monsoonImage from './ms.jpg';

const Campaign = () => {
  const campaigns = [
    {
      id: 1,
      title: "Winter Clothing Drive",
      image: campaignImage,
      location: "Naibed East, Mumbai",
      date: "December 25, 2023",
      participants: 45,
      description: "Our winter clothing drive provided warm garments to over 200 families living in underserved communities in eastern Mumbai.",
      status: "completed"
    },
    {
      id: 2,
      title: "Back to School Donation",
      image: backToSchoolImage,
      location: "Andheri West, Mumbai",
      date: "June 15, 2024",
      participants: 30,
      description: "Help children start the school year right with donations of uniforms, shoes and stationery items for underprivileged students.",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Monsoon Relief Campaign",
      image: monsoonImage,
      location: "Various locations across Mumbai",
      date: "July 20, 2024",
      participants: 60,
      description: "Join us in providing waterproof clothing and essential items to communities vulnerable during the monsoon season.",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl font-bold mb-8">Our Campaigns</h1>
            <p className="text-2xl text-gray-600">
              We organize regular donation drives and community outreach programs to 
              maximize our impact and reach those who need help the most.
            </p>
          </div>
          
          {/* Featured Campaign */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-20">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={campaignImage}
                  alt="Featured Campaign" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2 p-12">
                <div className="inline-block px-6 py-2 rounded-full bg-green-100 text-green-800 font-medium text-lg mb-6">
                  Successful Campaign
                </div>
                <h2 className="text-4xl font-bold mb-6">Winter Relief Initiative</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  In an effort to uplift underprivileged communities, 
                  GiveCycle successfully executed its winter 
                  campaign at Naibed East Mumbai on 
                  December 25, 2023. This initiative was aimed at 
                  providing underprivileged communities with full 
                  access to quality apparel.
                </p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center text-gray-700 text-lg">
                    <MapPin size={24} className="mr-3 text-brand-orange" />
                    Naibed East, Mumbai
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <Calendar size={24} className="mr-3 text-brand-orange" />
                    December 25, 2023
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <Users size={24} className="mr-3 text-brand-orange" />
                    45 Volunteers
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-lg text-gray-500 mb-1">Donated By:</span>
                    <span className="font-semibold text-xl text-yellow-500">Cotton King</span>
                  </div>
                  <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 text-lg">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                      ${campaign.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{campaign.title}</h3>
                  <p className="text-gray-600 mb-6">{campaign.description}</p>
                  
                  <div className="flex flex-col space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <MapPin size={20} className="mr-2 text-brand-orange" />
                      {campaign.location}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar size={20} className="mr-2 text-brand-orange" />
                      {campaign.date}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users size={20} className="mr-2 text-brand-orange" />
                      {campaign.participants} Volunteers
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline"
                      className="flex-1 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                      onClick={() => window.location.href = `/campaign/${campaign.id}`}
                    >
                      View Details
                    </Button>
                    {campaign.status === 'upcoming' && (
                      <Button 
                        className="flex-1 bg-brand-orange hover:bg-orange-600 text-white"
                        onClick={() => window.location.href = `/campaign-registration/${campaign.id}`}
                      >
                        Join Campaign
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Campaign;
