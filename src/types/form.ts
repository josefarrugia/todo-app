export interface FormBase {
  id: string;
  name: string;
}

export interface FormInputText extends FormBase {
  label?: string;
  hasStrikeThrough?: boolean;
}

export interface FormCheckbox extends FormBase {
  label?: string;
}
