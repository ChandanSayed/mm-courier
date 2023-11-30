const TopDelivery = () => {
  const deliverMen = [
    {
      name: 'Rasel',
      parcelDelivered: 10,
      ratting: 5
    },
    {
      name: 'Robi',
      parcelDelivered: 9,
      ratting: 4.5
    },
    {
      name: 'Mona',
      parcelDelivered: 8,
      ratting: 4.3
    },
    {
      name: 'Mamun',
      parcelDelivered: 7,
      ratting: 4
    },
    {
      name: 'Nirob',
      parcelDelivered: 6,
      ratting: 4.5
    }
  ];
  return (
    <div className="bg-blue-600 py-12">
      <h2 className="mb-8 text-2xl lg:text-5xl font-bold text-white text-center">The best men we have!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 max-w-[1320px] px-4 mx-auto">
        {deliverMen.map((man, i) => {
          return (
            <div className="card bg-base-100 shadow-xl" key={i}>
              <div className="card-body">
                <h2 data-aos="fade-up" className="text-lg lg:text-2xl text-center">
                  {man.name}
                </h2>
                <img data-aos="fade-up" src="https://chandansayed.github.io/course-image-links/user.png" alt="Profile Picture" />
                <p data-aos="fade-up" className="text-sm lg:text-base text-center mb-2">
                  Number of parcel Delivered : {man.parcelDelivered}
                </p>
                <p data-aos="fade-up" className="text-sm lg:text-base text-center mb-2 flex items-center gap-1">
                  Average Ratings:
                  <span className="rating">
                    <input type="radio" name="rating-2" readOnly className="mask mask-star-2 bg-orange-400" checked />
                  </span>
                  {man.ratting.toFixed(1)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopDelivery;
