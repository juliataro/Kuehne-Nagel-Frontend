import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export function DialogShipment () {
  return (
    <Stack spacing={2} direction='row' style={{ marginTop: '7em' }}>
      <Button variant='text'>Text</Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
    </Stack>
  )
}
