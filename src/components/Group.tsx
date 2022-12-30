import { IPressableProps, Pressable, Text } from "native-base";

interface GroupProps extends IPressableProps {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: GroupProps) {
  return(
    <Pressable
      h={10}
      w={24}
      bg="gray.600"
      mr={3}
      rounded="sm"
      alignItems="center"
      justifyContent="center"
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      {...rest}
    >
      <Text 
        color={isActive ? 'green.500' : 'gray.200'}
        fontFamily="body" 
        fontSize="xs" 
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Pressable>
  )
}