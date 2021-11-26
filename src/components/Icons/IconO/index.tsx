import * as React from "react"
import Svg, { Circle } from "react-native-svg"

export const IconO: React.FC = (props: any) => {
    return (
        <Svg
            width={60}
            height={60}
            viewBox="0 0 175 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle cx={87.5} cy={87.5} r={72.5} stroke="#E51C44" strokeWidth={30} />
        </Svg>
    )
}