import { useActions, useAppSelector } from "common/hooks"
import { authAsyncActions, authSelectors, LoginParams } from "features/Auth"
import { FormikHelpers, useFormik } from "formik"
import { BaseResponse } from "common/types"

type FormikError = Partial<Omit<LoginParams, "captcha">>

export const useLogin = () => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const { login } = useActions(authAsyncActions)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
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
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParams>) => {
            login(values)
                .unwrap()
                .catch((err: BaseResponse) => {
                    err.fieldsErrors?.forEach((fieldError) => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })

    return { formik, isLoggedIn }
}
