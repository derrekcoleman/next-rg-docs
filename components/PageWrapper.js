import styles from './styles/PageWrapper.module.scss';
import { useState } from 'react';
import { Box, VStack, Flex, Heading, Text, Link} from '@chakra-ui/react'

export const PageWrapper = (props) => {

	return (
		<div className={styles.mainWrapper}>
			<Sidebar data={props.sidebarData} privateData={props.privatePageData} />
			<div data='spacer'></div>
			<div className={styles.pageWrapper}>
				{props.children}
			</div>
		</div>
	)
}



const SidebarList = ({ data }) => {

	let categoryCount = 0;
	let categories = [];
	let categoryPosts = {};
	data.forEach((post) => {
		if (categories[categoryCount] === post.category) {
			categoryPosts[categories[categoryCount]].push(post);
		}
		if (typeof categories[categoryCount] === 'undefined') {
			categories[categoryCount] = post.category
			categoryPosts[categories[categoryCount]] = [];
			categoryPosts[categories[categoryCount]].push(post);
		}
		if (categories[categoryCount] !== post.category) {
			categoryCount++;
			categories[categoryCount] = post.category
			categoryPosts[categories[categoryCount]] = [];
			categoryPosts[categories[categoryCount]].push(post);
		}

	})
	console.log(categoryPosts);

	return (
		<>
			{categories.map((category, index) => {
				return (
					<>
						<Heading as="h3" sx={{ fontSize: '1.5rem' }} key={`${category}--${index}`}>{category}</Heading>
						<VStack sx={{margin: `1rem 0`, fontSize: `1rem`}}>
						{categoryPosts[category].map((post, index) => {
							return (
								<Box sx={{ width: `100%`, paddingLeft: `1rem`, userSelect: `none`}}>
								<Link href={`/${post.slug}`} key={`${post.slug}--${index}`}>
										<a>
									<Text _hover={{ cursor: `pointer`, color: `brand.100`}}>
											{post['sidebar_label']}
									</Text>
										</a>
								</Link>
								</Box>
							)
						})}
						</VStack>
					</>)
			})}
		</>

		// <>
		// 	{data.map((post) => {
		// 		// create spaces before internal capital letters
		// 		const categoryCharArray = [...category];
		// 		const newCategoryCharArray = categoryCharArray.map((char, index) => {
		// 			if (/[A-Z]/.test(char) && index > 0) {
		// 				return ` ${char}`
		// 			} else {
		// 				return char
		// 			}
		// 		});
		// 		let cleanedCategory = newCategoryCharArray.join('');

		// 		return (
		// 			<>
		// 				<SidebarListItem category={category} data={data} cleanedCategory={cleanedCategory} />
		// 				{/* <Heading as="h2" sx={{ fontSize: '1.5rem', margin: `1ex 0` }}>{cleanedCategory}</Heading>
		// 				{data[category].map((item, index) => {
		// 					return <a key={`${item}--${index}`} href={`/${category}/${item.slug}`}>
		// 						<Heading sx={{ fontSize: `1.25rem`, margin: `.5ex 1em` }} _hover={{ color: `white` }}>{item.title}</Heading>
		// 					</a>
		// 				})} */}
		// 			</>
		// 		)
		// 	})}
		// </>
	)
}

const SidebarListItem = (props) => {

	const [isOpen, setIsOpen] = useState(true);

	const toggleOpen = () => {
		setIsOpen(v => !v);
	}

	return (
		<>
			<Heading
				as="h2"
				sx={{ fontSize: '1.5rem', margin: `1ex 0` }}
				_hover={{ color: `white`, cursor: `pointer` }}
				onClick={() => toggleOpen()}>
				{props.cleanedCategory}
			</Heading>
			{(isOpen)
				?
				<>
					{props.data[props.category].map((item, index) => {
						return <a key={`${item}--${index}`} href={`/${props.category}/${item.slug}`}>
							<Heading sx={{ fontSize: `1.25rem`, margin: `.5ex 1em` }} _hover={{ color: `white` }}>{item.title}</Heading>
						</a>
					})}
				</>
				: null}
		</>
	)
}

const Toggler = (props) => {
	const [isOpen, setIsOpen] = useState(props.isOpen);

	const toggle = () => {
		setIsOpen(v => !v);
	}

	return (
		<>
			<Heading
				color="brand.100"
				sx={{ userSelect: 'none' }}
				onClick={() => toggle()}>{props.label} {(isOpen) ? 'v' : '>'}</Heading>
			{
				(isOpen)
					? props.children
					: null
			}
		</>
	)


}

export const Sidebar = (props) => {
	const data = props.data;
	return (
		<Box
			color="brand.500"
			h='100vh'
			w="100%"
			bg="brand.900"
			p={5}
			sx={{ borderRight: `3px solid`, borderColor: "brand.500", overflowY: 'scroll', userSelect: `none` }}
			css={{
				'&::-webkit-scrollbar': {
					width: '8px',
				},
				'&::-webkit-scrollbar-track': {
					width: '8px',
				},
				'&::-webkit-scrollbar-thumb': {
					background: "rgb(255,56,100)",
					borderRadius: '24px',
				},
			}}
		>
			<Heading sx={{marginBottom: `1rem`}}>Arcana</Heading>
			<Box sx={{ marginLeft: '1em' }}>
				<SidebarList data={data} />
			</Box>
		</Box >
	)
}


export const MobileSidebar = (props) => {
	const isVisible = props.isVisible;

	return (
		<>
			{isVisible && 
			<>
				<Box sx={{
					width: `100%`,
					position: `absolute`,
					top: `0`,
					left: `0`,
				}}>
					<Sidebar data={props.data} />
				</Box>
			</>
			}
		</>
	)
}