import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSlots } from "use-react-utilities";

export default function BaseButton({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }){
  const { slots } = useSlots(children)
  return (
    <Button {...props} className={cn(buttonVariants({ variant, size, className }))}>
     {slots.trailing && <span className="mr-1">{slots.trailing}</span>}
      {children}
      {slots.leading && <span className="ml-1">{slots.leading}</span>}
    </Button>
  )
}
