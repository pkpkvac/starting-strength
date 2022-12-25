export function Platebreakdown({ weight }: { weight: number }) {
  console.log(weight);

  const totalWeight = weight;
  const barbellWeight = 45;

  let weightPerSide = (totalWeight - barbellWeight) / 2;

  const number45s = Math.floor(weightPerSide / 45);

  weightPerSide = weightPerSide - number45s * 45;

  const number35s = Math.floor(weightPerSide / 35);

  weightPerSide = weightPerSide - number35s * 35;

  const number25s = Math.floor(weightPerSide / 25);

  weightPerSide = weightPerSide - number25s * 25;

  const number10s = Math.floor(weightPerSide / 10);

  weightPerSide = weightPerSide - number10s * 10;

  const number5s = Math.floor(weightPerSide / 5);

  weightPerSide = weightPerSide - number5s * 5;

  const number2s = Math.floor(weightPerSide / 2.5);

  weightPerSide = weightPerSide - number2s * 2.5;

  return (
    <>
      <ul>
        {number45s > 0 && <li>{number45s}x45</li>}
        {number35s > 0 && <li>{number35s}x35</li>}
        {number25s > 0 && <li>{number25s}x25</li>}
        {number10s > 0 && <li>{number10s}x10</li>}
        {number5s > 0 && <li>{number5s}x5</li>}
        {number2s > 0 && <li>{number2s}x2.5</li>}
      </ul>
    </>
  );
}
