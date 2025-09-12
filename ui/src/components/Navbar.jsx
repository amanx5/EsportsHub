import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { pagesConfig } from '../config/pages';

export default function Navbar() {
	const pagesConfigEntries = Object.entries(pagesConfig);

	const home = pagesConfigEntries.find(([pageId, _]) => pageId === 'home')[1];

	const allItems = pagesConfigEntries.filter(
		([_, pageConfig]) => 'navConfig' in pageConfig
	);

	const desktopItemsLeft = allItems.filter(
		([_, pageConfig]) => pageConfig.navConfig.desktop?.position === 'left'
	);

	const desktopItemsRight = allItems.filter(
		([_, pageConfig]) => pageConfig.navConfig.desktop?.position === 'right'
	);

	const mobileItems = allItems.filter(
		([_, pageConfig]) => 'mobile' in pageConfig.navConfig
	);

	const [enableMobileMenu, setEnableMobileMenu] = useState(false);

	return (
		<NavRoot>
			<WidthController>
				<NavLayout>
					<HomeLink
						config={home}
						enableMobileMenu={enableMobileMenu}
						setEnableMobileMenu={setEnableMobileMenu}
					/>
					<DesktopMenu>
						<DesktopLayoutLeft>
							{desktopItemsLeft.map(([pageId, pageConfig]) => (
								<DesktopLayoutItem
									key={pageId}
									config={pageConfig}
								/>
							))}
						</DesktopLayoutLeft>
						<DesktopLayoutRight>
							{desktopItemsRight.map(([pageId, pageConfig]) => (
								<DesktopLayoutItem
									key={pageId}
									config={pageConfig}
								/>
							))}
						</DesktopLayoutRight>
					</DesktopMenu>
					<MobileSubMenuToggleButton
						enableMobileMenu={enableMobileMenu}
						setEnableMobileMenu={setEnableMobileMenu}
					/>
				</NavLayout>
			</WidthController>
			{enableMobileMenu && (
				<MobileMenu>
					{mobileItems.map(([pageId, pageConfig]) => (
						<MobileMenuItem
							key={pageId}
							config={pageConfig}
							enableMobileMenu={enableMobileMenu}
							setEnableMobileMenu={setEnableMobileMenu}
						/>
					))}
				</MobileMenu>
			)}
		</NavRoot>
	);
}

// NavRoot: sticky | position | color scheme
function NavRoot({ children }) {
	return (
		<nav className='bg-gray-900 text-white sticky top-0 z-50'>
			{children}
		</nav>
	);
}

// WidthController: Maxwidth | Margin | Padding
function WidthController({ children }) {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
	);
}

// NavLayout: Flex | Height | Alignment
function NavLayout({ children }) {
	return <div className='flex h-16 gap-10 items-center'>{children}</div>;
}

// HomeLink
function HomeLink({ config, enableMobileMenu, setEnableMobileMenu }) {
	return (
		<Link
			onClick={() => {
				if (enableMobileMenu) {
					setEnableMobileMenu(false);
				}
			}}
			to='/'
			className='text-xl font-bold text-amber-100'
		>
			{config.title}
		</Link>
	);
}

function DesktopMenu({ children }) {
	return (
		<div className='hidden md:flex justify-center flex-1'>{children}</div>
	);
}
function DesktopLayoutLeft({ children }) {
	return <div className='flex space-x-6'>{children}</div>;
}

function DesktopLayoutItem({ config }) {
	return (
		<NavLink
			to={config.url}
			className={({ isActive, isPending }) =>
				isActive
					? 'text-blue-500 font-bold'
					: isPending
					? ''
					: 'text-white font-bold hover:underline'
			}
		>
			{config.title}
		</NavLink>
	);
}

function DesktopLayoutRight({ children }) {
	return <div className='flex'>{children}</div>;
}

function MobileSubMenuToggleButton({ enableMobileMenu, setEnableMobileMenu }) {
	return (
		<div className='md:hidden flex ml-auto'>
			<button
				onClick={() => {
					setEnableMobileMenu(!enableMobileMenu);
				}}
				className='focus:outline-none'
			>
				{enableMobileMenu ? (
					<X className='w-6 h-6' /> // close icon
				) : (
					<Menu className='w-6 h-6' /> // hamburger icon
				)}
			</button>
		</div>
	);
}

function MobileMenu({ children }) {
	return <div className='md:hidden bg-gray-800'>{children}</div>;
}

function MobileMenuItem({ config, enableMobileMenu, setEnableMobileMenu }) {
	return (
		<NavLink
			to={config.url}
			onClick={() => {
				setEnableMobileMenu(!enableMobileMenu);
			}}
			className={({ isActive, isPending }) =>
				isActive
					? 'block px-4 py-2 text-blue-500 font-bold'
					: isPending
					? ''
					: 'block px-4 py-2 text-white font-bold hover:bg-gray-700'
			}
		>
			<div>{config.title}</div>
		</NavLink>
	);
}
