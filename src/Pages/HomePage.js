import React from 'react'
import { Typography } from '@mui/material'

export default function Home () {
  return (
    <div>
      <Typography
        sx={{ flex: '1 1 100%', marginTop: '3em', marginBottom: '1em' }}
        variant='h4'
        id='tableTitle'
        component='div'
      >
        About
      </Typography>
    </div>
  )
}
