import { TabItemProps } from './Tabs.props'
import { sanitizeForId } from '../../utils/stringUtils'
import s from './Tabs.module.scss'

const TabItem = ({ label, children }: TabItemProps) => {
	return (
		<div
			className={s.item}
			role='tabpanel'
			aria-labelledby={`tab-${sanitizeForId(label)}`}
			id={`panel-${sanitizeForId(label)}`}
		>
			{children}
		</div>
	)
}

export default TabItem
