'use client'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import TabContext from '@mui/lab/TabContext'
import { Card, IconButton } from '@mui/material'

import TabComponent from './TabComponent'

import { useSettings } from '@core/hooks/useSettings'

const TabsLayout = () => {
  const [value, setValue] = useState<string | number>(1)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [incremntTab, setIncremntTab] = useState<[1] | number[]>([1])
  const [closedTabs, setClosedTabs] = useState<[] | number[]>([])
  const [tabCounter, setTabCounter] = useState(2)
  const { settings } = useSettings()
  const { skin } = settings

  const handleIncrement = () => {
    if (closedTabs.length > 0) {
      const closedTabValue: any = closedTabs.pop()

      setIncremntTab(tab => [...tab, closedTabValue])
    } else {
      setIncremntTab(tab => [...tab, tabCounter])
      setTabCounter(counter => counter + 1)
    }
  }

  const handleRemoveTab = (tabValue: any) => {
    setIncremntTab(tab => tab.filter(value => value !== tabValue))
    setClosedTabs(closedTabs => [...closedTabs, tabValue])
  }

  const isBordered = skin == 'bordered'

  const NewTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
      borderTop: isBordered ? 'none' : `5px solid transparent`,
      borderLeft: `1px solid transparent`,
      borderRight: `1px solid transparent`,
      borderRadius: '3px',
      backgroundColor: `white`,
      paddingRight: 5,
      color: `${theme.palette.primary.main}`,
      zIndex: 5,
      transform: 'perspective(60px) rotateX(10deg)'
    },
    borderRadius: '3px',
    backgroundColor: `${theme.palette.primary.darkOpacity}`,
    paddingRight: 5,
    color: `${theme.palette.primary.main}`,
    zIndex: 1,
    transform: 'perspective(60px) rotateX(10deg)',
    margin: '10px 0px -1px 5px'
  }))

  const CustomTabList = styled(TabList)(({ theme }) => ({
    borderBottom: 'none !important',
    backgroundColor: `${theme.palette.primary.darkerOpacity}`,

    '& .MuiTabs-flexContainer': {
      zIndex: 5,
      width: '100%',
      minWidth: 'max-content',
      alignItems: 'center'
    },
    '& .Mui-disabled': {
      display: 'none',
      transition: 'width 2s'
    },
    '& .MuiTab-root:hover': {
      borderBlockEnd: 0
    }
  }))

  return (
    <>
      <Card className=''>
        <TabContext value={value}>
          <CustomTabList
            onChange={handleChange}
            variant='scrollable'
            scrollButtons={true}
            TabIndicatorProps={{
              hidden: true
            }}
          >
            {incremntTab.map((tabValue, index) => (
              <NewTab
                className='w-48 h-5 justify-between'
                key={index}
                value={tabValue.toString()}
                label={`Tab ${tabValue}`}
                icon={
                  tabValue !== 1 && (
                    <IconButton size='small' onClick={() => handleRemoveTab(tabValue)}>
                      <i className='custom-cross-icon text-[20px]' />
                    </IconButton>
                  )
                }
                iconPosition='end'
              />
            ))}
            <IconButton onClick={handleIncrement} className='mt-2 ml-2'>
              <i className='tabler-plus text-[20px]' />
            </IconButton>
          </CustomTabList>
          <TabComponent value={value} incremntTab={incremntTab} />
        </TabContext>
      </Card>
    </>
  )
}

export default TabsLayout
