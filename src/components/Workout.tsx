import React from "react";

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
const workoutPlan = {
  1: {
    1: ["squat", "press", "deadlift"],
    2: ["squat", "bench", "clean"],
    3: ["squat", "press", "deadlift"],
  },
  2: {
    1: ["squat", "bench", "clean"],
    2: ["squat", "press", "deadlift"],
    3: ["squat", "bench", "clean"],
  },
};

export default function Exercises({ lastWeights, register }) {
  if (!lastWeights) return <></>;

  const totalDays = lastWeights?.day;
  const week = Math.floor(lastWeights?.day / 3) + 1;
  const day = totalDays - (week - 1) * 3;

  console.log("day", day);
  console.log("week", week);

  const dayWorkout = workoutPlan[week][day];
  console.log(dayWorkout);
  const filtered = dayWorkout.map((exercise) => {
    return lastWeights?.weights?.[exercise] + 5;
  });

  console.log(filtered);

  return (
    <>lightweight.</>
    // <div>
    //   <div className="flex justify-between gap-4 text-white">
    //     <div>
    //       <label className="font-bold text-white">Squat</label>
    //       <div
    //         style={{
    //           position: "relative",
    //           width: "60px",
    //           height: "60px",
    //         }}
    //       >
    //         <Image
    //           className="rounded-full"
    //           src={"/ss_squat.png"}
    //           fill
    //           alt="squat_icon"
    //           style={{ objectFit: "cover" }}
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <label className="font-bold text-white">Weights</label>
    //       <ul>
    //         <li>{`${lastWeights?.weights?.squat + 5} x 5`}</li>
    //         <li>{`${lastWeights?.weights?.squat + 5} x 5`}</li>
    //         <li>{`${lastWeights?.weights?.squat + 5} x 5`}</li>
    //       </ul>
    //     </div>
    //     <div className="flex flex-col text-center">
    //       <label className="font-bold text-white">Success</label>
    //       <div>
    //         <input
    //           type="checkbox"
    //           id="squat"
    //           checked={true}
    //           // className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //           // placeholder={lastWeights?.weights.squat.toString() || ""}
    //           {...register("squat")}
    //         />
    //       </div>
    //     </div>
    //     <div className="flex flex-col text-center">
    //       <label className="font-bold text-white">Stall</label>
    //       <div>
    //         <input
    //           type="checkbox"
    //           id="squat"
    //           checked={true}
    //           // className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //           // placeholder={lastWeights?.weights.squat.toString() || ""}
    //           {...register("squat")}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
