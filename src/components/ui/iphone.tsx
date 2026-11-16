import React, { type HTMLAttributes } from "react"

const PHONE_WIDTH = 433
const PHONE_HEIGHT = 882
export const SCREEN_X = 8 // Slim bezel (was 14)
export const SCREEN_Y = 8 // Slim bezel (was 14)
export const SCREEN_WIDTH = 417 // Expanded screen (was 405)
export const SCREEN_HEIGHT = 866 // Expanded screen (was 854)
export const SCREEN_RADIUS = 34 // Crisp modern curvature

// Calculated percentages
export const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100
export const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100
export const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100
export const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100
export const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100
export const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  videoSrc?: string
  children?: React.ReactNode
}

export function Iphone({
  src,
  videoSrc,
  children,
  className = "",
  style,
  ...props
}: IphoneProps) {
  const hasVideo = !!videoSrc
  const hasMedia = hasVideo || !!src
  const hasContent = hasMedia || !!children

  return (
    <div
      className={`relative inline-block w-full align-middle leading-none ${className}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      {/* Video Content */}
      {hasVideo && (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          <video
            className="block size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      )}

      {/* Image Content */}
      {!hasVideo && src && (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          <img
            src={src}
            alt=""
            className="block size-full object-cover object-top"
          />
        </div>
      )}

      {/* Live React App Screen Content */}
      {children && (
        <div
          className="absolute z-10 overflow-hidden bg-background"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
            transform: "translateZ(0)",
          }}
        >
          {children}
        </div>
      )}

      {/* SVG Bezel Overlay (Ultra-Slim Modern Bezels) */}
      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none z-20"
        style={{ transform: "translateZ(0)" }}
      >
        <g mask={hasContent ? "url(#screenPunch)" : undefined}>
          {/* Outer Slim Titanium Chassis */}
          <rect
            x="2"
            y="2"
            width="429"
            height="878"
            rx="40"
            ry="40"
            className="fill-[#1e222a] dark:fill-[#15181e]"
          />

          {/* Inner Bezel Rim */}
          <rect
            x="4"
            y="4"
            width="425"
            height="874"
            rx="37"
            ry="37"
            className="fill-[#0c0e12] dark:fill-[#08090b]"
          />
        </g>

        {/* Top Speaker Earphone Slit */}
        <path
          opacity="0.6"
          d="M174 2.5H258V3C258 4.1 257.1 5 256 5H176C174.9 5 174 4.1 174 3V2.5Z"
          className="fill-[#3a4150]"
        />

        {/* Screen Outline Border */}
        <rect
          x={SCREEN_X}
          y={SCREEN_Y}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          rx={SCREEN_RADIUS}
          ry={SCREEN_RADIUS}
          className="fill-transparent stroke-[#1e222a] stroke-[0.8]"
          mask={hasContent ? "url(#screenPunch)" : undefined}
        />

        <defs>
          <mask id="screenPunch" maskUnits="userSpaceOnUse">
            <rect
              x="0"
              y="0"
              width={PHONE_WIDTH}
              height={PHONE_HEIGHT}
              fill="white"
            />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
    </div>
  )
}

export default Iphone
