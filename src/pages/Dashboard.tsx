import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { Package, Clock, CheckCircle, Heart, Calendar, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("donations");
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donations');
        setDonations(response.data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch donations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [toast]);

  // Removed mock userDonations. Use only real backend data.

  // Mock upcoming campaigns
  const upcomingCampaigns = [
    {
      id: 1,
      title: "Back to School Drive",
      date: "2024-06-15",
      location: "Andheri West",
      type: "Education"
    },
    {
      id: 2,
      title: "Monsoon Relief",
      date: "2024-07-20",
      location: "Multiple Locations",
      type: "Emergency"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* User Welcome Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mt-1">{user?.email}</p>
              </div>
              <Link to="/donate">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Make a New Donation
                </Button>
              </Link>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Package className="h-10 w-10 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Donations</p>
                    <h3 className="text-2xl font-bold">{donations.length}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Heart className="h-10 w-10 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Impact Points</p>
                    <h3 className="text-2xl font-bold">{donations.length * 50}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Clock className="h-10 w-10 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Donations</p>
                    <h3 className="text-2xl font-bold">
                      {/* Removed userDonations reference. Now using real data above. */}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="campaigns">Upcoming Campaigns</TabsTrigger>
            </TabsList>

            <TabsContent value="donations" className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Items</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">Loading...</TableCell>
                      </TableRow>
                    ) : donations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">No donations yet</TableCell>
                      </TableRow>
                    ) : donations.map((donation: any) => (
                      <TableRow key={donation._id}>
                        <TableCell>{donation.items}</TableCell>
                        <TableCell>{donation.location}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>{donation.time}</TableCell>
                        <TableCell>
                          <Badge variant={donation.status === "completed" ? "secondary" : "outline"}>
                            {donation.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingCampaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">{campaign.title}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-5 w-5 mr-2" />
                          {campaign.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          {campaign.location}
                        </div>
                        <Badge>{campaign.type}</Badge>
                      </div>
                      <Button 
                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                        onClick={() => navigate('/campaign/register', { state: { campaign } })}
                      >
                        Register to Participate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
