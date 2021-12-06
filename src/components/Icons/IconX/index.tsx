import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface iconInterface {
  height: number | string;
  width: number | string;
}

export const IconX: React.FC<iconInterface> = ({ height, width }, props) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 147 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        stroke="#243189"
        strokeWidth={30}
        d="M15.607 11.393l120.305 120.306M11.393 131.199L131.699 10.894"
      />
    </Svg>
  )
}
