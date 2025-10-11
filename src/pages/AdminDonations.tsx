import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';

const AdminDonations = () => {
  const { toast } = useToast();
  const [donations, setDonations] = useState([]);
  const [approvedDonations, setApprovedDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const pending = await api.getDonations('pending');
      setDonations(pending);
      const approved = await api.getDonations('approved');
      setApprovedDonations(approved);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to fetch donations', variant: 'destructive' });
    }
    setLoading(false);
  };

  const approveDonation = async (id: string) => {
    try {
      await api.updateDonationStatus(id, 'approved');
      toast({ title: 'Approved', description: 'Donation approved!' });
      fetchDonations();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to approve donation', variant: 'destructive' });
    }
  };

  // Group approved donations by date
  const groupByDate = (donations: any[]) => {
    return donations.reduce((acc, donation) => {
      const date = donation.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(donation);
      return acc;
    }, {} as Record<string, any[]>);
  };

  const approvedByDate = groupByDate(approvedDonations);

  return (
    <div className="min-h-screen flex flex-col">
      <Card className="max-w-3xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Pending Donation Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : donations.length === 0 ? (
            <div>No pending donations.</div>
          ) : (
            <ul className="space-y-4">
              {donations.map((donation: any) => (
                <li key={donation._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <div><b>Donor:</b> {donation.donorName || donation.donor}</div>
                    <div><b>Contact:</b> {donation.contact}</div>
                    <div><b>Items:</b> {donation.items}</div>
                    <div><b>Date:</b> {donation.date}</div>
                    <div><b>Time:</b> {donation.time}</div>
                    <div><b>Location:</b> {donation.location}</div>
                  </div>
                  <Button onClick={() => approveDonation(donation._id)} className="bg-green-600 hover:bg-green-700">Approve</Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Approved Donations History */}
      <Card className="max-w-3xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Approved Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : Object.keys(approvedByDate).length === 0 ? (
            <div>No approved donations.</div>
          ) : (
            Object.entries(approvedByDate).map(([date, donations]) => (
              <div key={date} className="mb-6">
                <div className="font-bold text-lg mb-2">{date}</div>
                <ul className="space-y-4">
                  {(donations as any[]).map((donation) => (
                    <li key={donation._id} className="border p-4 rounded flex justify-between items-center">
                      <div>
                        <div><b>Donor:</b> {donation.donorName || donation.donor}</div>
                        <div><b>Contact:</b> {donation.contact}</div>
                        <div><b>Items:</b> {donation.items}</div>
                        <div><b>Date:</b> {donation.date}</div>
                        <div><b>Time:</b> {donation.time}</div>
                        <div><b>Location:</b> {donation.location}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDonations;
