import * as React from "react"
import Svg, { Circle } from "react-native-svg"

interface iconInterface {
    height: number | string;
    width: number | string;
}

export const IconO: React.FC<iconInterface> = ({ height, width }, props) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 175 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle cx={87.5} cy={87.5} r={72.5} stroke="#E51C44" strokeWidth={30} />
        </Svg>
    )
}