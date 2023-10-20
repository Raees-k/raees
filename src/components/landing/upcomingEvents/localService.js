export const setBackground = (item) => {
  let arrayBgImage = [
    "/upcomingEvent/Activities_Icons_Set2.svg",
    "/upcomingEvent/Activities_Icons_Set3.svg",
    "/upcomingEvent/Activities_Icons_Set4.svg",
    "/upcomingEvent/Activities_Icons_Set5.svg",
  ];
  let bg, boxShadow;
  let bgImage = arrayBgImage[Math.floor(Math.random() * arrayBgImage.length)];
  switch (item.EventType) {
    case "Educational":
      bg = "#24B3B7";
      boxShadow = "0px 3px 18px #24B3B740";
      return [bg, bgImage, boxShadow];
    case "Community":
      bg = "#FC6273";
      boxShadow = "0px 3px 18px #FC627440";
      return [bg, bgImage, boxShadow];
    case "Promotional":
      bg = "#223771";
      boxShadow = "0px 3px 18px #22377140";
      return [bg, bgImage, boxShadow];
    default: // do nothing;
      break;
  }
};
