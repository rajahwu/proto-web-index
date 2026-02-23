// Loop prototype – game state hook (useReducer-based, self-contained)

import { useReducer, useCallback, useRef, useEffect } from 'react';
import type { LoopState, LoopAction, TapCell, DraftCard, LoopScreen } from './types';
import { cardPool, shuffle } from './data';

// ---- helpers ----

function emptyGrid(): TapCell[] {
  return Array.from({ length: 9 }, () => ({ state: 'empty' as const, type: null }));
}

// ---- initial state ----

const initialState: LoopState = {
  screen: 'title',
  vessel: null,
  health: 10,
  maxHealth: 10,
  light: 0,
  dark: 0,
  points: 0,
  depth: 1,
  maxDepth: 5,
  hand: [],
  currency: 3,
  runs: 0,
  draftPool: { light: [], dark: [] },
  draftPicked: 0,
  draftMax: 2,
  levelTimeLeft: 100,
  levelActive: false,
  tapGrid: emptyGrid(),
  litCellIndex: -1,
  tapsHit: 0,
  tapsNeeded: 7, // 5 + depth*2 at depth 1
};

// ---- reducer ----

function loopReducer(state: LoopState, action: LoopAction): LoopState {
  switch (action.type) {
    case 'GO_TO':
      return { ...state, screen: action.screen };

    case 'PICK_VESSEL':
      return { ...state, vessel: action.vessel };

    case 'CONFIRM_VESSEL': {
      if (!state.vessel) return state;
      return {
        ...state,
        light: state.vessel.startLight,
        dark: state.vessel.startDark,
        health: 10,
        points: 0,
        depth: 1,
        currency: 3,
        hand: [],
        screen: 'staging',
      };
    }

    case 'HEAL_ACTION': {
      if (state.currency < 1 || state.health >= state.maxHealth) return state;
      return {
        ...state,
        currency: state.currency - 1,
        health: Math.min(state.maxHealth, state.health + 3),
      };
    }

    case 'BOOST_ACTION': {
      if (state.currency < 2) return state;
      return {
        ...state,
        currency: state.currency - 2,
        light: state.light + 1,
        dark: state.dark + 1,
      };
    }

    case 'INIT_DRAFT':
      return {
        ...state,
        draftPool: { light: action.lightCards, dark: action.darkCards },
        draftPicked: 0,
        hand: [],
        screen: 'draft',
      };

    case 'PICK_CARD': {
      if (state.draftPicked >= state.draftMax) return state;
      const card: DraftCard = state.draftPool[action.pool][action.index];
      if (!card) return state;
      const newPicked = state.draftPicked + 1;
      return {
        ...state,
        hand: [...state.hand, card],
        light: state.light + (card.light || 0),
        dark: state.dark + (card.dark || 0),
        health: card.heal ? Math.min(state.maxHealth, state.health + card.heal) : state.health,
        points: state.points + (card.points || 0),
        draftPicked: newPicked,
      };
    }

    case 'START_LEVEL':
      return {
        ...state,
        levelTimeLeft: 100,
        levelActive: true,
        tapGrid: emptyGrid(),
        litCellIndex: -1,
        tapsHit: 0,
        tapsNeeded: 5 + state.depth * 2,
        screen: 'level',
      };

    case 'LIGHT_RANDOM': {
      const grid = emptyGrid();
      grid[action.cellIndex] = {
        state: action.cellType === 'light' ? 'lit' : 'dark-lit',
        type: action.cellType,
      };
      return { ...state, tapGrid: grid, litCellIndex: action.cellIndex };
    }

    case 'TAP_CELL': {
      if (!state.levelActive) return state;
      const grid = [...state.tapGrid.map((c) => ({ ...c }))];
      if (action.index === state.litCellIndex) {
        // Hit
        const cellType = grid[action.index].type;
        grid[action.index] = { state: 'hit', type: cellType };
        const newHit = state.tapsHit + 1;
        return {
          ...state,
          tapGrid: grid,
          tapsHit: newHit,
          points: state.points + state.depth,
          light: state.light + (cellType === 'light' ? 1 : 0),
          dark: state.dark + (cellType === 'dark' ? 1 : 0),
          levelActive: newHit < state.tapsNeeded,
        };
      } else {
        // Miss
        grid[action.index] = { state: 'miss', type: null };
        const newHealth = state.health - 1;
        return {
          ...state,
          tapGrid: grid,
          health: newHealth,
          levelActive: newHealth > 0,
        };
      }
    }

    case 'CLEAR_CELL': {
      const grid = [...state.tapGrid.map((c) => ({ ...c }))];
      grid[action.index] = { state: 'empty', type: null };
      return { ...state, tapGrid: grid };
    }

    case 'TIMER_TICK': {
      if (!state.levelActive) return state;
      const newTime = state.levelTimeLeft - 1.5;
      return {
        ...state,
        levelTimeLeft: Math.max(0, newTime),
        levelActive: newTime > 0,
      };
    }

    case 'APPLY_VESSEL_BONUS': {
      if (!state.vessel) return state;
      switch (state.vessel.levelBonus) {
        case 'light':
          return { ...state, light: state.light + 1 };
        case 'dark':
          return { ...state, dark: state.dark + 1 };
        case 'heal':
          return { ...state, health: Math.min(state.maxHealth, state.health + 1) };
        case 'points':
          return { ...state, points: state.points + 2 };
        case 'choice':
          return { ...state, light: state.light + 1 }; // auto for prototype
        default:
          return state;
      }
    }

    case 'LEVEL_END':
      return { ...state, levelActive: false };

    case 'CHOOSE_DOOR': {
      const nextDepth = state.depth + 1;
      if (nextDepth > state.maxDepth) {
        return { ...state, depth: nextDepth, screen: 'drop' };
      }
      return { ...state, depth: nextDepth, screen: 'draft' };
    }

    case 'RESET_GAME': {
      if (!state.vessel) return { ...initialState };
      const bonusCurrency = state.points >= 10 ? 1 : 0;
      return {
        ...state,
        health: 10,
        light: state.vessel.startLight,
        dark: state.vessel.startDark,
        points: 0,
        depth: 1,
        currency: Math.min(5, state.currency + bonusCurrency + 2),
        hand: [],
        runs: state.runs + 1,
        levelActive: false,
        tapGrid: emptyGrid(),
        screen: 'staging',
      };
    }

    default:
      return state;
  }
}

