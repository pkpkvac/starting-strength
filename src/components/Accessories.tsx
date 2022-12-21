import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import plus from "@iconify-icons/ph/plus-bold";
import Exercise from "./Exercise";
// import Select from "react-select";
import { Select } from "./Select";
import Accessory from "./Accessory";

const accessories = ["row", "curl", "tricep", "incline"];

export default function Accessories({ lastWeights, register }) {
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(
    null
  );

  const [accessories, setAccessories] = useState<string[]>([]);

  const [options, setOptions] = useState(["Chocolate", "Beef", "Brocc"]);

  useEffect(() => {
    if (lastWeights) {
      setOptions(defaultOptions);
      setSelectedAccessory(defaultOptions[0] || null);
    }
  }, [lastWeights, accessories]);

  //   console.log(selectedAccessory);

  if (!lastWeights) return <></>;

  const defaultOptions = [
    "Beef",
    `Chocolate-${lastWeights.weights.bench}`,
    "Brocc",
    // { value: "chocolate", label: "Chocolate" },
    // { value: "strawberry", label: "Strawberry" },
    // { value: "vanilla", label: "Vanilla" },
  ];
  //   console.log(lastWeights);
  console.log(accessories);

  const addSelectedAccessory = () => {
    if (selectedAccessory) {
      const newOptions = options.filter(
        (option) => option !== selectedAccessory
      );
      setOptions(newOptions);
      setSelectedAccessory(newOptions[0] || null);

      setAccessories([...accessories, selectedAccessory]);
    }
  };

  const onRemoveAccessory = (accessory: string) => {
    console.log(accessory);

    const newAccessories = accessories.filter((acc) => acc !== accessory);

    setAccessories(newAccessories);
  };
  //   const totalDays = lastWeights?.day;
  //   const totalWeeks = Math.floor(lastWeights?.day / 3);
  //   const day = totalDays - totalWeeks * 3 + 1;
  //   const week = totalDays === 0 ? 1 : totalWeeks % 2 === 0 ? 2 : 1;

  //   const dayWorkout = workoutPlan[week][day];

  //   const exercises = dayWorkout.map((exercise: string) => {
  //     return { [exercise]: lastWeights?.weights?.[exercise] + 5 };
  //   });

  //   const exerciseList = exercises.map((exercise: any, index: React.Key) => {
  //     return <Exercise key={index} exercise={exercise} register={register} />;
  //   });

  return (
    <div className="flex flex-col gap-5 font-bold text-white">
      <p className="">Accessories</p>

      {accessories.map((accessory, index) => (
        <Accessory
          key={index}
          accessory={accessory}
          register={register}
          onRemoveAccessory={() => onRemoveAccessory(accessory)}
        />
      ))}

      <div className="flex gap-8">
        <Select
          className="w-1/2 p-2 text-gray-600"
          name={"accessories"}
          //   register={register}
          defaultValue={defaultOptions[0]}
          options={options}
          onClick={(e: {
            target: { value: React.SetStateAction<string | null> };
          }) => setSelectedAccessory(e.target.value)}
          onChange={(e: {
            target: { value: React.SetStateAction<string | null> };
          }) => setSelectedAccessory(e.target.value)}
        />
        <Icon
          onClick={() => {
            addSelectedAccessory();
          }}
          className="h-10 w-10 cursor-pointer text-white"
          icon={plus}
        />
      </div>
    </div>
  );
}
