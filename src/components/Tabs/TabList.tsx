import React, { ReactElement, useState } from 'react'
import { TabItemProps, TabsProps } from './Tabs.props'
import s from './Tabs.module.scss'
import { sanitizeForId } from '../../utils/stringUtils'
import cn from 'classnames'
import TabItem from './TabItem'

const TabList = ({ children, activeTabIndex = 0 }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(activeTabIndex)
	const handleTabClick = (index: number) => setActiveTab(index)

	const tabs = React.Children.toArray(children).filter(
		(child): child is ReactElement<TabItemProps> =>
			React.isValidElement(child) && child.type === TabItem
	)

	return (
		<div className={s.tabs}>
			<nav>
				<ul>
					{tabs.map((tab, index) => (
						<li
							key={`tab-${index}`}
							id={`tab-${sanitizeForId(tab.props.label)}`}
							aria-controls={`tab-${sanitizeForId(tab.props.label)}`}
							aria-selected={activeTab === index}
							onClick={() => handleTabClick(index)}
							className={cn(s.tabBtn, activeTab === index ? s.active : '')}
						>
							<button role='tab'>{tab.props.label}</button>
						</li>
					))}
				</ul>
			</nav>
			{tabs[activeTab]}
		</div>
	)
}

export default TabList
