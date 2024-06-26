import React, { useState } from 'react'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'
import { Columns } from 'react-feather'

interface HideShowColumnsProps {
  table: any
}

const HideShowColumns: React.FC<HideShowColumnsProps> = ({ table }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button.Ripple
        color='secondary'
        id='react-table-hide-show-columns-btn'
        className='btn-icon ms-1'
        outline
        onClick={() => setModalOpen(!isModalOpen)}
      >
        <Columns size={16} />
      </Button.Ripple>
      <UncontrolledTooltip placement='top' target='react-table-hide-show-columns-btn'>
        Hide/Show Columns
      </UncontrolledTooltip>
      <Modal isOpen={isModalOpen} toggle={() => setModalOpen(!isModalOpen)} className='modal-dialog-centered modal-sm'>
        <ModalHeader toggle={() => setModalOpen(!isModalOpen)}>Set Columns Visibility</ModalHeader>
        <ModalBody>
          <Row>
            {table.getAllLeafColumns().map((column: any) => {
              const { columnDef } = column

              return (
                <Col key={column.id} md='6' className='p-1'>
                  <div className='form-check form-switch'>
                    <Input
                      id={column.id}
                      name={column.id}
                      type='checkbox'
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    <Label htmlFor={column.id} className='form-check-label'>
                      {columnDef.header()}
                    </Label>
                  </div>
                </Col>
              )
            })}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => table.resetColumnVisibility()} outline>
            Reset
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default HideShowColumns
