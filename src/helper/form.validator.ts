import { FormGroup } from "@angular/forms";

type FormError = {
    type: string;
    message: string;
}

type FormErrors = {
    [key: string]: FormError[];
}

export const formValidator = (form: FormGroup, formErrors: FormErrors): string => {
    let errorMessage = '';

    if (form.invalid) {
        for (const controlName in form.controls) {
            const control = form.get(controlName);

            if (control?.errors) {
                for (const errorKey in control.errors) {
                    const message = formErrors[controlName]?.find((error: any) => error.type === errorKey)?.message;

                    if (message) {
                        errorMessage = message
                    }
                }
            }
        }
        return errorMessage;
    }

    return '';
}