import React from 'react';

interface Props {
  currentAlphabet: string;
}

function Canvas(props: Props) {
  const {currentAlphabet} = props;

  return (
    <div className="h-36 mx-auto my-4 flex rounded-lg bg-slate-100">
      <div className="m-auto pb-2 text-8xl text-primary-green">
        {currentAlphabet}
      </div>
    </div>
  );
}

export default Canvas;
