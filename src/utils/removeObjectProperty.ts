export const removeObjectProperty = (object: Record<string, unknown>, propName: string) => {
  const copy: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(object)) {
    if (key === propName) {
      break;
    }

    copy[key] = value;
  }

  return copy;
};
