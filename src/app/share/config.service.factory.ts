import { DataService } from "./data.service";

export function configServiceFactory(dataService: DataService) {
  return () => dataService.loadConfigFromJsonFile(); // user to load async method before all in app
}
