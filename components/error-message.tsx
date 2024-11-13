import { Callout } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (Array.isArray(children)) {
    return children.map((msg: string, i) => (
      <Callout.Root key={i} color="red">
        <Callout.Text>{msg}</Callout.Text>
      </Callout.Root>
    ));
  }

  return (
    <Callout.Root color="red">
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}
