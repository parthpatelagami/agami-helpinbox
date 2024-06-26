'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import type { getDictionary } from '@/utils/getDictionary'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()
  const params = useParams()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <SubMenu label={dictionary['navigation'].dashboards} icon={<i className='tabler-smart-home' />}>
          <MenuItem href={`/${locale}/dashboards/crm`}>{dictionary['navigation'].crm}</MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].tickets} icon={<i className='tabler-ticket' />}>
          <MenuItem href={`/${locale}/tickets/viewalltickets`}>View All Tickets</MenuItem>
          <MenuItem href={`/${locale}/tickets/viewalltickets2`}>View All Tickets 2</MenuItem>
          <MenuItem href={`/${locale}/tickets/replypage1`}>{dictionary['navigation'].replypage1}</MenuItem>
          <MenuItem href={`/${locale}/tickets/replypage2`}>{dictionary['navigation'].replypage2}</MenuItem>
        </SubMenu>

        <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
          About
        </MenuItem>

        <MenuItem href={`/${locale}/tariffplan`} icon={<i className='tabler-receipt-2' />}>
          Tarrif Plan
        </MenuItem>
        <MenuItem href={`/${locale}/businesshours`} icon={<i className='tabler-building-factory-2' />}>
          Business Hours
        </MenuItem>
        <MenuItem href={`/${locale}/work-flow`} icon={<i className='tabler-grid-dots' />}>
          Work-Flow
        </MenuItem>
        <MenuItem href={`/${locale}/sla`} icon={<i className='tabler-list-tree' />}>
          SLA
        </MenuItem>
        <MenuItem href={`/${locale}/custom-form`} icon={<i className='tabler-layout-2' />}>
          Custom Form
        </MenuItem>
        <MenuItem href={`/${locale}/settings`} icon={<i className='tabler-settings' />}>
          Settings
        </MenuItem>
        <MenuItem href={`/${locale}/ticket-alert`} icon={<i className='custom-ticket-alert' />}>
          {dictionary['navigation'].ticketalert}
        </MenuItem>
        {/* <MenuItem href={`/${locale}/license`} icon={<i className='tabler-license' />}>
          License
        </MenuItem> */}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
