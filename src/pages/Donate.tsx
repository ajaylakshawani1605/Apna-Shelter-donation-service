import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Camera, PlusCircle, Search, Shirt, ShoppingBag, BookOpen } from 'lucide-react';

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes


import { Calendar } from "@/components/ui/calendar";

const Donate = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    donorName: user?.name || "",
    contact: "",
    location: ""
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        donorName: user.name
      }));
    }
  }, [user]);

  const [itemsData, setItemsData] = useState({
    donorName: "",
    contact: "",
    location: ""
  });
  const [donationItems, setDonationItems] = useState({
    clothes: 0,
    footwear: 0,
    stationary: 0
  });
  const [itemImages, setItemImages] = useState({
    clothes: [],
    footwear: [],
    stationary: []
  });
  const [donationMode, setDonationMode] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (item: keyof typeof donationItems) => {
    setDonationItems({
      ...donationItems,
      [item]: donationItems[item] + 1
    });
    
    toast({
      title: "Item Added",
      description: `Added 1 ${item} to your donation.`,
    });
  };

  const handleCaptureImage = (itemType: keyof typeof itemImages) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.setAttribute('data-item-type', itemType);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const itemType = event.target.getAttribute('data-item-type') as keyof typeof itemImages;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Error",
          description: "Image size must be less than 200MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImages(prev => ({
          ...prev,
          [itemType]: [...prev[itemType], reader.result as string]
        }));

        toast({
          title: "Image Added",
          description: `Added image for ${itemType}`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const createDonationMutation = useMutation({
    mutationFn: api.createDonation,
    onSuccess: () => {
      toast({
        title: "Donation Scheduled",
        description: "Your donation has been successfully scheduled.",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to schedule donation. Please try again.",
        variant: "destructive"
      });
      console.error('Donation error:', error);
    }
  });

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Error",
        description: "Please login to make a donation",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    if (step === 4 && donationMode && selectedDate && selectedTime) {
      // Format items for submission
      const itemsList = Object.entries(donationItems)
        .filter(([_, count]) => count > 0)
        .map(([item, count]) => `${count} ${item}`)
        .join(', ');

      // Format date and time
      const date = selectedDate.toLocaleDateString();
      const time = selectedTime;

      // Submit donation
      createDonationMutation.mutate({
        donor: formData.donorName,
        contact: formData.contact,
        date,
        time,
        items: itemsList,
        location: formData.location,
        notes: `Donation Mode: ${donationMode}`
      });
    } else {
      setStep(step + 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      
      <div className="bg-gray-50 flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Donate Items</h1>
          
          <div className="max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="flex justify-between mb-8">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-brand-blue' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1 ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Location</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-brand-blue' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Choose Items</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-brand-blue' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 3 ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Choose Mode</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 4 ? 'text-brand-blue' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 4 ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  4
                </div>
                <span className="text-sm font-medium">Date & Time</span>
              </div>
            </div>
            
            {/* Step Content */}
            <Card className="mb-8">
              <CardContent className="p-6">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-center">DONOR INFORMATION</h2>
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.donorName}
                        onChange={(e) => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
                      />
                      <Input
                        type="tel"
                        placeholder="Enter your contact number"
                        value={formData.contact}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                      />
                      <div className="flex space-x-3">
                        <Input 
                          placeholder="Building, Area/Block" 
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="flex-grow"
                        />
                        <Button className="bg-brand-orange hover:bg-orange-600">
                          <Search size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-center">CHOOSE ITEMS</h2>
                    
                    <div className="space-y-4">
                      {Object.entries(donationItems).map(([item, count]) => (
                        <div key={item} className="flex items-center bg-gray-100 rounded-lg p-3">
                          <div className="w-10 h-10 mr-3 flex-shrink-0">
                            {item === 'clothes' && <Shirt size={40} className="text-gray-700" />}
                            {item === 'footwear' && <ShoppingBag size={40} className="text-gray-700" />}
                            {item === 'stationary' && <BookOpen size={40} className="text-gray-700" />}
                          </div>
                          <span className="flex-grow font-medium capitalize">{item}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold">{count}</span>
                            <Button 
                              className="bg-brand-orange hover:bg-orange-600"
                              onClick={() => handleAddItem(item as keyof typeof donationItems)}
                            >
                              Add <PlusCircle size={16} className="ml-1" />
                            </Button>
                            <Button 
                              className="bg-brand-blue hover:bg-blue-700 flex items-center"
                              onClick={() => handleCaptureImage(item as keyof typeof itemImages)}
                            >
                              <Camera size={20} className="mr-2" />
                              Take Photo
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Image Preview */}
                    {Object.entries(itemImages).map(([item, images]) => (
                      images.length > 0 && (
                        <div key={item} className="mt-6 bg-white p-6 rounded-xl shadow-md">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold capitalize">{item} Photos</h3>
                            <Button
                              variant="outline"
                              className="border-2 border-dashed border-brand-blue hover:bg-blue-50 flex items-center"
                              onClick={() => handleCaptureImage(item as keyof typeof itemImages)}
                            >
                              <Camera size={20} className="mr-2 text-brand-blue" />
                              <span className="text-brand-blue">Add More Photos</span>
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((img, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={img}
                                  alt={`${item} ${index + 1}`}
                                  className="w-full aspect-square object-cover rounded-lg shadow-md transform transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setItemImages(prev => ({
                                        ...prev,
                                        [item]: prev[item].filter((_, i) => i !== index)
                                      }));
                                      toast({
                                        title: "Photo Removed",
                                        description: `Removed photo from ${item}`,
                                      });
                                    }}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                                <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                                  Photo {index + 1}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
                
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-center">CHOOSE MODE</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className={`h-auto py-8 text-lg ${
                          donationMode === 'pickup' 
                            ? 'border-2 border-brand-orange bg-brand-orange/5' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => setDonationMode('pickup')}
                      >
                        1) Schedule a Pickup
                      </Button>
                      <Button 
                        variant="outline" 
                        className={`h-auto py-8 text-lg ${
                          donationMode === 'dropoff' 
                            ? 'border-2 border-brand-orange bg-brand-orange/5' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => setDonationMode('dropoff')}
                      >
                        2) Donate at droppoint
                      </Button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-center">CHOOSE DATE & TIME</h2>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                      <div>
                        <span className="block mb-2 font-medium">Pick a Date</span>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          fromDate={new Date()}
                        />
                      </div>
                      <div>
                        <span className="block mb-2 font-medium">Pick a Time</span>
                        <Input
                          type="time"
                          value={selectedTime}
                          onChange={e => setSelectedTime(e.target.value)}
                          className="w-40"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            
            <div className="flex justify-center">
              <Button 
                className="bg-gray-700 hover:bg-gray-800 px-10 py-6 text-lg"
                onClick={handleSubmit}
                disabled={createDonationMutation.isPending || (
                  (step === 1 && (!formData.donorName || !formData.contact || !formData.location)) || 
                  (step === 2 && Object.values(donationItems).every(v => v === 0)) ||
                  (step === 3 && !donationMode) ||
                  (step === 4 && (!selectedDate || !selectedTime))
                )}
              >
                {step === 4 ? 'PROCEED' : 'NEXT'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Donate;
