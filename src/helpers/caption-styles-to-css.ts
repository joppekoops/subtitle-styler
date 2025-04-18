import { CaptionStyles } from '@app-entities'

export const captionStylesToCss = (styles: CaptionStyles, selector: string): string => `.${selector} {
    font-family: ${styles.fontFamily};
    font-weight: ${styles.fontVariant};
    font-size: max(calc(${styles.fontSize} / 16 * 5cqh), 14px);
    color: ${styles.fill};
    text-decoration: ${styles.underline ? 'underline' : 'none'};
    font-style: ${styles.italics ? 'italic' : 'normal'};
    
    text-stroke: ${styles.stroke.width}px ${styles.stroke.color};
    -webkit-text-stroke: ${styles.stroke.width}px ${styles.stroke.color};
    
    background-color: ${styles.box.color}${styles.box.opacity.toString(16).padStart(2, '0')};
    padding-top: ${styles.box.padding.top}px;
    padding-right: ${styles.box.padding.right}px;
    padding-bottom: ${styles.box.padding.bottom}px;
    padding-left: ${styles.box.padding.left}px;
    
    text-shadow: ${styles.shadow.map((shadow) => `
        ${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}
    `).join(', ')};
    
    animation: 
        ${styles.transition.start.preset} ${styles.transition.start.duration}s ${styles.transition.start.easing},
        ${styles.transition.end.preset} ${styles.transition.end.duration}s ${styles.transition.end.easing} calc(var(--cue-duration) - ${styles.transition.end.duration}s);
    ;
    
    animation-fill-mode: forwards;
}`