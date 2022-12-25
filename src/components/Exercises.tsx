import React from "react";

import Exercise from "./Exercise";
import format from "date-fns/format";

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
  const totalWeeks = Math.floor(lastWeights?.day / 3);
  const day = totalDays - totalWeeks * 3 + 1;
  const week = totalDays === 0 ? 1 : totalWeeks % 2 === 0 ? 2 : 1;

  const dayWorkout = workoutPlan[week][day];

  const exercises = dayWorkout.map((exercise: string) => {
    return exercise === "deadlift"
      ? { [exercise]: lastWeights?.weights?.[exercise] + 10 }
      : { [exercise]: lastWeights?.weights?.[exercise] + 5 };
  });

  const exerciseList = exercises.map((exercise: any, index: React.Key) => {
    return <Exercise key={index} exercise={exercise} register={register} />;
  });

  return (
    <div className="flex flex-col gap-5 font-bold text-white">
      <p className="">{format(Date.now(), "E, MMM dd, yyyy ")}</p>
      <p className="">{`Week ${totalWeeks}, Day ${lastWeights?.day}`}</p>

      {exerciseList}
    </div>
  );
}
