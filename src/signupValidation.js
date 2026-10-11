import * as Yup from "yup";

export const signupValidation = Yup.object({
    from_name: Yup.string().trim().min(3, "Name must be at least 3 characters").required("Please enter your name"),
    from_email: Yup.string().trim().email("Enter a valid email").required("Please enter your email"),
    subject: Yup.string().trim().max(120, "Keep the subject under 120 characters"),
    message: Yup.string().trim().min(10, "Message must be at least 10 characters").required("Please write a message"),
})
