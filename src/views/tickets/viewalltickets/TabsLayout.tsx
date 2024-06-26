'use client'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import TabContext from '@mui/lab/TabContext'
import { AppBar, Box, Card, IconButton, useTheme, TabScrollButton, withStyles } from '@mui/material'

import { borderRadius, borderRight } from '@mui/system'

import TabComponent from './TabComponent'

import { useSettings } from '@core/hooks/useSettings'

const TabsLayout = (props: any) => {
  const [value, setValue] = useState<string | number>(1)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [incremntTab, setIncremntTab] = useState<[1] | Number[]>([1])
  const [closedTabs, setClosedTabs] = useState<[] | Number[]>([])
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

  const StyledTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
      backgroundColor: 'grey',
      color: theme.palette.primary.contrastText,
      borderRadius: '15px 15px 0 0'
    },

    // backgroundColor: "background.paper",
    borderRadius: '15px 15px 0 0',
    minWidth: 'auto'
  }))

  const isBordered = skin == 'bordered'

  console.log('IS bordered test', isBordered)

  const NewTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
      borderTop: isBordered ? 'none' : `1px solid var(--mui-palette-divider)`,
      borderLeft: `1px solid var(--mui-palette-divider)`,
      borderRight: `1px solid var(--mui-palette-divider)`,
      borderBottom: 'none',
      boxShadow: '0 5px 0 0px var(--background-color)',
      backgroundColor: 'white'
    },
    borderLeft: `1px solid var(--mui-palette-divider)`,
    background: 'background.paper',
    paddingRight: 1,
    backgroundColor: `var(--mui-palette-primary-lightOpacity)`

    //borderRadius: "8px 8px 0 0"
  }))

  const CustomTabList = styled(TabList)(({ theme }) => ({
    borderBottom: 'none !important',

    '& .MuiTabs-flexContainer': {
      borderBottom: `1px solid var(--mui-palette-divider)`,
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

  const theme = useTheme()

  //   const MyTabScrollButton = withStyles(theme => ({
  //     root: {
  //       width: 28,
  //       overflow: 'hidden',
  //       transition: 'width 0.5s',
  //       '&.Mui-disabled': {
  //         width: 0
  //       }
  //     }
  //   }))(TabScrollButton)
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
                className='w-48 h-12 justify-between'
                key={index}
                value={tabValue.toString()}
                // label={`Tab ${tabValue}`}
                label={`Tab ${tabValue}`}
                icon={
                  tabValue != 1 ? (
                    <Box onClick={() => handleRemoveTab(tabValue)}>
                      <IconButton size='small'>
                        <i className='ticket-cancel' />
                      </IconButton>
                    </Box>
                  ) : (
                    <></>
                  )
                }
                iconPosition='end'
              />
            ))}
            <Box sx={{}}>
              <IconButton onClick={handleIncrement}>
                <i className='ticket-plus' />
              </IconButton>
            </Box>
          </CustomTabList>
          <TabComponent value={value} incremntTab={incremntTab} />
        </TabContext>
      </Card>
    </>
  )
}

export default TabsLayout
