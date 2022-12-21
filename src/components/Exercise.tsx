import React, { useState } from "react";

import Image from "next/image";
// type sizes = "sm" | "md" | "lg";

// // sm, md, lg
// const sizeMap: Record<sizes, string> = {
//   sm: "w-4 h-4",
//   md: "w-10 h-10",
//   lg: "w-20 h-20",
// };

// type Props = {
//   size?: sizes;
// };

export default function Exercise({ exercise, register }) {
  const [success, setSuccess] = useState(true);
  //   const [stalled, setStalled] = useState(false);

  //   console.log(register);

  if (!exercise) return <></>;

  const lift = Object.keys(exercise)[0];
  const weight = Object.values(exercise)[0];

  return (
    <div key={`${lift}`}>
      <div className="flex justify-between gap-4 text-white">
        <div>
          <label className="font-bold text-white">{lift}</label>
          <div
            style={{
              position: "relative",
              width: "60px",
              height: "60px",
            }}
          >
            <Image
              className="rounded-full"
              src={`/ss_${lift}.png`}
              fill
              alt={`${lift}_icon`}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div>
          <label className="font-bold text-white">Weights</label>
          <ul>
            <li>{`${weight} x 5`}</li>
            <li>{`${weight} x 5`}</li>
            <li>{`${weight} x 5`}</li>
          </ul>
        </div>
        <div className="flex flex-col text-center">
          <label className="font-bold text-white">Complete</label>
          <div>
            <input
              className="mt-4 h-[30px] w-[30px]"
              type="checkbox"
              id={`${lift}`}
              checked={!success}
              onClick={() => setSuccess(!success)}
              {...register(`${lift}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
