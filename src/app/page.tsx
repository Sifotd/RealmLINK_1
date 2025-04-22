import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-200" style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">门票销售平台</h1>
            <p className="mb-5">基于区块链技术的门票销售平台，安全透明地购买和管理活动门票，无需担心中间商和欺诈风险。</p>
            <div className="flex gap-4 justify-center">
              <Link href="/events" className="btn btn-primary">浏览活动</Link>
              <Link href="/events/create" className="btn btn-outline btn-secondary">创建活动</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">平台特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">安全可靠</h3>
                <p>基于区块链技术，所有交易均透明记录，不可篡改，确保门票真实有效。</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">无中间商</h3>
                <p>直接连接活动主办方和参与者，去除不必要的中间环节，降低票价成本。</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">便捷高效</h3>
                <p>轻松创建和管理活动，快速购买门票，无需复杂流程，为您节省宝贵时间。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="mb-8 max-w-md mx-auto">现在就浏览我们的平台，发现丰富多彩的活动，或者创建您自己的活动。</p>
          <div className="flex gap-4 justify-center">
            <Link href="/events" className="btn btn-secondary">浏览活动</Link>
            <Link href="/events/create" className="btn bg-white text-primary">创建活动</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
