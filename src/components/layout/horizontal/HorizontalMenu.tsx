// Do not remove this following 'use client' else SubMenu rendered in vertical menu on smaller screen will not work.
'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { settings } = useSettings()
  const params = useParams()

  // Vars
  const { skin } = settings
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor:
          skin === 'bordered' ? 'var(--mui-palette-background-paper)' : 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(settings, theme)}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme, settings),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        <SubMenu label={dictionary['navigation'].dashboards} icon={<i className='tabler-smart-home' />}>
          <MenuItem href={`/${locale}/dashboards/crm`} icon={<i className='tabler-chart-pie-2' />}>
            {dictionary['navigation'].crm}
          </MenuItem>
        </SubMenu>
        <SubMenu label='Tickets' icon={<i className='tabler-ticket' />}>
          <MenuItem href={`/${locale}/tickets/viewalltickets`}>View All Tickets</MenuItem>
          <MenuItem href={`/${locale}/tickets/replypage1`}>Reply Page 1</MenuItem>
          <MenuItem href={`/${locale}/tickets/replypage2`}>Reply Page 2</MenuItem>
        </SubMenu>

        <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
          About
        </MenuItem>
        <MenuItem href={`/${locale}/tariffplan`} icon={<i className='tabler-receipt-2' />}>
          Tarrif Plan
        </MenuItem>
      </Menu>
      {/* <Menu
rootStyles={menuRootStyles(theme)}
renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
menuItemStyles={menuItemStyles(settings, theme)}
renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
popoutMenuOffset={{
mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
alignmentAxis: 0
}}
verticalMenuProps={{
menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme, settings),
renderExpandIcon: ({ open }) => (
<RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
),
renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
}}
>
<GenerateHorizontalMenu menuData={menuData(dictionary, params)} />
</Menu> */}
    </HorizontalNav>
  )
}

export default HorizontalMenu
