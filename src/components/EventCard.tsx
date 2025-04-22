import Link from "next/link";
import Image from "next/image";
import { Event, formatDate } from "@/lib/mockData";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48">
        <Image 
          src={event.previewImageUrl} 
          alt={event.title}
          fill
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{event.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="badge badge-primary">{event.price} ETH</span>
          <span className="text-gray-500">剩余票数: {event.remainingTickets}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {formatDate(event.startTime)}
        </div>
        <div className="card-actions justify-end mt-3">
          <Link href={`/events/${event.id}`} className="btn btn-primary btn-sm">查看详情</Link>
        </div>
      </div>
    </div>
  );
} 