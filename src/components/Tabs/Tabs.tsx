import { Children, FC, ReactElement, useRef, useState } from 'react'

import { TabProps } from '@app-components'
import { startViewTransitionIfNeeded } from '@app-helpers'

import './Tabs.scss'

interface TabsProps {
    className?: string
    children: ReactElement<TabProps>[]
}

export const Tabs: FC<TabsProps> = ({
    className = '',
    children,
}): ReactElement | null => {
    const [activeTab, setActiveTab] = useState(0)
    const tabContainer = useRef<HTMLDivElement>(null)

    const changeTab = (index: number) => {
        startViewTransitionIfNeeded(() => {
            tabContainer.current?.children[0].scrollTo({ top: 0, behavior: 'instant' })
            setActiveTab(index)
        })
    }

    return (
        <div className={`tabs ${className}`}>
            <ul className="tabs__handles-container">
                {
                    Children.map(children, (tab, index) => (
                        <li className="tabs__handle">
                            <label className="tabs__handle-label">
                                <input
                                    type="radio"
                                    name="styling-tabs"
                                    onInput={() => changeTab(index)}
                                    defaultChecked={index === 0}
                                    className="tabs__handle-input"
                                />
                                {tab.props.name}
                            </label>
                        </li>
                    ))

                }
            </ul>
            <span className="tabs__active-indicator" />
            <div className="tabs__content-container" ref={tabContainer}>
                {children[activeTab]}
            </div>
        </div>
    )
}
