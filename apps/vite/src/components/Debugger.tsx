import React from 'react';

const Debugger = () => {
  return (
    <div className="fixed bottom-0 right-0 flex h-8 w-8 items-center justify-center border bg-white p-6 opacity-75">
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        XS
      </div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        SM
      </div>
      <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
        MD
      </div>
      <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
        LG
      </div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
        XL
      </div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
        2XL
      </div>
    </div>
  );
};

export default Debugger;
