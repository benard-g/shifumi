function assignDefaultValues<T extends object>(target: T, defaultValues: T): T {
  for (const key of Object.keys(defaultValues) as unknown as (keyof T)[]) {
    if (!target.hasOwnProperty(key)) {
      target[key] = defaultValues[key];
    }
  }

  return target;
}

export default assignDefaultValues;
