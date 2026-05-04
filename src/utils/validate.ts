import type { Validator } from "../types/Todos.js";

export function validate(text: string): Validator {
  const minimumLength = 2;
  const maximumLenght = 64;

  if (text.length < minimumLength) {
    console.log("more than 2 char!");
    return {
      isValid: false,
      errorMessage: `Text should be more than ${minimumLength} characters long!`,
    };
  } else if (text.length > maximumLenght) {
    console.log("less than 64 char!");
    return {
      isValid: false,
      errorMessage: `Text should be less than ${maximumLenght} characters long!`,
    };
  } else if (text.trim() == "") {
    console.log("no empty space allowed");
    return { isValid: false, errorMessage: "No empty space allowed!" };
  } else {
    return { isValid: true };
  }
}
