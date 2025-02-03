"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/comps/theme-toggle";
import { HoverCardDemo } from "./comps/hover";
import { GenerateAttack } from "./api";
import { Chart } from "./comps/piechart";
import { Slider } from "@/components/ui/slider";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import { ComboboxGAN } from "./comps/gan_options";

import Dataset from "./comps/dataset";
import { ComboboxNIDS } from "./comps/nids_option";

export default function Home() {
  const [joblibPrediction, setJoblibPrediction] = useState(null);
  const [sliderValue, setSliderValue] = useState([100]);
  const [toggleState, setToggleState] = useState(false);
  const [selectedNIDS, setSelectedNIDS] = useState('');



  const HandleGeneration = async () => {
    try {
      const prediction = await GenerateAttack(sliderValue);
      setJoblibPrediction(prediction);
    } catch (error) {
      console.error("Error making joblib prediction:", error);
    }
  };

  return (
    <div className={toggleState ? "blur-sm bg-black/30" : ""}>
      <div className="text-2xl font-bold text-center relative m-10">
        <h1>Attack-GAN Dashboard</h1>
        <span className="absolute right-0 top-0">
          <ModeToggle />
        </span>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="p-4 left-side">
          {/* <HoverCardDemo /> */}
          <div className="grid grid-row-2 gap-4 ">
            <Chart name={"ids evaluation"} data={joblibPrediction} />

            {/* <Chart name={'type of attack'} data={null}/> */}

            <Card className="flex flex-col p-5 m-4">
              <CardContent>
                <CardTitle>Confusion Matrix</CardTitle>
                <CardDescription>
                  <table className="table-auto w-full mt-4">
                    <thead>
                      <tr>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">Predicted benign</th>
                        <th className="px-4 py-2">Predicted attack</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Actual benign</td>
                        <td className="border px-4 py-2">
                          {joblibPrediction
                            ? joblibPrediction.matrix[0][0]
                            : ""}
                        </td>
                        <td className="border px-4 py-2">
                          {joblibPrediction
                            ? joblibPrediction.matrix[0][1]
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Actual attack</td>
                        <td className="border px-4 py-2">
                          {joblibPrediction
                            ? joblibPrediction.matrix[1][0]
                            : ""}
                        </td>
                        <td className="border px-4 py-2">
                          {joblibPrediction
                            ? joblibPrediction.matrix[1][1]
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="flex flex-col p-5 m-4 right-side">
          <CardContent>
            <div className="p-1 -mb-14 right-side gap-10 grid grid-rows-4 ">
              <span className="p-3 ">
                
                <CardTitle className="text-2xl font-serif m-3">
                Attack-GAN Model :
                </CardTitle>
                  
                
                <ComboboxGAN />
              </span>
              <span className="p-3 relative">
                <CardTitle className="text-2xl font-serif m-3">
                  Number of samples to generate <span className="ml-[15vw] text-xl">{sliderValue}</span>
                </CardTitle>
                           
                <Slider 
                  defaultValue={sliderValue} 
                  max={10000} 
                  step={1} 
                  onValueChange={(value) => setSliderValue(value)} 
                />
                <span className="absolute top-24 text-xl">0</span>
                <span className="absolute top-24 right-1 text-xl">10000</span>
              </span>
              <span className="p-3">
                <CardTitle className="text-2xl font-serif m-3">
                  Network - IDS Model:
                </CardTitle>

                <ComboboxNIDS />
              </span>

              <span className="flex justify-center gap-4 mt-10 -translate-y-5">
                <Button onClick={HandleGeneration}>
                  Generate intrusion Attack
                </Button>

              <Button onClick={() => setToggleState(!toggleState)}>
              Train Model
              </Button>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <Card className="flex flex-col p-5 m-4 bottom-dataset">
        <CardContent>
          <CardTitle>Metrics</CardTitle>
          <CardDescription>
            <Dataset />
          </CardDescription>
        </CardContent>
      </Card> */}
      {/* {toggleState && } */}
    </div>
  );
}

// const PredictionApp = () => {

//     const [h5Prediction, setH5Prediction] = useState(null);

//     const handleFeaturesChange = (event) => {
//         setFeatures(event.target.value);
//     };

//     const handleH5Predict = async () => {
//         try {
//             const inputFeatures = features.split(',').map(Number);
//             const prediction = await predictWithH5(inputFeatures);
//             setH5Prediction(prediction);
//         } catch (error) {
//             console.error('Error making TensorFlow prediction:', error);
//         }
//     };
