// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'Dashboards',
    icon: 'carbon:home',
    children: [
      {
        label: 'CRM Dashboard',
        href: '/dashboards/crm'
      },
      {
        label: 'Test Dashboard',
        href: '/dashboards/test'
      }
    ]
  }
]

export default horizontalMenuData
