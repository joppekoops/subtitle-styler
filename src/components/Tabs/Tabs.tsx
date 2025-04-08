import { Children, FC, ReactElement, useState } from 'react'

import { TabProps } from '../Tab/Tab'

import './Tabs.scss'

interface TabsProps {
    className?: string
    children: ReactElement<TabProps>[]
}

export const Tabs: FC<TabsProps> = ({
    className = '',
    children
}): ReactElement | null => {
    const [activeTab, setActiveTab] = useState(0)

    const changeTab = (index: number) => {
        if (document.startViewTransition && window.matchMedia(`(prefers-reduced-motion: no-preference)`)) {
            document.startViewTransition(() => {
                setActiveTab(index)
            })
        } else {
            setActiveTab(index)
        }
    }

    return (
        <div className={`tabs ${className}`}>
            <ul className={'tabs__handles-container'}>
                {
                   Children.map(children, (tab, index) => (
                       <li className={'tabs__handle'}>
                           <label>
                               <input
                                   type="radio"
                                   name="styling-tabs"
                                   onInput={() => changeTab(index)}
                                   defaultChecked={index === 0}
                               />
                               { tab.props.name }
                           </label>
                       </li>
                   ))

                }
            </ul>
            <span className={'tabs__active-indicator'}></span>
            <div className={'tabs__content-container'}>
                { children[activeTab] }
            </div>
        </div>
    )
}
