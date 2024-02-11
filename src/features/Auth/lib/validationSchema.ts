import { LoginParams } from "features/Auth"

type FormikError = Partial<Omit<LoginParams, "captcha">>

export const validationSchema = (values: LoginParams) => {
    const errors: FormikError = {}

    if (!values.email) {
        errors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }

    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 4) {
        errors.password = "Password must be more 3 symbols"
    }
    return errors
}
