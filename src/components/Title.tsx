import { Heading } from "native-base";

interface TitleProps {
  children: string
}

export function Title({ children }: TitleProps) {
  return (
    <Heading fontFamily="heading" fontSize="xl" color="gray.100">
      {children}
    </Heading>
  )
}