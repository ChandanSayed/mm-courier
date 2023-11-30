import CountUp from 'react-countup';

const Statistic = () => {
  return (
    <div className="py-8 bg-gradient-to-b from-blue-300 from-0% via-blue-100 via-60% to-white to-90% px-[30px] ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-sm lg:text-xl text-center mb-2">Number of Parcel Booked</p>
            <CountUp className="card-title text-2xl lg:text-5xl justify-center" duration={2.75} start={0} end={100} />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-sm lg:text-xl text-center mb-2">Number of Parcel Delivered</p>
            <CountUp className="card-title text-2xl lg:text-5xl justify-center" duration={2.75} start={0} end={100} />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-sm lg:text-xl text-center mb-2">Number of registered users</p>
            <CountUp className="card-title text-2xl lg:text-5xl justify-center" duration={2.75} start={0} end={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
