"use client";

import { useState } from "react";
import { createEvent } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    creatorAddress: "0x123456789abcdef123456789abcdef123456789a", // 假设这是当前连接的钱包地址
    title: "",
    description: "",
    previewImageUrl: "",
    startTime: "",
    endTime: "",
    maxTickets: 100,
    price: 0.1
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxTickets' || name === 'price' ? parseFloat(value) : value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "活动标题不能为空";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "活动描述不能为空";
    }
    
    if (!formData.previewImageUrl.trim()) {
      newErrors.previewImageUrl = "预览图URL不能为空";
    } else if (!formData.previewImageUrl.match(/^https?:\/\/.+\..+/)) {
      newErrors.previewImageUrl = "请输入有效的URL地址";
    }
    
    if (!formData.startTime) {
      newErrors.startTime = "请选择开始时间";
    }
    
    if (!formData.endTime) {
      newErrors.endTime = "请选择结束时间";
    } else if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      newErrors.endTime = "结束时间必须晚于开始时间";
    }
    
    if (formData.maxTickets <= 0) {
      newErrors.maxTickets = "票数必须大于0";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "价格必须大于0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 在真实应用中，这里会是一个异步操作，与区块链交互
      const newEvent = createEvent(formData);
      
      // 模拟异步操作
      setTimeout(() => {
        setIsSubmitting(false);
        router.push(`/events/${newEvent.id}`);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      alert("创建活动失败，请重试");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">创建新活动</h1>
      
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="form-control mb-4">
            <label className="label" htmlFor="title">
              <span className="label-text">活动标题</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              placeholder="输入活动标题"
            />
            {errors.title && <span className="text-error text-sm mt-1">{errors.title}</span>}
          </div>
          
          <div className="form-control mb-4">
            <label className="label" htmlFor="description">
              <span className="label-text">活动描述</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`textarea textarea-bordered h-32 ${errors.description ? 'textarea-error' : ''}`}
              placeholder="详细描述您的活动"
            ></textarea>
            {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
          </div>
          
          <div className="form-control mb-4">
            <label className="label" htmlFor="previewImageUrl">
              <span className="label-text">活动预览图URL</span>
            </label>
            <input
              type="url"
              id="previewImageUrl"
              name="previewImageUrl"
              value={formData.previewImageUrl}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.previewImageUrl ? 'input-error' : ''}`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.previewImageUrl && <span className="text-error text-sm mt-1">{errors.previewImageUrl}</span>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label" htmlFor="startTime">
                <span className="label-text">开始时间</span>
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.startTime ? 'input-error' : ''}`}
              />
              {errors.startTime && <span className="text-error text-sm mt-1">{errors.startTime}</span>}
            </div>
            
            <div className="form-control">
              <label className="label" htmlFor="endTime">
                <span className="label-text">结束时间</span>
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.endTime ? 'input-error' : ''}`}
              />
              {errors.endTime && <span className="text-error text-sm mt-1">{errors.endTime}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label" htmlFor="maxTickets">
                <span className="label-text">最大票数</span>
              </label>
              <input
                type="number"
                id="maxTickets"
                name="maxTickets"
                value={formData.maxTickets}
                onChange={handleChange}
                min="1"
                step="1"
                className={`input input-bordered w-full ${errors.maxTickets ? 'input-error' : ''}`}
              />
              {errors.maxTickets && <span className="text-error text-sm mt-1">{errors.maxTickets}</span>}
            </div>
            
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">门票价格 (ETH)</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0.001"
                step="0.001"
                className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
              />
              {errors.price && <span className="text-error text-sm mt-1">{errors.price}</span>}
            </div>
          </div>
          
          <div className="form-control mt-6">
            <div className="flex space-x-4">
              <Link href="/events" className="btn btn-outline flex-1">取消</Link>
              <button 
                type="submit" 
                className={`btn btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? '创建中...' : '创建活动'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 