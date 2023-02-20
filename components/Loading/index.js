import s from './loading.module.css'

export default function Loading() {
  return (
    <div className={s.body}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#cfd5d5"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.0204081632653061s"
            values="0;40"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="0s"
          ></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.0204081632653061s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="0s"
          ></animate>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#32899e"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.0204081632653061s"
            values="0;40"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="-0.5102040816326531s"
          ></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.0204081632653061s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="-0.5102040816326531s"
          ></animate>
        </circle>
      </svg>
    </div>
  )
}
