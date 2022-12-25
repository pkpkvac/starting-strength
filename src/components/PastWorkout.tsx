import format from "date-fns/format";
import Image from "next/image";

export default function PastWorkout({ workout }) {
  const mainLifts = [
    "squat",
    "bench",
    "press",
    "deadlift",
    "clean",
    "row",
    "chinup",
    "curl",
    "tricep",
    "incline",
  ];

  const pastExerciseSummary = Object.entries(workout.weights)
    .sort(([liftA], [liftB]) => {
      const a = mainLifts.indexOf(liftA);
      const b = mainLifts.indexOf(liftB);

      return a - b;
    })
    .map(([lift, weight]) => {
      let img = lift;

      if (!mainLifts.slice(0, 5).includes(lift)) img = "hammer";

      return (
        <div key={lift} className="flex justify-between gap-4 text-white">
          <div className="flex gap-4">
            <div
              style={{
                position: "relative",
                width: "60px",
                height: "60px",
              }}
            >
              <Image
                className="rounded-full"
                src={`/ss_${img}.png`}
                fill
                alt={`${img}_icon`}
                style={{ objectFit: "cover" }}
              />
            </div>
            <label className="font-bold text-white">{lift}</label>
          </div>
          <div>
            <label className="font-bold text-white">Weight</label>
            <ul>
              <li>{`${weight}`}</li>
            </ul>
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="mx-auto mt-7 flex h-min w-3/4 flex-col gap-5 rounded-3xl bg-primary-light px-10 py-5 font-bold text-white">
        <p className="">{format(workout.createdAt, "E, MMM dd, yyyy ")}</p>
        {pastExerciseSummary}
        {workout?.notes && (
          <>
            <label className="font-bold text-white">Notes</label>
            <div className="rounded-3xl bg-white p-4 text-black">
              {workout.notes}
            </div>
          </>
        )}
      </div>
    </>
  );
}
