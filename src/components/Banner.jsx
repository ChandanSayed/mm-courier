const Banner = () => {
  return (
    <div className="hero min-h-[400px] bg-cover" style={{ backgroundImage: 'url(/public/banner.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-2xl lg:text-5xl font-bold">Search Your One!</h1>
          <div className="flex justify-center">
            <input type="text" className="px-2 py-1 rounded-s-lg " />
            <button className="btn btn-primary rounded-s-none">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
