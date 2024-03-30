// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Dashboards',
    icon: 'carbon:home',
    children: [
      {
        label: 'CRM Dashboard',
        href: '/dashboards/crm'
      }
    ]
  },
  {
    label: 'Tickets',
    icon: 'carbon:home',
    children: [
      {
        label: 'View All Tickets',
        href: '/tickets/viewalltickets'
      },
      {
        label: 'Reply Page 1',
        href: '/tickets/replypage1'
      },
      {
        label: 'Reply Page 2',
        href: '/tickets/replypage2'
      }
    ]
  }
]

export default verticalMenuData