export const changeFieldText = (
  field: string,
  oldValue: string,
  newValue: string,
  setValue: (field: any, value: any) => void
) => {
  let currentValue = oldValue;
  let isGoingUp = false;
  let delay = 130;
  const inputElement = document.getElementById(field) as HTMLInputElement;

  const scrollToInput = () => {
    return new Promise<void>((resolve) => {
      if (inputElement) {
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
        inputElement.style.transform = "scale(1.05)";
        inputElement.style.transition = "transform 0.3s ease";
        setTimeout(() => {
          inputElement.style.transform = "scale(1)";
          resolve();
        }, 300);
      } else {
        resolve();
      }
    });
  };

  const updateValue = async () => {
    await scrollToInput();

    if (currentValue.length >= 1 && !isGoingUp) {
      currentValue = currentValue.slice(0, -1);
      setValue(field, currentValue);
    } else {
      isGoingUp = true;
      currentValue = currentValue + newValue[currentValue.length];
      setValue(field, currentValue);
    }

    if (currentValue === newValue) {
      return;
    } else {
      delay = Math.max(20, delay - 8);
      setTimeout(updateValue, delay);
    }
  };

  updateValue();
};

export const changeFieldState = (
  field: string,
  state: string,
  setValue: (field: any, value: any) => void
) => {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
    inputElement.style.transform = "scale(1.05)";
    inputElement.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      inputElement.style.transform = "scale(1)";
    }, 300);
  }
  setValue(field, state);
};


export const changeFieldUIState = (
  field: string,
  state: boolean,
) => {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    inputElement.checked = state;
  }
};
