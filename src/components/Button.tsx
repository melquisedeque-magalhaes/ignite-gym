import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      h={14}
      w="full" 
      bg={variant === 'outline' ? 'transparent' : "green.700"}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'green.500'
      }}
      rounded="sm"
      {...rest}
    >
      <Text 
        fontFamily="heading" 
        color={variant === 'outline' ? 'green.500' : "white"}
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}