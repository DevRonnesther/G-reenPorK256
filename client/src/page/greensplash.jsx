import React, { useEffect, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import greenPorkIcon from "../assets/redgreenpork.png";

const DEFAULT_REDIRECT_TO = "/login";
const DEFAULT_SPLASH_DURATION_MS = 3000;
const EXIT_DURATION_MS = 420;
const SMOOTH_EASE = [0.22, 1, 0.36, 1];

/**
 * Borderless branded splash screen with spring entrance, tactile tap feedback,
 * ambient glow, and keyboard/click skip support.
 *
 * @param {object} [props]
 * @param {string} [props.redirectTo] - Destination route after the splash completes.
 * @param {number} [props.durationMs] - Time in ms before starting the exit transition.
 * @param {boolean} [props.allowSkip] - Whether users can click or press keys to skip early.
 * @param {() => void} [props.onComplete] - Optional callback fired right before navigation.
 */
export default function GreenSplash({
    redirectTo = DEFAULT_REDIRECT_TO,
    durationMs = DEFAULT_SPLASH_DURATION_MS,
    allowSkip = true,
    onComplete,
}) {
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();
    const [isExiting, setIsExiting] = useState(false);

    const exitTimerRef = useRef(null);
    const isExitingRef = useRef(false);

    const completeNavigation = useCallback(() => {
        onComplete?.();
        navigate(redirectTo, { replace: true });
    }, [navigate, redirectTo, onComplete]);

    const triggerExit = useCallback(() => {
        if (isExitingRef.current) return;
        isExitingRef.current = true;

        if (shouldReduceMotion || EXIT_DURATION_MS <= 0) {
            completeNavigation();
            return;
        }

        setIsExiting(true);
        exitTimerRef.current = window.setTimeout(completeNavigation, EXIT_DURATION_MS);
    }, [completeNavigation, shouldReduceMotion]);

    // Auto-dismiss timer
    useEffect(() => {
        if (isExitingRef.current) return undefined;

        if (durationMs <= 0) {
            completeNavigation();
            return undefined;
        }

        const autoTimer = window.setTimeout(triggerExit, durationMs);
        return () => window.clearTimeout(autoTimer);
    }, [completeNavigation, durationMs, triggerExit]);

    // Clean up exit timer if unmounted early
    useEffect(() => {
        return () => {
            if (exitTimerRef.current) {
                window.clearTimeout(exitTimerRef.current);
            }
        };
    }, []);

    const handleKeyDown = (event) => {
        if (!allowSkip) return;
        if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
            event.preventDefault();
            triggerExit();
        }
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{
                duration: shouldReduceMotion ? 0.1 : isExiting ? EXIT_DURATION_MS / 1000 : 0.4,
                ease: SMOOTH_EASE,
            }}
            onClick={allowSkip ? triggerExit : undefined}
            onKeyDown={handleKeyDown}
            tabIndex={allowSkip ? 0 : undefined}
            role={allowSkip ? "button" : undefined}
            aria-label={
                allowSkip
                    ? "Greenpork splash screen. Click or press Enter or Escape to continue."
                    : "Greenpork splash screen"
            }
            aria-busy={!isExiting}
            className={[
                "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden border-0 bg-[#D9FF00] outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 selection:bg-transparent",
                allowSkip ? "cursor-pointer" : "",
            ].join(" ")}
        >
            {/* Ambient radial glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45)_0%,rgba(217,255,0,0)_58%,rgba(0,0,0,0.05)_100%)]"
            />

            {/* Center Stage */}
            <div className="relative z-10 flex flex-col items-center border-0">
                {/* Pulsing aura behind the logo */}
                {!shouldReduceMotion && (
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                            isExiting
                                ? { opacity: 0, scale: 1.4 }
                                : {
                                    opacity: [0.25, 0.5, 0.25],
                                    scale: [0.95, 1.08, 0.95],
                                }
                        }
                        transition={
                            isExiting
                                ? { duration: EXIT_DURATION_MS / 1000, ease: SMOOTH_EASE }
                                : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                        }
                        className="pointer-events-none absolute -inset-6 border-0 bg-white/60 blur-2xl"
                    />
                )}

                {/* Logo with spring entrance, tactile press, and upward exit */}
                <motion.div
                    initial={
                        shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.72, y: 18, rotate: -3 }
                    }
                    animate={
                        shouldReduceMotion
                            ? { opacity: isExiting ? 0 : 1 }
                            : isExiting
                                ? { opacity: 0, scale: 1.08, y: -12 }
                                : { opacity: 1, scale: 1, y: 0, rotate: 0 }
                    }
                    whileHover={allowSkip && !shouldReduceMotion ? { scale: 1.04 } : undefined}
                    whileTap={allowSkip && !shouldReduceMotion ? { scale: 0.94 } : undefined}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0.1 }
                            : isExiting
                                ? { duration: EXIT_DURATION_MS / 1000, ease: SMOOTH_EASE }
                                : {
                                    opacity: { duration: 0.35, ease: SMOOTH_EASE },
                                    scale: { type: "spring", stiffness: 280, damping: 18, mass: 0.85 },
                                    y: { type: "spring", stiffness: 240, damping: 20 },
                                    rotate: { type: "spring", stiffness: 220, damping: 16 },
                                }
                    }
                    className="relative border-0"
                >
                    <img
                        src={greenPorkIcon}
                        alt="Greenpork logo"
                        draggable={false}
                        className="h-28 w-auto select-none border-0 object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.12)] will-change-transform sm:h-36 md:h-44"
                    />
                </motion.div>
            </div>

            {/* Frameless borderless skip hint */}
            {allowSkip && (
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 4 : 0 }}
                    transition={{
                        delay: shouldReduceMotion || isExiting ? 0 : 0.45,
                        duration: 0.35,
                        ease: SMOOTH_EASE,
                    }}
                    className="pointer-events-none absolute bottom-10 inset-x-0 border-0 text-center text-xs font-medium tracking-wide text-black/75"
                >
                    Tap anywhere to continue
                </motion.p>
            )}
        </motion.main>
    );
}