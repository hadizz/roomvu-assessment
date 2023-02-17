import React from 'react';
import cx from "classnames"
import {ReactChildren} from "@/types";

interface TypographyProps extends Partial<Omit<HTMLElement, 'children'>>, ReactChildren {
    variant?: 'heading1' | 'heading3' | 'body1' | 'small';
    fontFamily?: 'default' | 'secondary';
    color?: string;
    size?: any;
    weight?: any;
}

const variants: {
    [key in 'heading1' | 'heading3' | 'body1' | 'small']: {
        tag: 'h1' | 'h3' | 'p' | 'small',
        size: string,
        weight: '300' | '400' | '500' | '700' | '900',
        lineHeight: string
    }
} =
    {
        heading1: {
            tag: 'h1',
            size: '40px',
            lineHeight: '1.1',
            weight: '900'
        },
        heading3: {
            tag: 'h3',
            size: '28px',
            lineHeight: '1.1',
            weight: '900'
        },
        body1: {
            tag: 'p',
            size: '16px',
            lineHeight: '1.75',
            weight: '400'
        },
        small: {
            tag: 'small',
            size: '12px',
            lineHeight: '1.75',
            weight: '300'
        }
    }


const Typography: React.FC<TypographyProps> = ({
                                                   variant = 'body1',
                                                   fontFamily,
                                                   color = '',
                                                   className,
                                                   children,
                                                   style,
                                                   size,
                                                   weight,
                                                   ...props
                                               }) => {
    const Tag = variants[variant].tag as any;

    return (
        <Tag className={cx(className, fontFamily === 'secondary' && 'fontFamilySecondary', color)}
             style={{
                 lineHeight: variants[variant].lineHeight,
                 fontWeight: weight || variants[variant].weight,
                 fontSize: size || variants[variant].size,
                 color: variant === 'heading1' && 'var(--textHeading)',
                 ...style,
             }} {...props}>
            {children}
        </Tag>
    );
};

export default Typography;
