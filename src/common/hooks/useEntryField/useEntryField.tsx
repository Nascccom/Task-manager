import { FormikHelpers, useFormik } from "formik"

export const useEntryField = (callBack: (title: string) => void) => {
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validate: (values) => {
            const errors: { title?: string } = {}

            if (values.title.trim().length > 100) {
                errors.title = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
            }
            return errors
        },
        onSubmit: (values, formikHelpers: FormikHelpers<{ title: string }>) => {
            if (!values.title.trim()) {
                formikHelpers.setFieldError("title", "Title cannot be empty")
            } else {
                callBack(values.title)
                formik.resetForm()
            }
        },
    })

    return { formik }
}
