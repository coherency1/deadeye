import type { DailyChallenge, GameMode } from '../types/game';

interface HeaderProps {
  challenge: DailyChallenge | null;
  mode: GameMode;
  onChangeMode: (mode: GameMode) => void;
}

const MODE_CONFIG: Record<GameMode, { label: string; color: string; activeColor: string }> = {
  easy:   { label: 'Easy',   color: 'text-slate-400', activeColor: 'bg-green-600 text-white' },
  normal: { label: 'Normal', color: 'text-slate-400', activeColor: 'bg-blue-600 text-white' },
  hard:   { label: 'Hard',   color: 'text-slate-400', activeColor: 'bg-red-600 text-white' },
};

export function Header({ challenge, mode, onChangeMode }: HeaderProps) {
  return (
    <header className="w-full max-w-2xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🎯</span>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white leading-none">
              DEADEYE
            </h1>
            {challenge && (
              <p className="text-xs text-slate-400 mt-0.5">
                #{challenge.challengeNumber}
              </p>
            )}
          </div>
        </div>

        {/* Challenge description */}
        {challenge && (
          <div className="text-right flex-1 mx-3">
            <p className="text-sm font-semibold text-slate-200">
              {challenge.description}
            </p>
            {challenge.restriction && (
              <p className="text-xs text-amber-400 mt-0.5">
                ⚡ {challenge.restriction.label}
              </p>
            )}
          </div>
        )}

        {/* Mode selector — segmented control */}
        <div className="flex rounded-lg border border-slate-600 overflow-hidden">
          {(['easy', 'normal', 'hard'] as GameMode[]).map(m => {
            const cfg = MODE_CONFIG[m];
            const isActive = mode === m;
            return (
              <button
                key={m}
                onClick={() => onChangeMode(m)}
                className={`
                  px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer
                  ${isActive ? cfg.activeColor : `bg-slate-800 ${cfg.color} hover:bg-slate-700`}
                `}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
