"use client";

import { useState } from "react";
import { Lock, X } from "lucide-react";

export function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Predefined secure password
    if (password === "admin123") {
      onSuccess();
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-[360px] rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-[#a8a8aa] hover:bg-[#1c1c1e] hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#111115]">
          <Lock className="h-5 w-5 text-[#00d4a4]" />
        </div>
        
        <h3 className="text-lg font-semibold text-white">Admin Authentication</h3>
        <p className="mt-1 text-xs text-[#888888]">Enter the workspace password to unlock custom theme creation.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Workspace Password</label>
            <input
              autoFocus
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className={`w-full rounded-md border px-3 py-2 text-xs outline-none focus:ring-1 transition bg-[#1c1c1e] text-white ${
                error ? "border-[#d45656] focus:border-[#d45656] focus:ring-[#d45656]" : "border-[#1f1f1f] focus:border-[#00d4a4] focus:ring-[#00d4a4]"
              }`}
            />
            {error && <p className="mt-2 text-[10px] text-[#d45656]">Incorrect password. Please try again.</p>}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#00d4a4] hover:bg-[#00b48a] py-2.5 text-xs font-semibold text-[#0a0a0a] shadow-sm transition active:scale-95"
          >
            Access Workspace
          </button>
        </form>
      </div>
    </div>
  );
}
