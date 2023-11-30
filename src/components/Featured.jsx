import React, { useState } from 'react';
import one from '/1.png';
import two from '/2.png';
import three from '/3.png';
import four from '/4.png';

const Featured = () => {
  const steps = [
    { id: 1, img: one, stepName: 'Book Your Parcel', des: 'You need to book your parcel first.' },
    { id: 2, img: two, stepName: 'Parcel Safety', des: 'It is our responsibility to ensure the safety.' },
    { id: 3, img: three, stepName: 'Super Fast Delivery', des: 'We try to deliver the parcel as soon as possible' },
    { id: 4, img: four, stepName: 'Satisfaction', des: 'We assure the customer satisfaction' }
  ];

  const [index, setIndex] = useState(0);

  function handleHoverFunction(i) {
    setIndex(i);
  }

  return (
    <div className="bg-blue-700 py-8">
      <h1 className="mb-8 text-2xl lg:text-5xl font-bold text-white text-center" data-aos="fade-up">
        What we do!
      </h1>
      <div className="flex flex-col md:flex-row gap-2.5 sm:gap-5 px-4 pb-10 max-w-[1320px] mx-auto">
        {steps.map((step, i) => {
          return (
            <div data-aos="fade-up" className={`bg-white rounded-[20px] md:w-[260px] p-5 sm:p-[30px] cursor-pointer ${index === i ? 'lg:flex-1' : ' bg-opacity-20 text-center'}`} key={step.id} onMouseEnter={() => handleHoverFunction(i)}>
              <img src={step.img} alt="step" className={`w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] mt-[20px] object-cover ${index === i ? 'mx-auto sm:ml-11 lg:ml-14' : 'mx-auto'} mb-4 sm:mb-5`} />
              <h3 className={`font-bold text-lg lg:text-2xl ${index === i ? 'text-black' : 'text-white'}`}>{step.stepName}</h3>
              <p className={`text-base lg:text-xl ${index === i ? 'text-black' : 'text-white'}`}>{step.des}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
