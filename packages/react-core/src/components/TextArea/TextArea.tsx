import * as React from 'react';
import { HTMLProps } from 'react';
import styles from '@patternfly/react-styles/css/components/FormControl/form-control';
import { css } from '@patternfly/react-styles';
import { capitalize, ValidatedOptions } from '../../helpers';

export enum TextAreResizeOrientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
  both = 'both'
}

export interface TextAreaProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'onChange'> {
  /** Additional classes added to the TextArea. */
  className?: string;
  /** Flag to show if the TextArea is required. */
  isRequired?: boolean;
  /** Value to indicate if the textarea is modified to show that validation state.
   * If set to success, textarea will be modified to indicate valid state.
   * If set to error, textarea will be modified to indicate error state.
   */
  validated?: 'success' | 'error' | 'default';
  /** Value of the TextArea. */
  value?: string | number;
  /** A callback for when the TextArea value changes. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Sets the orientation to limit the resize to */
  resizeOrientation?: 'horizontal' | 'vertical' | 'both';
  /** Custom flag to show that the TextArea requires an associated id or aria-label. */
  'aria-label'?: string;
}

export class TextArea extends React.Component<TextAreaProps> {
  static defaultProps: TextAreaProps = {
    className: '',
    isRequired: false,
    validated: 'default',
    resizeOrientation: 'both',
    'aria-label': null as string
  };

  constructor(props: TextAreaProps) {
    super(props);
    if (!props.id && !props['aria-label']) {
      // eslint-disable-next-line no-console
      console.error('TextArea: TextArea requires either an id or aria-label to be specified');
    }
  }

  private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.currentTarget.value, event);
    }
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, value, onChange, validated, isRequired, resizeOrientation, ...props } = this.props;
    const orientation = `resize${capitalize(resizeOrientation)}` as 'resizeVertical' | 'resizeHorizontal';
    return (
      <textarea
        className={css(
          styles.formControl,
          className,
          resizeOrientation !== TextAreResizeOrientation.both && styles.modifiers[orientation],
          validated === ValidatedOptions.success && styles.modifiers.success
        )}
        onChange={this.handleChange}
        {...(typeof this.props.defaultValue !== 'string' && { value })}
        aria-invalid={validated === ValidatedOptions.error}
        required={isRequired}
        {...props}
      />
    );
  }
}
