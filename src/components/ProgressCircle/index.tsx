import { AriaProgressBarProps, useProgressBar } from 'react-aria'

export const ProgressCircle = (props: AriaProgressBarProps) => {
  const { isIndeterminate, value = 0, minValue = 0, maxValue = 100 } = props
  const { progressBarProps } = useProgressBar(props)

  const center = 16
  const strokeWidth = 4
  const r = 16 - strokeWidth
  const c = 2 * r * Math.PI
  const percentage = isIndeterminate
    ? 0.25
    : (value - minValue) / (maxValue - minValue)
  const offset = c - percentage * c

  return (
    <svg
      {...progressBarProps}
      width={16}
      height={16}
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={strokeWidth}
    >
      <circle role="presentation" cx={center} cy={center} r={r} stroke="gray" />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="orange"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        transform="rotate(-90 16 16)"
      >
        {props.isIndeterminate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="1s"
            from="0 16 16"
            to="360 16 16"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  )
}
