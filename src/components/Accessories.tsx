import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import plus from "@iconify-icons/ph/plus-bold";
import { Select } from "./Select";
import Accessory from "./Accessory";

export default function Accessories({ lastWeights, register }) {
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(
    null
  );

  const [accessories, setAccessories] = useState<string[]>([]);

  const [options, setOptions] = useState([
    "row",
    "curl",
    "tricep",
    "incline",
    "chinup",
  ]);

  useEffect(() => {
    if (lastWeights) {
      setOptions(defaultOptions);
      setSelectedAccessory(defaultOptions[0] || null);
    }
  }, [lastWeights]);

  if (!lastWeights) return <></>;

  const defaultOptions = [
    `row - ${lastWeights.weights.row || 0}`,
    `curl - ${lastWeights.weights.curl || 0}`,
    `tricep - ${lastWeights.weights.tricep || 0}`,
    `incline - ${lastWeights.weights.incline || 0}`,
    `chinup - ${lastWeights.weights.chinup || 0}`,
  ];

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
    const newAccessories = accessories.filter((acc) => acc !== accessory);

    setOptions([...options, accessory]);
    setAccessories(newAccessories);
  };

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
