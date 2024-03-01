export const TaskCheckedSVG = ({ isCompleted }: { isCompleted: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      width="15px"
      height="15px"
    >
      <path
        d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50  l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
        fill={isCompleted ? '#43a047' : '#CCCCCC'}
      />
    </svg>
  )
}
