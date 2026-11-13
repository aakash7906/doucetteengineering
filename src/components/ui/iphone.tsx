import React, { type HTMLAttributes } from "react"

const PHONE_WIDTH = 433
const PHONE_HEIGHT = 882
export const SCREEN_X = 14
export const SCREEN_Y = 14
export const SCREEN_WIDTH = 405
export const SCREEN_HEIGHT = 854
export const SCREEN_RADIUS = 50

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

      {/* SVG Bezel Overlay */}
      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none z-20"
        style={{ transform: "translateZ(0)" }}
      >
        <g mask={hasContent ? "url(#screenPunch)" : undefined}>
          {/* Outer Chassis */}
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            className="fill-[#1e222a] dark:fill-[#15181e]"
          />
          {/* Left Action Button */}
          <path
            d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
            className="fill-[#2a2f3a] dark:fill-[#1a1d24]"
          />
          {/* Left Volume Up */}
          <path
            d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
            className="fill-[#2a2f3a] dark:fill-[#1a1d24]"
          />
          {/* Left Volume Down */}
          <path
            d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
            className="fill-[#2a2f3a] dark:fill-[#1a1d24]"
          />
          {/* Right Power Button */}
          <path
            d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
            className="fill-[#2a2f3a] dark:fill-[#1a1d24]"
          />
          {/* Inner Bezel Rim */}
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            className="fill-[#0c0e12] dark:fill-[#08090b]"
          />
        </g>

        {/* Top Speaker Earphone Slit */}
        <path
          opacity="0.6"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
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