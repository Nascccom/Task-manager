import { useActions, useAppSelector } from "common/hooks"
import { authActions, authSelectors, LoginParamsType } from "features/Auth"
import { FormikHelpers, useFormik } from "formik"
import { BaseResponseType } from "common/types"

type FormikErrorType = Partial<Omit<LoginParamsType, "captcha">>

export const useLogin = () => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const { login } = useActions(authActions)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

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
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            login(values)
                .unwrap()
                .catch((err: BaseResponseType) => {
                    err.fieldsErrors?.forEach((fieldError) => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })

    return { formik, isLoggedIn }
}
