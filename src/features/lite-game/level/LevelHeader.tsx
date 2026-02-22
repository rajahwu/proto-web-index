interface LevelHeaderProps {
  levelName: string;
  levelDescription: string;
  currentLight: number;
  currentDark: number;
  lightDoorCost: number;
  darkDoorCost: number;
  secretDoorRequirements: { light: number; dark: number };
}

export default function LevelHeader({
  levelName,
  levelDescription,
  currentLight,
  currentDark,
  lightDoorCost,
  darkDoorCost,
  secretDoorRequirements,
}: LevelHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Level Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-purple-600 bg-clip-text text-transparent">
          {levelName}
        </h1>
        <p className="text-slate-400">{levelDescription}</p>
      </div>

      {/* Current Resources */}
      <div className="flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <span className="text-lg">
            <span className="font-bold text-amber-400">{currentLight}</span>
            <span className="text-slate-400 text-sm ml-1">Light</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <span className="text-lg">
            <span className="font-bold text-purple-400">{currentDark}</span>
            <span className="text-slate-400 text-sm ml-1">Dark</span>
          </span>
        </div>
      </div>

      {/* Door Costs Preview */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <div className="text-center text-sm text-slate-400 mb-2">Door Requirements:</div>
        <div className="flex justify-center gap-6 text-sm">
          <div>
            <span className="text-amber-400">Light Door:</span>
            <span className="ml-2 font-mono">{lightDoorCost} Light</span>
          </div>
          <div>
            <span className="text-purple-400">Dark Door:</span>
            <span className="ml-2 font-mono">{darkDoorCost} Dark</span>
          </div>
          <div>
            <span className="text-slate-300">Secret Door:</span>
            <span className="ml-2 font-mono">
              {secretDoorRequirements.light}L + {secretDoorRequirements.dark}D
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
