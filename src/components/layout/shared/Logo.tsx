'use client'

// Next Imports
// import Img from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

// Type Imports
import type { Locale } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const Logo = () => {
  // Hooks
  const { isHovered, transitionDuration } = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { lang: locale } = params

  // Vars
  const { layout, mode } = settings

  // You may return any JSX here to display a logo in the sidebar header
  // return <Img src='/next.svg' width={100} height={25} alt='logo' /> // for example
  return (
    <>
      {layout == 'collapsed' && !isHovered ? (
        <Link href={getLocalizedUrl('/', locale as Locale)}>
          <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15.7393 6.24888L21.2207 9.59165L26.3842 6.49233L15.7393 0.000244141' fill='#1E2C5B' />
            <path d='M10.543 9.5918V15.9978L21.3763 22.4538L26.3838 19.3471L10.543 9.5918Z' fill='#223F6E' />
            <path d='M15.7393 25.9874V31.9967L26.3842 25.4997V19.3469L15.7393 25.9874Z' fill='#1E2C5B' />
            <path
              d='M26.376 13.3167L10.4192 22.704L15.743 25.9894V32.0003L5.09377 25.5V6.61557H5.18839L5 6.50736L15.743 0.00708008V6.25407L10.5505 9.35913V16.0029L26.376 6.49015V13.3167Z'
              fill='#4CA2DA'
            />
          </svg>
        </Link>
      ) : mode == 'dark' ? (
        <Link href='/'>
          <svg width='184' height='32' viewBox='0 0 184 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1.7998 5.81592H4.05525V19.1334H19.0929V5.81592H21.3483V33.668H19.0929V21.2642H4.05626V33.668H1.7998V5.81592Z'
              fill='white'
            />
            <path
              d='M27.3662 10.7617C27.3662 7.03157 29.7407 5.70089 32.3512 5.81533L44.5806 6.34683V7.98302H32.3522C30.1361 7.98302 29.6227 9.12457 29.6227 10.7617V18.7128L42.998 19.0174V20.6924L29.6227 20.9959V28.9868C29.6227 31.4978 31.2446 31.6123 32.7486 31.6123H44.5816V33.2097L32.7486 33.7809C30.1361 33.8944 27.3672 33.2863 27.3672 28.9868V10.7617H27.3662Z'
              fill='white'
            />
            <path
              d='M50.0049 5.81396H52.2593V28.8729C52.2593 31.3839 53.8823 31.4974 55.3863 31.4974H67.0599V33.6661H55.3873C52.7748 33.6661 50.0059 33.1714 50.0059 28.8729L50.0049 5.81396Z'
              fill='white'
            />
            <path
              d='M71.1377 5.81396H82.7337C85.8596 5.81396 89.6594 6.91672 89.6594 13.7282C89.6594 21.6046 85.6619 22.0217 82.7337 22.0217C81.151 22.0217 73.5919 21.4902 73.3941 21.3757V33.6661H71.1387L71.1377 5.81396ZM82.7337 19.8171C85.1475 19.8171 87.4029 19.1314 87.3636 13.7282C87.3242 8.43847 84.6734 8.02045 82.7337 8.02045H73.3931V19.8171H82.7337Z'
              fill='white'
            />
            <path d='M95.0811 5.81396H97.3365V33.6661H95.0811V5.81396Z' fill='white' />
            <path
              d='M103.353 5.81396H105.648L121.755 29.5945V5.81396H124.011V33.6661H121.755L105.609 9.88456V33.6661H103.353V5.81396Z'
              fill='white'
            />
            <path
              d='M170.387 4.72168C177.232 4.72168 181.385 5.97768 181.385 19.0265C181.385 31.3149 177.509 32.9123 170.387 32.9123C163.264 32.9123 159.387 31.6951 159.387 19.0265C159.387 5.97768 163.7 4.72168 170.387 4.72168ZM170.387 30.7446C176.756 30.7446 179.131 29.1084 179.131 19.0265C179.131 7.34618 176.124 6.88937 170.387 6.88937C164.926 6.88937 161.642 7.15608 161.642 19.0265C161.642 29.3373 163.858 30.7446 170.387 30.7446Z'
              fill='white'
            />
            <path
              d='M186.531 4.91089L194.008 17.0849L201.606 4.91089H204.139L195.512 18.7608L203.941 32.7601H201.407L194.007 20.6618L186.649 32.7601H184.116L192.544 18.7608L183.997 4.91089H186.531Z'
              fill='white'
            />
            <path
              d='M207.026 30.7396C207.026 30.4012 207.187 30.1936 207.539 30.1936H208.591C208.994 30.1936 209.158 30.4021 209.158 30.7396V32.2692C209.158 32.6329 208.916 32.7619 208.591 32.7619H207.539C207.241 32.7619 207.026 32.5543 207.026 32.2692V30.7396Z'
              fill='white'
            />
            <path
              d='M212.798 15.2511C212.798 14.9136 212.987 14.7061 213.339 14.7061H214.336C214.659 14.7061 214.849 14.9398 214.849 15.2511V16.704C214.849 17.0415 214.633 17.2239 214.336 17.2239H213.339C213.015 17.2239 212.798 17.0173 212.798 16.704V15.2511ZM213.015 18.9881H214.552V32.7614H213.015V18.9881Z'
              fill='white'
            />
            <path
              d='M224.022 18.8599C228.797 18.8599 230.201 20.8054 230.201 26.0709C230.201 31.157 228.744 32.895 224.022 32.895C219.22 32.895 217.844 31.0008 217.844 26.0709C217.844 20.4427 219.462 18.8599 224.022 18.8599ZM224.022 31.416C227.099 31.416 228.663 30.8447 228.663 26.0709C228.663 20.9092 227.207 20.3389 224.022 20.3389C220.92 20.3389 219.382 20.754 219.382 26.0709C219.382 30.9756 221.027 31.416 224.022 31.416Z'
              fill='white'
            />
            <path d='M141.218 9.85046L146.362 12.9874L151.207 10.0789L141.218 3.98657' fill='#1E2C5B' />
            <path d='M136.342 12.9875V18.9991L146.508 25.0576L151.207 22.1422L136.342 12.9875Z' fill='#223F6E' />
            <path d='M141.218 28.3734V34.0127L151.207 27.9157V22.1418L141.218 28.3734Z' fill='#1E2C5B' />
            <path
              d='M151.2 16.483L136.225 25.2923L141.221 28.3754V34.0162L131.228 27.9162V10.1945H131.316L131.14 10.093L141.221 3.99292V9.85527L136.348 12.7691V19.0038L151.2 10.0768V16.483Z'
              fill='#4CA2DA'
            />
          </svg>
        </Link>
      ) : (
        <Link href='/'>
          <svg width='184' height='32' viewBox='0 0 184 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_2582_2767)'>
              <path
                d='M1.42773 5.23096H3.21653V15.7933H15.1429V5.23096H16.9317V27.3211H15.1429V17.4833H3.21733V27.3211H1.42773V5.23096Z'
                fill='#1E2C5B'
              />
              <path
                d='M21.7031 9.1533C21.7031 6.19482 23.5863 5.13943 25.6567 5.2302L35.3559 5.65174V6.94944H25.6575C23.8999 6.94944 23.4927 7.85483 23.4927 9.1533V15.4595L34.1007 15.701V17.0295L23.4927 17.2703V23.608C23.4927 25.5996 24.7791 25.6903 25.9719 25.6903H35.3567V26.9573L25.9719 27.4103C23.8999 27.5004 21.7039 27.018 21.7039 23.608V9.1533H21.7031Z'
                fill='#1E2C5B'
              />
              <path
                d='M39.6602 5.23022H41.4482V23.5188C41.4482 25.5104 42.7354 25.6004 43.9282 25.6004H53.1866V27.3204H43.929C41.857 27.3204 39.661 26.9281 39.661 23.5188L39.6602 5.23022Z'
                fill='#1E2C5B'
              />
              <path
                d='M56.4199 5.23022H65.6167C68.0959 5.23022 71.1095 6.10485 71.1095 11.5072C71.1095 17.7542 67.9391 18.0849 65.6167 18.0849C64.3615 18.0849 58.3663 17.6634 58.2095 17.5726V27.3204H56.4207L56.4199 5.23022ZM65.6167 16.3365C67.5311 16.3365 69.3199 15.7926 69.2887 11.5072C69.2575 7.31178 67.1551 6.98024 65.6167 6.98024H58.2087V16.3365H65.6167Z'
                fill='#1E2C5B'
              />
              <path d='M75.4102 5.23022H77.199V27.3204H75.4102V5.23022Z' fill='#4CA1D9' />
              <path
                d='M81.9688 5.23022H83.7896L96.564 24.0911V5.23022H98.3528V27.3204H96.564L83.7583 8.45871V27.3204H81.9688V5.23022Z'
                fill='#4CA1D9'
              />
              <path
                d='M135.135 4.36304C140.564 4.36304 143.858 5.3592 143.858 15.7085C143.858 25.4547 140.784 26.7217 135.135 26.7217C129.486 26.7217 126.411 25.7563 126.411 15.7085C126.411 5.3592 129.832 4.36304 135.135 4.36304ZM135.135 25.0024C140.187 25.0024 142.07 23.7047 142.07 15.7085C142.07 6.44459 139.686 6.08228 135.135 6.08228C130.805 6.08228 128.2 6.29382 128.2 15.7085C128.2 23.8862 129.958 25.0024 135.135 25.0024Z'
                fill='#4CA1D9'
              />
              <path
                d='M147.939 4.51343L153.87 14.1689L159.895 4.51343H161.904L155.062 15.4981L161.747 26.6013H159.738L153.869 17.0058L148.033 26.6013H146.024L152.708 15.4981L145.93 4.51343H147.939Z'
                fill='#4CA1D9'
              />
              <path
                d='M164.194 24.9966C164.194 24.7281 164.322 24.5635 164.601 24.5635H165.435C165.755 24.5635 165.885 24.7289 165.885 24.9966V26.2096C165.885 26.4981 165.693 26.6004 165.435 26.6004H164.601C164.365 26.6004 164.194 26.4358 164.194 26.2096V24.9966Z'
                fill='#1E2C5B'
              />
              <path
                d='M168.772 12.7133C168.772 12.4456 168.923 12.281 169.201 12.281H169.992C170.248 12.281 170.399 12.4664 170.399 12.7133V13.8656C170.399 14.1333 170.228 14.2779 169.992 14.2779H169.201C168.944 14.2779 168.772 14.1141 168.772 13.8656V12.7133ZM168.944 15.6772H170.164V26.6011H168.944V15.6772Z'
                fill='#1E2C5B'
              />
              <path
                d='M177.673 15.5732C181.461 15.5732 182.574 17.1163 182.574 21.2925C182.574 25.3264 181.418 26.7049 177.673 26.7049C173.865 26.7049 172.773 25.2025 172.773 21.2925C172.773 16.8286 174.057 15.5732 177.673 15.5732ZM177.673 25.5318C180.113 25.5318 181.354 25.0787 181.354 21.2925C181.354 17.1986 180.2 16.7463 177.673 16.7463C175.213 16.7463 173.993 17.0756 173.993 21.2925C173.993 25.1825 175.298 25.5318 177.673 25.5318Z'
                fill='#1E2C5B'
              />
              <path d='M112.218 6.85046L117.362 9.9874L122.207 7.07892L112.218 0.986572' fill='#1E2C5B' />
              <path d='M107.342 9.98755V15.9991L117.508 22.0576L122.207 19.1422L107.342 9.98755Z' fill='#223F6E' />
              <path d='M112.218 25.3734V31.0127L122.207 24.9157V19.1418L112.218 25.3734Z' fill='#1E2C5B' />
              <path
                d='M122.2 13.483L107.225 22.2923L112.221 25.3754V31.0162L102.228 24.9162V7.1945H102.316L102.14 7.09296L112.221 0.99292V6.85527L107.348 9.76913V16.0038L122.2 7.07681V13.483Z'
                fill='#4CA2DA'
              />
            </g>
            <defs>
              <clipPath id='clip0_2582_2767'>
                <rect width='184' height='30.7694' fill='white' transform='translate(0 0.615234)' />
              </clipPath>
            </defs>
          </svg>
        </Link>
      )}
    </>
  )
}

export default Logo
