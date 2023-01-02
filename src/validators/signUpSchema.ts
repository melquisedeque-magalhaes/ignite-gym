import * as yup  from 'yup'

export const signUpSchema = yup.object({
  name: yup.string().required('Digite o nome!'),
  email: yup.string().required('Digite o e-mail!').email('Digite um e-mail valido!'),
  password: yup.string().required('Digite a senha!').min(6, 'Digite no mínimo 6 caracteres!'),
  passwordConfirm: 
    yup.string()
    .required('Confirme a senha!')
    .oneOf([yup.ref('password'), null], 'A senhas devem ser iguais!')
})