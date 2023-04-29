import React from "react";
import GeneratedWords from "../components/GeneratedWords";
import RestartButton from "../components/RestartButton";
import Results from "../components/Results";
import UserTypings from "../components/UserTyping";
import useEngine from "../hooks/useEngine";
import { calculateAccuracyPercentage } from "../utils/helper";

const App = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } =
    useEngine();

  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col">
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </div>
  );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;
