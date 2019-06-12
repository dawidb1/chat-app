export class NewMedicine {
  dosePerDay: number;
  startDate: Date;
  endDate: Date;
  name: string;

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.startDate.getDate() + 7);
  }
}
