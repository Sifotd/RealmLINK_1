import { getEvents } from "@/lib/mockData";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">所有活动</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-600">暂无活动</h3>
          <p className="mt-2 text-gray-500">请稍后再来查看，或者创建您自己的活动</p>
        </div>
      )}
    </div>
  );
} 