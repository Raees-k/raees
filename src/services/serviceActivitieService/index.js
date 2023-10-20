export const mapTypeToRoutePath = (serviceData) => {
  return serviceData.Title.toLowerCase().split(" ").join("-");
};

export const mapRoutePathToType = (path, serviceData) => {
  return serviceData.find(
    (service) => service.Title.toLowerCase() === path.split("-").join(" ")
  )?.ServiceType;
};
