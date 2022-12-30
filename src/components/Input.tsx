import { IInputProps, Input as InputNativeBase } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return(
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
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      {...rest}
    />
  )
}