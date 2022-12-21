import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import minus from "@iconify-icons/ph/x-circle-bold";
import Image from "next/image";

// import Select from "react-sele

const accessories = ["row", "curl", "tricep", "incline"];

export default function Accessory({ accessory, register, onRemoveAccessory }) {
  return (
    <div>
      <div className="flex justify-between gap-4 text-white">
        <div>
          <label className="font-bold text-white">row</label>
          <div
            style={{
              position: "relative",
              width: "60px",
              height: "60px",
            }}
          >
            <Image
              className="rounded-full"
              src={`/ss_hammer.png`}
              fill
              alt={`hammer_icon`}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div>
          <label className="font-bold text-white">Weights</label>
          <input
            type="number"
            id="row"
            className="block w-[90px] rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={100}
            {...register("row", {
              setValueAs: (v) => parseInt(v === "" ? -1 : v, 10),
            })}
          />
        </div>

        <div className="flex flex-col text-center">
          <label className="font-bold text-white">Plates</label>
          <p>45x1</p>
          <p>35x1</p>
          <p>35x1</p>
          <p>35x1</p>
          <p>2.5x1</p>

          {/* <Platebreakdown weight={weight} /> */}
        </div>
        <div className="flex flex-col text-center">
          <Icon
            onClick={onRemoveAccessory}
            className="h-10 w-10 cursor-pointer text-white"
            icon={minus}
          />
        </div>
      </div>
    </div>
  );
}