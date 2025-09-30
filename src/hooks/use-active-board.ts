"use client";

import { BoardInfo } from "@/types/BoardTypes";
import { create } from "zustand";

type ActiveBoardState = {
  activeBoard: BoardInfo | null;
  setActiveBoard: (board: BoardInfo | null) => void;
};

function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match[2])) as BoardInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const useActiveBoardStore = create<ActiveBoardState>(set => ({
  activeBoard: getCookie("activeBoard"),
  setActiveBoard: (board: BoardInfo | null) => {
    set({ activeBoard: board });

    if (board) {
      document.cookie = `activeBoard=${encodeURIComponent(
        JSON.stringify(board)
      )}; path=/; max-age=${60 * 60 * 24 * 365 * 10}`;
    } else {
      document.cookie = `activeBoard=; path=/; max-age=0`; // limpa cookie
    }
  }
}));
