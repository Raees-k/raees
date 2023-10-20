import img1 from "../../assets/upcomingEvent/Activities_Icons_Set2.svg";
import img2 from "../../assets/upcomingEvent/Activities_Icons_Set3.svg";
import img3 from "../../assets/upcomingEvent/Activities_Icons_Set4.svg";
import img4 from "../../assets/upcomingEvent/Activities_Icons_Set5.svg";

export const setBackground = (item, services) => {
  let arrayBgImage = [img1, img2, img3, img4];
  let bg, boxShadow;
  let bgImage = arrayBgImage[Math.floor(Math.random() * arrayBgImage.length)];
  let service = services.find(
    (service) => service?.ServiceType === item.EventType
  );
  bg = service.Color;
  boxShadow = `0px 3px 18px ${service.Color}40`;
  return [bg, bgImage, boxShadow];
};

export const setCalendarMarks = (datas, servicesData) => {
  let result = [];
  datas.slice(1).forEach((data) => {
    let selectedService = null;
    selectedService = servicesData.find(
      (service) => service?.ServiceType === data[0]
    );
    if (selectedService) result.push({ color: selectedService.Color });
    else result.push({ color: "#e4e4e4" });
  });
  return result;
};
