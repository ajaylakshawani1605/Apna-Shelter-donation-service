
import axios from 'axios';

// Using local mock data instead of MongoDB
const mockDonations = [
  {
    _id: "6593a12345b9d987654321",
    donor: "John Doe",
    contact: "john@example.com",
    date: "2023-10-15",
    time: "10:30 AM",
    items: "Clothing, Books",
    location: "123 Main St, New York",
    status: "pending",
    notes: "Will drop off at the front desk"
  },
  {
    _id: "6593a12345b9d987654322",
    donor: "Jane Smith",
    contact: "jane@example.com",
    date: "2023-10-16",
    time: "2:00 PM",
    items: "Electronics, Toys",
    location: "456 Oak Ave, Boston",
    status: "confirmed",
    notes: "Needs help carrying items"
  },
  {
    _id: "6593a12345b9d987654323",
    donor: "Bob Johnson",
    contact: "bob@example.com",
    date: "2023-10-14",
    time: "11:45 AM",
    items: "Furniture, Kitchenware",
    location: "789 Pine Rd, Chicago",
    status: "completed",
    notes: ""
  },
  {
    _id: "6593a12345b9d987654324",
    donor: "Sarah Williams",
    contact: "sarah@example.com",
    date: "2023-10-17",
    time: "9:15 AM",
    items: "Stationery, Art Supplies",
    location: "101 Maple Dr, Los Angeles",
    status: "pending",
    notes: "Prefers morning pickup"
  },
  {
    _id: "6593a12345b9d987654325",
    donor: "Michael Brown",
    contact: "michael@example.com",
    date: "2023-10-18",
    time: "3:30 PM",
    items: "Clothing, Shoes",
    location: "202 Elm St, San Francisco",
    status: "rejected",
    notes: "Items not acceptable condition"
  }
];

export const fetchDonations = async (filter = '') => {
  // Mock API call with local data
  return new Promise((resolve) => {
    setTimeout(() => {
      if (filter === 'active') {
        resolve(mockDonations.filter(d => d.status === 'pending' || d.status === 'confirmed'));
      } else if (filter === 'completed') {
        resolve(mockDonations.filter(d => d.status === 'completed'));
      } else {
        resolve(mockDonations);
      }
    }, 500); // Simulate network delay
  });
};

export const updateDonationStatus = async (id, status) => {
  // Mock API call for status update
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedDonations = mockDonations.map(d => {
        if (d._id === id) {
          return { ...d, status };
        }
        return d;
      });
      resolve({ success: true, id, status });
    }, 500);
  });
};

export const generateDonationReport = async () => {
  // Mock report generation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a mock CSV blob
      const headers = "ID,Donor,Contact,Date,Time,Items,Location,Status\n";
      const rows = mockDonations.map(d => 
        `${d._id},${d.donor},${d.contact},${d.date},${d.time},${d.items},${d.location},${d.status}`
      ).join("\n");
      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      resolve(blob);
    }, 1000);
  });
};
