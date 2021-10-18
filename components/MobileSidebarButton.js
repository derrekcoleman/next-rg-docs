import { Box, Heading } from '@chakra-ui/react'

export const MobileSidebarButton = (props) => {

	return (
		<Box
			border="1px"
			borderColor="brand.500"
			sx={{
				position: "absolute",
				bottom: "0",
				right: "0",
				padding: "1rem",
				margin: '2rem',
				backgroundColor: "brand.900",
				borderRadius: `.5rem`,
				display: `grid`,
				placeItems: `center`,
			}}
			color="brand.500"
			_hover={{ background: "brand.500", color: "white" }}
		>
			<Heading sx={{ fontSize: `1.5rem`, lineHeight: `0.7`, paddingBottom: `.3ex` }} onClick={() => props.onClick()}>☰</Heading>
		</Box>
	)
}