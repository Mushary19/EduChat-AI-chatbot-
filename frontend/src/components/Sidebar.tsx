const Sidebar = () => {
  return (
    <section className="w-full h-full bg-gray-100 p-4">
      <div className="flex flex-col gap-1 text-gray-800">
        <div className="flex px-4 py-2 gap-3 bg-gray-300 rounded-2xl">
          <span>New chat</span>
        </div>
        <div className="flex px-4 py-2 gap-3 rounded-2xl">
          <span>New chat</span>
        </div>
        <div className="flex px-4 py-1 gap-3 rounded-2xl">
          <span>New chat</span>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
