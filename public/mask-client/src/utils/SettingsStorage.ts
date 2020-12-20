type SettingNames = "smell";

const initialSetting = {
  smell: 300,
};

export const getSettings = (settingName: SettingNames): number => {
  const settingValue = localStorage.getItem(settingName);
  if (settingValue) {
    return Number(settingValue);
  } else {
    return initialSetting[settingName];
  }
};

export const saveSettings = (settingName: SettingNames, value: number) => {
  localStorage.setItem(settingName, String(value));
};
