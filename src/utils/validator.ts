  export function validator(text:string) {
    if (
      (text.length >= 2) && (text.length <=64) && (text.trim() !== "")
    ) {
      return true;
    } else {
      return false;
    }
  }