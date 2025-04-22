import { getEventById, formatDate } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/events" className="btn btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          返回列表
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full h-[300px] md:h-[400px] mb-6 rounded-xl overflow-hidden">
            <Image
              src={event.previewImageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex items-center mb-6 text-sm text-gray-600">
            <div className="flex items-center mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>开始时间: {formatDate(event.startTime)}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>结束时间: {formatDate(event.endTime)}</span>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">活动详情</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">主办方</h2>
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <span className="text-lg font-bold">{event.title.charAt(0)}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">活动创建者地址:</p>
                <p className="text-gray-800 font-mono text-sm truncate max-w-xs">{event.creatorAddress}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl sticky top-8">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{event.price} ETH</h2>
              
              <div className="my-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">总票数:</span>
                  <span className="font-semibold">{event.maxTickets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">剩余票数:</span>
                  <span className="font-semibold">{event.remainingTickets}</span>
                </div>
                
                <progress 
                  className="progress progress-primary w-full mt-3" 
                  value={event.maxTickets - event.remainingTickets} 
                  max={event.maxTickets}
                ></progress>
                
                <p className="text-xs text-gray-500 mt-1 text-right">
                  已售 {((event.maxTickets - event.remainingTickets) / event.maxTickets * 100).toFixed(0)}%
                </p>
              </div>
              
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">购买数量</span>
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max={event.remainingTickets} 
                  defaultValue="1" 
                  className="input input-bordered w-full"
                  aria-label="购买数量"
                />
              </div>
              
              <div className="card-actions mt-6">
                <button className="btn btn-primary w-full">购买门票</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 