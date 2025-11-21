"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsContextType {
    isFeedingEnabled: boolean;
    toggleFeeding: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [isFeedingEnabled, setIsFeedingEnabled] = useState(true);

    // Persist setting
    useEffect(() => {
        const stored = localStorage.getItem("penguin-feeding-enabled");
        if (stored !== null) {
            setIsFeedingEnabled(stored === "true");
        }
    }, []);

    const toggleFeeding = () => {
        setIsFeedingEnabled((prev) => {
            const newValue = !prev;
            localStorage.setItem("penguin-feeding-enabled", String(newValue));
            return newValue;
        });
    };

    return (
        <SettingsContext.Provider value={{ isFeedingEnabled, toggleFeeding }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
