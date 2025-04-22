export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">DaisyUI 测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">卡片组件</h2>
            <p>这是一个DaisyUI的卡片组件，用于测试样式是否正确加载。</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">按钮</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="alert alert-info">
            <span>这是一个信息提示组件。</span>
          </div>
          
          <progress className="progress progress-primary w-full" value={40} max={100}></progress>
          
          <div className="join">
            <button className="btn join-item">按钮1</button>
            <button className="btn join-item btn-active">按钮2</button>
            <button className="btn join-item">按钮3</button>
          </div>
        </div>
      </div>
    </div>
  );
} 