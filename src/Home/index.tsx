import React, {useState, useEffect, useRef} from 'react';
import Canvas from './canvas';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function getRandomChar() {
  let res: string = alphabet[Math.floor(Math.random() * alphabet.length)];
  return res;
}

const TargetLength = 10;

function Index() {
  const timerRef = useRef();
  const inputRef = useRef<any>(null);

  const [milliSeconds, setMilliSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const [bestScore, setBestScore] = useState(
    localStorage.getItem('bestScore') || 0
  );

  const [response, setResponse] = useState<string>('');
  const [currentAlphabet, setCurrentAlphabet] = useState<string>(
    getRandomChar()
  );

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
    return () => {
      clearTimer();
    };
  }, []);

  // Attach and start timer
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setMilliSeconds(s => {
        return s + 100;
      });
    }, 100) as any;

    setTimerActive(true);
  };

  // Remove timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Sets random character for canvas
  function setRandomChar() {
    const old: string = currentAlphabet;
    let newChar: string = getRandomChar();
    while (newChar === old) {
      newChar = getRandomChar();
    }
    setCurrentAlphabet(newChar);
  }

  // Reset running timer to zero
  const resetTimer = () => {
    if (timerRef.current) {
      setTimerActive(false);
      setMilliSeconds(0);
      setResponse('');
      setRandomChar();
      inputRef.current.focus();
    }
  };

  // Function to handle success
  const handleSuccess = () => {
    clearTimer();
    setCurrentAlphabet('Success');

    // Updating the best time in local storage
    const bestTime = localStorage.getItem('bestScore');
    if (bestTime) {
      if (milliSeconds < Number(bestTime)) {
        localStorage.setItem('bestScore', String(milliSeconds));
        setBestScore(milliSeconds);
      }
    } else {
      localStorage.setItem('bestScore', String(milliSeconds));
    }
  };

  const handleInput = (e: any) => {
    let val: string = e.target.value;
    const char = val.charAt(val.length - 1);

    console.log(val, char);
    if (val.length === 1) {
      startTimer();
    }

    setResponse(val.toUpperCase());
    if (val.length >= TargetLength) {
      handleSuccess();
    } else if (char.toUpperCase() === currentAlphabet) {
      setRandomChar();
    }
  };

  return (
    <div
      style={{minHeight: 'calc(100vh - 50px)'}}
      className="bg-primary-blue flex flex-col justify-between text-white text-center"
    >
      <div className="p-4 flex-grow">
        <div className="text-3xl">Type The Alphabet</div>

        <p className="my-8">
          Typing game to see how fast you type. Timer starts when you do :)
        </p>

        <Canvas currentAlphabet={currentAlphabet} />

        <div className="mt-8">
          Timer : {Number(milliSeconds / 1000).toFixed(1)} sec
        </div>
        {bestScore && bestScore != 0 ? (
          <p className="my-4">My best time: {Number(bestScore) / 1000} sec!</p>
        ) : (
          ''
        )}
      </div>

      <div className="flex">
        <input
          ref={inputRef}
          value={response}
          onChange={handleInput}
          onKeyDown={e => {
            // Reset by hitting enter
            if (response.length == TargetLength && e.key === 'Enter') {
              resetTimer();
            }
          }}
          className="text-black border-none text-center w-full bg-primary-orange"
          placeholder="Type here"
        />
        <button
          onClick={() => resetTimer()}
          className="border-none py-2 px-6 bg-primary-pink"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Index;
