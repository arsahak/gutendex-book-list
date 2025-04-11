import React from "react";

const BookCardSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mt-10">
      {/* Skeleton for Book Card */}
      {[1, 2, 3, 4, 5, 6, 8, 9].map((_, index) => (
        <div
          Key={index}
          className="flex flex-col items-center justify-center w-full max-w-xl p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-md "
        >
          <div
            role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          >
            <div class="flex items-center justify-center w-full h-48 bg-gray-200 rounded-sm sm:w-[330px]" />
          </div>
          <div class="w-full mt-6">
            <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCardSkeleton;
