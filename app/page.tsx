export default function Home() {
  return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-xl mb-8">Explore the latest articles and insights</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">Recent Post 1</h2>
            <p className="text-gray-600">Short description of the post...</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">Recent Post 2</h2>
            <p className="text-gray-600">Short description of the post...</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">Recent Post 3</h2>
            <p className="text-gray-600">Short description of the post...</p>
          </div>
        </div>
      </div>
  )
}
