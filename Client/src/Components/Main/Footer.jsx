import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{ padding: "0.8rem", textAlign: "left" }}>
            <Typography variant="body2" color="textSecondary">
                ©2024 - NodeJs Project by Manish
            </Typography>
        </Box>
    )
}

export default Footer;