// ---- hook ----

export function useLoopGame() {
  const [state, dispatch] = useReducer(loopReducer, initialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Navigation
  const goTo = useCallback((screen: LoopScreen) => {
    dispatch({ type: 'GO_TO', screen });
  }, []);

  // Select
  const pickVessel = useCallback((vessel: typeof state.vessel) => {
    if (vessel) dispatch({ type: 'PICK_VESSEL', vessel });
  }, []);

  const confirmVessel = useCallback(() => {
    dispatch({ type: 'CONFIRM_VESSEL' });
  }, []);

  // Staging
  const healAction = useCallback(() => dispatch({ type: 'HEAL_ACTION' }), []);
  const boostAction = useCallback(() => dispatch({ type: 'BOOST_ACTION' }), []);

  // Draft
  const initDraft = useCallback(() => {
    const lightCards = shuffle(cardPool.light).slice(0, 2);
    const darkCards = shuffle(cardPool.dark).slice(0, 2);
    dispatch({ type: 'INIT_DRAFT', lightCards, darkCards });
  }, []);

  const pickCard = useCallback((pool: 'light' | 'dark', index: number) => {
    dispatch({ type: 'PICK_CARD', pool, index });
  }, []);

  // Level
  const startLevel = useCallback(() => {
    dispatch({ type: 'START_LEVEL' });
  }, []);

  const lightRandom = useCallback(() => {
    const cellIndex = Math.floor(Math.random() * 9);
    const cellType: 'light' | 'dark' = Math.random() > 0.5 ? 'light' : 'dark';
    dispatch({ type: 'LIGHT_RANDOM', cellIndex, cellType });
  }, []);

  const tapCell = useCallback((index: number) => {
    dispatch({ type: 'TAP_CELL', index });
  }, []);

  const clearCell = useCallback((index: number) => {
    dispatch({ type: 'CLEAR_CELL', index });
  }, []);

  const applyVesselBonus = useCallback(() => {
    dispatch({ type: 'APPLY_VESSEL_BONUS' });
  }, []);

  const endLevel = useCallback((reason: 'complete' | 'timeout' | 'dead') => {
    dispatch({ type: 'LEVEL_END', reason });
  }, []);

  // Door
  const chooseDoor = useCallback((doorType: 'light' | 'dark' | 'secret') => {
    dispatch({ type: 'CHOOSE_DOOR', doorType });
  }, []);

  // Drop / Reset
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Timer management
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      dispatch({ type: 'TIMER_TICK' });
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    state,
    goTo,
    pickVessel,
    confirmVessel,
    healAction,
    boostAction,
    initDraft,
    pickCard,
    startLevel,
    lightRandom,
    tapCell,
    clearCell,
    applyVesselBonus,
    endLevel,
    chooseDoor,
    resetGame,
    startTimer,
    stopTimer,
  } as const;
}

export type LoopGameAPI = ReturnType<typeof useLoopGame>;
