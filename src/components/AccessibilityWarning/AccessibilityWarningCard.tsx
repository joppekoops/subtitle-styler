import { FC, ReactElement } from 'react'

import { AccessibilityWarning } from '@app-a11y/entities'
import { Icon } from '@app-components'

import './AccessibilityWarningCard.scss'

export interface AccessibilityWarningCardProps {
    warnings: (AccessibilityWarning | null)[]
    className?: string
}

export const AccessibilityWarningCard: FC<AccessibilityWarningCardProps> = ({
    warnings,
    className = '',
}): ReactElement => (
    <div className={`accessibility-warning ${className}`}>
        {
            warnings.map((warning, index) => {
                if (warning && ! warning.isCompliant) {
                    return (
                        <div key={index} className={`accessibility-warning__card`}>
                            <span className="accessibility-warning__title">
                                <Icon name="error" className="accessibility-warning__icon" />
                                {warning.title}
                            </span>
                            <span className="accessibility-warning__description">{warning.message}</span>
                            {warning.link &&
                                <a className="accessibility-warning__link" href={warning.link} target="_blank">
                                    Learn More
                                </a>
                            }
                        </div>
                    )
                }
            })
        }
    </div>
)