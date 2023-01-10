import * as yup  from 'yup'

export const profileUpdateSchema = yup.object({
  name: yup.string().required('Digite o nome!'),
  new_password: 
    yup.string()
    .min(6, 'Digite no mínimo 6 caracteres!')
    .nullable()
    .transform(value => !!value ? value : null),
  confirm_password: 
    yup.string()
    .oneOf([yup.ref('new_password'), null], 'A senhas devem ser iguais!')
    .nullable()
    .transform(value => !!value ? value : null)
    .when('new_password', {
      is: (Field: any) => Field,
      then: yup.string()
            .required('Digite a confirmação de senha!')
            .nullable()
            .transform(value => !!value ? value : null)
    })
})