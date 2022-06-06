export const makeClassName = (
  base: string,
  props: {
    className?: string;
  }
): string => {
  return props.className === undefined ? base : `${base} ${props.className}`;
};
