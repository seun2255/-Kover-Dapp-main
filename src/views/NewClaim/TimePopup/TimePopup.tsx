import React, { useState } from "react";
import Popup from "../../../components/templates/Popup";
import TimeInput from "./TimeInput";

interface TimeProps {
  hour?: number;
  minute?: number;
  format?: "am" | "pm";
}

function TimePopup() {
  const [mode, setMode] = useState<"enter" | "select">("select");
  const toggleMode = () => setMode((v) => (v === "select" ? "enter" : "select"));

  const [time, setTime] = useState<TimeProps>();
  const updateTime = (props: TimeProps) => {
    setTime((old) => ({ ...old, ...props }));
  };

  const placeholderRemover = () => {};

  return (
    <div>
      <Popup visible maxWidth="max-w-[328px] w-full">
        <div className="flex flex-col gap-6 -m-2">
          <h4 className="uppercase font-medium">{mode} time</h4>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <TimeInput value={time?.hour} placeholder="00" label={mode === "enter" ? "Hour" : undefined} />
              <img src="/images/Separator.svg" alt="" />
              <TimeInput
                value={time?.minute}
                placeholder="00"
                label={mode === "enter" ? "Minute" : undefined}
              />
            </div>
            <div className="flex flex-col w-[52px] h-20">
              <div
                role="button"
                className={`${
                  time?.format === undefined || time.format === "am"
                    ? "bg-white text-dark-100"
                    : "bg-dark-100 text-white"
                } flex-1 flex items-center justify-center font-medium rounded-t w-[52px]`}
                onClick={() => updateTime({ format: "am" })}
              >
                AM
              </div>
              <div
                role="button"
                className={`${
                  time?.format && time.format === "pm" ? "bg-white text-dark-100" : "bg-dark-100 text-white"
                } flex-1 flex items-center justify-center font-medium rounded-b w-[52px]`}
                onClick={() => updateTime({ format: "pm" })}
              >
                PM
              </div>
            </div>
          </div>
          {mode === "select" && (
            <div className="p-3">
              <img src="/images/Clock face - hour.svg" alt="" />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button type="button" onClick={toggleMode}>
              <img src={`/images/${mode === "select" ? "Group 222.svg" : "Group 223 (1).svg"}`} alt="" />
            </button>
            <div className="flex items-center">
              <button type="button" className="py-2.5 px-3 text-dark-400 font-medium">
                CANCEL
              </button>
              <button type="button" className="py-2.5 px-3 text-white font-medium">
                OK
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default TimePopup;
