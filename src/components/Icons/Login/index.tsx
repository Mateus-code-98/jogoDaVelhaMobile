import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

export const LoginSVG:React.FC = (props:any) => {
  return (
    <Svg
      width={387}
      height={360}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M356 16.645c0-.71.377-1.367.989-1.726l25-14.642c1.334-.78 3.011.18 3.011 1.726v137.592c0 .71-.377 1.367-.989 1.726l-25 14.642c-1.334.781-3.011-.18-3.011-1.725V16.645zM0 219.438a2 2 0 01.996-1.73l27-15.664c1.334-.774 3.004.188 3.004 1.73v137.603a2 2 0 01-.996 1.73l-27 15.664c-1.334.774-3.004-.188-3.004-1.73V219.438zm56-31.862c0-.72.387-1.384 1.014-1.739l271-153.66c1.333-.756 2.986.207 2.986 1.74V171.07a2 2 0 01-1.014 1.74l-271 153.659c-1.333.756-2.986-.207-2.986-1.74V187.576zm115.659-121.7c0-1.53-1.65-2.494-2.984-1.74L1.016 158.872A1.999 1.999 0 000 160.614v25.282c0 1.532 1.65 2.495 2.984 1.742L170.643 92.9a2 2 0 001.016-1.74V65.876zM387 172.752c0-1.531-1.651-2.495-2.984-1.741l-167.659 94.737a1.998 1.998 0 00-1.016 1.741v25.282c0 1.532 1.65 2.495 2.984 1.742l167.659-94.737a2 2 0 001.016-1.742v-25.282z"
        fill="url(#prefix__paint0_linear_62289_1701)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_62289_1701"
          x1={193.5}
          y1={1}
          x2={193.5}
          y2={359.047}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E61C44" />
          <Stop offset={1} stopColor="#E61C44" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
