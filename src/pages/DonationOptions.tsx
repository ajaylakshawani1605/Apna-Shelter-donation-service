import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SchedulePickup } from '../components/SchedulePickup';
import { DropPoints } from '../components/DropPoints';

export function DonationOptions() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Donate Your Clothes</h1>
      
      <Tabs defaultValue="pickup" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pickup">Schedule a Pickup</TabsTrigger>
          <TabsTrigger value="dropoff">Donation Drop Points</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pickup" className="mt-6">
          <SchedulePickup />
        </TabsContent>
        
        <TabsContent value="dropoff" className="mt-6">
          <DropPoints />
        </TabsContent>
      </Tabs>
    </div>
  );
}
