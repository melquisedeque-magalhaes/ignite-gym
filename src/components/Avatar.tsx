import { IImageProps, Image } from "native-base";

interface AvatarProps extends IImageProps {
  size: number
}

export function Avatar({ size, ...rest }: AvatarProps) {
  return(
    <Image 
      h={size}
      w={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}