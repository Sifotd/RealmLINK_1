import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
      <h2 className="text-2xl font-semibold mb-6">页面不存在</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        您访问的页面可能已被删除、名称已更改或暂时不可用。
      </p>
      <Link href="/" className="btn btn-primary">
        返回首页
      </Link>
    </div>
  );
} 