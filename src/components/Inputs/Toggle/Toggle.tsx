import React, {
    ChangeEventHandler,
    FocusEventHandler,
    MouseEventHandler,
    PureComponent,
    ReactNode,
    RefObject,
    TouchEventHandler
} from 'react'
import pointerCoord from '@/util/pointerCoord'
import classNames from 'classNames'

interface IconTypes {
    checked: ReactNode,
    unchecked: ReactNode
}

interface ToggleProps {
    checked?: boolean;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    className?: string;
    name?: string;
    value?: string;
    id?: string;
    'aria-labelledby'?: string;
    'aria-label'?: string;
    icons?: Partial<IconTypes>;
}

interface ToggleState {
    checked: boolean;
    hasFocus: boolean;
}

export default class Toggle extends PureComponent<ToggleProps, ToggleState> {

    input: RefObject<HTMLInputElement>;
    moved: boolean = false;
    previouslyChecked?: boolean;
    startX: number | null = null;
    activated: boolean = false;

    constructor(props: ToggleProps) {
        super(props)
        this.previouslyChecked = !!(props.checked || props.defaultChecked)
        this.state = {
            checked: !!(props.checked || props.defaultChecked),
            hasFocus: false,
        }
        this.input = React.createRef();
    }

    componentDidUpdate(prevProps: ToggleProps) {
        if (prevProps.checked !== this.props.checked) {
            // Disable linting rule here since this usage of setState inside
            // componentDidUpdate is OK; see
            // https://reactjs.org/docs/react-component.html#componentdidupdate
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({checked: !!this.props.checked})
        }
    }


    handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (this.props.disabled) {
            return
        }
        const checkbox = this.input
        if (event.target !== checkbox.current && !this.moved) {
            this.previouslyChecked = checkbox.current?.checked
            event.preventDefault()
            checkbox.current?.focus()
            checkbox.current?.click()
            return
        }

        const checked = this.props.hasOwnProperty('checked') ? this.props.checked : checkbox.current?.checked

        this.setState({checked: !!checked})
    }

    handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
        if (this.props.disabled) {
            return
        }
        console.log('pointerCoord handleTouchStart', pointerCoord(event))
        this.startX = pointerCoord(event).x
        this.activated = true
    }

    handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
        if (!this.activated) return
        this.moved = true

        if (this.startX) {
            let currentX = pointerCoord(event).x
            if (this.state.checked && currentX + 15 < this.startX) {
                this.setState({checked: false})
                this.startX = currentX
                this.activated = true
            } else if (currentX - 15 > this.startX) {
                this.setState({checked: true})
                this.startX = currentX
                this.activated = (currentX < (!!this.startX ? this.startX : 0) + 5)
            }
        }
    }

    handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
        if (!this.moved) return
        const checkbox = this.input
        event.preventDefault()

        if (this.startX) {
            let endX = pointerCoord(event).x
            if (this.previouslyChecked === true && this.startX + 4 > endX) {
                if (this.previouslyChecked !== this.state.checked) {
                    this.setState({checked: false})
                    this.previouslyChecked = this.state.checked
                    checkbox.current?.click()
                }
            } else if (this.startX - 4 < endX) {
                if (this.previouslyChecked !== this.state.checked) {
                    this.setState({checked: true})
                    this.previouslyChecked = this.state.checked
                    checkbox.current?.click()
                }
            }

            this.activated = false
            this.startX = null
            this.moved = false
        }
    }

    handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
        const {onFocus} = this.props

        if (onFocus) {
            onFocus(event)
        }

        this.setState({hasFocus: true})
    }

    handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const {onBlur} = this.props

        if (onBlur) {
            onBlur(event)
        }

        this.setState({hasFocus: false})
    }

    getIcon(type: 'checked' | 'unchecked') {
        return this.props?.icons?.[type]
    }

    render() {
        const {className, icons: _icons, ...inputProps} = this.props
        const classes = classNames('react-toggle', {
            'react-toggle--checked': this.state.checked,
            'react-toggle--focus': this.state.hasFocus,
            'react-toggle--disabled': this.props.disabled,
        }, className)

        return (
            <div className={classes}
                 onClick={this.handleClick}
                 onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove}
                 onTouchEnd={this.handleTouchEnd}>
                <div className='react-toggle-track'>
                    <div className='react-toggle-track-check'>
                        {this.getIcon('checked')}
                    </div>
                    <div className='react-toggle-track-x'>
                        {this.getIcon('unchecked')}
                    </div>
                </div>
                <div className='react-toggle-thumb'/>

                <input
                    {...inputProps}
                    ref={this.input}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    className='react-toggle-screenreader-only'
                    type='checkbox'/>
            </div>
        )
    }
}
