import lodash from "lodash";
import { toaster } from ".";

export const checkArray = <T>(array: any, name: string): T => {
  if (!Array.isArray(array)) {
    throw new Error(
      `Looks like we encountered a bug. The current implementation expects "${name}" to be an array.`
    );
  }
  return array as unknown as T;
};

export const pruneArray = <T>(array: (T | undefined)[]): T[] | undefined => {
  const result = array.filter(Boolean);
  if (array.length === 0) {
    return undefined;
  }
  return result as T[];
};

export const pruneObject = <T, R = T>(object: T): R | undefined => {
  const result = lodash.pickBy(object ?? {}, (value) => value !== undefined);
  if (Object.keys(result).length === 0) {
    return undefined;
  }
  return result as unknown as R;
};

export const pruneString = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  return value;
};

export const pruneNumber = (value?: number): number | undefined => {
  if (
    value === undefined ||
    value === null ||
    isNaN(value) ||
    (value as unknown as string) === ""
  ) {
    return undefined;
  }

  return value;
};

export const splitKVPairs = (
  text: string,
  seperator: string,
  optional = true
): [string, string] => {
  const firstIndex = text.indexOf(seperator);
  if (firstIndex < 0) {
    if (optional) {
      return [text, ""];
    } else {
      throw new Error("Malformed document!");
    }
  }
  const key = text.substring(0, firstIndex);
  const value = text.substring(firstIndex + 1);
  return [key, value];
};

export type TTransformFunction = (
  item: string,
  index: number
) => Record<string, any>;

export const extractObjectOrArray = (
  seperator: string,
  keyName: string,
  valueName: string,
  object: any
): any => {
  if (!object) {
    return undefined;
  }

  if (Array.isArray(object)) {
    return object.map((item: string) => {
      const [key, value] = splitKVPairs(item, seperator);
      return {
        [keyName]: key,
        [valueName]: value
      };
    });
  }

  return Object.entries(object).map(([key, value]) => {
    return {
      [keyName]: key,
      [valueName]: value
    };
  });
};

export const extractArray = (
  seperator: string,
  keyName: string,
  valueName: string,
  array: any
): any => {
  if (!array) {
    return undefined;
  }

  if (!Array.isArray(array)) {
    throw new Error("Malformed document. Expected an array at this point.");
  }

  return array.map((item: string) => {
    const [key, value] = splitKVPairs(item, seperator);
    return {
      [keyName]: key,
      [valueName]: value
    };
  });
};

/**
 * Converts an array of the form `[{ [K]: string, [V]: string}]` to `{K: V}`.
 * For example,
 * ```
 * [
 *     {
 *         key: "NODE_ENV",
 *         value: "production"
 *     }
 * ]
 *
 * becomes
 *
 * {
 *     NODE_ENV: "production"
 * }
 * ```
 */
export const packArrayAsObject = (
  array: any[],
  keyName: string,
  valueName: string
) => {
  return pruneObject(
    Object.fromEntries(array.map((item) => [item[keyName], item[valueName]]))
  );
};

/**
 * Converts an array objects of the form
 * ```
 * [
 *      {
 *          [K]: string,
 *          [V]: string
 *      }
 *      ...
 *  ]`
 *
 * to
 *
 * [
 *     `${item[i][K]]}${seperator}${item[i][V]}`,
 *      ...
 * ]
 * ```
 *
 * For example,
 * ```
 * [
 *     {
 *         key: "NODE_ENV",
 *         value: "production"
 *     }
 * ]
 *
 * becomes
 *
 * {
 *     "NODE_ENV=production"
 * }
 * ```
 */
export const packArrayAsStrings = (
  objects: any[],
  keyName: string,
  valueName: string,
  seperator: string
) => {
  return pruneArray(
    objects.map((object) =>
      [object[keyName], object[valueName]].join(seperator)
    )
  );
};

/**
 * Formik is configured to validate fields automatically using Yup.
 * The problem is Formik does not call `onSubmit` function when errors
 * are present. Therefore, a work around was to call `formik.submitForm`
 * after showing errors to the user. The `reportErrorsAndSubmit` utility
 * function basically implements this.
 */
export const reportErrorsAndSubmit = (formik: any) => () => {
  const errors = Object.entries(formik.errors);
  if (errors.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_field, message] of errors) {
      if (Array.isArray(message)) {
        message.forEach((m: object) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (const [_, value] of Object.entries(m)) {
            toaster(value as string, "error");
          }
        });
      } else {
        toaster(message as string, "error");
      }
    }
  } else {
    formik.submitForm();
  }
};
