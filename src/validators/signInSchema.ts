import * as yup  from 'yup'

export const signInSchema = yup.object({
  email: yup.string().required('Digite o e-mail!').email('Digite um e-mail valido!'),
  password: yup.string().required('Digite a senha!').min(6, 'Digite no mínimo 6 caracteres!'),
})