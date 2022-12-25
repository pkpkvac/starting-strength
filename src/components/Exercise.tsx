import React, { useState } from "react";

import Image from "next/image";
import { Platebreakdown } from "./Platebreakdown";

export default function Exercise({ exercise, register }) {
  const [success, setSuccess] = useState(true);

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
          <label className="font-bold text-white">Plates</label>

          <Platebreakdown weight={weight} />
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
            <input
              className="mt-4 hidden h-[30px] w-[30px]"
              type="checkbox"
              id={`${lift}`}
              checked={true}
              {...register(`${lift}-day`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
