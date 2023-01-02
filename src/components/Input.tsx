import { FormControl, IInputProps, Input as InputNativeBase } from 'native-base'

interface InputProps extends IInputProps {
  erroMessage?: string | null
}

export function Input({ erroMessage = null, isInvalid, ...rest }: InputProps) {

  const invalid = !!erroMessage || isInvalid

  return(
    <FormControl isInvalid={invalid}  mb={4}>
      <InputNativeBase 
        w="100%"
        h={14}
        bg="gray.700"
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        borderRadius="6px"     
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500'
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>
        {erroMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}