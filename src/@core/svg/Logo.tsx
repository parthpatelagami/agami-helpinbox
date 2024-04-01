// React Imports
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15.7393 6.24888L21.2207 9.59165L26.3842 6.49233L15.7393 0.000244141' fill='#1E2C5B' />
      <path d='M10.543 9.5918V15.9978L21.3763 22.4538L26.3838 19.3471L10.543 9.5918Z' fill='#223F6E' />
      <path d='M15.7393 25.9874V31.9967L26.3842 25.4997V19.3469L15.7393 25.9874Z' fill='#1E2C5B' />
      <path
        d='M26.376 13.3167L10.4192 22.704L15.743 25.9894V32.0003L5.09377 25.5V6.61557H5.18839L5 6.50736L15.743 0.00708008V6.25407L10.5505 9.35913V16.0029L26.376 6.49015V13.3167Z'
        fill='#4CA2DA'
      />
    </svg>
  )
}

export default Logo
