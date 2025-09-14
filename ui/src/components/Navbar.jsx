import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { memo, createContext, useContext, useState } from 'react';
import { pagesConfig } from '../config/pages';

export const NavContext = createContext();
     
export default function Navbar() {
	const pagesConfigEntries = Object.entries(pagesConfig);

	const home = pagesConfigEntries.find(([pageId, _]) => pageId === 'home')[1];

	const isUser = false;
	const allItems = pagesConfigEntries.filter(
		([_, pageConfig]) => pageConfig.navConfig?.[isUser ? 'user' : 'guest']
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
    	<NavContext.Provider value={{ enableMobileMenu, setEnableMobileMenu }}>
		<NavRoot>
			<NavWidthController>
				<NavLayout>
					<HomeLink
						config={home}
					/>
					<DesktopLayout>
						<DesktopLeftMenu>
							{desktopItemsLeft.map(([pageId, pageConfig]) => (
								<DesktopMenuItem
									key={pageId}
									config={pageConfig}
								/>
							))}
						</DesktopLeftMenu>
						<DesktopRightMenu>
							{desktopItemsRight.map(([pageId, pageConfig]) => (
								<DesktopMenuItem
									key={pageId}
									config={pageConfig}
								/>
							))}
						</DesktopRightMenu>
					</DesktopLayout>
					<MobileMenuToggleButton
					/>
				</NavLayout>
			</NavWidthController>
			{enableMobileMenu && (
				<MobileMenu>
					{mobileItems.map(([pageId, pageConfig]) => (
						<MobileMenuItem
							key={pageId}
							config={pageConfig}
						/>
					))}
				</MobileMenu>
			)}
		</NavRoot>
    	</NavContext.Provider>
	);
}

// NavRoot: sticky | position | bg
function NavRoot({ children }) {
	return (
		<nav className='sticky top-0 z-50 bg-gradient-to-r from-black via-slate-800 to-black shadow-lg'>
			{children}
		</nav>
	);
}

// WidthController: MaxWidth | Margin | Padding
function NavWidthController({ children }) {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
	);
}

// NavLayout: Flex | Height | Alignment
function NavLayout({ children }) {
	return <div className='h-16 flex gap-10 items-center'>{children}</div>;
}

// HomeLink
var HomeLink = memo(function HomeLink({ config }) {
	const { enableMobileMenu, setEnableMobileMenu } = useContext(NavContext);

	return (
		<Link
			onClick={() => {
				if (enableMobileMenu) {
					setEnableMobileMenu(false);
				}
			}}
			to='/'
			className='text-white text-2xl font-bold italic'
		>
			{config.title}
			{" VALUE = " + enableMobileMenu}
		</Link>
	);
})

function DesktopLayout({ children }) {
	return (
		<div className='hidden md:flex justify-between flex-1'>{children}</div>
	);
}

function DesktopLeftMenu({ children }) {
	return <div className='flex space-x-6'>{children}</div>;
}

function DesktopRightMenu({ children }) {
	return <div className='flex space-x-6'>{children}</div>;
}

function DesktopMenuItem({ config }) {
	return (
		<NavLink
			to={config.url}
			className={({ isActive, isPending }) =>
				isActive
					? 'text-blue-200 text-lg font-medium'
					: isPending
					? ''
					: 'text-white text-lg font-medium'
			}
		>
			{config.title}
		</NavLink>
	);
}

function MobileMenuToggleButton() {
	const { enableMobileMenu, setEnableMobileMenu } = useContext(NavContext);

	return (
		<div className='md:hidden flex ml-auto'>
			<button
				className='focus:outline-none  cursor-pointer text-white'
				onClick={() => {
					setEnableMobileMenu(!enableMobileMenu);
				}}
			>
				{enableMobileMenu ? (
					<X className='w-6 h-6' />
				) : (
					<Menu className='w-6 h-6' />
				)}
			</button>
		</div>
	);
}

function MobileMenu({ children }) {
	return <div className='md:hidden bg-gray-800'>{children}</div>;
}

function MobileMenuItem({ config }) {
	const { enableMobileMenu, setEnableMobileMenu } = useContext(NavContext);

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