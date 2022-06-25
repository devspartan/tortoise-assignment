import React from 'react';

interface Props {
  displayText: string;
  textClassName: string;
}

function Screen(props: Props) {
  const {displayText, textClassName} = props;

  return (
    <div className="h-32 md:h-36 mx-auto my-4 flex rounded-lg bg-slate-100">
      <div className={`m-auto text-6xl md:text-8xl font-mono ${textClassName}`}>
        {displayText}
      </div>
    </div>
  );
}

export default Screen;
