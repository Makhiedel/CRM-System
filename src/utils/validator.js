  export function validator(text) {
    if (
      (text.length >= 2) & (text.length <=64) & (text.trim() !== "")
    ) {
      return true;
    } else {
      return false;
    }
  }