import React, { useRef, useEffect, useState, useCallback } from 'react';
import Header from "./components/common/header/Header";
//@ts-ignore
import { TimepickerUI } from 'timepicker-ui';
import SearchField from './components/common/SearchField';
function Test(this: any) {
  const tmRef = useRef(null);
  const [inputValue, setInputValue] = useState('12:00 PM');

  const testHandler = useCallback((e: CustomEvent) => {
    setInputValue(`${e.detail.hour}:${e.detail.minutes} ${e.detail.type}`);
  }, []);

  useEffect(() => {
    if (inputValue === "10:00 PM") {
      alert("You selected 10:00 PM");
    }
  }, [inputValue]);

  useEffect(() => {
    const tm = (tmRef.current as unknown) as HTMLDivElement;
    const newPicker = new TimepickerUI(tm, {});
    newPicker.create();
    //@ts-ignore
    tm.addEventListener('accept', testHandler);
    return () => {
      //@ts-ignore
      tm.removeEventListener('accept', testHandler);
    };
  }, [testHandler]);
  return (
    <>
     <Header name="test" overview={true} />
       <div className='timepicker-ui' ref={tmRef}>
      Click Here :- <input
        type='test'
        className='timepicker-ui-input'
        defaultValue={inputValue}
      />
    </div>
      <SearchField/>
    </>
  );
}
export default Test;
