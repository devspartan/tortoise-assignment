import react from 'react';
import Canvas from './canvas';

function Index() {
  return (
    <div
      style={{minHeight: '100%'}}
      className="bg-primary-blue flex flex-col justify-between text-white text-center"
    >
      <div className="p-4 flex-grow">
        <div className="text-3xl">Type The Alphabet</div>

        <p className="my-8">
          Typing game to see how fast you type. Timer starts when you do :)
        </p>

        <Canvas />

        <div className="mt-8">Time: 0.000s</div>
        <p className="my-4">my best time: 1.39 s!</p>
      </div>

      <div className="flex">
        <input
          className="text-black border-none text-center w-full bg-primary-orange"
          placeholder="Type here"
        />
        <button className="border-none py-2 px-6 bg-primary-pink">Reset</button>
      </div>
    </div>
  );
}

export default Index;
