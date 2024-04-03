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
  },
  {
    label: 'Tarrif Plan',
    icon: 'carbon:home',
    href: '/tarrifplan'
  },
  {
    label: 'SLA',
    icon: 'tabler-list-tree',
    href: '/sla'
  }
]

export default horizontalMenuData
